//  DATA PROVIDER
import axiosClient from "../axios-client";

/**
 * Este metédo se encarga de
 * borrar al usuario del en el
 * que el cliente esta registrado
 * de la pagina web
 */
export default function postDeleteUser(){
    return axiosClient.post("/user/delete")
        .then((response)=>{
            return response;
        });
}
