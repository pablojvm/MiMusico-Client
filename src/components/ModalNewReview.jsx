import { Button, Form } from "react-bootstrap"

function ModalNewReview({title, setTitle, text, setText, score, setScore, newReview}) {
  return (
    <div>
       <Form onSubmit={newReview}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label><strong>Titulo</strong></Form.Label>
        <Form.Control type="text" placeholder="Titulo para tu reseña" value={title} onChange={(e) => setTitle(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label><strong>Comentario</strong></Form.Label>
        <Form.Control as="textarea" placeholder="Escribe aqui tu reseña" value={text} onChange={(e) => setText(e.target.value)}/>
      </Form.Group>
      <Form.Label><strong>Score: {score}⭐</strong></Form.Label>
      <Form.Range 
      min={1}
      max={5}
      step={1}
      value={score}
      onChange={(e) => setScore(Number(e.target.value))}/>
      <Button style={{marginBottom:"15px", marginTop:"15px"}}variant="primary" type="submit">Añadir comentario</Button>
    </Form>
    
    </div>
  )
}

export default ModalNewReview
