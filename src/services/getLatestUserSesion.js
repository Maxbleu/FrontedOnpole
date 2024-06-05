//  DATA PROVIDER
import axiosClient from "../axios-client";

/**
 * Este método se encarga de solicitar
 * al servidor la ultima sesion del usuario
 * @param {number} user_id
 * @returns {Object}
 */
export default function getLatestUserSesion(user_id) {
    return axiosClient.get(`/users/sesiones/${user_id}/latest`)
        .then((response) => {
            let latestSesion = {};
            if(typeof response.data === 'object'){
                latestSesion = response.data.data;
            }
            return latestSesion;
        });
}

