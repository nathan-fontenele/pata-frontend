import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-shell">
      <nav className="not-found-nav container">
        <Link href="/" className="logo"><span className="logo-sun">✳</span> Pata<span className="logo-dot">.</span></Link>
        <Link href="/login" className="nav-cta">Entrar</Link>
      </nav>

      <section className="not-found-content container">
        <div className="not-found-copy">
          <p className="section-kicker">Ops, essa página escapou</p>
          <h1>404<span>.</span></h1>
          <h2>Não encontramos esse caminho.</h2>
          <p>A página que você procura pode ter mudado de endereço ou não existe mais. Volte à página da Pata para clínicas veterinárias.</p>
          <div className="not-found-actions">
            <Link href="/" className="button button-dark">Voltar para a home <span>↗</span></Link>
            <Link href="/criar-conta" className="text-link">Criar acesso da clínica</Link>
          </div>
        </div>
        <div className="not-found-art" aria-hidden="true">
          <div className="not-found-sun">✳</div>
          <div className="not-found-blob"><span>?</span></div>
          <div className="not-found-paw">♡</div>
          <p>volte para<br />o caminho do cuidado</p>
        </div>
      </section>

      <footer className="not-found-footer"><div className="container"><span>Pata.</span> Gestão para clínicas veterinárias.</div></footer>
    </main>
  );
}
