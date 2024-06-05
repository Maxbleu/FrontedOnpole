//  DEPENDENCIAS
import { useEffect, useState } from "react";

//  SERVICES
import getCombination from "../services/getCombination";

const UseCombination = (payloadCombination) => {

    const [combination, setCombination] = useState([]);

    const [haRecibidoCombination, setHaRecibidoCombination] = useState(false);

    useEffect(()=>{
        obtenerCombination()
    },[payloadCombination])

    function obtenerCombination(){
        getCombination(payloadCombination).then((combination)=>{
            setCombination(combination);
            setHaRecibidoCombination(true);
        });
    }

    return {combination, haRecibidoCombination}

}

export default UseCombination;
