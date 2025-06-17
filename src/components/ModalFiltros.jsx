import { useState } from "react";
import { Form, Accordion } from "react-bootstrap";

function ModalFiltros() {
  const [precio, setPrecio] = useState(50);

  const handleChange = (e) => {
    setPrecio(e.target.value);
  };
  return (
    <div>
      <Form.Select aria-label="Default select example">
        <option>Marca</option>
        <option value="1">Yamaha</option>
        <option value="2">Thoman</option>
        <option value="3">Stentor</option>
      </Form.Select>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Precio</Accordion.Header>
          <Accordion.Body>
            <Form.Label>
              Precio maximo: <strong>{precio}€</strong>
            </Form.Label>
            <Form.Range
              min={50}
              max={5000}
              step={50}
              value={precio}
              onChange={handleChange}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Form.Select aria-label="Default select example">
        <option>Estado</option>
        <option value="Nuevo">Nuevo</option>
        <option value="2">Seminuevo</option>
        <option value="3">Bueno</option>
        <option value="3">Correcto</option>
      </Form.Select>
    </div>
  );
}

export default ModalFiltros;
