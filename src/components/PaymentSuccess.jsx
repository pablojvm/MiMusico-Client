// in "src/components/PaymentSuccess.jsx"

import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

const PaymentSuccess = () => {

  const navigate = useNavigate();
  const location = useLocation()

  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    handleUseEffect();
  }, []);

  const handleUseEffect = async () => {

    // below is a way to extract queries from the search queries.
    // unfortunately, react-router-dom doesn't come with a proper way to extract them, similar to useParams
    const clientSecret = new URLSearchParams(location.search).get(
      "payment_intent_client_secret"
    );
    const paymentIntentId = new URLSearchParams(location.search).get(
      "payment_intent"
    );

    const paymentIntentInfo = {
      clientSecret: clientSecret,
      paymentIntentId: paymentIntentId
    }

    try {
      await axios.patch(`${import.meta.env.VITE_SERVER_URL}/api/payment/update-payment-intent`, paymentIntentInfo)
      // !IMPORTANT: Adapt the request structure to the one in your project (services, .env, auth, etc...)

      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching) {
    return <h3>... updating payment</h3>;
  }

  return (
    <div>
      <div>
        <h1>Thank you for your order! 🎉</h1>
        <img src="/pulgararriba.gif"/>
        <Link to={"/"}>Go back to Home</Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;