//  DEPENDENCIAS
import { useEffect, useState } from "react"

//  SERVICES
import getGlobalRank from "../services/getGlobalRank";

const UseGlobalRank = () => {

    const [globalRank, setGlobalRank] = useState([]);
    const [haRecibidoGlobalRank, setHaRecibidoGlobalRank] = useState(false);

    useEffect(()=>{
        obtenerGlobalRank();
    },[])

    function obtenerGlobalRank(){
        getGlobalRank().then((globalRank)=>{
            setGlobalRank(globalRank);
            setHaRecibidoGlobalRank(true);
        })
    }

    return {globalRank, haRecibidoGlobalRank}

}

export default UseGlobalRank;
