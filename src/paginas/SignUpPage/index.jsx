//  DEPENDENCIAS
import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

//  COMPONENTES
import AjaxLoader from './../../componentes/AjaxLoader';

//  CONTEXT
import { useStateContext } from './../../contexts/ContextProvider';

//  SERVICES
import postSignUp from '../../services/postSignUp';

//  HOOCKS
import usePaises from './../../hooks/usePaises';

const SignUpPage = () => {

    const CodeValidationError = 422;

    //  REFS
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    //  NAVEGADOR
    const navigate = useNavigate();

    //  CONTEXTS
    const {setUser, setToken} = useStateContext();

    //  HOOCKS
    const {paises, haRecibidoPaises} = usePaises("es");

    //  errorMessage
    const [errorMessage, setErrorMessage] = useState("");
    const [paisSeleccionado, setPaisSeleccionado] = useState({
        nombre : "Andorra",
        valor : "an"
    });

    /**
     * Este método se encargará de conectarse
     * con el servidor y enviar los datos
     * introducidos por el usuario para
     * registrarse en la página web
     * @param {Event} e
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        //  Recogemos los datos
        //  introducidos por el usuario
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: confirmPasswordRef.current.value,
            pais : paisSeleccionado.valor
        };

        //  Relizamos la solicitud con
        //  los datos del usuario al server

        postSignUp(payload).then((data)=>{
            setToken(data.token);
            setUser(data.user);
            navigate("/dashboard");
        }).catch((err)=>{
            const response = err.response;
            if(response && response.status === CodeValidationError){
                let errorMensaje = response.data.message.split("(")[0];
                setErrorMessage(errorMensaje);
            }
        });
    };

    /**
     * Este método se encarga de mostrar
     * las opciones de los paises
     * @param {Object}} pais
     * @param {Number} index
     * @returns {option}
     */
    function mostrarPaises(pais, index){
        return <option value={pais.valor} key={pais.valor+index+pais.nombre}>{pais.nombre}</option>
    }

    /**
     * Este método se encarga de guardar el
     * país seleccionado por el usuario
     * @param {event} event 
     */
    function insertarPaisSeleccionado(event){
        let pais = paises.filter((pais)=>{
            return pais.valor === event.target.value;
        })[0];
        setPaisSeleccionado(pais);
    }

    return (
        <div className='row mt-auto mb-auto me-0' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '90vh' }}>
            <div className='col-12'>
                <div className='row margenes-landing'>
                    <div className='col-sm-1 col-md-1 col-lg-2'></div>
                    <div className='col-12 col-sm-8 col-md-8 mx-md-5 col-lg-9 mx-lg-0'>
                        <h2>Log your account</h2>
                    </div>
                    <div className='col-sm-1 col-md-1 col-md-2'></div>
                </div>
                {
                    errorMessage !== "" ? (
                        <div className="row margenes-landing">
                            <div className='col-sm-1 col-md-1 col-lg-2'></div>
                            <div className='col-sm-10 col-md-10 col-lg-8'>
                                <div class="alert alert-danger" role="alert">
                                    {errorMessage}
                                </div>
                            </div>
                            <div className='col-sm-1 col-md-1 col-lg-2'></div>
                        </div>
                    ) : (
                        <></>
                    )
                }
                <form onSubmit={handleSubmit}>

                    <div className='row margenes-landing mt-3'>
                        <div className='col-sm-1 col-md-1 col-lg-2'></div>
                        <div className='col-sm-10 col-md-10 col-lg-8'>
                            <div className="input-group flex-nowrap ">
                                <span className="input-group-text" id="basic-addon1">
                                    <i className="bi bi-person-circle"></i>
                                </span>
                                <input type="text" ref={nameRef} className="form-control bg-transparent" placeholder="Name" />
                            </div>
                        </div>
                        <div className='col-sm-1 col-md-1 col-lg-2'></div>
                    </div>

                    <div className='row margenes-landing mt-3'>
                        <div className='col-sm-1 col-md-1 col-lg-2'></div>
                        <div className='col-sm-10 col-md-10 col-lg-8'>
                            <div className="input-group flex-nowrap ">
                                <span className="input-group-text" id="basic-addon1">
                                    <i className="bi bi-envelope-at-fill"></i>
                                </span>
                                <input type="text" ref={emailRef} className="form-control bg-transparent" placeholder="Email" />
                            </div>
                        </div>
                        <div className='col-sm-1 col-md-1 col-lg-2'></div>
                    </div>

                    <div className='row margenes-landing mt-3'>
                        <div className='col-sm-1 col-md-1 col-lg-2'></div>
                        <div className='col-sm-4 col-md-4 col-lg-3'>
                            <div className="input-group flex-nowrap ">
                                <span className="input-group-text" id="basic-addon1">
                                    <i className="bi bi-key-fill"></i>
                                </span>
                                <input type="password" ref={passwordRef}  className="form-control bg-transparent" placeholder="Password" />
                            </div>
                        </div>
                        <div className='col-sm-4 col-md-4 col-lg-3'>
                            <div className="input-group flex-nowrap mt-3 mt-sm-0">
                                <span className="input-group-text" id="basic-addon1">
                                    <i className="bi bi-key-fill"></i>
                                </span>
                                <input type="password" ref={confirmPasswordRef} className="form-control bg-transparent" placeholder="Repeat password" />
                            </div>
                        </div>
                        <div className='col-sm-2 col-md-2 col-lg-2'>
                            <select className="form-select mt-3 mt-sm-0" defaultValue="Seleccione" onChange={insertarPaisSeleccionado}>
                                {
                                    !haRecibidoPaises ? (
                                        <AjaxLoader></AjaxLoader>
                                    ) : (
                                        paises.map(mostrarPaises)
                                    )
                                }
                            </select>
                        </div>
                        <div className='col-sm-1 col-md-1 col-lg-2'></div>
                    </div>

                    <div className='row margenes-landing mt-3'>
                        <div className='col-sm-1 col-md-1 col-lg-2'></div>
                        <div className='col-sm-3 col-md-3 col-lg-2'>
                            <div className="input-group mb-3">
                                <button className="btn btn-outline-secondary w-100" type="submit" id="button-addon1">Sign Up</button>
                            </div>
                        </div>
                        <div className='col-sm-8 col-md-8 col-lg-8 text-center text-sm-start'>
                            <span className='me-3'>Do you already have an account?</span>
                            <Link to='/login' className='text-decoration-none buttonIniciarDeSignUpPage'>Log In</Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );

}

export default SignUpPage;
