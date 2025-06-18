import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";
import ModalEliminarReview from "../components/ModalEliminarReview";
import EditorReview from "../components/EditorReview";

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
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/review/own`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReviews(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarReview = async (reviewId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/review/${reviewId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Filtra la review eliminada del estado
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      setModalEliminar(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Abre el editor con la review seleccionada cargada
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

  // Actualiza la review en backend
  const updateData = async (reviewId, updatedReview) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/review/${reviewId}`,
        updatedReview,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Refresca las reviews para mostrar cambios
      await reviewsByCreator();
      cerrarEditor();
    } catch (error) {
      console.error(error);
    }
  };

  // Manejador submit que pasa datos a updateData
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
            <Card key={eachReview._id} className="mb-3">
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

