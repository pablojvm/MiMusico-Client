import { useState } from "react";
import { Form, Accordion } from "react-bootstrap";

function ModalFiltrosGrupos() {
  const [precio, setPrecio] = useState(50);

  const handleChange = (e) => {
    setPrecio(e.target.value);
  };
  return (
    <div>
      <Form.Select aria-label="Default select example">
        <option>Tipo</option>
        <option value="1">Banda</option>
        <option value="2">Charanga</option>
        <option value="3">Orquesta</option>
        <option value="3">Solista</option>
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
    </div>
  );
}

export default ModalFiltrosGrupos;
