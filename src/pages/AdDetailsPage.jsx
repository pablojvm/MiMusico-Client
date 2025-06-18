import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BannerEditAd from "../components/BannerEditAd";
import ModalDeleteAd from "../components/ModalDeleteAd";
import { AuthContext } from "../context/auth.context";
import ModalNewReview from "../components/ModalNewReview";

function AdDetailsPage() {
  const params = useParams();
  const navigate = useNavigate();

  const { loggedUserId } = useContext(AuthContext);

  const [ad, setAd] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showNewReview, setShowNewReview] = useState(false);
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [score, setScore] = useState(1)
  const [errorMessage, setErrorMessage] = useState(null);

  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);
  const toggleEditForm = () => setShowEdit(!showEdit);
  const toggleNewReview = () => setShowNewReview(!showNewReview);

  useEffect(() => {
    getData();
    reviewsByAd();
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
      setAd(response.data)
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };

  const reviewsByAd = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/review/${params.adId}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error(error);
    }
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

  const newReview = async (e) => {
    e.preventDefault()
    const newReview = {
      title,
      text,
      score,
      creator: loggedUserId,
      ad: ad._id,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/review`, newReview
      )
      await reviewsByAd();
    setShowNewReview(false);
    setTitle(""); // <-- opcional: limpiar el formulario
    setText("");
    setScore(1);
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.errorMessage)
    }
  };

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
              {ad.owner._id == loggedUserId && (
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
      {ad.type === "service" && (
        <div>
          <div
            style={{
              width: "900px",
              height: "400px",
              backgroundColor: "white",
            }}
          >
            <p>Caja de comentarios</p>
            {reviews.length === 0 && (
              <h1>Aun no hay comentarios sobre este grupo</h1>
            )}
            {reviews.map((eachReview) => (
              <Card>
                <Card.Header>{eachReview.title}</Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p>{eachReview.text}</p>
                    <footer className="blockquote-footer">
                      {"⭐".repeat(eachReview.score)}
                      <cite title="Source Title"></cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Card>
            ))}
          </div>
          <Button variant="outline-primary" onClick={toggleNewReview}>
            Añadir Comentario
          </Button>
          {showNewReview && <ModalNewReview newReview={newReview} title={title} setTitle={setTitle} text={text} setText={setText} score={score} setScore={setScore}/>}
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      )}
      
    </div>
  );
}

export default AdDetailsPage;
