import service from "../services/service.config";
import { useContext, useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BannerEditAd from "../components/BannerEditAd";
import ModalDeleteAd from "../components/ModalDeleteAd";
import { AuthContext } from "../context/auth.context";
import ModalNewReview from "../components/ModalNewReview";
import PaymentIntent from "../components/PaymentIntent";

function AdDetailsPage() {
  const params = useParams();
  const navigate = useNavigate();

  const { loggedUserId } = useContext(AuthContext);

  const [ad, setAd] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showNewReview, setShowNewReview] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [score, setScore] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPaymentIntent, setShowPaymentIntent] = useState(false);

  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);
  const toggleEditForm = () => setShowEdit(!showEdit);
  const toggleNewReview = () => setShowNewReview(!showNewReview);

  useEffect(() => {
    getData();
    reviewsByAd();
  }, [params.adId]);

  const getData = async () => {
    try {
      const response = await service.get(`/ad/${params.adId}`);
      setAd(response.data);
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };

  const reviewsByAd = async () => {
    try {
      const response = await service.get(`/review/${params.adId}`);
      setReviews(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/ad/${params.adId}`);
      localStorage.removeItem("authToken");
      navigate("/own-ads");
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };

  const newReview = async (e) => {
    e.preventDefault();
    const newReview = {
      title,
      text,
      score,
      creator: loggedUserId,
      ad: ad._id,
    };

    try {
      const response = await service.post(`/review`, newReview);
      await reviewsByAd();
      setShowNewReview(false);
      setTitle("");
      setText("");
      setScore(1);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.errorMessage);
    }
  };

  if (!ad) {
    return <img src="/animatedviolin.gif" />;
  }
  return (
    <div>
      <h1 style={{ marginTop: "70px" }}>Detalles del anuncio</h1>
      {ad.type === "instrument" && (
        <div>
          <Card
            style={{
              display: "flex",
              flexDirection: "row",
              borderRadius: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Card.Img
              variant="top"
              src={ad.photos[0]}
              style={{
                width: "300px",
                border: "5px solid rgb(68, 82, 102)",
                borderRadius: "10px",
              }}
            />
            <Card.Body>
              <Card.Title>{ad.title}</Card.Title>
              <Card.Text>Marca: {ad.brand}</Card.Text>
              <Card.Text>Modelo: {ad.model}</Card.Text>
              <Card.Text>Estado: {ad.state}</Card.Text>
              <Card.Text>Precio: {ad.cost}</Card.Text>
              <Card.Text>Descripción: {ad.description}</Card.Text>
              <Card.Title>Datos de Contacto</Card.Title>
              <Card.Text>Telefono: {ad.owner.number}</Card.Text>
              {ad.owner._id == loggedUserId && (
                <div>
                  <Button variant="danger" onClick={toggleDeleteModal}>
                    Borrar
                  </Button>
                  <Button variant="primary" className="ml-3" onClick={toggleEditForm}>
                    Edit Info
                  </Button>
                </div>
              )}
              {ad.owner._id !== loggedUserId && (
                <div>
                    {showPaymentIntent === false ? (
                      <button onClick={() => setShowPaymentIntent(true)}>
                        Iniciar Pago
                      </button>
                    ) : (
                      <PaymentIntent ad={ad} />
                    )}
                  </div>
              )}
            </Card.Body>
          </Card>
        </div>
      )}
      {ad.type === "service" && (
        <div>
          <Card
            style={{
              display: "flex",
              flexDirection: "row",
              borderRadius: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Card.Img
              variant="top"
              src={ad.photos[0]}
              style={{
                width: "300px",
                border: "5px solid rgb(68, 82, 102)",
                borderRadius: "10px",
              }}
            />
            <Card.Body>
              <Card.Title>{ad.title}</Card.Title>
              <Card.Text>Tipo de Grupo: {ad.brand}</Card.Text>
              <Card.Text>Precio por hora: {ad.cost}</Card.Text>
              <Card.Text>Descripción:{ad.description}</Card.Text>
              <Card.Title>Datos de Contacto</Card.Title>
              <Card.Text>Telefono: {ad.owner.number}</Card.Text>
              {ad.owner._id == loggedUserId && (
                <div>
                  <Button variant="danger" onClick={toggleDeleteModal}>
                    Borrar
                  </Button>
                  <Button variant="primary" className="mt-2" onClick={toggleEditForm}>
                    Edit Info
                  </Button>
                </div>
              )}
              {ad.owner._id !== loggedUserId && (
                <div>
                    {showPaymentIntent === false ? (
                      <button onClick={() => setShowPaymentIntent(true)}>
                        Iniciar Pago
                      </button>
                    ) : (
                      <PaymentIntent ad={ad} />
                    )}
                  </div>
              )}
            </Card.Body>
            <Card.Body></Card.Body>
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
              borderRadius: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ marginTop: "5px" }}>Caja de comentarios</h3>
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
            <Button
              style={{ marginBottom: "10px", width: "25%" }}
              variant="outline-primary"
              onClick={toggleNewReview}
            >{showNewReview === false ? <p>Añadir Comentario</p> : <p>Cerrar</p>}
            </Button>
          </div>

          {showNewReview && (
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "20px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                marginTop: "10px",
              }}
            >
              <ModalNewReview
                newReview={newReview}
                title={title}
                setTitle={setTitle}
                text={text}
                setText={setText}
                score={score}
                setScore={setScore}
              />
            </div>
          )}
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      )}
    </div>
  );
}

export default AdDetailsPage;
