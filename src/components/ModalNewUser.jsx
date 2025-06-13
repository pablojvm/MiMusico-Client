import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalNewUser({show, handleClose}) {
  return (
    <>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Usuario Creado con Exito!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Ahora solo tendrás que hacer el proceso de LogIn. Clicka el botón de Accede y estarás listo!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>Entendido</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalNewUser;