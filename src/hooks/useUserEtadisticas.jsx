//  DEPENDENCIAS
import { useEffect, useState } from "react"

//  SERVICES
import getUserEstadisticas from "../services/getUserEstadisticas";

const UseUserEstadisticas = (user_id) => {

    const [estadisticas, setEstadisticas] = useState({});
    const [haRebicibidoUserEstadisticas, setHaRecibidoUserEstadisticas] = useState(false);

    useEffect(()=>{
        if(user_id !== undefined){
            obtenerUserEstadisticas();
        }
    },[user_id])

    function obtenerUserEstadisticas(){
        getUserEstadisticas(user_id).then((estadisticas)=>{
            setEstadisticas(estadisticas);
            setHaRecibidoUserEstadisticas(true);
        });
    }

    return {estadisticas, haRebicibidoUserEstadisticas}

}

export default UseUserEstadisticas
