import { Card, Button, FloatingLabel, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";
import ModalNewUser from "./ModalNewUser";

function IdentificationBanner() {
  const navigate = useNavigate();

  const { authenticateUser } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [buttonSignup, setButtonSignup] = useState("login");
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNumberChange = (e) => setNumber(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const userCredentials = {
      username,
      password,
    };

    try {
      const response = await service.post(`/auth/login`, userCredentials);
      localStorage.setItem("authToken", response.data.authToken);
      await authenticateUser();
      navigate("/own-ads");
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        setErrorMessage("Algo salió mal. Inténtalo de nuevo.");
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const newUser = {
        email,
        username,
        number,
        password,
      };
      await service.post(`/auth/signup`, newUser);
      toggleSignup();
      setShowSignupModal(true);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        setErrorMessage("Algo salió mal. Inténtalo de nuevo.");
      }
    }
  };

  const toggleSignup = () => {
    setErrorMessage(null);
    setButtonSignup((prev) => (prev === "login" ? "signup" : "login"));
  };

  return (
    <div className="identification-banner">
      {buttonSignup === "login" && (
        <Card className="identification-card">
          <Card.Body>
            <Card.Title className="identification-title">
              Inicia sesión
            </Card.Title>
            <Form onSubmit={handleLogin}>
              <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </FloatingLabel>

              <Button variant="primary" className="w-100 mb-3" type="submit">
                Accede
              </Button>
            </Form>
            <Button
              variant="outline-secondary"
              className="w-100"
              onClick={toggleSignup}
            >
              ¿Aún no tienes cuenta?
            </Button>
          </Card.Body>
        </Card>
      )}
      {buttonSignup === "signup" && (
        <Card className="identification-card">
          <Card.Body>
            <Card.Title className="identification-title">Regístrate</Card.Title>
            <Form onSubmit={handleSignup}>
              <FloatingLabel
                controlId="signupUsername"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="signupEmail"
                label="Email"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="signupNumber"
                label="Número"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  placeholder="Número"
                  value={number}
                  onChange={handleNumberChange}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="signupPassword"
                label="Password"
                className="mb-2"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </FloatingLabel>
              <small
                className="text-muted d-block mb-3"
                style={{ fontSize: "0.78rem", lineHeight: 1.4 }}
              >
                8–16 caracteres, al menos un número y un carácter especial
                (!@#$%^&*).
              </small>
              <Button variant="primary" className="w-100 mb-3" type="submit">
                Crear cuenta
              </Button>
            </Form>
            <Button
              variant="outline-secondary"
              className="w-100"
              onClick={toggleSignup}
            >
              ¿Ya tienes cuenta?
            </Button>
          </Card.Body>
        </Card>
      )}
      <ModalNewUser
        show={showSignupModal}
        handleClose={() => setShowSignupModal(false)}
      />
      {errorMessage && (
        <p className="identification-error">{errorMessage}</p>
      )}
    </div>
  );
}

export default IdentificationBanner;
