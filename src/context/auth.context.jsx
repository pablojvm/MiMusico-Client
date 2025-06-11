import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext()//este componente comparte los estados del contexto

function AuthWrapper(props) {// almacena y controla los estados del contexto
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loggedUserId, setLoggedUserId] = useState(null)
    const [isValidatingToken, setIsValidatingToken] = useState(true)

    const authenticateUser = async () => {
        // funcion para validar el token del usuario y saber quien es y actualizar los estados

        const authToken = localStorage.getItem("authToken")

        try {
            
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/verify`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })

            setIsLoggedIn(true)
            setLoggedUserId(response.data.payload._id)
            setIsValidatingToken(false)

        } catch (error) {
            setIsLoggedIn(false)
            setLoggedUserId(null)
            setIsValidatingToken(false)
        }
    }

    useEffect(() => {
        authenticateUser()
    }, [])

    const passedContext = {
        isLoggedIn,
        loggedUserId,
        authenticateUser
    }
    
    if(isValidatingToken) {
        return (
            <h3>...validando usuario</h3>// hacer esta animacion muy bien hecha!!! muy importante
        )
    }

    return (
        <AuthContext.Provider value={passedContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthWrapper
}