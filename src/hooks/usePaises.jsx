//  DEPENDENCIAS
import { useEffect, useState } from "react"

//  SERVICES
import getPaises from "../services/getPaises"

const usePaises = (idioma) => {

    const [paises, setPaises] = useState([]);
    const [haRecibidoPaises, setHaRecibidoPaises] = useState(false);

    useEffect(()=>{
        obtenerPaises();
    },[])

    function obtenerPaises(){
        getPaises(idioma).then((paises)=>{
            const listaPaises = Object.entries(paises).map(([key, value]) => {
                return {
                            valor : key,
                            nombre : value
                        };
            });
            setPaises(listaPaises);
            setHaRecibidoPaises(true);
        });
    }

    return {paises, haRecibidoPaises}

}

export default usePaises;
