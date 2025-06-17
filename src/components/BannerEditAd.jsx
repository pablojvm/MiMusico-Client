import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function BannerEditAd({ onClose, onUpdate }) {
  const navigate = useNavigate();
  const params = useParams();

  const [adInfo, setAdInfo] = useState({});
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [family, setFamily] = useState("");
  const [state, setState] = useState("");
  const [photos, setPhotos] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (adInfo.title) {
      setTitle(adInfo.title || "");
      setType(adInfo.type || "");
      setCost(adInfo.cost || "");
      setDescription(adInfo.description || "");
      setModel(adInfo.model || "");
      setBrand(adInfo.brand || "");
      setFamily(adInfo.family || "");
      setState(adInfo.state || "");
      setPhotos(adInfo.photos || "");
    }
  }, [adInfo]);

  const getData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/ad/${params.adId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAdInfo(response.data);
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleTypeChange = (e) => setType(e.target.value);
  const handleFamilyChange = (e) => setFamily(e.target.value);
  const handleStateChange = (e) => setState(e.target.value);
  const handleBrandChange = (e) => setBrand(e.target.value);
  const handleModelChange = (e) => setModel(e.target.value);
  const handleCostChange = (e) => setCost(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlePhotosChange = (e) => setPhotos(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      title,
      type,
      description,
      cost,
      model,
      brand,
      family,
      state,
      photos,
    };
    await handleUpdate(updatedData);
    if (onUpdate) {
      onUpdate(updatedData);
      onClose();
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/ad/${params.adId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }

    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/upload`,
        uploadData
      );
      setImageUrl(response.data.imageUrl);
      setPhotos(prev => [...prev, response.data.imageUrl]);
      setIsUploading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        style={{ backgroundColor: "white", borderRadius: "20px" }}
      >
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </Form.Group>
        <Form.Select
          aria-label="Default select example"
          value={type}
          onChange={handleTypeChange}
        >
          <option>Type</option>
          <option value="instrument">Instrumento</option>
          <option value="service">Grupo</option>
        </Form.Select>

        {adInfo.type === "instrument" && (
          <div>
            <Form.Select
              aria-label="Default select example"
              value={family}
              onChange={handleFamilyChange}
            >
              <option>Family</option>
              <option value="Viento Madera">Viento Madera</option>
              <option value="Viento Metal">Viento Metal</option>
              <option value="Cuerda Frotada">Cuerda Frotada</option>
              <option value="Cuerda Percutida">Cuerda Percutida</option>
              <option value="Percusión">Percusión</option>
            </Form.Select>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                value={brand}
                onChange={handleBrandChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                value={model}
                onChange={handleModelChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                value={state}
                onChange={handleStateChange}
              />
            </Form.Group>
          </div>
        )}
        {adInfo.type === "service" && (
          <div>
            <Form.Select
              aria-label="Default select example"
              value={family}
              onChange={handleFamilyChange}
            >
              <option>Tipo de grupo</option>
              <option value="Banda">Banda</option>
              <option value="Orquesta">Orquesta</option>
              <option value="Solista">Solista</option>
              <option value="Charanga">Charanga</option>
            </Form.Select>
          </div>
        )}

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Cost</Form.Label>
          <Form.Control
            type="number"
            value={cost}
            onChange={handleCostChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNumber">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
        </Form.Group>
        <Form.Label>Foto</Form.Label>
        <Form.Control
          type="file"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" className="ms-3" type="submit">
          Editar
        </Button>
      </Form>
    </div>
  );
}

export default BannerEditAd;
