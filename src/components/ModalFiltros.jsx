import { Form, Accordion, Card } from "react-bootstrap";

function ModalFiltros({ precioMax, setPrecioMax, marca, setMarca, estado, setEstado, familia, setFamilia}) {
  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-light">
        <h6 className="mb-0 fw-bold">Filtros</h6>
      </Card.Header>
      <Card.Body className="p-3">
        {/* Filtro de Marca */}
        <div className="mb-3" style={{ position: 'relative', zIndex: 1050 }}>
          <Form.Label className="fw-semibold small">Marca</Form.Label>
          <Form.Select 
            aria-label="Seleccionar marca" 
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            size="sm"
            style={{ position: 'relative', zIndex: 1050 }}
          >
            <option value="">Todas las Marcas</option>
            <option value="Yamaha">Yamaha</option>
            <option value="Thomann">Thomann</option>
            <option value="Stentor">Stentor</option>
            <option value="Fender">Fender</option>
            <option value="Casio">Casio</option>
            <option value="Bach">Bach</option>
            <option value="Roland">Roland</option>
          </Form.Select>
        </div>

        {/* Filtro de Precio */}
        <Accordion className="mb-3" flush>
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

        {/* Filtro de Familia */}
        <div className="mb-3" style={{ position: 'relative', zIndex: 1040 }}>
          <Form.Label className="fw-semibold small">Familia</Form.Label>
          <Form.Select 
            aria-label="Seleccionar familia" 
            value={familia} 
            onChange={(e) => setFamilia(e.target.value)}
            size="sm"
            style={{ position: 'relative', zIndex: 1040 }}
          >
            <option value="">Todas las familias</option>
            <option value="Viento Metal">Viento Metal</option>
            <option value="Viento Madera">Viento Madera</option>
            <option value="Cuerda Frotada">Cuerda Frotada</option>
            <option value="Cuerda Percutida">Cuerda Percutida</option>
            <option value="Percusión">Percusión</option>
          </Form.Select>
        </div>

        {/* Filtro de Estado */}
        <div className="mb-0" style={{ position: 'relative', zIndex: 1030 }}>
          <Form.Label className="fw-semibold small">Estado</Form.Label>
          <Form.Select 
            aria-label="Seleccionar estado" 
            value={estado} 
            onChange={(e) => setEstado(e.target.value)}
            size="sm"
            style={{ position: 'relative', zIndex: 1030 }}
          >
            <option value="">Todos los estados</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Seminuevo">Seminuevo</option>
            <option value="Bueno">Bueno</option>
            <option value="Correcto">Correcto</option>
          </Form.Select>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ModalFiltros;