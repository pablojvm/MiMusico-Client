import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BannerEditAd from "../components/BannerEditAd";
import ModalDeleteAd from "../components/ModalDeleteAd";
import { AuthContext } from "../context/auth.context";

function AdDetailsPage() {
  const params = useParams();
  const navigate = useNavigate();

  const { loggedUserId } = useContext(AuthContext);

  const [ad, setAd] = useState(null);

  useEffect(() => {
    getData();
  }, [params.adId]);

  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/ad/${params.adId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAd(response.data);
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };
  const [showEdit, setShowEdit] = useState(false);
  const toggleEditForm = () => {
    setShowEdit(!showEdit);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/ad/${params.adId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("authToken");
      navigate("/own-ads");
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

  if (!ad) {
    return <p>Cargando información...</p>;
  }
  return (
    <div>
      <h1>Detalles del anuncio</h1>
      {ad.type === "instrument" && (
        <div>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={ad.photos[0]} />
            <Card.Body>
              <Card.Title>{ad.title}</Card.Title>
              <Card.Text>Marca: {ad.brand}</Card.Text>
              <Card.Text>Modelo: {ad.model}</Card.Text>
              <Card.Text>Estado: {ad.state}</Card.Text>
              <Card.Text>Precio: {ad.cost}</Card.Text>
              <Card.Text>Descripción: {ad.description}</Card.Text>
              {ad.owner == loggedUserId && (
                <div>
                  <Button variant="danger" onClick={toggleDeleteModal}>
                    Borrar
                  </Button>
                  <Button variant="primary" onClick={toggleEditForm}>
                    Edit Info
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      )}
      {ad.type === "service" && (
        <div>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={ad.photos[0]} />
            <Card.Body>
              <Card.Title>{ad.title}</Card.Title>
              <Card.Text>Tipo de Grupo: {ad.brand}</Card.Text>
              <Card.Text>Precio por hora: {ad.cost}</Card.Text>
              <Card.Text>Descripción:{ad.description}</Card.Text>
              <Button variant="danger" onClick={toggleDeleteModal}>
                Borrar
              </Button>
              <Button variant="primary" onClick={toggleEditForm}>
                Edit Info
              </Button>
            </Card.Body>
          </Card>
        </div>
      )}
      {showEdit && (
        <BannerEditAd ad={ad} onUpdate={getData} onClose={toggleEditForm} />
      )}
      <ModalDeleteAd
        show={showDeleteModal}
        handleClose={toggleDeleteModal}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default AdDetailsPage;
