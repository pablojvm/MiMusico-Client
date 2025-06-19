import "./HomePage.css";
import BannerHome from "../components/BannerHome";
import CardsFamily from "../components/CardsFamily"


function HomePage() {
  return (
    <div>
      <div id="primer">
        <h3>Ponle banda sonora a tu vida al mejor precio</h3>
        <BannerHome/>
      </div>
      <div id="segundo" style={{marginTop:"10px"}}>
        <h3 style={{display:"flex", alignItems:"flex-start", marginLeft:"15px", marginTop:"5px"}}>Mas categorias</h3>
        <div>
          <CardsFamily/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
