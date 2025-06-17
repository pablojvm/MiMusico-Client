import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ModalDeleteUser from "../components/ModalDeleteUser";

function ProfilePage() {
  const navigate = useNavigate();

  const [showEdit, setShowEdit] = useState(false);
  const [profileInfo, setProfileInfo] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [number, setNumber] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const toggleEditForm = () => {
    setShowEdit(!showEdit);
  };

  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

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
      setEmail(response.data.email);
      setNumber(response.data.number);
      setUsername(response.data.username);
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      username,
      email,
      number,
      photo: imageUrl,
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

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }
    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/upload`,
        uploadData
      );
      setImageUrl(response.data.imageUrl);
      setIsUploading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (!profileInfo) {
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
        <Button
          variant="outline-danger"
          className="ms-3"
          onClick={toggleDeleteModal}
        >
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
              <Form.Label>Foto</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
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
