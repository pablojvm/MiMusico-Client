import BannerHome from "../components/BannerHome";
import CardsFamily from "../components/CardsFamily";

function HomePage() {
  return (
    <div className="home-page page-fade">
      <section className="home-hero">
        <div className="home-hero-overlay">
          <div>
            <span className="home-hero-eyebrow">
              Tu marketplace musical
            </span>
            <h1 className="home-hero-title">
              <span className="home-hero-line">
                Ponle <em>banda sonora</em>
              </span>
              <span className="home-hero-line">a tu vida</span>
            </h1>
            <p className="home-hero-subtitle">
              Compra y vende instrumentos de segunda mano o contrata al grupo
              perfecto para tu próxima ocasión, todo en un solo lugar.
            </p>
            <div className="home-hero-stats">
              <div className="home-hero-stat">
                <strong>+500</strong>
                <span>instrumentos</span>
              </div>
              <div className="home-hero-stat">
                <strong>+120</strong>
                <span>grupos activos</span>
              </div>
              <div className="home-hero-stat">
                <strong>4.8★</strong>
                <span>valoración media</span>
              </div>
            </div>
          </div>
          <div className="home-hero-banner">
            <BannerHome />
          </div>
        </div>
      </section>

      <section className="home-categories">
        <div className="home-categories-header">
          <div>
            <h2 className="section-title">Explora por familia</h2>
            <p className="section-subtitle">
              Encuentra el instrumento perfecto según tu estilo musical.
            </p>
          </div>
        </div>
        <div id="cardsContainer">
          <CardsFamily />
        </div>
      </section>

      <section className="home-how-it-works">
        <h2 className="section-title">Cómo funciona</h2>
        <p className="section-subtitle">
          Tres pasos para vender, comprar o contratar música en MiMusico.
        </p>
        <div className="how-steps">
          <article className="how-step">
            <span className="how-step-number">01</span>
            <h4>Explora o publica</h4>
            <p>
              Busca instrumentos por marca, familia o estado, o publica el tuyo
              en menos de un minuto.
            </p>
          </article>
          <article className="how-step">
            <span className="how-step-number">02</span>
            <h4>Conecta con artistas</h4>
            <p>
              Habla directamente con vendedores o contrata el grupo perfecto
              para tu evento.
            </p>
          </article>
          <article className="how-step">
            <span className="how-step-number">03</span>
            <h4>Cierra el trato seguro</h4>
            <p>
              Pago seguro con Stripe y un historial de reseñas para que vayas
              sobre seguro.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
