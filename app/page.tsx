import Link from "next/link";

const features = [
  {
    title: "Agenda centralizada",
    text: "Organize consultas e acompanhe os horários da clínica.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=85",
    tone: "lime",
  },
  {
    title: "Equipe conectada",
    text: "Mantenha veterinários e colaboradores alinhados.",
    image: "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?auto=format&fit=crop&w=900&q=85",
    tone: "blue",
  },
  {
    title: "Atendimentos organizados",
    text: "Tenha as informações da rotina clínica em um só lugar.",
    image: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=900&q=85",
    tone: "yellow",
  },
];

const faqs = [
  "Como começo a usar a Pata na minha clínica?",
  "Posso cadastrar mais veterinários na organização?",
  "Como organizo o acesso da minha equipe?",
];

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="site-nav container">
        <Link href="/" className="logo"><span className="logo-sun">✳</span> Pata<span className="logo-dot">.</span></Link>
        <div className="nav-links"><a href="#recursos">Recursos</a><a href="#sobre">Sobre a Pata</a><a href="#como-funciona">Como funciona</a><a href="#faq">FAQ</a></div>
        <Link href="/login" className="nav-cta">Entrar</Link>
        <button className="menu-button" aria-label="Abrir menu">☰</button>
      </nav>

      <section className="hero container">
        <div className="hero-copy">
          <p className="section-kicker">Feita para clínicas veterinárias</p>
          <h1>Gestão veterinária <em>mais simples.</em></h1>
          <p className="hero-text">Organize a agenda, conecte os veterinários e acompanhe a rotina da sua clínica em uma plataforma.</p>
          <div className="hero-actions"><Link href="/criar-conta" className="button button-dark">Criar acesso da clínica <span>↗</span></Link><a href="#recursos" className="text-link">Conheça os recursos ↓</a></div>
        </div>
        <div className="hero-visual">
          <div className="hero-blob hero-blob-one"><img src="https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=85" alt="Cachorro na clínica veterinária" /></div>
          <div className="hero-blob hero-blob-two"><img src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=900&q=85" alt="Gato sendo atendido" /></div>
          <div className="hero-blob hero-blob-three"><img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=85" alt="Cachorro recebendo cuidados" /></div>
          <span className="hero-spark spark-one">✦</span><span className="hero-spark spark-two">✳</span>
        </div>
      </section>

      <section className="service-section" id="recursos"><div className="container">
        <div className="section-heading"><div><p className="section-kicker">A rotina da clínica, em ordem</p><h2>Mais tempo para <em>cuidar.</em></h2></div><Link href="/criar-conta" className="text-link">Acessar a Pata <span>↗</span></Link></div>
        <div className="service-grid">{features.map((feature, index) => <article className={`service-card ${feature.tone}`} key={feature.title}><div className="service-card-top"><span>0{index + 1}</span><span>↗</span></div><div><h3>{feature.title}</h3><p>{feature.text}</p></div><img src={feature.image} alt="" /></article>)}</div>
      </div></section>

      <section className="about-section container" id="sobre"><div className="about-image"><img src="https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1000&q=85" alt="Veterinário com um cachorro" /><span className="image-sticker">cuidado<br />em cada<br />atendimento ✳</span></div><div className="about-copy"><p className="section-kicker">Sobre a Pata</p><h2>Uma plataforma pensada para <em>a sua clínica.</em></h2><p>Reúna a organização da equipe e dos atendimentos em um espaço de trabalho da sua clínica veterinária.</p><Link href="/criar-conta" className="button button-dark">Criar acesso da clínica <span>↗</span></Link><div className="stats"><div><strong>Agenda</strong><small>Consultas organizadas</small></div><div><strong>Equipe</strong><small>Veterinários conectados</small></div><div><strong>Clínica</strong><small>Rotina centralizada</small></div></div></div></section>

      <section className="steps-section" id="como-funciona"><div className="container"><div className="center-heading"><p className="section-kicker">Comece pela sua equipe</p><h2>Como funciona</h2><p>Configure o acesso da clínica e organize o trabalho dos veterinários.</p></div><div className="steps-grid"><div className="step"><span>01</span><h3>Crie seu acesso</h3><p>Entre na plataforma com sua conta profissional.</p></div><div className="step step-highlight"><span>02</span><h3>Conecte a equipe</h3><p>Cadastre os veterinários associados à organização.</p></div><div className="step"><span>03</span><h3>Organize a rotina</h3><p>Acompanhe a agenda e os atendimentos da clínica.</p></div></div></div></section>

      <section className="faq-section container" id="faq"><div><p className="section-kicker">Dúvidas sobre a plataforma?</p><h2>A gente responde.</h2><p>Fale com a nossa equipe para saber como a Pata pode apoiar sua clínica.</p></div><div className="faq-list">{faqs.map((faq, index) => <details key={faq} open={index === 0}><summary>{faq}<span>+</span></summary><p>Entre em contato com a equipe Pata para receber orientação sobre o acesso e a configuração da sua organização.</p></details>)}</div></section>

      <section className="final-cta" id="contato"><div className="container final-cta-inner"><div><p className="section-kicker">Sua clínica, mais organizada</p><h2>Vamos começar?</h2></div><Link href="/criar-conta" className="button button-dark">Criar acesso da clínica <span>↗</span></Link></div></section>
      <footer className="site-footer"><div className="container footer-inner"><Link href="/" className="logo">✳ Pata<span className="logo-dot">.</span></Link><p>Gestão simples para clínicas veterinárias.</p><div><a href="#recursos">Recursos</a><a href="#sobre">Sobre a Pata</a><a href="#faq">FAQ</a><Link href="/login">Entrar</Link></div></div></footer>
    </main>
  );
}
