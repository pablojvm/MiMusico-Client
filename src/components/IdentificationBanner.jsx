import { Card, Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
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
  //estados modal
  const [showSignupModal, setShowSignupModal] = useState(false);
  const toggleSignupModal = () => setShowSignupModal(!showSignupModal);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNumberChange = (e) => setNumber(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    const userCredentials = {
      username,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
        userCredentials
      );
      console.log("usuario validado", response);
      localStorage.setItem("authToken", response.data.authToken);
      await authenticateUser();
      navigate("/own-ads");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        setErrorMessage("Algo salió mal. Inténtalo de nuevo.");
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        email,
        username,
        number,
        password,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/signup`,
        newUser
      );
      toggleSignup();
      setShowSignupModal(true);
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        setErrorMessage("Algo salió mal. Inténtalo de nuevo.");
      }
    }
  };

  const toggleSignup = () => {
    setButtonSignup((prev) => (prev === "login" ? "signup" : "login"));
  };

  return (
    <div>
      {buttonSignup === "login" && (
        <Card style={{ width: "18rem" }}>
          <Card.Title>Inicia Sesión</Card.Title>
          <Card.Body>
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

              <Button variant="danger" className="w-100 mb-3" type="submit">
                Accede!
              </Button>
            </Form>
            <Button
              variant="secondary"
              className="w-100"
              onClick={toggleSignup}
            >
              Aun no tienes cuenta?
            </Button>
          </Card.Body>
        </Card>
      )}
      {buttonSignup === "signup" && (
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Regístrate</Card.Title>
            <Form onSubmit={handleSignup}>
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
                controlId="floatingNumber"
                label="Number"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  placeholder="Number"
                  value={number}
                  onChange={handleNumberChange}
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
              <Button variant="danger" className="w-100 mb-3" type="submit">
                Crear
              </Button>
            </Form>
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
      <ModalNewUser
        show={showSignupModal}
        handleClose={() => setShowSignupModal(false)}
      />
      {errorMessage && <p style={{ color: "white" }}>{errorMessage}</p>}
    </div>
  );
}

export default IdentificationBanner;
