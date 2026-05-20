import {
  Col,
  Row,
  NavDropdown,
  Container,
  Nav,
  Navbar,
} from "react-bootstrap";
import "./NavBar.css";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

function NavBar() {
  const navigate = useNavigate();
  const { isLoggedIn, authenticateUser } = useContext(AuthContext);

  const handleLogout = async () => {
    localStorage.removeItem("authToken");
    try {
      await authenticateUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar expand="lg" variant="dark" className="mm-navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src="/logoblanco.png" alt="MiMusico" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="mm-navbar-nav" />

        <Navbar.Collapse id="mm-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title="Buscar"
              id="nav-dropdown-buscar"
              className="mega-dropdown"
            >
              <div className="mega-menu px-4 py-3" style={{ minWidth: "360px" }}>
                <Container>
                  <Row>
                    <Col xs={12} md={6} className="mb-3 mb-md-0">
                      <h6>Instrumentos</h6>
                      <NavDropdown.Item
                        as={Link}
                        to="/ads/instruments?marca=Yamaha"
                      >
                        Yamaha
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to="/ads/instruments?marca=Thomann"
                      >
                        Thomann
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to="/ads/instruments?marca=Bach"
                      >
                        Bach
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to="/ads/instruments?marca=Stentor"
                      >
                        Stentor
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to="/ads/instruments?marca=Fender"
                      >
                        Fender
                      </NavDropdown.Item>
                    </Col>
                    <Col xs={12} md={6}>
                      <h6>Grupos</h6>
                      <NavDropdown.Item
                        as={Link}
                        to="/ads/groups?sort=cost_desc"
                      >
                        Más caros
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to="/ads/groups?sort=cost_asc"
                      >
                        Más económicos
                      </NavDropdown.Item>
                    </Col>
                  </Row>
                </Container>
              </div>
            </NavDropdown>
          </Nav>

          <Nav>
            <NavDropdown title="Mi cuenta" id="nav-dropdown-cuenta" align="end">
              {isLoggedIn ? (
                <NavDropdown.Item as={Link} to="/user-profile">
                  Perfil
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item as={Link} to="/identification">
                  Entrar o Registrarme
                </NavDropdown.Item>
              )}

              <NavDropdown.Item as={Link} to="/own-ads">
                Mis anuncios
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/own-reviews">
                Mis comentarios
              </NavDropdown.Item>
              {isLoggedIn && (
                <>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Cerrar sesión
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
