//  DEPENDENCIAS
import { useEffect, useState } from "react"

//  SERVICES
import getGlobalRank from "../services/getGlobalRank";

const UseGlobalRank = (numberPage) => {

    const [globalRank, setGlobalRank] = useState([]);
    const [haRecibidoGlobalRank, setHaRecibidoGlobalRank] = useState(false);
    const [meta, setMeta] = useState({});

    useEffect(()=>{
        obtenerGlobalRank();
    },[numberPage])

    function obtenerGlobalRank(){
        if(JSON.stringify(meta) === "{}" || meta.current_page !== meta.last_page){
            getGlobalRank(numberPage).then((globalRankPlaysers)=>{
                let ranks = globalRankPlaysers.data.map((rank, index) => {
                    return { ...rank, posicion: index + 1 };
                });
                setGlobalRank(globalRank.concat(ranks));
                setMeta(globalRankPlaysers.meta)
                setHaRecibidoGlobalRank(true);
            })
        }
    }

    return {globalRank, haRecibidoGlobalRank, meta}

}

export default UseGlobalRank;
