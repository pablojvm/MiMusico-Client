import service from "../services/service.config";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function BannerEditAd({ onClose, onUpdate }) {
  const navigate = useNavigate();
  const params = useParams();

  const [adInfo, setAdInfo] = useState({});
  const [title, setTitle] = useState("");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (adInfo.title) {
      setTitle(adInfo.title || "");
      setCost(adInfo.cost || "");
      setDescription(adInfo.description || "");
      setModel(adInfo.model || "");
      setBrand(adInfo.brand || "");
      setFamily(adInfo.family || "");
      setState(adInfo.state || "");
      setImageUrl(adInfo.photos?.[0] || "");
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
  const handleFamilyChange = (e) => setFamily(e.target.value);
  const handleStateChange = (e) => setState(e.target.value);
  const handleBrandChange = (e) => setBrand(e.target.value);
  const handleModelChange = (e) => setModel(e.target.value);
  const handleCostChange = (e) => setCost(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      title,
      description,
      cost,
      model,
      brand,
      family,
      state,
      photos: imageUrl ? [imageUrl] : adInfo.photos,
    };
    await handleUpdate(updatedData);
    if (onUpdate) {
      onUpdate(updatedData);
      onClose();
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      await service.patch(`/ad/${params.adId}`, updatedData);
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
      navigate("/500");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="banner-edit-ad">
      <Form onSubmit={handleSubmit} className="banner-edit-form">
        <Form.Group className="mb-3" controlId="editTitle">
          <Form.Label><strong>Título</strong></Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </Form.Group>

        {adInfo.type === "instrument" && (
          <div>
            <Form.Group className="mb-3">
              <Form.Label><strong>Familia</strong></Form.Label>
              <Form.Select value={family} onChange={handleFamilyChange}>
                <option value="">Familia</option>
                <option value="Viento Madera">Viento Madera</option>
                <option value="Viento Metal">Viento Metal</option>
                <option value="Cuerda Frotada">Cuerda Frotada</option>
                <option value="Cuerda Percutida">Cuerda Percutida</option>
                <option value="Percusión">Percusión</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="editBrand">
              <Form.Label><strong>Marca</strong></Form.Label>
              <Form.Control
                type="text"
                value={brand}
                onChange={handleBrandChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editModel">
              <Form.Label><strong>Modelo</strong></Form.Label>
              <Form.Control
                type="text"
                value={model}
                onChange={handleModelChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editState">
              <Form.Label><strong>Estado</strong></Form.Label>
              <Form.Select value={state} onChange={handleStateChange}>
                <option value="">Estado</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Seminuevo">Seminuevo</option>
                <option value="Bueno">Bueno</option>
                <option value="Correcto">Correcto</option>
              </Form.Select>
            </Form.Group>
          </div>
        )}
        {adInfo.type === "service" && (
          <Form.Group className="mb-3">
            <Form.Label><strong>Tipo de grupo</strong></Form.Label>
            <Form.Select value={family} onChange={handleFamilyChange}>
              <option value="">Tipo de grupo</option>
              <option value="Banda">Banda</option>
              <option value="Orquesta">Orquesta</option>
              <option value="Solista">Solista</option>
              <option value="Charanga">Charanga</option>
            </Form.Select>
          </Form.Group>
        )}

        <Form.Group className="mb-3" controlId="editCost">
          <Form.Label><strong>Precio</strong></Form.Label>
          <Form.Control
            type="number"
            value={cost}
            onChange={handleCostChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="editDescription">
          <Form.Label><strong>Descripción</strong></Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={handleDescriptionChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><strong>Foto</strong></Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </Form.Group>

        {imageUrl && (
          <div className="mt-3 d-flex flex-wrap gap-2">
            <img
              src={imageUrl}
              alt="Vista previa"
              width="100"
              style={{ borderRadius: "10px" }}
            />
          </div>
        )}

        <div className="d-flex gap-2 mt-3">
          <Button variant="outline-secondary" onClick={onClose}>
            Cerrar
          </Button>
          <Button variant="primary" type="submit" disabled={isUploading}>
            Guardar cambios
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default BannerEditAd;
