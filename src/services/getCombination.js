//  DATA PROVIDER
import axiosClient from "../axios-client"

/**
 * Este método se encarga de solicitar la
 * lista de sesiones de los usuarios que
 * han hecho una sesion con un circuito y
 * coche especifico.
 * @param {Object} payloadCombination
 * @returns {Array}
 */
export default function getCombination(payloadCombination){
    return axiosClient.get(`/sesiones/combination/${payloadCombination.circuito_id}/${payloadCombination.coche_id}`)
        .then(({data})=>{
            return data.data;
        });
}
