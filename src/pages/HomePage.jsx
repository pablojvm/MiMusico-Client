import BannerHome from "../components/BannerHome";
import CardsFamily from "../components/CardsFamily";

function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-overlay">
          <h1 className="home-hero-title">
            Ponle banda sonora a tu vida al mejor precio
          </h1>
          <p className="home-hero-subtitle">
            Encuentra instrumentos, grupos y experiencias musicales en un solo
            lugar.
          </p>
          <div className="home-hero-banner">
            <BannerHome />
          </div>
        </div>
      </section>

      <section className="home-categories">
        <h2 className="section-title">Explora por familia</h2>
        <div id="cardsContainer">
          <CardsFamily />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
