//  SERVICES
import getCsrfToken from "../services/getCsrfgToken";

//  EXPLICACION
//  Este hoock se encarga de obtener
//  el csrf token de la base de datos
const UseCsrfToken = () => {

    /**
     * Este método se encarga 
     * de insertar el csrf token
     * @param {csrfToken} csrfToken 
     */
    function setCsrfToken(csrfToken){
        //  Comprobamos que no está vacio
        if(csrfToken){
            //  Lo guardamos en localstorage
            localStorage.setItem("CSRF_TOKEN", csrfToken);
        }else{
            //  Lo borramos del localstorage
            localStorage.removeItem("CSRF_TOKEN");
        }
    }

    /**
     * Este método se encarga de obtener
     * el csrf token
     */
    function obtenerCsrfToken(){
        //  Solicitamos al servidor el csrf token
        getCsrfToken().then((csrfToken)=>{
            //  Guardamos el csrf token
            setCsrfToken(csrfToken);
        })
    }

    return {obtenerCsrfToken}

}

export default UseCsrfToken;