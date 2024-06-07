//  DATA PROVIDER
import axiosClient from "../axios-client";

/**
 * Este método se encarga de pedir a
 * la api las estadísticas de un usuario
 * en la web
 * @param {Number} user_id
 * @returns {Object}
 */
export default function getUserEstadisticas(user_id){
    return axiosClient.get(`/users/${user_id}/estadistica`)
        .then(({data})=>{
            return data.data;
        });
}
