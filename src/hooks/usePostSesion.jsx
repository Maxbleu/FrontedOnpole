//  DEPENDENCIAS
import { useEffect, useState } from "react";

//  SERVICES
import postSesion from "../services/postSesion";

//  EXPLICACIÓN
//  Este hoock se encarga de enviar los datos
//  recogidos por el fichero de sesión introducido
//  por el usuario a la base de datos
const UsePostSesion = (payloadSesion) => {

    const [haRecibidoSesionId, setHaRecibidoSesionId] = useState(false);
    const [idSesionCreada, setIdSesionCreada] = useState();

    /**
     * Este hoock solo se ejecuta cuando
     * el objeto payloadSesion sea modificado
     */
    useEffect(()=>{
        //  Comprobamos que el objeto payloadSesion
        //  es diferente a un objeto vacio
        if(JSON.stringify(payloadSesion) !== "{}"){
            //  Enviamos los datos recogidos 
            //  del fichero de la sesion del usuario
            insertarSesion();
        }
    },[payloadSesion])

    /**
     * Este método se encarga de comprobar que
     * el objeto payloadSesion no esta vacio
     */
    function insertarSesion(){
        //  Enviamos los datos recogidos 
        //  del fichero de sesion
        postSesion(payloadSesion).then((idSesionCreada) => {
            //  Recogemos el id de la sesión insertada en la bd
            setIdSesionCreada(idSesionCreada);
            //  Indicamos que ha recibido el id de la sesión
            setHaRecibidoSesionId(true);
        });
    }

    return { haRecibidoSesionId, idSesionCreada }

}

export default UsePostSesion;
