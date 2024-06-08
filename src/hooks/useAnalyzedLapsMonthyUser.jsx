//  DEPENDENCIAS
import { useEffect, useState } from "react";

//  SERVICES
import getAnalyzedLapsMonthlyByUser from "../services/getAnalyzedLapsMonthlyByUser";

//  EXPLICACIÓN
//  Este hoock se encargará de obtener y gestionar a través del
//  id del usuario las vueltas analizadas mensualmente 
const UseAnalyzedLapsMonthyUser = (user_id) => {

    const [vueltasAnalizadasAlMesPorUser, setVueltasAnalizadasAlMesPorUser] = useState([]);
    const [haRecibidoVueltasAnalizadasAlMesPorUser, setHaRecibidoVueltasAnalizadasAlMesPorUser] = useState(false);

    /**
     * Este hoock se ejecutará solo
     * en el primer renderizado del 
     * componente padre y cuando obtenga
     * el id del usuario
     */
    useEffect(()=>{
        //  Comprobamos que el id del usuario no es undefined
        if(user_id !== undefined){
            //  Solicitamos obtener las vueltas analizadas mesualmente por el usuario
            obtenerVueltasAnalizadasAlMesPorUser();
        }
    },[user_id])

    /**
     * Este método se encarga de obtener una lista de
     * todos los meses del año con el numero de vueltas
     * analizadas por el mes del usuario
     */
    function obtenerVueltasAnalizadasAlMesPorUser(){
        //  Solicitamos la lista de vueltas analizadas por el usuario mesualmente
        getAnalyzedLapsMonthlyByUser(user_id).then((vueltasAnalizadasAlMesPorUser)=>{
            //  Guardamos las vueltas
            setVueltasAnalizadasAlMesPorUser(vueltasAnalizadasAlMesPorUser);
            //  Indicamos que has recibido las vueltas
            setHaRecibidoVueltasAnalizadasAlMesPorUser(true);
        })
    }

    return {vueltasAnalizadasAlMesPorUser,haRecibidoVueltasAnalizadasAlMesPorUser}

}

export default UseAnalyzedLapsMonthyUser;