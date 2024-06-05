//  PROVEEDOR DE DATOS
import axiosClient from './../axios-client';

/**
 * Este método se encarga de
 * obtener todos los coches
 * de todas las marcas
 */
export default function getCoches(){

    return axiosClient.get("/coches")
        .then(({data}) => {
            return data.data;
        });

}
