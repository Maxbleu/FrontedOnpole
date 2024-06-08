//  DEPENDENCIAS
import { useEffect, useState } from "react"

//  SERVICES
import getGlobalRank from "../services/getGlobalRank";

//  EXPLICACIÓN
//  Este hoock se encarga de obtener el ranking
//  global de jugadores por la página que ha solicitado
//  el usuario
const UseGlobalRank = () => {

    const [globalRank, setGlobalRank] = useState([]);
    const [haRecibidoGlobalRank, setHaRecibidoGlobalRank] = useState(false);

    /**
     * Este hoock se ejecutará inicialmente
     * y cuando el usuario solicite los datos de
     * la siguiente página
     */
    useEffect(()=>{
        //  Solicitamos la lista del ranking de jugadores
        obtenerGlobalRank();
    },[])

    /**
     * Este método se encarga de obtener la lista de los mejores
     * jugadores de la web por la página que ha solicitado el usuario
     */
    function obtenerGlobalRank(){
        //  Obtenemos la lista de jugadores por la pagina solicitada
        getGlobalRank().then((globalRankPlaysers)=>{
            //  Insertamos la lista de jugadores
            setGlobalRank(globalRankPlaysers);
            //  Indicamos que ha recibido el ranking solicitado
            setHaRecibidoGlobalRank(true);
        })
    }

    return {globalRank, haRecibidoGlobalRank}

}

export default UseGlobalRank;
