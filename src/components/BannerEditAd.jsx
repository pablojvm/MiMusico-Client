import service from "../services/service.config";
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
      setImageUrl(adInfo.photos || "");
    }
  }, [adInfo]);

  const getData = async () => {
    try {
      const response = await service.get(`/ad/${params.adId}`);
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
      photos: imageUrl,
    };
    await handleUpdate(updatedData);
    if (onUpdate) {
      onUpdate(updatedData);
      onClose();
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await service.patch(`/ad/${params.adId}`, updatedData);
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    const uploadData = new FormData();
    for (let file of files) {
      uploadData.append("image", file);
    }

    try {
      const response = await service.post(`/upload`, uploadData);
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.log("Error subiendo imagen:", error);
      navigate("/error");
    }
    setIsUploading(false);
  };

  return (
    <div
      style={{
        borderRadius: "20px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        marginTop:"15px"
      }}
    >
      <Form
        onSubmit={handleSubmit}
        style={{ backgroundColor: "white", borderRadius: "20px" }}
      >
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label><strong>Title</strong></Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </Form.Group>
        {/* <Form.Select
          aria-label="Default select example"
          value={type}
          onChange={handleTypeChange}
          className="mb-4"
        >
          <option>Type</option>
          <option value="instrument">Instrumento</option>
          <option value="service">Grupo</option>
        </Form.Select> */}

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
              <Form.Label><strong>Marca</strong></Form.Label>
              <Form.Control
                type="text"
                value={brand}
                onChange={handleBrandChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label><strong>Modelo</strong></Form.Label>
              <Form.Control
                type="text"
                value={model}
                onChange={handleModelChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label><strong>Estado</strong></Form.Label>
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
          <Form.Label><strong>Cost</strong></Form.Label>
          <Form.Control
            type="number"
            value={cost}
            onChange={handleCostChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNumber">
          <Form.Label><strong>Descripción</strong></Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
        </Form.Group>
        <Form.Label><strong>Foto</strong></Form.Label>
        <Form.Control
          type="file"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        <div className="mt-3 d-flex flex-wrap gap-2">
          <img src={imageUrl} width="100" style={{ borderRadius: "10px" }} />
        </div>
        <Button style={{marginBottom:"10px"}} variant="danger" onClick={onClose}>
          Close
        </Button>
        <Button style={{marginBottom:"10px"}} variant="primary" className="ms-3" type="submit">
          Editar
        </Button>
      </Form>
    </div>
  );
}

export default BannerEditAd;
