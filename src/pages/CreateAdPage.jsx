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
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleOwnerChange = (e) => setOwner(loggedUserId);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleTypeChange = (e) => setType(e.target.value);
  const handleFamilyChange = (e) => setFamily(e.target.value);
  const handleStateChange = (e) => setState(e.target.value);
  const handleBrandChange = (e) => setBrand(e.target.value);
  const handleModelChange = (e) => setModel(e.target.value);
  const handleCostChange = (e) => setCost(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlePhotosChange = (e) => setPhotos(e.target.value);

  useEffect(() => {
    getData();
  }, []);

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
      if (error.response.status === 400) {
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
      setImageUrl(response.data.imageUrl);
      setPhotos(response.data.imageUrl)
      setIsUploading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <h1>Crea tu anuncio</h1>
    <div style={{backgroundColor:"white", borderRadius: "20px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"}}>
      
      <Form onSubmit={handleCreateAd}>
        <InputGroup className="mb-3">
          <InputGroup.Text style={{marginTop:"10px"}}id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            disabled
            value={profileInfo.username || ""}
            aria-label="Username"
            aria-describedby="basic-addon1"
            style={{marginTop:"10px"}}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">Title</InputGroup.Text>
          <Form.Control
            placeholder="Titulo para tu anuncio"
            aria-label="Ponle titulo a tu anuncio"
            aria-describedby="basic-addon2"
            value={title}
            onChange={handleTitleChange}
          />
        </InputGroup>

        <Form.Select
          className="mb-3"
          aria-label="Default select example"
          value={type}
          onChange={handleTypeChange}
        >
          <option disabled value="">
            Tipo de Anuncio
          </option>
          <option value="instrument">Instrumento</option>
          <option value="service">Grupo Musical</option>
        </Form.Select>
        {type === "instrument" && (
          <div>
            <Form.Select
              className="mb-3"
              aria-label="Elige el tipo de anuncio"
              value={family}
              onChange={handleFamilyChange}
            >
              <option disabled value="">
                Family
              </option>
              <option value="Viento Madera">Viento Madera</option>
              <option value="Viento Metal">Viento Metal</option>
              <option value="Cuerda Frotada">Cuerda Frotada</option>
              <option value="Cuerda Percutida">Cuerda Percutida</option>
              <option value="Percusión">Percusión</option>
            </Form.Select>

            <Form.Select
              aria-label="Selecciona el estado de tu instrumento"
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
              <InputGroup.Text id="basic-addon3">Marca</InputGroup.Text>
              <Form.Control
                id="basic-url"
                aria-describedby="basic-addon3"
                value={brand}
                onChange={handleBrandChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">Modelo</InputGroup.Text>
              <Form.Control
                id="basic-url"
                aria-describedby="basic-addon3"
                value={model}
                onChange={handleModelChange}
              />
            </InputGroup>
          </div>
        )}

        {type === "service" && (
          <div>
            <Form.Select
              className="mb-3"
              aria-label="Escoge el tipo de grupo"
              value={family}
              onChange={handleFamilyChange}
            >
              <option disabled value="">
                Tipo de Grupo
              </option>
              <option value="Solista">Solista</option>
              <option value="Orquesta">Orquesta</option>
              <option value="Banda">Banda</option>
              <option value="Charanga">Charanga</option>
            </Form.Select>
          </div>
        )}

        <InputGroup className="mb-3">
          <InputGroup.Text>Precio</InputGroup.Text>
          <Form.Control
            aria-label="Pon precio a tu instrumento/grupo"
            value={cost}
            onChange={handleCostChange}
          />
          <InputGroup.Text>€</InputGroup.Text>
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>Descripción</InputGroup.Text>
          <Form.Control
            as="textarea"
            aria-label="Redacta una descripcion concisa de tu anuncio"
            value={description}
            onChange={handleDescriptionChange}
          />
        </InputGroup>
        <Form.Label><strong>Foto</strong></Form.Label>
        <Form.Control
          type="file"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        <Button variant="info" className="mb-2 mt-3" type="submit">
          Crear
        </Button>
      </Form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
    </div>
  );
}

export default CreateAdPage;
