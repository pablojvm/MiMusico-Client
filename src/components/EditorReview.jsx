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
            placeholder="Escribe aquí tu reseña"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <Form.Label>
          Score: <strong>{score}⭐</strong>
        </Form.Label>
        <Form.Range
          min={1}
          max={5}
          step={1}
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
        />
        <div className="d-flex gap-2">
          <Button variant="primary" type="submit">
            Guardar
          </Button>
          <Button variant="secondary" type="button" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EditorReview;

