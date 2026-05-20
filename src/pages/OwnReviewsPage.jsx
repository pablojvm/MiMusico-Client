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
      const response = await service.get(`/review/own`);
      setReviews(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarReview = async (reviewId) => {
    try {
      await service.delete(`/review/${reviewId}`);
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
    return <img src="/animatedviolin.gif" alt="Cargando..." />;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { title, text, score };
    if (selectedReview) {
      await updateData(selectedReview._id, updatedData);
    }
  };

  return (
    <div className="own-reviews-page">
      <h1 className="page-title text-center mb-4">Mis Comentarios</h1>
      {reviews.length === 0 ? (
        <div className="empty-state text-center">
          <img
            src="/coincidences.png"
            alt="Sin comentarios"
            style={{ maxWidth: 280, width: "100%" }}
          />
          <h2 className="mt-3 text-muted">Aún no creaste ningún comentario</h2>
        </div>
      ) : (
        <div className="reviews-grid">
          {reviews.map((eachReview) => (
            <Card key={eachReview._id} className="own-review-card mb-3">
              <Card.Body
                as={Link}
                to={`/ad/${eachReview.ad?._id ?? ""}`}
                className="text-decoration-none text-reset"
              >
                <Card.Title>{eachReview.title}</Card.Title>
                <blockquote className="blockquote mb-0">
                  <p>{eachReview.text}</p>
                  <footer className="blockquote-footer">
                    {"⭐".repeat(eachReview.score)}
                  </footer>
                </blockquote>
              </Card.Body>
              <div className="own-review-actions">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => {
                    setSelectedReview(eachReview);
                    setModalEliminar(true);
                  }}
                >
                  Borrar
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
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
              onSubmit={handleFormSubmit}
              onCancel={cerrarEditor}
            />
          )}

          {modalEliminar && (
            <ModalEliminarReview
              eliminarReview={eliminarReview}
              review={selectedReview}
              toggleModalEliminar={() => setModalEliminar(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default OwnReviewsPage;
