//  PROVEEDOR DE DATOS
import axiosClient from './../axios-client';

/**
 * Este método se encarga de
 * enviar los datos recogidos
 * del usuario y recoger los
 * enviados del servidor
 */
export default function postSignUp(payload){
    return axiosClient.post("/signup", payload)
            .then(({data}) => {
                return data;
            })
            .catch(err => {
                return err;
            });
}
