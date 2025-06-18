import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Cargando...");

  useEffect(() => {
    const status = searchParams.get("redirect_status");

    if (status === "succeeded") {
      setMessage("✅ ¡Pago completado con éxito!");
    } else {
      setMessage("❌ Hubo un problema con el pago.");
    }
  }, []);

  return (
    <div> 
        <h2>{message}</h2>
        <img src="/pulgararriba.gif"/>
        </div>
 
)
}

export default PaymentSuccess;