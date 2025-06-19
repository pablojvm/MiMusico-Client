import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function PaymentIntent({ ad }) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    handleUseEffect()
  }, []);
  
  const handleUseEffect = async () => {                                                              
     const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/payment/create-payment-intent`, ad)
    setClientSecret(response.data.clientSecret)
  }
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default PaymentIntent;