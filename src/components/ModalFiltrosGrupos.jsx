import { Form, Accordion } from "react-bootstrap";

function ModalFiltrosGrupos({tipo, setTipo, precioMax, setPrecioMax}) {

  return (
    <div>
      <Form.Select aria-label="Default select example" value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="">Todos los tipos</option>
        <option value="Banda">Banda</option>
        <option value="Charanga">Charanga</option>
        <option value="Orquesta">Orquesta</option>
        <option value="Solista">Solista</option>
      </Form.Select>
      <Accordion>
        <Accordion.Item eventKey="0" >
          <Accordion.Header>Precio</Accordion.Header>
          <Accordion.Body>
            <Form.Label >
              Precio maximo: <strong>{precioMax}€</strong>
            </Form.Label>
            <Form.Range
              min={50}
              max={5000}
              step={50}
              value={precioMax}
              onChange={(e) => setPrecioMax(Number(e.target.value))}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default ModalFiltrosGrupos;
