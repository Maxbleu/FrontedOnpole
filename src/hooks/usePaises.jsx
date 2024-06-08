//  DEPENDENCIAS
import { useEffect, useState } from "react"

//  SERVICES
import getPaises from "../services/getPaises"

//  EXPLICACIÓN
//  Este hoock se encarga de obtener 
//  toda la lista de paises a una api
//  llamada banderas-mundo
const usePaises = (idioma) => {

    const [paises, setPaises] = useState([]);
    const [haRecibidoPaises, setHaRecibidoPaises] = useState(false);

    /**
     * Este hoock solo se ejecutará en la
     * primera renderización del componente padre
     */
    useEffect(()=>{
        obtenerPaises();
    },[])

    /**
     * Este método se encarga de obtener la
     * lista de paises de la api
     */
    function obtenerPaises(){
        //  Obtenemos la lista de paises
        getPaises(idioma).then((paises)=>{
            //  Hacemos que por cada pais coloque su
            //  nombre y acronimo en un objeto para 
            //  posteriormente colocarlo en un elemento select
            const listaPaises = Object.entries(paises).map(([key, value]) => {
                return {
                            valor : key,
                            nombre : value
                        };
            });
            //  Guardamos la lista de paises
            setPaises(listaPaises);
            //  Indicamos que hemos recibido la lista de paises
            setHaRecibidoPaises(true);
        });
    }

    return {paises, haRecibidoPaises}

}

export default usePaises;
