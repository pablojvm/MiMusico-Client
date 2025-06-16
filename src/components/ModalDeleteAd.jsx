import { Button, Modal } from "react-bootstrap";

function ModalDeleteAd({ show, handleClose, handleDelete }) {
  const handleConfirmDelete = () => {
    handleDelete();
    handleClose();
  };
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Estas seguro de que quieres eliminar tu anuncio
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Una vez eliminado no podrás recuperarlo. Siempre podrás crear
          uno nuevo.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalDeleteAd;
