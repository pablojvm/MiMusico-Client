import { useContext, useEffect, useState } from "react";
import service from "../services/service.config";
import { Button, Card } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";
import ModalEliminarReview from "../components/ModalEliminarReview";
import EditorReview from "../components/EditorReview";
import { Link } from "react-router-dom";

function OwnReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const { loggedUserId } = useContext(AuthContext);
  const [showEditor, setShowEditor] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  // Estados para editar la review
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [score, setScore] = useState(1);

  useEffect(() => {
    if (loggedUserId) {
      reviewsByCreator();
    }
  }, [loggedUserId]);

  const reviewsByCreator = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await service.get(`/review/own`);
      setReviews(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarReview = async (reviewId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/review/${reviewId}`);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      setModalEliminar(false);
    } catch (error) {
      console.error(error);
    }
  };

  const abrirEditor = (review) => {
    setSelectedReview(review);
    setTitle(review.title);
    setText(review.text);
    setScore(review.score);
    setShowEditor(true);
  };

  const cerrarEditor = () => {
    setShowEditor(false);
    setSelectedReview(null);
    setTitle("");
    setText("");
    setScore(1);
  };

  const updateData = async (reviewId, updatedReview) => {
    try {
      await service.patch(`/review/${reviewId}`, updatedReview);
      await reviewsByCreator();
      cerrarEditor();
    } catch (error) {
      console.error(error);
    }
  };

  if (!reviews) {
    return <img src="/animatedviolin.gif"/>;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { title, text, score };
    if (selectedReview) {
      await updateData(selectedReview._id, updatedData);
    }
  };

  return (
    <div>
      <h1>Mis Comentarios</h1>
      {reviews.length === 0 ? (
        <h2>Aún no creaste ningún comentario</h2>
      ) : (
        <>
          {reviews.map((eachReview) => (
            <Card style={{textDecoration:"none"}} as={Link} to={`/ad/${eachReview.ad._id}`} key={eachReview._id} className="mb-3">
              <Card.Header>{eachReview.title}</Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>{eachReview.text}</p>
                  <footer className="blockquote-footer">
                    {"⭐".repeat(eachReview.score)}
                  </footer>
                </blockquote>
              </Card.Body>
              <div>
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    setSelectedReview(eachReview);
                    setModalEliminar(true);
                  }}
                >
                  Borrar
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => abrirEditor(eachReview)}
                >
                  Editar
                </Button>
              </div>
            </Card>
          ))}

          {showEditor && (
            <EditorReview
              title={title}
              setTitle={setTitle}
              text={text}
              setText={setText}
              score={score}
              setScore={setScore}
              onSubmit={handleFormSubmit} // Pasamos el handler para submit
              onCancel={cerrarEditor} // Opción para cerrar editor sin guardar
            />
          )}

          {modalEliminar && (
            <ModalEliminarReview
              eliminarReview={eliminarReview}
              review={selectedReview}
              toggleModalEliminar={() => setModalEliminar(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default OwnReviewsPage;

