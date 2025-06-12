import { Card, Button, FloatingLabel, Form } from "react-bootstrap";
import { useState } from "react";

function IdentificationBanner() {
  const [buttonSignup, setButtonSignup] = useState("login");

  const toggleSignup = () => {
    setButtonSignup((prev) => (prev === "login" ? "signup" : "login"))
  }
  return (
    <div>
      {buttonSignup === "login" && (
        <Card style={{ width: "18rem" }}>
          <Card.Title>Inicia Sesión</Card.Title>
          <Card.Body>
            <FloatingLabel
              controlId="floatingInput"
              label="Username"
              className="mb-3"
            >
              <Form.Control type="username" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>

            <Button variant="danger" className="mb-3">Accede!</Button>
            <Button variant="light" onClick={toggleSignup}>Aun no tienes cuenta?</Button>
          </Card.Body>
        </Card>
      )}
      {buttonSignup === "signup" && (
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Regístrate</Card.Title>
            <FloatingLabel
              controlId="floatingInput"
              label="Username"
              className="mb-3"
            >
              <Form.Control type="email" />
            </FloatingLabel>
             <FloatingLabel controlId="floatingPassword" label="Email" className="mb-3">
              <Form.Control type="email" placeholder="Password" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
            <Button
              variant="danger"
              className="w-100 mb-3"
              onClick={toggleSignup}
            >
              Crear
            </Button>
            <Button
              variant="secondary"
              className="w-100"
              onClick={toggleSignup}
            >
              ¿Ya tienes cuenta?
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default IdentificationBanner;
