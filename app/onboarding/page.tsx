import { redirect } from "next/navigation";
import { getAuth0Client } from "../../lib/auth0";
import OnboardingForm from "./OnboardingForm";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const auth0 = getAuth0Client();
  if (!auth0) {
    return (
      <main className="auth-shell">
        <section className="auth-panel">
          <div className="auth-card">
            <p className="eyebrow">Configuração necessária</p>
            <h1>Autenticação indisponível</h1>
            <p>Configure as credenciais do Auth0 no arquivo <code>.env.local</code> para continuar.</p>
          </div>
        </section>
      </main>
    );
  }

  const session = await auth0.getSession();
  if (!session) redirect("/auth/login?returnTo=%2Fonboarding");

  return (
    <main className="auth-shell onboarding-shell">
      <section className="auth-art" aria-label="Sobre a Pata">
        <div className="art-topline"><span className="brand-mark" aria-hidden="true">✦</span><span className="brand-name">Pata</span></div>
        <div className="art-copy">
          <p className="eyebrow">Quase lá</p>
          <h1>Sua clínica começa<span> com um cadastro completo.</span></h1>
          <p className="art-description">Informe os dados da organização para configurar o espaço da sua clínica na Pata.</p>
        </div>
        <div className="art-footer"><span className="footer-dot" />Feito para todas as histórias de amor</div>
      </section>
      <section className="auth-panel">
        <div className="auth-card">
          <div className="auth-heading">
            <p className="eyebrow">Acesso profissional</p>
            <h2>Cadastre sua clínica</h2>
            <p>Este cadastro cria a organização da clínica vinculada à sua conta.</p>
          </div>
          <OnboardingForm
            initialEmail={session.user.email ?? ""}
          />
          <p className="auth-footer"><a href="/auth/logout">Sair da conta</a></p>
        </div>
      </section>
    </main>
  );
}
