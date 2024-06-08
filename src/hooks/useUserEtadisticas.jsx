//  DEPENDENCIAS
import { useEffect, useState } from "react"

//  SERVICES
import getUserEstadisticas from "../services/getUserEstadisticas";

//  EXPLICACIÓN
//  Este hoock se encarga de obtener las estadisticas
//  del usuario en la pagina web por su id
const UseUserEstadisticas = (user_id) => {

    const [estadisticas, setEstadisticas] = useState({});
    const [haRebicibidoUserEstadisticas, setHaRecibidoUserEstadisticas] = useState(false);

    /**
     * Este hoock se ejecutará solo
     * en el primer renderizado del componente
     * padre y cuando obtenga el id del usuario
     */
    useEffect(()=>{
        //  Comprobamos que el id del usuario no es undefined
        if(user_id !== undefined){
            //  Solicitamos las estadisticas del usuario
            obtenerUserEstadisticas();
        }
    },[user_id])

    /**
     * Este método se encarga de obtener 
     * las estadisticas del usuario
     */
    function obtenerUserEstadisticas(){
        //  Solicitamos las estadisticas del usuario
        getUserEstadisticas(user_id).then((estadisticas)=>{
            //  Guardamos las estadisticas del usuario
            setEstadisticas(estadisticas);
            //  Indicamos que hemos las hemos recibido
            setHaRecibidoUserEstadisticas(true);
        });
    }

    return {estadisticas, haRebicibidoUserEstadisticas}

}

export default UseUserEstadisticas
