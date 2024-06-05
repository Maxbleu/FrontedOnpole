//  PROVEEDOR DE DATOS
import axiosClient from '../axios-client';

/**
 * Este método se encarga de
 * obtener todos las sesiones
 * del usuario
 */
export default function getUserSesion(userId){

    return axiosClient.get(`/users/sesiones/${userId}`)
        .then(({data}) => {
            return data.data;
        });

}
