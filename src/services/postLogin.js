//  PROVEEDOR DE DATOS
import axiosClient from './../axios-client';

/**
 * Este método se encarga de
 * enviar los datos recogidos
 * del usuario y recoger los
 * enviados del servidor
 */
export default function postLogin(payload){
    return axiosClient.post("/login", payload)
            .then(({data}) => {
                return data;
            })
            .catch(err => {
                throw err;
            });
}
