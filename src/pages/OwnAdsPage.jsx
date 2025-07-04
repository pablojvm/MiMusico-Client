import service from "../services/service.config";
import { useEffect, useState, useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function OwnAdsPage() {
  const navigate = useNavigate();
  const [adsById, setAdsById] = useState([]);

  const { loggedUserId } = useContext(AuthContext)

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await service.get(`/ad/own?objectId=${loggedUserId}`);
      setAdsById(response.data);
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <h1>Mis anuncios</h1>
      <div >
      {adsById.length === 0 && <img src="image.png" width="500px"/>}
      {adsById.map((ad) => {
        return (
          <Card key={ad._id}>
            <Card.Img variant="top" src={ad.photo} />
      <Card.Header>{ad.type}</Card.Header>
      <Card.Body>
        <Card.Title>{ad.title}</Card.Title>
        <Card.Text>
          {ad.description}
        </Card.Text>
        <Button variant="primary" as={Link} to={`/ad/${ad._id}`} >Mas Detalles</Button>
      </Card.Body>
    </Card>
        );
      })}
      <Button
          variant="light"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          as={Link}
          to="/new-ad"
        >
          <img src="58727.png" width="100px"/>
          {adsById.length === 0 ? (
       <p> Añade tu primer anuncio</p>
      ): (<p> Añade un nuevo anuncio</p>)}
          
        </Button>
        </div>
    </div>
  );
}

export default OwnAdsPage;
