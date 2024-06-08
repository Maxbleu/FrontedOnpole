import { useState, useEffect } from "react";

//  SERVICES
import getMarcas from "./../services/getMarcas";

//  EXPLICACIÓN
//  Este hoock se encarga de solicitar
//  todas las marcas de coches para la
//  página web
const UseMarcas = () => {

    const [marcas, setMarcas] = useState([]);
    const [haRecibidoMarcas, setHaRecibidoMarcas] = useState(false);

    /**
     * Este hoock se ejecutará solo
     * en la primera ejecucción de la
     * web
     */
    useEffect(()=>{
        //  Solicitamos todas las marcas
        obtenerMarcas();
    },[])

    /**
     * Este método se encarga de obtener
     * todas las marcas de coche del servidor
     */
    function obtenerMarcas() {
        //  Solicitamos las marcas
        getMarcas().then(marcas => {
            //  Insertamos las marcas
            setMarcas(marcas);
            //  Indicamos que hemos recibido las marcas
            setHaRecibidoMarcas(true);
        });
    }

    return { marcas, haRecibidoMarcas };
}

export default UseMarcas;
