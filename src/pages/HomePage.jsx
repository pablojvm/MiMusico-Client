import BannerHome from "../components/BannerHome";
import CardsFamily from "../components/CardsFamily";

function HomePage() {
  return (
    <div 
      id="primero" 
      style={{
        display: "flex", 
        flexDirection: "column",
        minHeight: "100vh",
        padding: "0",
        margin: "0",
        backgroundImage: "url('/path-to-your-background.jpg')", // Cambia por la ruta de tu imagen
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
      className="home-page-background"
    >
      {/* Sección principal con título y banner */}
      <div 
        id="segundo" 
        style={{
          display: "flex", 
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          gap: "1.5rem"
        }}
        className="responsive-header"
      >
        <h3 
          style={{
            textAlign: "center",
            fontSize: "clamp(1.2rem, 4vw, 2rem)",
            fontWeight: "600",
            color: "#333",
            margin: "0",
            padding: "0 1rem",
            lineHeight: "1.3"
          }}
        >
          Ponle banda sonora a tu vida al mejor precio
        </h3>
        <div style={{ width: "100%", maxWidth: "800px" }}>
          <BannerHome/>
        </div>
      </div>

      {/* Sección de categorías */}
      <div 
        id="tercero" 
        style={{
          marginTop: "2rem",
          width: "100%",
          padding: "0 1rem",
          maxWidth: "1200px",
          margin: "2rem auto 0 auto"
        }}
      >
        <h3 
          style={{
            fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
            fontWeight: "600",
            color: "#333",
            marginBottom: "1.5rem",
            paddingLeft: "0.5rem"
          }}
        >
          Más categorías
        </h3>
        <div id="cardsContainer">
          <CardsFamily/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;