//  DEPENDENCIAS
import { useEffect, useState } from "react";

//  SERVICES
import getUserSesion from "../services/getUserSesion";

const UseUserSesion = (user) => {

    const [haRecibidoUserSesion, setHaRecibidoUserSesion] = useState(false);
    const [userSesions, setUserSesions] = useState([]);

    /**
     * Este hoock solo se ejecuta cuando
     * el payloadSesion es diferente al
     * insertado incialmente
     */
    useEffect(()=>{
        if(JSON.stringify(user) !== "{}"){
            obtenerUserSesion();
        }
    },[user])

    /**
     * Este método se encarga de guardar
     * todas las sesiones del usuario
     */
    function obtenerUserSesion(){
        getUserSesion(user.id).then((userSesions)=>{
            setUserSesions(userSesions);
            setHaRecibidoUserSesion(true);
        });
    }

    return { haRecibidoUserSesion, userSesions }

}

export default UseUserSesion;
