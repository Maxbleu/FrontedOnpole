//  DEPENDENCIAS
import { useEffect, useState } from "react";

//  SERVICES
import getAnalyzedLapsMonthlyByUser from "../services/getAnalyzedLapsMonthlyByUser";

const UseAnalyzedLapsMonthyUser = (user_id) => {

    const [vueltasAnalizadasAlMesPorUser, setVueltasAnalizadasAlMesPorUser] = useState([]);
    const [haRecibidoVueltasAnalizadasAlMesPorUser, setHaRecibidoVueltasAnalizadasAlMesPorUser] = useState(false);

    useEffect(()=>{
        if(user_id){
            obtenerVueltasAnalizadasAlMesPorUser();
        }
    },[user_id])

    function obtenerVueltasAnalizadasAlMesPorUser(){
        getAnalyzedLapsMonthlyByUser(user_id).then((vueltasAnalizadasAlMesPorUser)=>{
            setVueltasAnalizadasAlMesPorUser(vueltasAnalizadasAlMesPorUser);
            setHaRecibidoVueltasAnalizadasAlMesPorUser(true);
        })
    }

    return {vueltasAnalizadasAlMesPorUser,haRecibidoVueltasAnalizadasAlMesPorUser}

}

export default UseAnalyzedLapsMonthyUser;