import { Col, Row, NavDropdown, Container, Nav, Navbar } from "react-bootstrap";
import "./NavBar.css";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

function NavBar() {
  const navigate = useNavigate();
  const { isLoggedIn, authenticateUser, loggedUserId } =
    useContext(AuthContext);

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
    <Navbar 
      expand="lg" 
      style={{
        backgroundColor:"rgb(68, 82, 102)",
        padding: "0.5rem 1rem",
        borderRadius: "40px"
      }}
      variant="dark"
    >
      <Container fluid>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img 
            src="/logoblanco.png" 
            style={{ width: "90px" }}
            alt="Logo"
          />
        </Navbar.Brand>

        {/* Toggle button for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Dropdown Buscar */}
            <NavDropdown
              title="Buscar"
              id="nav-dropdown-buscar"
              className="mega-dropdown"
            >
              <div className="mega-menu px-4 py-3" style={{ minWidth: "400px" }}>
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
                    <Col xs={12} md={6} className="mt-3 mt-md-0" style={{ paddingTop: "8px" }}>
                      <h6>Grupos</h6>
                      <NavDropdown.Item as={Link} to="/ads/groups?sort=cost_desc">
                        Más Caros
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/ads/groups?sort=cost_asc">
                        Mas Económicos
                      </NavDropdown.Item>
                    </Col>
                  </Row>
                </Container>
              </div>
            </NavDropdown>
          </Nav>

          {/* Mi Cuenta - aligned to the right */}
          <Nav>
            <NavDropdown title="Mi Cuenta" id="nav-dropdown-cuenta">
              {isLoggedIn ? (
                <NavDropdown.Item as={Link} to="/user-profile" eventKey="4.1">
                  Perfil
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item as={Link} to="/identification" eventKey="4.1">
                  Entrar o Registrarme
                </NavDropdown.Item>
              )}

              <NavDropdown.Item as={Link} to="/own-ads" eventKey="4.2">
                Mis Anuncios
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={`/own-reviews`} eventKey="4.3">
                Mis Comentarios
              </NavDropdown.Item>
              {isLoggedIn && (
                <>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="4.4" onClick={handleLogout}>
                    Cerrar Sesión
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