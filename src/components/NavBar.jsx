import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
      const handleSelect = (eventKey) => alert(`selected ${eventKey}`);
  return (
    <div>
      <Nav variant="pills" activeKey="1" onSelect={handleSelect}>
      <Nav.Item>
        <img src="logoMi.png"></img>
      </Nav.Item>
      <NavDropdown title="Buscar" id="nav-dropdown">
        <NavDropdown.Item eventKey="2.1">Action</NavDropdown.Item>
        <NavDropdown.Item eventKey="2.2">Another action</NavDropdown.Item>
        <NavDropdown.Item eventKey="2.3">Something else here</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey="2.4">Separated link</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Perfil" id="nav-dropdown">
        <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    </div>
  )
}

export default NavBar
