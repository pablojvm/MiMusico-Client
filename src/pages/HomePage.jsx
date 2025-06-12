import React from "react";
import "./HomePage.css";
import BannerHome from "../components/BannerHome";
import CardsFamily from "../components/CardsFamily"


function HomePage() {
  return (
    <div>
      <div id="primer">
        <h3>Ponle banda sonora a tu vida al mejor precio</h3>
        <BannerHome />
      </div>
      <div id="segundo">
        <h3>Mas categorias</h3>
        <div>
          <CardsFamily/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
