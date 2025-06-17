import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import ModalDeleteUser from "../components/ModalDeleteUser";

function ProfilePage() {
  const navigate = useNavigate();

  const { loggedUserId } = useContext(AuthContext);

  const [showEdit, setShowEdit] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});

  const toggleEditForm = () => {
    setShowEdit(!showEdit);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfileInfo(response.data);
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };

  const [username, setUsername] = useState(profileInfo.username);
  const [email, setEmail] = useState(profileInfo.email);
  const [number, setNumber] = useState(profileInfo.number);

  useEffect(() => {
    if (profileInfo) {
      setUsername(profileInfo.username || "");
      setEmail(profileInfo.email || "");
      setNumber(profileInfo.number || "");
    }
  }, [profileInfo]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      username,
      email,
      number,
    };
    await handleUpdate(updatedData);
    await getData();
    setShowEdit(false);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/user/profile`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfileInfo(response.data);
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };

  if (!loggedUserId) {
    return <p>Cargando información</p>;
  }

  return (
    <div>
      <div
        style={{
          backgroundColor: "white",
          width: "90vw",
          height: "450px",
          borderRadius: "20px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1>Mi cuenta</h1>
        <div>
          <img src={profileInfo.photo} width="150px" alt="foto de perfil" />
          <h3>{profileInfo.username}</h3>
        </div>
        <h4>Email</h4>
        <p>{profileInfo.email}</p>
        <h4>Number</h4>
        <p>{profileInfo.number}</p>
        <Button variant="primary" onClick={toggleEditForm}>
          Editar
        </Button>
        <Button variant="outline-danger" className="ms-3" onClick={toggleDeleteModal}>
          Borrar Usuario
        </Button>
      </div>
      {showEdit === true && (
        <div
          style={{
            backgroundColor: "white",
            width: "90vw",
            height: "40vh",
            borderRadius: "20px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            marginTop: "20px",
          }}
        >
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Form.Group>

            <Button variant="danger" onClick={toggleEditForm}>
              Close
            </Button>
            <Button variant="primary" className="ms-3" type="submit">
              Submit
            </Button>
          </Form>
          
        </div>
      )}
      <ModalDeleteUser
            show={showDeleteModal}
            handleClose={toggleDeleteModal}
            handleDelete={handleDelete}
          />
    </div>
  );
}

export default ProfilePage;
