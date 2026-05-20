import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [isValidatingToken, setIsValidatingToken] = useState(true);

  const authenticateUser = async () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setIsValidatingToken(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/verify`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setIsLoggedIn(true);
      setLoggedUserId(response.data.payload._id);
    } catch {
      setIsLoggedIn(false);
      setLoggedUserId(null);
    } finally {
      setIsValidatingToken(false);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticateUser,
  };

  if (isValidatingToken) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          gap: "1rem",
          backgroundColor: "var(--mm-bg)",
        }}
      >
        <img
          src="/animatedviolin.gif"
          alt="Cargando MiMusico..."
          style={{ width: "min(220px, 40vw)" }}
        />
        <h3 style={{ color: "var(--mm-navy)", fontFamily: "Anton, sans-serif" }}>
          Validando usuario...
        </h3>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
