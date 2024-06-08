import { useState, useEffect } from "react";

/**     SERVICES     */
import getCircuitos from "./../services/getCircuitos";

//  EXPLICACION
//  Este hoock se encarga de obtener todos
//  los circuitos necesarios para la pagina
const UseCircuitos = () => {

    const [circuitos, setCircuitos] = useState([]);
    const [haRecibidoCircuitos, sethaRecibidoCircuitos] = useState(false);

    /**
     * Este hoock se ejecutará únicamente
     * en la primera renderización del 
     * componente padre
     */
    useEffect(()=>{
        //  Solicitamos obtener los circuitos
        obtenerCircuitos();
    },[])

    /**
     * Este método se encarga de obtener
     * todoslos circuitos de la web
     */
    function obtenerCircuitos() {
        //  Comprobamos si la lista tiene registros
        if(circuitos.length === 0){
            //  Solicitamos los circuitos al servidor
            getCircuitos().then(circuitos => {
                //  Guardamos los circuitos 
                setCircuitos(circuitos);
                //  Indicamos que hemos recibido los circuitos
                sethaRecibidoCircuitos(true);
            });
        }
    }

    return { circuitos, haRecibidoCircuitos };
}

export default UseCircuitos;
