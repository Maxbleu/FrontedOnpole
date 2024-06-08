//  DEPENDENCIAS
import { useEffect, useState } from "react";

//  SERVICES
import getCombination from "../services/getCombination";

const UseCombination = (payloadCombination, numberPage) => {

    const [combination, setCombination] = useState([]);
    const [haRecibidoCombination, setHaRecibidoCombination] = useState(false);
    const [meta, setMeta] = useState({});

    useEffect(()=>{
        obtenerCombination();
    },[payloadCombination, numberPage])

    function obtenerCombination(){
        if(JSON.stringify(meta) === "{}" || meta.current_page !== meta.last_page){
            getCombination(payloadCombination,numberPage).then((combinationLeaderboard)=>{
                setCombination(combination.concat(combinationLeaderboard.data));
                setMeta(combinationLeaderboard.meta);
                setHaRecibidoCombination(true);
            });
        }
    }

    return {combination, haRecibidoCombination, meta}

}

export default UseCombination;
