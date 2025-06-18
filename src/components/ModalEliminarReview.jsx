import { Button, Modal } from 'react-bootstrap';

function ModalEliminarReview({ toggleModalEliminar, eliminarReview, review }) {

  const handleDelete = () => {
    if (review && review._id) {
      eliminarReview(review._id); // pasamos el ID correcto
      toggleModalEliminar()
    } else {
      console.warn("No hay review seleccionada para eliminar.");
    }
  };

  return (
    <Modal show={true} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>¿Estás seguro de que quieres borrar el comentario?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        No podrás recuperar el comentario si lo borras. Siempre podrás dejar otro comentario.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModalEliminar}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Borrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEliminarReview;

