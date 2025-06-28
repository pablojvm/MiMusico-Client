import { Form, Accordion, Card } from "react-bootstrap";

function ModalFiltrosGrupos({ familia, setFamilia, precioMax, setPrecioMax }) {
  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-light">
        <h6 className="mb-0 fw-bold">Filtros</h6>
      </Card.Header>
      <Card.Body className="p-3">
        {/* Filtro de Tipo de Grupo */}
        <div className="mb-3" style={{ position: 'relative', zIndex: 1050 }}>
          <Form.Label className="fw-semibold small">Tipo de Grupo</Form.Label>
          <Form.Select
            aria-label="Filtro tipo grupo"
            value={familia}
            onChange={(e) => setFamilia(e.target.value)}
            size="sm"
            style={{ position: 'relative', zIndex: 1050 }}
          >
            <option value="">Todos los tipos</option>
            <option value="Banda">Banda</option>
            <option value="Charanga">Charanga</option>
            <option value="Orquesta">Orquesta</option>
            <option value="Solista">Solista</option>
          </Form.Select>
        </div>

        {/* Filtro de Precio */}
        <Accordion className="mb-0" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <span className="fw-semibold small">Precio</span>
            </Accordion.Header>
            <Accordion.Body className="px-0 pb-2">
              <Form.Label className="small mb-2">
                Precio máximo: <strong className="text-primary">{precioMax}€</strong>
              </Form.Label>
              <Form.Range
                min={50}
                max={5000}
                step={50}
                value={precioMax}
                onChange={(e) => setPrecioMax(Number(e.target.value))}
                className="mb-2"
              />
              <div className="d-flex justify-content-between small text-muted">
                <span>50€</span>
                <span>5000€</span>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card.Body>
    </Card>
  );
}

export default ModalFiltrosGrupos;