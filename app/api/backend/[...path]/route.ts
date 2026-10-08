import { getAuth0Audience, getAuth0Client } from "../../../../lib/auth0";

async function forward(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const apiBaseUrl = process.env.PATA_API_URL;
  if (!apiBaseUrl) {
    return Response.json({ message: "PATA_API_URL não está configurada." }, { status: 500 });
  }

  const audience = getAuth0Audience();
  if (!audience) {
    return Response.json(
      { message: "AUTH0_AUDIENCE não está configurada. Informe o identificador da API no Auth0." },
      { status: 503 },
    );
  }

  const auth0 = getAuth0Client();
  if (!auth0) {
    return Response.json({ message: "Configure o Auth0 no arquivo .env.local para acessar a API." }, { status: 503 });
  }

  const session = await auth0.getSession();
  if (!session) {
    return Response.json({ message: "Sua sessão expirou. Entre novamente." }, { status: 401 });
  }

  let accessToken: string;
  try {
    const token = await auth0.getAccessToken({ audience });
    accessToken = token.token;
  } catch {
    return Response.json(
      { message: "Não foi possível obter um token de acesso para a API." },
      { status: 401 },
    );
  }

  const { path } = await context.params;
  if (path.length === 0 || path.some((part) => !/^[\w.-]+$/.test(part))) {
    return Response.json({ message: "Caminho de API inválido." }, { status: 400 });
  }

  const apiUrl = new URL(
    `/${path.map(encodeURIComponent).join("/")}${new URL(request.url).search}`,
    apiBaseUrl,
  );
  const headers = new Headers({ Authorization: `Bearer ${accessToken}` });
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);

  try {
    const response = await fetch(apiUrl, {
      method: request.method,
      headers,
      ...(request.method === "GET" || request.method === "DELETE"
        ? {}
        : { body: await request.text() }),
      cache: "no-store",
    });
    const responseBody = await response.arrayBuffer();
    const responseHeaders = new Headers();
    const responseContentType = response.headers.get("content-type");
    if (responseContentType) responseHeaders.set("content-type", responseContentType);
    return new Response(responseBody.byteLength ? responseBody : null, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch {
    return Response.json(
      { message: "Não foi possível conectar à API Pata." },
      { status: 502 },
    );
  }
}

export const GET = forward;
export const POST = forward;
export const PUT = forward;
export const PATCH = forward;
export const DELETE = forward;

export function OPTIONS() {
  return new Response(null, { status: 204 });
}
