import { Card } from 'react-bootstrap'

function CardsFamily() {
  return (
    <div style={{display:'flex', flexDirection:"row"}}>
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Viento Madera</Card.Title>
      </Card.Body>
      <Card.Img variant="top" src="vientomadera.png" style={{width:"150px"}}/>
    </Card>
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Viento Metal</Card.Title>
      </Card.Body>
      <Card.Img variant="top" src="vientometal.png" style={{width:"150px"}}/>
      </Card>
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Cuerda Frotada</Card.Title>
      </Card.Body>
      <Card.Img variant="top" src="cuerdafrotada.png" style={{width:"150px"}}/>
      </Card>
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Cuerda Percutida</Card.Title>
      </Card.Body>
      <Card.Img variant="top" src="cuerdapercutida.png" style={{width:"100px"}}/>
      </Card>
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Percusión</Card.Title>
      </Card.Body>
      <Card.Img variant="top" src="percusion.png" style={{width:"100px"}}/>
      </Card>
    </div>
  )
}

export default CardsFamily
