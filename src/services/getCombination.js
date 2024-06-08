//  DATA PROVIDER
import axiosClient from "../axios-client"

/**
 * Este método se encarga de solicitar la
 * lista de sesiones de los usuarios que
 * han hecho una sesion con un circuito y
 * coche especifico.
 * @param {Object} payloadCombination
 * @param {number} numberPage
 * @returns {Array}
 */
export default function getCombination(payloadCombination, numberPage){
    return axiosClient.get(`/vueltas/combination/${payloadCombination.circuito_id}/${payloadCombination.coche_id}?page=${numberPage}`)
        .then((response)=>{
            return response.data;
        });
}
