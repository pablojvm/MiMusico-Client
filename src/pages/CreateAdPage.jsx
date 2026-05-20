import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";

function CreateAdPage() {
  const navigate = useNavigate();

  const { loggedUserId } = useContext(AuthContext);

  const [profileInfo, setProfileInfo] = useState({});
  const [owner, setOwner] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [family, setFamily] = useState("");
  const [state, setState] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleTypeChange = (e) => setType(e.target.value);
  const handleFamilyChange = (e) => setFamily(e.target.value);
  const handleStateChange = (e) => setState(e.target.value);
  const handleBrandChange = (e) => setBrand(e.target.value);
  const handleModelChange = (e) => setModel(e.target.value);
  const handleCostChange = (e) => setCost(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  useEffect(() => {
    if (loggedUserId) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUserId]);

  const getData = async () => {
    try {
      const response = await service.get(`/user/profile`);
      setProfileInfo(response.data);
      setOwner(response.data._id);
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };

  const handleCreateAd = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const newAd = {
        owner,
        title,
        type,
        family,
        state,
        brand,
        model,
        cost,
        photos: photos
          ? [photos]
          : [
              "https://res.cloudinary.com/dinaognbb/image/upload/v1749822599/fotouser_f9vrur.png",
            ],
        description,
      };
      const response = await service.post(`/ad`, newAd);
      const createdAdId = response.data._id;
      navigate(`/ad/${createdAdId}`);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        setErrorMessage("Algo salió mal. Inténtalo de nuevo.");
      }
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
      const response = await service.post(`/upload`, uploadData);
      setPhotos(response.data.imageUrl);
    } catch {
      navigate("/500");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="create-ad-page">
      <h1 className="page-title text-center mb-4">Crea tu anuncio</h1>
      <div className="create-ad-card">
        <Form onSubmit={handleCreateAd}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <Form.Control
              disabled
              value={profileInfo.username || ""}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon2">Título</InputGroup.Text>
            <Form.Control
              placeholder="Título para tu anuncio"
              aria-label="Ponle título a tu anuncio"
              aria-describedby="basic-addon2"
              value={title}
              onChange={handleTitleChange}
            />
          </InputGroup>

          <Form.Select
            className="mb-3"
            aria-label="Tipo de anuncio"
            value={type}
            onChange={handleTypeChange}
          >
            <option disabled value="">
              Tipo de anuncio
            </option>
            <option value="instrument">Instrumento</option>
            <option value="service">Grupo Musical</option>
          </Form.Select>

          {type === "instrument" && (
            <div>
              <Form.Select
                className="mb-3"
                aria-label="Familia del instrumento"
                value={family}
                onChange={handleFamilyChange}
              >
                <option disabled value="">
                  Familia
                </option>
                <option value="Viento Madera">Viento Madera</option>
                <option value="Viento Metal">Viento Metal</option>
                <option value="Cuerda Frotada">Cuerda Frotada</option>
                <option value="Cuerda Percutida">Cuerda Percutida</option>
                <option value="Percusión">Percusión</option>
              </Form.Select>

              <Form.Select
                aria-label="Estado del instrumento"
                className="mb-3"
                value={state}
                onChange={handleStateChange}
              >
                <option disabled value="">
                  Estado
                </option>
                <option value="Nuevo">Nuevo</option>
                <option value="Seminuevo">Seminuevo</option>
                <option value="Bueno">Bueno</option>
                <option value="Correcto">Correcto</option>
              </Form.Select>

              <InputGroup className="mb-3">
                <InputGroup.Text id="brand-addon">Marca</InputGroup.Text>
                <Form.Control
                  aria-describedby="brand-addon"
                  value={brand}
                  onChange={handleBrandChange}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="model-addon">Modelo</InputGroup.Text>
                <Form.Control
                  aria-describedby="model-addon"
                  value={model}
                  onChange={handleModelChange}
                />
              </InputGroup>
            </div>
          )}

          {type === "service" && (
            <Form.Select
              className="mb-3"
              aria-label="Tipo de grupo"
              value={family}
              onChange={handleFamilyChange}
            >
              <option disabled value="">
                Tipo de grupo
              </option>
              <option value="Solista">Solista</option>
              <option value="Orquesta">Orquesta</option>
              <option value="Banda">Banda</option>
              <option value="Charanga">Charanga</option>
            </Form.Select>
          )}

          <InputGroup className="mb-3">
            <InputGroup.Text>Precio</InputGroup.Text>
            <Form.Control
              aria-label="Precio del instrumento o grupo"
              value={cost}
              onChange={handleCostChange}
              type="number"
              min="0"
            />
            <InputGroup.Text>€</InputGroup.Text>
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>Descripción</InputGroup.Text>
            <Form.Control
              as="textarea"
              rows={3}
              aria-label="Descripción del anuncio"
              value={description}
              onChange={handleDescriptionChange}
            />
          </InputGroup>

          <Form.Group className="mb-3">
            <Form.Label><strong>Foto</strong></Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </Form.Group>

          {photos && (
            <div className="mb-3">
              <img
                src={photos}
                alt="Vista previa"
                width="120"
                style={{ borderRadius: 10 }}
              />
            </div>
          )}

          <Button
            variant="primary"
            className="w-100"
            type="submit"
            disabled={isUploading}
          >
            {isUploading ? "Subiendo imagen..." : "Crear anuncio"}
          </Button>
        </Form>
        {errorMessage && (
          <p className="text-danger mt-3 text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

export default CreateAdPage;
