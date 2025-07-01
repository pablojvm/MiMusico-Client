import service from "../services/service.config";
import { useEffect, useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
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
      const response = await service.get(`/user/profile`);
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
      const response = await service.patch(`/user/profile`, updatedData);
      setProfileInfo(response.data);
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await service.delete(`/user/profile`);
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
      const response = await service.post(`/upload`, uploadData);
      setImageUrl(response.data.imageUrl);
      setIsUploading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (!profileInfo) {
    return (
      <div className="loading-container">
        <img src="/animatedviolin.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <Container fluid className="profile-container">
      <Row className="justify-content-center">
        <Col xs={12} lg={10} xl={8}>
          <Card className="profile-card">
            <Card.Body>
              <h1 className="profile-title">Mi cuenta</h1>
              
              <Row className="profile-content">
                <Col xs={12} md={6} lg={4} className="profile-image-col">
                  <div className="profile-image-container">
                    <img
                      src={profileInfo.photo}
                      alt="foto de perfil"
                      className="profile-image"
                    />
                  </div>
                </Col>
                
                <Col xs={12} md={6} lg={5} className="profile-info-col">
                  <div className="profile-info">
                    <h3 className="username">{profileInfo.username}</h3>
                    <div className="info-section">
                      <h4>Email</h4>
                      <p>{profileInfo.email}</p>
                    </div>
                    <div className="info-section">
                      <h4>Number</h4>
                      <p>{profileInfo.number}</p>
                    </div>
                    <div className="button-group">
                      <Button variant="primary" onClick={toggleEditForm} className="mb-2 me-2">
                        Editar
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={toggleDeleteModal}
                        className="mb-2"
                      >
                        Borrar Usuario
                      </Button>
                    </div>
                  </div>
                </Col>
                
                <Col xs={12} lg={3} className="profile-decoration-col">
                  {!showEdit && (
                    <div className="decoration-image">
                      <img src="/pajaro.png" alt="Decoración" className="bird-image" />
                    </div>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {showEdit && (
            <Card className="edit-card mt-4">
              <Card.Body>
                <h3 className="mb-4">Editar Perfil</h3>
                <Form onSubmit={handleFormSubmit}>
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Foto</Form.Label>
                        <Form.Control
                          type="file"
                          onChange={handleFileUpload}
                          disabled={isUploading}
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control
                          type="text"
                          value={username || ''}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={email || ''}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Número</Form.Label>
                        <Form.Control
                          type="text"
                          value={number || ''}
                          onChange={(e) => setNumber(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <div className="form-buttons">
                    <Button variant="danger" onClick={toggleEditForm} className="me-2">
                      Cerrar
                    </Button>
                    <Button variant="primary" type="submit" disabled={isUploading}>
                      {isUploading ? 'Guardando...' : 'Guardar'}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      <ModalDeleteUser
        show={showDeleteModal}
        handleClose={toggleDeleteModal}
        handleDelete={handleDelete}
      />
    </Container>
  );
}

export default ProfilePage;