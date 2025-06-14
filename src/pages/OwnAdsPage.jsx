import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

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
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/ad/own?objectId=${loggedUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAdsById(response.data);
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };

  return (
    <div style={{width:"90vw"}}>
      <h1>Mis anuncios</h1>
      {adsById.map((ad) => {
        return (
          // <Card key={ad._id} className="bg-dark text-white">
          //    <Card.Img src={ad.photo} alt="Card image" />
          //   <Card.ImgOverlay>
          //     <Card.Title>{ad.type}{ad.name}{ad.brand}</Card.Title>
          //     <Card.Text>{ad.cost}</Card.Text>
          //     <Card.Text>Last updated 3 mins ago</Card.Text>
          //   </Card.ImgOverlay>
          // </Card>
          <Card key={ad._id}>
            <Card.Img variant="top" src={ad.photo} />
      <Card.Header>{ad.name}</Card.Header>
      <Card.Body>
        <Card.Title>{ad.family}</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
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
          <img src="58727.png" width="100px" />
          {adsById.length === 0 ? (
       <p> Añade tu primer anuncio</p>
      ): (<p> Añade un nuevo anuncio</p>)}
          
        </Button>
    </div>
  );
}

export default OwnAdsPage;
