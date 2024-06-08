//  DEPENDECIAS
import { useEffect, useState } from "react"

//  SERVICES
import getLatestUserSesion from "../services/getLatestUserSesion";

//  EXPLICACION
//  Este hoock se encarga de solicitar
//  la última sesión analizada por el usuario
const UseLatestUserSesion = (user_Id) => {

    const [latestSesion, setLatestSesion] = useState({});
    const [haRecibidoLaUltimaSesionUsuario, setHaRecibidoLaUltimaSesionUsuario] = useState(false);

    /**
     * Este hoock se ejecutará cuando
     * reciba el id del usuario y en la
     * ejecucción inicial de la web
     */
    useEffect(()=>{
        //  Comprobamos que el id del usuario
        //  no sea undefined
        if(user_Id !== undefined){
            obtenerUltimaSesionUsuario();
        }
    },[user_Id])

    /**
     * Este método se encarga de obtener la última
     * sesión analizada por el usuario
     */
    function obtenerUltimaSesionUsuario(){
        //  Solicitamos la última sesión
        getLatestUserSesion(user_Id).then((sesion)=>{
            //  Guardamos la última sesión
            setLatestSesion(sesion);
            //  Indicamos que hemos recibido la última sesión
            setHaRecibidoLaUltimaSesionUsuario(true);
        });
    }

    return {latestSesion, haRecibidoLaUltimaSesionUsuario}

}

export default UseLatestUserSesion;
