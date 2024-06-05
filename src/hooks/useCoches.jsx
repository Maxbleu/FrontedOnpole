import { useEffect, useState } from "react";

//  SERVICES
import getCoches from "./../services/getCoches";

const UseCoches = () => {

    //  Este hoock se encargará
    //  de almacenar las coches
    const [coches, setCoches] = useState([]);

    const [haRecibidoCoches, setHaRecibidoCoches] = useState(false);

    useEffect(()=>{
        obtenerCoches();
    },[])

    /**
     * Este método se encarga de obtener
     * los datos que del endpoint
     */
    function obtenerCoches() {
        getCoches().then(coches => {
            setCoches(coches);
            setHaRecibidoCoches(true);
        });
    }

    return { coches, haRecibidoCoches };
}

export default UseCoches;
