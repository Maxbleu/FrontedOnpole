import { useEffect, useState } from "react";

//  SERVICES
import getCoches from "./../services/getCoches";

//  EXPLICACION
//  Este hoock se encarga de obtener todos
//  los coches de todas las marcas para la
//  pagina web
const UseCoches = () => {

    const [coches, setCoches] = useState([]);
    const [haRecibidoCoches, setHaRecibidoCoches] = useState(false);

    /**
     * Este hoock solo se ejecutará
     * en la primera renderización del
     * componete padre
     */
    useEffect(()=>{
        //  Solicitamos la lista de coches
        obtenerCoches();
    },[])

    /**
     * Este método se encarga de obtener
     * todos los coches de las marcas
     */
    function obtenerCoches() {
        //  Comprobamos si no hay registros en la lista
        if(coches.length === 0){
            //  Solicitamos los coches al servidor
            getCoches().then(coches => {
                //  Guardamos los coches 
                setCoches(coches);
                //  Indicamos que hemos recibido los coches
                setHaRecibidoCoches(true);
            });
        }
    }

    return { coches, haRecibidoCoches };
}

export default UseCoches;
