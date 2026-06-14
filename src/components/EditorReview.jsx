import { Button, Form } from "react-bootstrap";

function EditorReview({
  title,
  setTitle,
  text,
  setText,
  score,
  setScore,
  onSubmit,
  onCancel,
}) {
  return (
    <div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--mm-navy)",
          letterSpacing: "1.2px",
          textTransform: "uppercase",
          marginBottom: "1rem",
        }}
      >
        Editar reseña
      </h3>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            placeholder="Título para tu reseña"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formText">
          <Form.Label>Comentario</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Escribe aquí tu reseña"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <Form.Label className="d-flex justify-content-between">
          <span>Puntuación</span>
          <strong>{score}⭐</strong>
        </Form.Label>
        <Form.Range
          min={1}
          max={5}
          step={1}
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
        />
        <div className="d-flex gap-2 mt-3">
          <Button variant="outline-secondary" type="button" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Guardar cambios
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EditorReview;

