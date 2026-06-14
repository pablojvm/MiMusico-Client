import service from "../services/service.config";
import { useContext, useEffect, useMemo, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import BannerEditAd from "../components/BannerEditAd";
import ModalDeleteAd from "../components/ModalDeleteAd";
import { AuthContext } from "../context/auth.context";
import ModalNewReview from "../components/ModalNewReview";
import PaymentIntent from "../components/PaymentIntent";

function AdDetailsPage() {
  const params = useParams();
  const navigate = useNavigate();

  const { loggedUserId, isLoggedIn } = useContext(AuthContext);

  const [ad, setAd] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showNewReview, setShowNewReview] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [score, setScore] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPaymentIntent, setShowPaymentIntent] = useState(false);

  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);
  const toggleEditForm = () => setShowEdit(!showEdit);
  const toggleNewReview = () => {
    if (!isLoggedIn) {
      alert("Debes estar logueado para dejar una reseña.");
      return;
    }
    setShowNewReview((prev) => !prev);
  };

  useEffect(() => {
    getData();
    reviewsByAd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.adId]);

  const getData = async () => {
    try {
      const response = await service.get(`/ad/${params.adId}`);
      setAd(response.data);
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };

  const reviewsByAd = async () => {
    try {
      const response = await service.get(`/review/${params.adId}`);
      setReviews(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await service.delete(`/ad/${params.adId}`);
      navigate("/own-ads");
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };

  const newReview = async (e) => {
    e.preventDefault();
    const reviewPayload = {
      title,
      text,
      score,
      creator: loggedUserId,
      ad: ad._id,
    };

    try {
      await service.post(`/review`, reviewPayload);
      await reviewsByAd();
      setShowNewReview(false);
      setTitle("");
      setText("");
      setScore(1);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.errorMessage || "Algo salió mal.");
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: ad?.title, url });
      } catch {
        /* cancelado por el usuario */
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert("Enlace copiado al portapapeles");
      } catch {
        alert(url);
      }
    }
  };

  const averageScore = useMemo(() => {
    if (!reviews || reviews.length === 0) return null;
    const sum = reviews.reduce((acc, r) => acc + (r.score || 0), 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  if (!ad) {
    return (
      <div className="loading-container">
        <img src="/animatedviolin.gif" alt="Cargando..." />
      </div>
    );
  }

  const isInstrument = ad.type === "instrument";
  const isOwner = ad.owner?._id === loggedUserId;
  const breadcrumbsTo = isInstrument ? "/ads/instruments" : "/ads/groups";
  const breadcrumbsLabel = isInstrument ? "Instrumentos" : "Grupos";

  const chips = [
    ad.family && { label: ad.family, type: "default" },
    isInstrument && ad.state && { label: ad.state, type: "default" },
    isInstrument && ad.brand && { label: ad.brand, type: "default" },
    !isInstrument && { label: "Disponible", type: "coral" },
  ].filter(Boolean);

  return (
    <div className="ad-detail-wrapper page-fade">
      <nav className="ad-detail-breadcrumbs">
        <Link to="/">Inicio</Link>
        <span> · </span>
        <Link to={breadcrumbsTo}>{breadcrumbsLabel}</Link>
        <span> · </span>
        <span>{ad.title}</span>
      </nav>

      <Card className="ad-detail-card">
        <div className="ad-detail-img-wrapper">
          <img
            src={ad.photos?.[0]}
            alt={ad.title}
            className="ad-detail-img"
          />
        </div>
        <div className="ad-detail-body">
          <span className="ad-detail-eyebrow">
            {isInstrument ? "Instrumento" : "Grupo musical"}
            {isInstrument && ad.family && ` · ${ad.family}`}
          </span>
          <h1 className="ad-detail-title">{ad.title}</h1>

          {chips.length > 0 && (
            <div className="ad-feature-chips">
              {chips.map((chip, i) => (
                <span
                  key={i}
                  className={`ad-chip ${
                    chip.type === "coral" ? "ad-chip--coral" : ""
                  }`}
                >
                  {chip.label}
                </span>
              ))}
            </div>
          )}

          <div className="ad-detail-price">
            {ad.cost}€
            {!isInstrument && (
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "var(--mm-text-muted)",
                  marginLeft: "0.5rem",
                  fontWeight: 600,
                }}
              >
                / hora
              </span>
            )}
          </div>

          <div className="ad-detail-meta">
            {isInstrument ? (
              <>
                <div className="ad-detail-meta-item">
                  <strong>Marca</strong>
                  {ad.brand || "—"}
                </div>
                <div className="ad-detail-meta-item">
                  <strong>Modelo</strong>
                  {ad.model || "—"}
                </div>
                <div className="ad-detail-meta-item">
                  <strong>Estado</strong>
                  {ad.state || "—"}
                </div>
                <div className="ad-detail-meta-item">
                  <strong>Familia</strong>
                  {ad.family || "—"}
                </div>
              </>
            ) : (
              <>
                <div className="ad-detail-meta-item">
                  <strong>Tipo</strong>
                  {ad.family || "—"}
                </div>
                <div className="ad-detail-meta-item">
                  <strong>Modalidad</strong>
                  Reserva por horas
                </div>
                {averageScore && (
                  <div className="ad-detail-meta-item">
                    <strong>Valoración</strong>
                    {averageScore} ⭐ ({reviews.length})
                  </div>
                )}
              </>
            )}
          </div>

          <p className="ad-detail-description">{ad.description}</p>

          <div className="ad-detail-contact">
            <strong>Contacto directo</strong>
            <span>{ad.owner?.number || "Sin teléfono"}</span>
          </div>

          <div className="ad-detail-actions">
            {isOwner ? (
              <>
                <Button
                  variant="outline-danger"
                  onClick={toggleDeleteModal}
                  className="flex-fill"
                >
                  Borrar anuncio
                </Button>
                <Button
                  variant="primary"
                  onClick={toggleEditForm}
                  className="flex-fill"
                >
                  Editar
                </Button>
              </>
            ) : (
              <>
                {showPaymentIntent === false ? (
                  <button
                    type="button"
                    className="btn-coral flex-fill"
                    onClick={() => {
                      if (!isLoggedIn) {
                        alert(
                          "Necesitas tener cuenta para hacer un pago. Te llevamos al login."
                        );
                        navigate("/identification");
                        return;
                      }
                      setShowPaymentIntent(true);
                    }}
                  >
                    Iniciar pago seguro →
                  </button>
                ) : (
                  <div className="w-100">
                    <PaymentIntent ad={ad} />
                  </div>
                )}
              </>
            )}
          </div>

          {!isOwner && (
            <div className="ad-secondary-actions">
              <button
                type="button"
                className="ad-secondary-btn"
                onClick={handleShare}
              >
                ↗ Compartir
              </button>
              <button
                type="button"
                className="ad-secondary-btn"
                onClick={() =>
                  alert(
                    "Función de guardar próximamente — ¡estamos en ello!"
                  )
                }
              >
                ♡ Guardar
              </button>
            </div>
          )}
        </div>
      </Card>

      {/* Bloques de valor */}
      <div className="ad-detail-extras">
        <aside className="ad-extras-card">
          <h3>Sobre {isInstrument ? "el vendedor" : "el grupo"}</h3>
          <div className="seller-row">
            <img
              src={ad.owner?.photo || "/fotouser.png"}
              alt={ad.owner?.username || "Vendedor"}
              className="seller-avatar"
            />
            <div className="seller-info">
              <strong>@{ad.owner?.username || "MiMusico user"}</strong>
              <small>
                <span className="seller-verified">✓ Verificado</span>
                {ad.owner?.createdAt && (
                  <span style={{ marginLeft: 6 }}>
                    Miembro desde{" "}
                    {new Date(ad.owner.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                    })}
                  </span>
                )}
              </small>
            </div>
          </div>
          <p
            style={{
              margin: 0,
              color: "var(--mm-text-muted)",
              fontSize: "0.9rem",
            }}
          >
            Responde habitualmente en menos de 24h. Todos los usuarios
            verifican su identidad antes de publicar.
          </p>
        </aside>

        <aside className="ad-extras-card">
          <h3>Por qué confiar en MiMusico</h3>
          <ul className="ad-trust-list">
            <li>
              <span className="ad-trust-icon">🔒</span>
              <div>
                <strong>Pago seguro con Stripe</strong>
                <span>
                  Tu dinero está protegido hasta que confirmes la entrega.
                </span>
              </div>
            </li>
            <li>
              <span className="ad-trust-icon">↺</span>
              <div>
                <strong>Devolución 14 días</strong>
                <span>Si el instrumento no es lo que esperabas, te lo devolvemos.</span>
              </div>
            </li>
            <li>
              <span className="ad-trust-icon">⭐</span>
              <div>
                <strong>Comunidad valorada</strong>
                <span>
                  Reseñas reales de músicos verificados.
                </span>
              </div>
            </li>
          </ul>
        </aside>
      </div>

      {showEdit && (
        <BannerEditAd ad={ad} onUpdate={getData} onClose={toggleEditForm} />
      )}

      <ModalDeleteAd
        show={showDeleteModal}
        handleClose={toggleDeleteModal}
        handleDelete={handleDelete}
      />

      {ad.type === "service" && (
        <div className="reviews-box mt-4">
          <h3>Reseñas del grupo</h3>

          <div className="reviews-list">
            {reviews.length === 0 && (
              <p className="text-center text-muted py-4 mb-0">
                Aún no hay reseñas sobre este grupo. ¡Sé el primero!
              </p>
            )}

            {reviews.map((eachReview) => (
              <Card key={eachReview._id} className="review-card">
                <Card.Header className="bg-light">
                  <strong>{eachReview.title}</strong>
                </Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p className="mb-2">{eachReview.text}</p>
                    <p className="mb-2 fs-5">
                      {"⭐".repeat(eachReview.score)}
                    </p>
                    <footer className="blockquote-footer">
                      <strong>{eachReview.creator?.username}</strong>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Card>
            ))}
          </div>

          <Button
            className="mt-3 align-self-center"
            variant="outline-primary"
            onClick={toggleNewReview}
          >
            {showNewReview === false ? "Añadir comentario" : "Cerrar"}
          </Button>
        </div>
      )}

      {showNewReview && (
        <div className="reviews-box mt-3">
          <ModalNewReview
            newReview={newReview}
            title={title}
            setTitle={setTitle}
            text={text}
            setText={setText}
            score={score}
            setScore={setScore}
          />
        </div>
      )}

      {errorMessage && (
        <div className="alert alert-danger mt-3 text-center">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default AdDetailsPage;
