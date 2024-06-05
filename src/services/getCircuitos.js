//  PROVEEDOR DE DATOS
import axiosClient from './../axios-client';

/**
 * Este método se encarga de
 * obtener todos los circuitos
 * de la página
 */
export default function getCircuitos(){

    return axiosClient.get("/circuitos")
        .then(({data}) => {
            return data.data;
        });

}
