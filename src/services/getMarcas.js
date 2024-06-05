//  PROVEEDOR DE DATOS
import axiosClient from './../axios-client';

/**
 * Este método se encarga de
 * obtener todos las marcas
 * de coches
 */
export default function getMarcas(){

    return axiosClient.get("/marcas")
        .then(({data}) => {
            return data.data;
        });

}
