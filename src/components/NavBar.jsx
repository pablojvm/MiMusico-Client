import { Col, Row, NavDropdown, Container, Nav } from "react-bootstrap";
import "./NavBar.css";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function NavBar() {

  return (
    <div>
      <Nav id="Nav" variant="pills" activeKey="1" >
        <Nav.Item>
            <Link to="/">
          <img src="logoMi.png" style={{ width: "70px" }}></img>
          </Link>
        </Nav.Item>
        <NavDropdown title="Buscar" id="nav-dropdown" className="mega-dropdown">
          <div className="mega-menu px-4 py-3">
            <Container>
              <Row id="Row">
                <Col>
                  <h6>Instrumentos</h6>
                  <NavDropdown.Item>Yamaha</NavDropdown.Item>
                  <NavDropdown.Item>Thoman</NavDropdown.Item>
                  <NavDropdown.Item>Bach</NavDropdown.Item>
                  <NavDropdown.Item>Stentor</NavDropdown.Item>
                  <NavDropdown.Item>Fender</NavDropdown.Item>
                </Col>
                <Col>
                  <h6>Grupos</h6>
                  <NavDropdown.Item>Mejor Valorados</NavDropdown.Item>
                  <NavDropdown.Item>Mas Económicos</NavDropdown.Item>
                </Col>
              </Row>
            </Container>
          </div>
        </NavDropdown>
        <NavDropdown title="Mi Cuenta" id="nav-dropdown">
          <NavDropdown.Item as={Link} to="/identification" eventKey="4.1">
            Entrar o Registrarme
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/own-ads" eventKey="4.2">Mis Anuncios</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/own-reviews" eventKey="4.3">Mis Comentarios</NavDropdown.Item>
          {AuthContext && (
            <>
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="4.4">Cerrar Sesión</NavDropdown.Item>
            </>
          )}
        </NavDropdown>
      </Nav>
    </div>
  );
}

export default NavBar;
