import { Form, Accordion } from "react-bootstrap";

function ModalFiltrosGrupos({ familia, setFamilia, precioMax, setPrecioMax }) {
  return (
    <div>
      <Form.Select
        aria-label="Filtro tipo grupo"
        value={familia}
        onChange={(e) => setFamilia(e.target.value)}
      >
        <option value="">Todos los tipos</option>
        <option value="Banda">Banda</option>
        <option value="Charanga">Charanga</option>
        <option value="Orquesta">Orquesta</option>
        <option value="Solista">Solista</option>
      </Form.Select>

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Precio</Accordion.Header>
          <Accordion.Body>
            <Form.Label>
              Precio máximo: <strong>{precioMax}€</strong>
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

