//  DATA PROVIDER
import axiosClient from '../axios-client';

/**
 * Este método se encarga de enviar los
 * datos del usuario a actualizar
 * @param {Object} payloadUser
 * @returns {response}
 */
export default function putUser(payloadUser){
    return axiosClient.put("/update",payloadUser)
        .then((response)=>{
            return response;
        });
}
