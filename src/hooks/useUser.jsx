//  DEPENDENCIAS
import { useEffect, useState } from "react";

//  SERVICES
import getUser from "../services/getUser";

//  EXPLICACIÓN
//  Este hoock se encarga de obtener el usuario
//  con el que se ha registrado el cliente
//  a través del token que nos proporcionó
//  el backend cuando registramos nuestro usuario
//  en la página
const UseUser = (token) => {

    const [haRecibidoUser, setHaRecibidoUser] = useState(false);
    const [userHaSidoModificado, setUserHaSidoModificado] = useState(false);
    const [user, setUser] = useState({});

    /**
     * Este hoock se ejecutará solo
     * cuando el usuario tenga el token de
     * un usuario ya registrado en la pagina o
     * si el usuario ha sido modificado para 
     * actualizar sus datos
     */
    useEffect(()=>{
        //  Comprobamos que el token no es nulo o
        //  si ha sido modificado los datos del usuario
        if(token !== null || userHaSidoModificado){
            //  Solicitamos los datos del usuario
            obtenerUser();
        }
    },[token,userHaSidoModificado])

    /**
     * Este método se encarga de solicitar
     * a la base de datos de los datos de un usuario
     * con el que ha sido registrado o cuando el usuario
     * a cambiado los datos del ususario en ajustes.
     */
    function obtenerUser(){
        //  Comprobamos si el usuario ha sido modificado o
        //  si el usuario está vacio
        if(JSON.stringify(user) === "{}" || userHaSidoModificado){
            //  Solicitamos el usuario
            getUser().then((user)=>{
                //  Guardamos el usuario
                setUser(user);
                //  Indicamos que hemos recibido el usuario
                setHaRecibidoUser(true);
            });
        }
    }

    return { haRecibidoUser, user, setUser ,setUserHaSidoModificado, userHaSidoModificado}

}

export default UseUser;
