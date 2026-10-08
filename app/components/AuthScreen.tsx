"use client";

import Link from "next/link";
import { useState } from "react";

type AuthMode = "login" | "signup";

export default function AuthScreen({
  mode,
  authConfigured,
}: {
  mode: AuthMode;
  authConfigured: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const isSignup = mode === "signup";

  function getAuthUrl() {
    const returnTo = isSignup ? "/onboarding" : "/dashboard";
    const params = new URLSearchParams({ returnTo });
    if (isSignup) params.set("screen_hint", "signup");
    return `/auth/login?${params.toString()}`;
  }

  return (
    <main className="auth-shell">
      <section className="auth-art" aria-label="Sobre o Pata">
        <div className="art-topline">
          <div className="brand-mark" aria-hidden="true"><span className="brand-paw">✦</span></div>
          <span className="brand-name">Pata</span>
        </div>
        <div className="art-copy">
          <p className="eyebrow">Gestão veterinária, mais simples</p>
          <h1>Sua clínica organizada<span> em um só lugar.</span></h1>
          <p className="art-description">Cuide da agenda, da equipe e dos atendimentos da sua clínica em uma plataforma feita para a rotina veterinária.</p>
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
          <span className="brand-name">Pata</span>
        </div>
        <div className="auth-card">
          <div className="auth-heading">
            <p className="eyebrow">Bem-vindo à Pata</p>
            <h2>{isSignup ? "Crie sua conta" : "Que bom ter você aqui"}</h2>
            <p>{isSignup
              ? "Crie seu acesso profissional e organize a rotina da sua clínica veterinária."
              : "Entre para gerenciar a equipe e os atendimentos da sua clínica."}</p>
          </div>
          <div className="auth-switch" role="tablist" aria-label="Acesso à conta">
            <Link href="/login" className={!isSignup ? "active" : ""} role="tab" aria-selected={!isSignup}>Entrar</Link>
            <Link href="/criar-conta" className={isSignup ? "active" : ""} role="tab" aria-selected={isSignup}>Criar acesso</Link>
          </div>
          {authConfigured ? (
            <a className="auth-button" href={getAuthUrl()} onClick={() => setIsLoading(true)} aria-disabled={isLoading}>
              {isLoading ? "Abrindo acesso..." : isSignup ? "Criar acesso da clínica" : "Entrar na clínica"}
              {!isLoading && <span aria-hidden="true">→</span>}
            </a>
          ) : (
            <>
              <button className="auth-button" type="button" disabled>
                Configure o Auth0 para continuar
              </button>
              <p className="configuration-error" role="alert">
                Defina <code>AUTH0_DOMAIN</code>, <code>AUTH0_CLIENT_ID</code>, <code>AUTH0_CLIENT_SECRET</code> e <code>AUTH0_SECRET</code> no arquivo <code>.env.local</code>.
              </p>
            </>
          )}
          {isSignup && authConfigured && <p className="auth-note">Depois de criar seu acesso, você cadastra os dados da organização da clínica.</p>}
          <p className="terms">Ao continuar, você concorda com os <a href="#termos">Termos de uso</a> e a <a href="#privacidade">Política de privacidade</a>.</p>
        </div>
        <p className="auth-footer">{isSignup ? "Já tem um acesso?" : "Ainda não tem acesso?"} <Link href={isSignup ? "/login" : "/criar-conta"}>{isSignup ? "Entrar" : "Criar acesso"}</Link></p>
      </section>
    </main>
  );
}
