//  DEPENDENCIAS
import { createContext, useContext, useEffect, useState } from "react";

//  HOOCKS
import UseMarcas from "./../hooks/useMarcas";
import UseCircuitos from './../hooks/useCircutos';
import UseCoches from './../hooks/useCoches';
import UseUser from "../hooks/useUser";

//  MOCKS
import mock_spanish from "../mocks/idiomas/mock-spanish";
import mock_english from "../mocks/idiomas/mock-english";

const StateContext = createContext({
    token: null,
    idioma: null,

    setToken: () => {},
    setIdioma: () => {},
});

export const ContextProvider = ({children}) => {

    //  Almaceno estos datos en el cliente cuando son pedidos ya que, son datos que son
    //  requeridos en cada pantalla de la web por lo que haciendo esto reduzco la carga del servidor
    //  aumento la eficiencia de la web
    const {marcas, haRecibidoMarcas} = UseMarcas();
    const {coches, haRecibidoCoches} = UseCoches();
    const {circuitos, haRecibidoCircuitos} = UseCircuitos();

    const [csrfToken, _setCsrfToken] = useState(localStorage.getItem("CSRF_TOKEN"));
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const {user, haRecibidoUser, setUser, setUserHaSidoModificado, userHaSidoModificado} = UseUser(token);

    const [idioma, setIdioma] = useState(import.meta.env.VITE_IDIOMA_DEFAULT);
    const [mockIdioma, setMockIdioma] = useState(idioma === "es" ? mock_spanish : mock_english);

    const [sesionSeleccionada, setSesionSeleccionada] = useState({});
    const [vueltaSeleccionada, setVueltaSeleccionada] = useState({});
    const [imagenCircuitoSesion, setImagenCircuitoSesion] = useState("");
    const [imagenCocheSesion, setImagenCocheSesion] = useState("");

    const setCsrfToken = (csrfToken) =>{
        _setCsrfToken(csrfToken);
        if(csrfToken){
            localStorage.setItem("CSRF_TOKEN", csrfToken);
        }else{
            localStorage.removeItem("CSRF_TOKEN");
        }
    }

    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem("ACCESS_TOKEN", token);
        }else{
            localStorage.removeItem("ACCESS_TOKEN");
        }
    }

    useEffect(()=>{
        let mockSeleccionado;
        if(idioma === "es"){
            mockSeleccionado = mock_spanish;
        }else{
            mockSeleccionado = mock_english;
        }
        setMockIdioma(mockSeleccionado);
    },[idioma])

    return (
        <StateContext.Provider value={{
            user,
            setUser,
            haRecibidoUser,
            userHaSidoModificado,
            setUserHaSidoModificado,

            token,
            setToken,

            marcas,
            haRecibidoMarcas,

            circuitos,
            haRecibidoCircuitos,

            coches,
            haRecibidoCoches,

            sesionSeleccionada,
            setSesionSeleccionada,

            vueltaSeleccionada,
            setVueltaSeleccionada,

            imagenCircuitoSesion,
            setImagenCircuitoSesion,

            imagenCocheSesion,
            setImagenCocheSesion,

            csrfToken,
            setCsrfToken,

            idioma,
            setIdioma,

            mockIdioma,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
