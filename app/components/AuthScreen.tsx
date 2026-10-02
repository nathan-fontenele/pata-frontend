"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type AuthMode = "login" | "signup";

const auth0Domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
const auth0ClientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
const auth0Audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE;
const auth0RedirectUri =
  process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI ||
  (typeof window !== "undefined" ? window.location.origin : "");

function buildAuth0Url(mode: AuthMode) {
  if (!auth0Domain || !auth0ClientId || !auth0RedirectUri) return null;
  const params = new URLSearchParams({
    client_id: auth0ClientId,
    redirect_uri: auth0RedirectUri,
    response_type: "code",
    scope: "openid profile email",
    ...(mode === "signup" ? { screen_hint: "signup" } : {}),
    ...(auth0Audience ? { audience: auth0Audience } : {}),
  });
  return `https://${auth0Domain}/authorize?${params.toString()}`;
}

export default function AuthScreen({ mode }: { mode: AuthMode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [configurationError, setConfigurationError] = useState(false);
  const isSignup = mode === "signup";
  const authUrl = useMemo(() => buildAuth0Url(mode), [mode]);

  function startAuth() {
    if (!authUrl) {
      setConfigurationError(true);
      return;
    }
    setIsLoading(true);
    window.location.assign(authUrl);
  }

  return (
    <main className="auth-shell">
      <section className="auth-art" aria-label="Sobre o Pata">
        <div className="art-topline">
          <div className="brand-mark" aria-hidden="true"><span className="brand-paw">✦</span></div>
          <span className="brand-name">pata</span>
        </div>
        <div className="art-copy">
          <p className="eyebrow">Seu cuidado, mais simples</p>
          <h1>Tudo o que seu pet precisa,<span> em um só lugar.</span></h1>
          <p className="art-description">Organize a rotina, acompanhe a saúde e viva mais momentos bons ao lado de quem faz parte da família.</p>
        </div>
        <div className="art-orbit orbit-one" aria-hidden="true" />
        <div className="art-orbit orbit-two" aria-hidden="true" />
        <div className="art-paw paw-large" aria-hidden="true">✣</div>
        <div className="art-paw paw-small" aria-hidden="true">✦</div>
        <div className="art-footer"><span className="footer-dot" />Feito para todas as histórias de amor</div>
      </section>

      <section className="auth-panel">
        <div className="mobile-brand">
          <div className="brand-mark" aria-hidden="true"><span className="brand-paw">✦</span></div>
          <span className="brand-name">pata</span>
        </div>
        <div className="auth-card">
          <div className="auth-heading">
            <p className="eyebrow">Bem-vindo à pata</p>
            <h2>{isSignup ? "Crie sua conta" : "Que bom ter você aqui"}</h2>
            <p>{isSignup ? "Comece agora a cuidar melhor de quem está sempre ao seu lado." : "Entre para continuar acompanhando a rotina do seu pet."}</p>
          </div>
          <div className="auth-switch" role="tablist" aria-label="Acesso à conta">
            <Link href="/login" className={!isSignup ? "active" : ""} role="tab" aria-selected={!isSignup}>Entrar</Link>
            <Link href="/criar-conta" className={isSignup ? "active" : ""} role="tab" aria-selected={isSignup}>Criar conta</Link>
          </div>
          <button className="auth-button" onClick={startAuth} disabled={isLoading}>
            {isLoading ? "Abrindo acesso..." : isSignup ? "Criar minha conta" : "Entrar na minha conta"}
            {!isLoading && <span aria-hidden="true">→</span>}
          </button>
          {configurationError && <p className="configuration-error" role="alert">Configure as variáveis do Auth0 no arquivo <code>.env.local</code> para continuar.</p>}
          <p className="terms">Ao continuar, você concorda com os <a href="#termos">Termos de uso</a> e a <a href="#privacidade">Política de privacidade</a>.</p>
        </div>
        <p className="auth-footer">{isSignup ? "Já tem uma conta?" : "Ainda não tem uma conta?"} <Link href={isSignup ? "/login" : "/criar-conta"}>{isSignup ? "Entrar" : "Criar agora"}</Link></p>
      </section>
    </main>
  );
}
