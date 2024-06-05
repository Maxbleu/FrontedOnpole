//  PROVEEDOR DE DATOS
import axiosClient from './../axios-client';

/**
 * Este método se encarga de
 * enviar el fichero json de
 * la sesion del usuario al
 * servidor para leerlo y
 * almacenar los datos de esta.
 */
export default function postSesion(payloadSesion){

    return axiosClient.post("/sesiones/insert",{ json: payloadSesion })
        .then(({data}) => {
            return data.sesion_id;
        });

}
