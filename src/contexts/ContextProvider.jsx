//  DEPENDENCIAS
import { createContext, useContext, useState } from "react";

//  DATA PROVIDER
import axiosClient from './../axios-client';

//  HOOCKS
import UseMarcas from "./../hooks/useMarcas";
import UseCircuitos from './../hooks/useCircutos';
import UseCoches from './../hooks/useCoches';
import UseUser from "../hooks/useUser";

const StateContext = createContext({
    token: null,
    idioma: null,

    setToken: () => {},
    setIdioma: () => {},
});

export const ContextProvider = ({children}) => {

    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const {user, haRecibidoUser, setUser, setUserHaSidoModificado} = UseUser(token);

    //  Almaceno estos datos en el cliente cuando son pedidos ya que, son datos que son
    //  requeridos en cada pantalla de la web por lo que haciendo esto reduzco la carga del servidor
    //  aumento la eficiencia de la web.
    const {marcas, haRecibidoMarcas} = UseMarcas();
    const {coches, haRecibidoCoches} = UseCoches();
    const {circuitos, haRecibidoCircuitos} = UseCircuitos();

    const [sesionSeleccionada, setSesionSeleccionada] = useState({});
    const [vueltaSeleccionada, setVueltaSeleccionada] = useState({});
    const [imagenCircuitoSesion, setImagenCircuitoSesion] = useState("");
    const [imagenCocheSesion, setImagenCocheSesion] = useState("");

    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem("ACCESS_TOKEN", token);
        }else{
            localStorage.removeItem("ACCESS_TOKEN");
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            setUser,
            haRecibidoUser,
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
            setImagenCocheSesion
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
