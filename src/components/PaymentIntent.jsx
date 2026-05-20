import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function PaymentIntent({ ad }) {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleUseEffect = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/payment/create-payment-intent`,
          ad
        );
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.log(err);
        setError("No se pudo iniciar el pago. Inténtalo más tarde.");
      }
    };
    handleUseEffect();
  }, [ad]);

  const appearance = { theme: "stripe" };
  const options = { clientSecret, appearance };

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="payment-intent-container">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default PaymentIntent;
