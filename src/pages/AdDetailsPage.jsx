import { Card, Button } from "react-bootstrap"

function AdDetailsPage() {
  return (
    <div>
      <h1>Pagina de detalles de un anuncio</h1>
       <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Edit Info</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default AdDetailsPage
