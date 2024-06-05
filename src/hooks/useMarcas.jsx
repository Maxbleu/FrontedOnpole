import { useState, useEffect } from "react";

//  SERVICES
import getMarcas from "./../services/getMarcas";

const UseMarcas = () => {

    //  Este hoock se encargará
    //  de almacenar las marcas
    const [marcas, setMarcas] = useState([]);

    const [haRecibidoMarcas, setHaRecibidoMarcas] = useState(false);

    useEffect(()=>{
        obtenerMarcas();
    },[])

    /**
     * Este método se encarga de obtener
     * los datos que del endpoint
     */
    function obtenerMarcas() {
        getMarcas().then(marcas => {
            setMarcas(marcas);
            setHaRecibidoMarcas(true);
        });
    }

    return { marcas, haRecibidoMarcas };
}

export default UseMarcas;
