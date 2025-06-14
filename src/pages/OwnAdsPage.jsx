import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
      {adsById.length === 0 && (
        <Button
          variant="light"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src="58727.png" width="100px" />
          Añade tu primer anuncio
        </Button>
      )}
      {adsById.map((ad) => {
        return (
          <Card key={ad._id} className="bg-dark text-white">
             <Card.Img src={ad.photo} alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title>{ad.type}{ad.name}{ad.brand}</Card.Title>
              <Card.Text>{ad.cost}</Card.Text>
              <Card.Text>Last updated 3 mins ago</Card.Text>
            </Card.ImgOverlay>
          </Card>
        );
      })}
    </div>
  );
}

export default OwnAdsPage;
