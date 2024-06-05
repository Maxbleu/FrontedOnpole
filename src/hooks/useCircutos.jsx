import { useState, useEffect } from "react";

/**     SERVICES     */
import getCircuitos from "./../services/getCircuitos";


const UseCircuitos = () => {

    //  Este hoock se encargará
    //  de almacenar los circuitos
    const [circuitos, setCircuitos] = useState([]);

    const [haRecibidoCircuitos, sethaRecibidoCircuitos] = useState(false);

    useEffect(()=>{
        obtenerCircuitos();
    },[])

    /**
     * Este método se encarga de obtener
     * los datos que del endpoint
     */
    function obtenerCircuitos() {
        if(circuitos.length === 0){
            getCircuitos().then(circuitos => {
                setCircuitos(circuitos);
                sethaRecibidoCircuitos(true);
            });
        }
    }

    return { circuitos, haRecibidoCircuitos };
}

export default UseCircuitos;
