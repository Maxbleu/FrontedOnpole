//  PROVEEDOR DE DATOS
import axiosClient from '../axios-client';

/**
 * Este método se encarga de
 * obtener el usuario logueado
 */
export default function getUser(){

    return axiosClient.get(`/user`)
        .then(({data}) => {
            return data.data;
        });

}
