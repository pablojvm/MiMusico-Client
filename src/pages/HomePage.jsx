import BannerHome from "../components/BannerHome";
import CardsFamily from "../components/CardsFamily"


function HomePage() {
  return (
    <div id="primero">
      <div id="segundo">
        <h3>Ponle banda sonora a tu vida al mejor precio</h3>
        <BannerHome/>
      </div>
      <div id="tercero" style={{marginTop:"10px", width:"90%"}}>
        <h3 style={{display:"flex", alignItems:"flex-start", marginLeft:"15px", marginTop:"5px"}}>Mas categorias</h3>
        <div id="cardsContainer">
          <CardsFamily/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
