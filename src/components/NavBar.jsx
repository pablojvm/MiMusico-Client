import { Col, Row, NavDropdown, Container, Nav } from "react-bootstrap";
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
    <div>
      <Nav id="Nav" variant="pills" activeKey="1" style={{display:"flex", alignItems:"center", color:"white", backgroundColor:"rgb(68, 82, 102)"}}>
        <div style={{display:"flex", alignItems:"center"}}>
          <Nav.Item>
            <Link to="/">
              <img src="logoblanco.png" style={{ width: "90px", marginLeft:"15px", marginRight:"15px" }}></img>
            </Link>
          </Nav.Item>
          <NavDropdown
            title="Buscar"
            id="nav-dropdown"
            
            className="mega-dropdown"
            style={{color:"white"}}
          >
            <div className="mega-menu px-4 py-3" >
              <Container variant="secondary">
                <Row id="Row" style={{display:"flex"}}>
                  <Col>
                    <h6>Instrumentos</h6>
                    <NavDropdown.Item
                      as={Link}
                      to="/ads/instruments?brand=Yamaha"
                    >
                      Yamaha
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/ads/instruments?brand=Thomann"
                    >
                      Thomann
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/ads/instruments?brand=Bach"
                    >
                      Bach
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/ads/instruments?brand=Stentor"
                    >
                      Stentor
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/ads/instruments?brand=Fender"
                    >
                      Fender
                    </NavDropdown.Item>
                  </Col>
                  <Col>
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
        </div>
        <NavDropdown title="Mi Cuenta" id="nav-dropdown" style={{marginRight:"20px"}}>
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
    </div>
  );
}

export default NavBar;
