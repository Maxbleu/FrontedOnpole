//  DATA PROVIDER
import axiosClient from './../axios-client';

/**
 * Este método se encarga de enviar los datos
 * necesarios para enviar un email al email
 * de la pagina web
 * @param {object} payloadEmail 
 */
export default function postEmail(payloadEmail){
    return axiosClient.post("email",payloadEmail);
}