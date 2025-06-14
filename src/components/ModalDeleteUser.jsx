import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalDeleteUser({ show, handleClose, handleDelete }) {
  const handleConfirmDelete = () => {
    handleDelete();
    handleClose();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Estas seguro de que quieres eliminar tu usuario?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Una vez eliminado no podrás recuperar el perfil. Siempre podrás crear
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
    </>
  );
}

export default ModalDeleteUser;
