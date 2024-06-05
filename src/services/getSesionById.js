//  DATA PROVIDER
import axiosClient from "../axios-client";

/**
 * Este métodod se encarga de obtener
 * la sesion por el numero de la sesion
 * @param {Number} sesionId
 */
export default function getSesionById(sesionId){

    return axiosClient.get(`/sesiones/${sesionId}`)
        .then(({data})=>{
            return data.data;
        });

}
