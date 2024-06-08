//  DEPENDENCIAS
import { useEffect, useState } from "react";

//  SERVICES
import getUserSesion from "../services/getUserSesion";

//  EXPLICACIÓN
//  Este hoock se encarga de obtener las
//  sesiones de un usuario a través de
//  su id
const UseUserSesion = (user_id) => {

    const [haRecibidoUserSesion, setHaRecibidoUserSesion] = useState(false);
    const [userSesions, setUserSesions] = useState([]);

    /**
     * Este hoock solo se ejecuta cuando
     * reciba el id del usuario y en el 
     * primer rendenrizado del componente
     * padre
     */
    useEffect(()=>{
        //  Comprobamos que el usuario no sea undefined
        if(user_id !== undefined){
            //  Solicitamos las sesiones del usuario
            obtenerUserSesion();
        }
    },[user_id])

    /**
     * Este método se encarga de solicitar
     * todas las sesiones analizadas del usuario
     */
    function obtenerUserSesion(){
        //  Solicita todas las sesión del usuario
        getUserSesion(user_id).then((userSesions)=>{
            //  Guardamos la lista de sesión analizadas
            setUserSesions(userSesions);
            //  Indicamos que hemos que recibido la lista de sesiones analizadas
            setHaRecibidoUserSesion(true);
        });
    }

    return { haRecibidoUserSesion, userSesions }

}

export default UseUserSesion;
