import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const handleUseEffect = async () => {
      const clientSecret = new URLSearchParams(location.search).get(
        "payment_intent_client_secret"
      );
      const paymentIntentId = new URLSearchParams(location.search).get(
        "payment_intent"
      );

      const paymentIntentInfo = {
        clientSecret,
        paymentIntentId,
      };

      try {
        await axios.patch(
          `${import.meta.env.VITE_SERVER_URL}/api/payment/update-payment-intent`,
          paymentIntentInfo
        );
        setIsFetching(false);
      } catch {
        navigate("/500");
      }
    };
    handleUseEffect();
  }, [location.search, navigate]);

  if (isFetching) {
    return (
      <div className="loading-container">
        <h3 className="mb-3">Actualizando pago...</h3>
        <img src="/animatedviolin.gif" alt="Cargando" />
      </div>
    );
  }

  return (
    <div className="payment-success text-center">
      <h1>¡Gracias por tu compra! 🎉</h1>
      <img
        src="/pulgararriba.gif"
        alt="Pago realizado con éxito"
        style={{ maxWidth: 320, width: "100%" }}
      />
      <div className="mt-3">
        <Link to="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;
