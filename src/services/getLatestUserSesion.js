//  DATA PROVIDER
import axiosClient from "../axios-client";

/**
 * Este método se encarga de solicitar
 * al servidor la ultima sesion del usuario
 * @param {number} user_id
 * @returns {Object}
 */
export default function getLatestUserSesion(user_id) {
    return axiosClient.get(`/users/${user_id}/sesiones/latest`)
        .then((response) => {
            let latestSesion = {};
            if(response.status !== 204){
                latestSesion = response.data.data;
            }
            return latestSesion;
        });
}

