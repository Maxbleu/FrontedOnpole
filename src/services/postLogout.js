//  DATA PROVIDER
import axiosClient from "../axios-client";

/**
 * Este método se encarga de
 * cerrar la sesión del usuario
 * @returns {response}
 */
export default function postLogout(){
    return axiosClient.post("/logout")
        .then((response)=>{
            return response;
        });
}
