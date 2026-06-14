import service from "../services/service.config";
import { useEffect, useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ModalDeleteUser from "../components/ModalDeleteUser";

function ProfilePage() {
  const navigate = useNavigate();

  const [showEdit, setShowEdit] = useState(false);
  const [profileInfo, setProfileInfo] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleEditForm = () => {
    setShowEdit(!showEdit);
  };

  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

  const getData = async () => {
    try {
      const response = await service.get(`/user/profile`);
      setProfileInfo(response.data);
      setEmail(response.data.email || "");
      setNumber(response.data.number || "");
      setUsername(response.data.username || "");
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
      photo: imageUrl || profileInfo?.photo,
    };
    await handleUpdate(updatedData);
    await getData();
    setShowEdit(false);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await service.patch(`/user/profile`, updatedData);
      setProfileInfo(response.data);
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };

  const handleDelete = async () => {
    try {
      await service.delete(`/user/profile`);
      localStorage.removeItem("authToken");
      navigate("/");
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) return;
    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);
    try {
      const response = await service.post(`/upload`, uploadData);
      setImageUrl(response.data.imageUrl);
    } catch {
      navigate("/500");
    } finally {
      setIsUploading(false);
    }
  };

  if (!profileInfo) {
    return (
      <div className="loading-container">
        <img src="/animatedviolin.gif" alt="Cargando..." />
      </div>
    );
  }

  return (
    <Container fluid className="profile-container page-fade">
      <Row className="justify-content-center">
        <Col xs={12} lg={10} xl={9}>
          <div className="profile-hero">
            <img
              src={profileInfo.photo}
              alt="foto de perfil"
              className="profile-hero-avatar"
            />
            <div className="profile-hero-text">
              <span className="profile-hero-eyebrow">Mi cuenta</span>
              <h1 className="profile-hero-name">{profileInfo.username}</h1>
              <p className="profile-hero-meta">
                Miembro de la comunidad MiMusico
              </p>
            </div>
          </div>

          <Card className="profile-card">
            <Card.Body className="p-4 p-md-5">
              <div className="info-grid">
                <div className="info-section">
                  <h4>Email</h4>
                  <p>{profileInfo.email}</p>
                </div>
                <div className="info-section">
                  <h4>Teléfono</h4>
                  <p>{profileInfo.number || "—"}</p>
                </div>
                <div className="info-section">
                  <h4>Usuario</h4>
                  <p>@{profileInfo.username}</p>
                </div>
              </div>

              <div className="button-group">
                <Button
                  variant="primary"
                  onClick={toggleEditForm}
                  className="me-2"
                >
                  {showEdit ? "Cerrar edición" : "Editar perfil"}
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={toggleDeleteModal}
                >
                  Borrar cuenta
                </Button>
              </div>
            </Card.Body>
          </Card>

          {showEdit && (
            <Card className="edit-card mt-4">
              <Card.Body className="p-4">
                <h3 className="mb-4">Editar perfil</h3>
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
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Número</Form.Label>
                        <Form.Control
                          type="text"
                          value={number}
                          onChange={(e) => setNumber(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="form-buttons">
                    <Button
                      variant="outline-secondary"
                      onClick={toggleEditForm}
                      className="me-2"
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isUploading}
                    >
                      {isUploading ? "Guardando..." : "Guardar cambios"}
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
