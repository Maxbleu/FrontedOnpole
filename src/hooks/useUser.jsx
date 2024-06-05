//  DEPENDENCIAS
import { useEffect, useState } from "react";

//  SERVICES
import getUser from "../services/getUser";

const UseUser = (token) => {

    const [haRecibidoUser, setHaRecibidoUser] = useState(false);
    const [userHaSidoModificado, setUserHaSidoModificado] = useState(false);
    const [user, setUser] = useState({});

    useEffect(()=>{
        if(token !== null){
            obtenerUser();
        }
    },[token])

    /**
     * Este método se encarga de comprobar
     * si el objeto usuario esta vacio
     * si lo está, hacemos una petición a la db
     * y sino no hacemos nada
     */
    function obtenerUser(){
        if(JSON.stringify(user) === "{}" || userHaSidoModificado){
            getUser().then((user)=>{
                setUser(user);
                setHaRecibidoUser(true);
            });
        }
    }

    return { haRecibidoUser, user, setUser ,setUserHaSidoModificado}

}

export default UseUser;
