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

  const { loggedUserId, isLoggedIn } = useContext(AuthContext);

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
  const toggleNewReview = () => {
    if (!isLoggedIn) {
      alert("Debes estar logueado para dejar una reseña.");
      return;
    }
    setShowNewReview(prev => !prev);
  };

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
    <div className="container-fluid px-2 px-md-4">
      <h1 className="text-center text-md-start mb-4">Detalles del anuncio</h1>
      
      {ad.type === "instrument" && (
        <div className="d-flex justify-content-center mb-4">
          <Card
            style={{
              borderRadius: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              width: "100%",
              maxWidth: "900px"
            }}
            className="flex-column flex-md-row"
          >
            <Card.Img
              variant="top"
              src={ad.photos[0]}
              style={{
                border: "5px solid rgb(68, 82, 102)",
                borderRadius: "10px",
                objectFit: "cover"
              }}
              className="w-100 w-md-auto"
              css={`
                @media (min-width: 768px) {
                  width: 300px !important;
                  height: auto;
                }
                @media (max-width: 767px) {
                  height: 250px;
                }
              `}
            />
            <Card.Body className="flex-grow-1">
              <Card.Title className="h4 h3-md">{ad.title}</Card.Title>
              <Card.Text><strong>Marca:</strong> {ad.brand}</Card.Text>
              <Card.Text><strong>Modelo:</strong> {ad.model}</Card.Text>
              <Card.Text><strong>Estado:</strong> {ad.state}</Card.Text>
              <Card.Text><strong>Precio:</strong> {ad.cost}€</Card.Text>
              <Card.Text><strong>Descripción:</strong> {ad.description}</Card.Text>
              <Card.Title className="h5 mt-3">Datos de Contacto</Card.Title>
              <Card.Text><strong>Teléfono:</strong> {ad.owner.number}</Card.Text>
              
              {ad.owner._id == loggedUserId && (
                <div className="d-flex flex-column flex-sm-row gap-2 mt-3">
                  <Button variant="danger" onClick={toggleDeleteModal} className="flex-fill">
                    Borrar
                  </Button>
                  <Button variant="primary" onClick={toggleEditForm} className="flex-fill">
                    Edit Info
                  </Button>
                </div>
              )}
              
              {ad.owner._id !== loggedUserId && (
                <div className="mt-3">
                  {showPaymentIntent === false ? (
                    <button 
                      className="btn btn-success w-100 w-sm-auto"
                      onClick={() => setShowPaymentIntent(true)}
                    >
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
        <div className="d-flex justify-content-center mb-4">
          <Card
            style={{
              borderRadius: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              width: "100%",
              maxWidth: "900px"
            }}
            className="flex-column flex-md-row"
          >
            <Card.Img
              variant="top"
              src={ad.photos[0]}
              style={{
                border: "5px solid rgb(68, 82, 102)",
                borderRadius: "10px",
                objectFit: "cover"
              }}
              className="w-100 w-md-auto"
              css={`
                @media (min-width: 768px) {
                  width: 300px !important;
                  height: auto;
                }
                @media (max-width: 767px) {
                  height: 250px;
                }
              `}
            />
            <Card.Body className="flex-grow-1">
              <Card.Title className="h4 h3-md">{ad.title}</Card.Title>
              <Card.Text><strong>Tipo de Grupo:</strong> {ad.family}</Card.Text>
              <Card.Text><strong>Precio por hora:</strong> {ad.cost}</Card.Text>
              <Card.Text><strong>Descripción:</strong> {ad.description}</Card.Text>
              <Card.Title className="h5 mt-3">Datos de Contacto</Card.Title>
              <Card.Text><strong>Teléfono:</strong> {ad.owner.number}</Card.Text>
              
              {ad.owner._id == loggedUserId && (
                <div className="d-flex flex-column flex-sm-row gap-2 mt-3">
                  <Button variant="danger" onClick={toggleDeleteModal} className="flex-fill">
                    Borrar
                  </Button>
                  <Button variant="primary" onClick={toggleEditForm} className="flex-fill">
                    Edit Info
                  </Button>
                </div>
              )}
              
              {ad.owner._id !== loggedUserId && (
                <div className="mt-3">
                  {showPaymentIntent === false ? (
                    <button 
                      className="btn btn-success w-100 w-sm-auto"
                      onClick={() => setShowPaymentIntent(true)}
                    >
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

      {showEdit && (
        <BannerEditAd ad={ad} onUpdate={getData} onClose={toggleEditForm} />
      )}
      
      <ModalDeleteAd
        show={showDeleteModal}
        handleClose={toggleDeleteModal}
        handleDelete={handleDelete}
      />

      {ad.type === "service" && (
        <div className="d-flex justify-content-center">
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
              maxWidth: "900px",
              width: "100%",
              minHeight: "400px"
            }}
          >
            <h3 className="text-center mb-3">Caja de comentarios</h3>
            
            <div className="w-100 flex-grow-1 overflow-auto" style={{ maxHeight: "300px" }}>
              {reviews.length === 0 && (
                <h4 className="text-center text-muted py-4">
                  Aún no hay comentarios sobre este grupo
                </h4>
              )}
              
              {reviews.map((eachReview, index) => (
                <Card key={index} className="mb-3">
                  <Card.Header className="bg-light">
                    <strong>{eachReview.title}</strong>
                  </Card.Header>
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p className="mb-2">{eachReview.text}</p>
                      <p className="mb-2 fs-5">{"⭐".repeat(eachReview.score)}</p>
                      <footer className="blockquote-footer">
                        <strong>{eachReview.creator.username}</strong>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Card>
              ))}
            </div>
            
            <Button
              style={{ marginTop: "15px" }}
              className="w-100 w-sm-50 w-md-25"
              variant="outline-primary"
              onClick={toggleNewReview}
            >
              {showNewReview === false ? "Añadir Comentario" : "Cerrar"}
            </Button>
          </div>
        </div>
      )}

      {showNewReview && (
        <div className="d-flex justify-content-center mt-3">
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              width: "100%",
              maxWidth: "900px"
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
        </div>
      )}
      
      {errorMessage && (
        <div className="alert alert-danger mt-3 text-center">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default AdDetailsPage;