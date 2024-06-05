//  DEPENDECIAS
import { useEffect, useState } from "react"

//  SERVICES
import getLatestUserSesion from "../services/getLatestUserSesion";

const UseLatestUserSesion = (user_Id) => {

    const [latestSesion, setLatestSesion] = useState({});
    const [haRecibidoLaUltimaSesionUsuario, setHaRecibidoLaUltimaSesionUsuario] = useState(false);

    useEffect(()=>{
        if(user_Id !== undefined){
            obtenerUltimaSesionUsuario();
        }
    },[user_Id])

    function obtenerUltimaSesionUsuario(){
        getLatestUserSesion(user_Id).then((sesion)=>{
            setLatestSesion(sesion);
            setHaRecibidoLaUltimaSesionUsuario(true);
        });
    }

    return {latestSesion, haRecibidoLaUltimaSesionUsuario}

}

export default UseLatestUserSesion;
