//  DEPENDENCIAS
import { useEffect, useState } from "react";

//  SERVICES
import getCombination from "../services/getCombination";
import { createPath } from "react-router-dom";

//  EXPLICACION
//  Este hoock se encarga de obtener la lista
//  de vueltas en una combinacion especifica
//  la cual, solo será solicitada cuando el objeto
//  payloadCombination tenga datos y cuando el usuario
//  solicite más datos de esta combinacion para la siguiente
//  pagina
const UseCombination = (payloadCombination, numberPage) => {

    const [combination, setCombination] = useState([]);
    const [haRecibidoCombination, setHaRecibidoCombination] = useState(false);
    const [meta, setMeta] = useState({});

    /**
     * Este hoock solo se ejecutará 
     * inicialmente ya que, payloadCombination y numberPage,
     * tienen valores por defecto y cuando sea modificado
     * la combinacion y si el usuario solicita los datos
     * de la siguiente página
     */
    useEffect(()=>{
        //  Solicitamos la lista de vueltas de la combinacion
        obtenerCombination();
    },[payloadCombination, numberPage])

    /**
     * Este método se encarga de obtener una lista de
     * vueltas de la combinacion seleccionada por el 
     * ussuario
     */
    function obtenerCombination(){
        //  Comprobamos el objeto meta está vacio ya que,
        //  solo estará vacio en la primera ejecucción y
        //  si no es la última pagina de la lista
        if(JSON.stringify(meta) === "{}" || meta.current_page !== meta.last_page || payloadCombination){
            //  Obtenemos la lista de vueltas en la 
            //  combinacion en la pagina que ha solicitado el usuario
            getCombination(payloadCombination,numberPage).then((combinationLeaderboard)=>{
                //  Comprobamos que los datos recibidos de la base de datos no están vacios
                if(combinationLeaderboard.data.length !== 0){
                    //  Comprobamos si en la lista de vueltas de la combinación
                    //  hay vueltas, 
                    if(combination.length!==0){
                        //  Comprobamos si las vueltas de la combinacion solicitadas son
                        //  de la misma combinacion de las vueltas de lista de combinacion
                        if(combinationLeaderboard.data[0].coche_id === combination[0].coche_id &&
                            combinationLeaderboard.data[0].circuito_id === combination[0].circuito_id){
                            //  Concatenamos la lista de vueltas de la combinacion ya solicitados
                            //  con la lista que acabamos de recibir
                            setCombination(combination.concat(combinationLeaderboard.data));
                        }else{
                            //  Insertamos las vueltas de la combinacion
                            setCombination(combinationLeaderboard.data);
                        }
                    }else{
                        //  Insertamos las vueltas de la combinacion
                        setCombination(combinationLeaderboard.data);
                    }
                }else{
                    //  Insertamos las vueltas de la combinacion
                    setCombination(combinationLeaderboard.data);
                }
                //  Guardamos el objeto meta para saber información sobre la página
                setMeta(combinationLeaderboard.meta);
                //  Indicamos que hemos rebicido la 
                //  lista de vueltas de la combinación
                setHaRecibidoCombination(true);
            });
        }
    }

    return {combination, haRecibidoCombination, meta}

}

export default UseCombination;
