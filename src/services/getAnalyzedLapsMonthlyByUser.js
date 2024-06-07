//  DATA PROVIDER
import axiosClient from "../axios-client";

/**
 * Este método se encarga de obtener todas las
 * vueltas analizadas por un usuario a lo largo
 * del año
 * @param {number} user_id 
 * @returns {Array}
 */
export default function getAnalyzedLapsMonthlyByUser(user_id){

    return axiosClient.get(`/users/${user_id}/sesiones/getLapsMonthly`)
        .then((data)=>{
            return data.data; 
        });

}