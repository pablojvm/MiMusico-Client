import { Form, Accordion } from "react-bootstrap";

function ModalFiltros({ precioMax, setPrecioMax, marca, setMarca, estado, setEstado, familia, setFamilia}) {

  return (
    <div>
      <Form.Select aria-label="Default select example" value={marca}
        onChange={(e) => setMarca(e.target.value)}>
        <option value="">Todas las Marcas</option>
        <option value="Yamaha">Yamaha</option>
        <option value="Thomann">Thomann</option>
        <option value="Stentor">Stentor</option>
        <option value="Fender">Fender</option>
        <option value="Casio">Casio</option>
        <option value="Bach">Bach</option>
        <option value="Roland">Roland</option>

      </Form.Select>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Precio</Accordion.Header>
          <Accordion.Body>
            <Form.Label>
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
      <Form.Select aria-label="Default select example" value={familia} onChange={(e) => setFamilia(e.target.value)}>
        <option value="" >Todos las familias</option>
        <option value="Viento Metal">Viento Metal</option>
        <option value="Viento Madera">Viento Madera</option>
        <option value="Cuerda Frotada">Cuerda Frotada</option>
        <option value="Cuerda Percutida">Cuerda Percutida</option>
        <option value="Percusión">Percusión</option>
      </Form.Select>
      <Form.Select aria-label="Default select example" value={estado} onChange={(e) => setEstado(e.target.value)}>
        <option value="" >Todos los estados</option>
        <option value="Nuevo">Nuevo</option>
        <option value="Seminuevo">Seminuevo</option>
        <option value="Bueno">Bueno</option>
        <option value="Correcto">Correcto</option>
      </Form.Select>
    </div>
  );
}

export default ModalFiltros;
