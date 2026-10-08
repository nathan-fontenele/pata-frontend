import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuth0Client } from "../../lib/auth0";
import OrganizationStatus from "./OrganizationStatus";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: PageProps<"/dashboard">) {
  const auth0 = getAuth0Client();
  if (!auth0) {
    return (
      <main className="dashboard-shell">
        <section className="dashboard-content">
          <p className="section-kicker">Configuração necessária</p>
          <h1>Autenticação indisponível.</h1>
          <p>Configure as credenciais do Auth0 no arquivo <code>.env.local</code> para acessar esta página.</p>
        </section>
      </main>
    );
  }

  const session = await auth0.getSession();
  if (!session) redirect("/auth/login?returnTo=%2Fdashboard");
  const params = await searchParams;

  return (
    <main className="dashboard-shell">
      <header className="dashboard-header">
        <Link href="/" className="logo"><span className="logo-sun">✳</span> Pata<span className="logo-dot">.</span></Link>
        <a className="dashboard-logout" href="/auth/logout">Sair</a>
      </header>
      <section className="dashboard-content">
        <p className="section-kicker">Área da clínica</p>
        <h1>Olá, {session.user.name || "bem-vindo à Pata"}.</h1>
        {params.cadastro === "concluido" && <p className="dashboard-notice">Cadastro da clínica concluído.</p>}
        <OrganizationStatus />
        <p>Cadastre a organização da sua clínica para configurar seu espaço na Pata.</p>
        <Link className="button button-dark" href="/onboarding">Cadastrar clínica <span>↗</span></Link>
      </section>
    </main>
  );
}
