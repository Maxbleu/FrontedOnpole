//  DEPENDECIAS
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//  COMPONENTES
import Sidebar from '../../componentes/Sidebar';

//  CONTEXTS
import { useStateContext } from '../../contexts/ContextProvider';

//  SERVICES
import postLogout from '../../services/postLogout';
import postDeleteUser from '../../services/postDeleteUser';
import putUser from '../../services/putUser';

const SettingsPage = () => {

    //  CONTEXTS
    const {user, setToken, setUser, setUserHaSidoModificado, userHaSidoModificado, setCsrfToken} = useStateContext();

    //  NAVEGADOR
    const navigate = useNavigate();

    //  USE STATES
    const [isDisabledInputsSecurity, setIsDisabledInputsSecurity] = useState(true);
    const [isDisabledInputsAccount, setIsDisabledInputsAccount] = useState(true);

    const [mensageAccount, setMessageAccount] = useState("");
    const [mensageSecurityContraseñasNoCoinciden, setMensageSecurityContraseñasNoCoinciden] = useState("");
    const [mensageSecurityContraseñasActualizadas, setMensageSecurityContraseñasActualizadas] = useState("");

    //  USE REFS
    const userNameRef = useRef();
    const emailRef = useRef();
    const newPasswordRef = useRef();
    const confirmNewPasswordRef = useRef();

    //  CONTANST
    const ESTILOS_INPUTS_ACCOUNT = {
        borderColor : isDisabledInputsAccount ? '#999999' : '#40be44'
    };
    const ESTILOS_INPUTS_SECURITY = {
        borderColor : isDisabledInputsSecurity ? '#999999' : '#40be44'
    };

    /**
     * Este método se encarga de actualizar la
     * información del perfil del usuario
     * @param {event} event
     */
    function actualizarPerfil(event){
        event.preventDefault();

        let payloadUser = {};
        const refs = {
            name : userNameRef.current.value === user.name ? "" : userNameRef.current.value,
            email : emailRef.current.value === user.email ? "" : emailRef.current.value,
            password : newPasswordRef.current.value
        };

        let columnas = Object.keys(refs);
        for(let iterador = 0; iterador<columnas.length; iterador++){
            if(refs[columnas[iterador]] !== ""){
                if(columnas[iterador] !== "password"){
                    payloadUser[columnas[iterador]] = refs[columnas[iterador]];
                }else{
                    if(refs[columnas[iterador]] === confirmNewPasswordRef.current.value){
                        payloadUser[columnas[iterador]] = refs[columnas[iterador]];
                    }else{
                        setMensageSecurityContraseñasNoCoinciden("The passwords do not match")
                    }
                }
            }
        }

        if(JSON.stringify(payloadUser) !== "{}"){
            putUser(payloadUser).then((response)=>{
                if(response.status === 200){
                    if(columnas[0] in payloadUser || columnas[1] in payloadUser){
                        setUserHaSidoModificado(true);
                        setMessageAccount("The data has been updated");
                        setIsDisabledInputsAccount(true);
                    }else if(columnas[2]){
                        setMensageSecurityContraseñasActualizadas("The passwords have been updated.");
                        setIsDisabledInputsSecurity(true);
                    }
                }
            });
        }
    }

    /**
     * Este método se encarga de eliminar
     * cuenta de un usuario
     * @param {event} event
     */
    function eliminarCuenta(event){
        postDeleteUser().then((response)=>{
            if(response.status){
                setToken(null);
                setCsrfToken("");
                setUser({});
            }
        });
        navigate("/");
    }

    /**
     * Este método se encarga de
     * a través del boton que clica
     * el usuario poder cerrar la sesión
     * de este
     * @param {event} event
     */
    function signOut(event){
        event.preventDefault();
        postLogout().then((response)=>{
            if(response.status === 200){
                setToken(null);
                setCsrfToken("");
            }
        });
        navigate("/");
    }

    /**
     * Este hoock se ejecuta solo
     * en el primer renderizado del
     * componente padre y cuando
     * userHaSidoModificado sea true
     */
    useEffect(()=>{
        setUserHaSidoModificado(false);
    },[userHaSidoModificado])

    return (

        <Sidebar>
            <div className='row p-sm-5'>
                <div className='col-12'>
                    <div className='row mb-3'>
                        <div className='col-12'>
                            <h2>Settings</h2>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='row mb-2 mb-sm-3'>
                                <div className='col-12 col-sm-9 col-md-10 col-lg-10'>
                                    <h3>Account</h3>
                                </div>
                                <div className='col-12 col-sm-3 col-md-2 col-lg-2 text-end mt-2'>
                                    <button className="btn btn-outline-secondary w-100" type="button" id="inputGroupFileAddon03" onClick={()=>{ setIsDisabledInputsAccount(!isDisabledInputsAccount)}}>Edit</button>
                                </div>
                            </div>
                            {
                                mensageAccount === "" ? (
                                    <></>
                                ) : (
                                    <div className='row mb-2 mb-sm-3'>
                                        <div className='col-12'>
                                            <div className="alert alert-primary" role="alert">
                                                {mensageAccount}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div className='row'>
                                <div className='col-12'>
                                    <div className="input-group flex-nowrap justify-content-center mb-3">
                                        <input ref={userNameRef} type="text" className="form-control bg-transparent" style={ESTILOS_INPUTS_ACCOUNT} defaultValue={user.name} disabled={isDisabledInputsAccount} />
                                    </div>
                                </div>
                            </div>
                            <div className='row mb-2 mb-sm-3'>
                                <div className='col-12'>
                                    <div className="input-group flex-nowrap justify-content-center">
                                        <input ref={emailRef} type="text" className="form-control bg-transparent" style={ESTILOS_INPUTS_ACCOUNT} defaultValue={user.email} disabled={isDisabledInputsAccount} />
                                    </div>
                                </div>
                            </div>
                            <div className='row '>
                                <div className='col-0 col-sm-8 col-md-8 col-lg-10'></div>
                                <div className='col-12 col-sm-4 col-md-4 col-lg-2'>
                                    <button className="btn btn-outline-secondary w-100" type="button" id="inputGroupFileAddon03" disabled={isDisabledInputsAccount} onClick={actualizarPerfil}>Enviar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='row mt-3 mb-2 mb-sm-3'>
                                <div className='col-12 col-sm-9 col-md-10 col-lg-10'>
                                    <h3>Security</h3>
                                </div>
                                <div className='col-12 col-sm-3 col-md-2 col-lg-2 text-end mt-2'>
                                    <button className="btn btn-outline-secondary w-100" type="button" id="inputGroupFileAddon03" onClick={()=>{setIsDisabledInputsSecurity(!isDisabledInputsSecurity)}}>Edit</button>
                                </div>
                            </div>
                            {
                                mensageSecurityContraseñasNoCoinciden === "" ? (
                                    mensageSecurityContraseñasActualizadas !== "" ? (
                                        <div className="alert alert-primary" role="alert">
                                            {mensageSecurityContraseñasActualizadas}
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                ) : (
                                    <div className='row mb-3'>
                                        <div className='col-12'>
                                            <div className="alert alert-danger" role="alert">
                                                {mensageSecurityContraseñasNoCoinciden}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div className='row mb-2'>
                                <div className='col-12'>
                                    <div className="input-group flex-nowrap justify-content-center">
                                        <input ref={newPasswordRef} type="password" placeholder='Enter a new password' className="form-control bg-transparent" style={ESTILOS_INPUTS_SECURITY} disabled={isDisabledInputsSecurity} />
                                    </div>
                                </div>
                            </div>
                            <div className='row mb-2'>
                                <div className='col-12'>
                                    <div className="input-group flex-nowrap justify-content-center">
                                        <input ref={confirmNewPasswordRef} type="password" placeholder='Confirm your new password' className="form-control bg-transparent" style={ESTILOS_INPUTS_SECURITY} disabled={isDisabledInputsSecurity} />
                                    </div>
                                </div>
                            </div>
                            <div className='row '>
                                <div className='col-0 col-sm-8 col-md-8 col-lg-10'></div>
                                <div className='col-12 col-sm-4 col-md-4 col-lg-2'>
                                    <button className="btn btn-outline-secondary w-100" type="button" id="inputGroupFileAddon03" disabled={isDisabledInputsSecurity} onClick={actualizarPerfil}>Enviar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='row mb-2 mb-sm-3'>
                                <div className='col-12 col-sm-9 col-md-10 col-lg-10'>
                                    <h3>Sesion</h3>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className="input-group flex-nowrap justify-content-center mb-3">
                                        <button className="btn btn-outline-secondary w-100" type="button" id="inputGroupFileAddon03" onClick={signOut}>Sign out</button>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className="input-group flex-nowrap justify-content-center">
                                        <button className="btn btn-outline-secondary w-100" type="button" id="inputGroupFileAddon03" onClick={eliminarCuenta}>Delete account</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Sidebar>

    )
}

export default SettingsPage;
