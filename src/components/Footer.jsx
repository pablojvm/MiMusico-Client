import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mm-footer">
      <div className="mm-footer-inner">
        <div className="mm-footer-brand">
          <img src="/logoblanco.png" alt="MiMusico" className="mm-footer-logo" />
          <p>
            Marketplace para músicos. Compra, vende y contrata grupos en un
            solo lugar.
          </p>
        </div>

        <div className="mm-footer-columns">
          <div>
            <h6>Explorar</h6>
            <Link to="/ads/instruments">Instrumentos</Link>
            <Link to="/ads/groups">Grupos musicales</Link>
            <Link to="/ads/groups?sort=cost_asc">Económicos</Link>
            <Link to="/ads/groups?sort=cost_desc">Premium</Link>
          </div>
          <div>
            <h6>Mi cuenta</h6>
            <Link to="/user-profile">Perfil</Link>
            <Link to="/own-ads">Mis anuncios</Link>
            <Link to="/own-reviews">Mis comentarios</Link>
            <Link to="/new-ad">Publicar anuncio</Link>
          </div>
          <div>
            <h6>Comunidad</h6>
            <a
              href="mailto:hola@mimusico.app"
              onClick={(e) => e.preventDefault()}
            >
              Contacto
            </a>
            <a href="/" onClick={(e) => e.preventDefault()}>
              Términos
            </a>
            <a href="/" onClick={(e) => e.preventDefault()}>
              Privacidad
            </a>
          </div>
        </div>
      </div>

      <div className="mm-footer-bottom">
        <span>© {new Date().getFullYear()} MiMusico</span>
        <span className="mm-footer-tagline">
          Ponle banda sonora a tu vida 🎵
        </span>
      </div>
    </footer>
  );
}

export default Footer;
