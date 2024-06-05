//  DEPENDENCIAS
import { useEffect, useState } from "react";

//  SERVICES
import postSesion from "../services/postSesion";

const UsePostSesion = (payloadSesion) => {

    const [haRecibidoSesionId, setHaRecibidoSesionId] = useState(false);
    const [idSesionCreada, setIdSesionCreada] = useState();

    /**
     * Este hoock solo se ejecuta cuando
     * el payloadSesion es diferente al
     * insertado incialmente
     */
    useEffect(()=>{
        if(JSON.stringify(payloadSesion) !== "{}"){
            postSesion(payloadSesion).then((idSesionCreada) => {
                setIdSesionCreada(idSesionCreada);
                setHaRecibidoSesionId(true);
            });
        }
    },[payloadSesion])

    return { haRecibidoSesionId, idSesionCreada }

}

export default UsePostSesion;
