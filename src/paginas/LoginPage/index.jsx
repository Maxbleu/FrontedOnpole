//  DEPENDENCIAS
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//  IMAGEN
import LogoOnpole from '../../../public/images/logoOnpole.png';

//  SERVICES
import postLogin from '../../services/postLogin';

//  CONTEXT
import { useStateContext } from '../../contexts/ContextProvider';

const LoginPage = () => {

    //  CONTANTS
    const CodeValidationError = 422;

    //  NAVEGADOR
    const navigate = useNavigate();

    //  REFS
    const emailRef = useRef();
    const passwordRef = useRef();

    //  CONTEXT
    const {setToken, setUser} = useStateContext();

    //  USE STATES
    const [errorMessage, setErrorMessage] = useState("");

    /**
     * Este método se encarga de recoger
     * los datos introducidos por el usuario
     * y los envia al servidor para comprobar
     * que los datos son correctos
     * @param {Event} e
     */
    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const payload = {
            email : emailRef.current.value,
            password : passwordRef.current.value
        };

        postLogin(payload).then((data)=>{
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

    return (
        <div className='row mt-auto mb-auto me-0' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '90vh' }}>
            <div className='col-12'>
                <div className='row margenes-landing'>
                    <div className='col-sm-12 text-center'>
                        <img className="logoOnpoleLogin" src={LogoOnpole} alt="logo Onpole" />
                    </div>
                </div>

                {
                    errorMessage !== "" ? (
                        <div className='row margenes-landing mt-3'>
                            <div className='col-md-2 col-lg-4'></div>
                            <div className='col-md-8 col-lg-4'>
                                <div class="alert alert-danger" role="alert">
                                    {errorMessage}
                                </div>
                            </div>
                            <div className='col-md-2 col-lg-4'></div>
                        </div>
                    ) : (
                        <></>
                    )
                }

                <form onSubmit={handleLogin}>

                    <div className={`row margenes-landing ${errorMessage === "" ? "mt-4" : "" }`}>
                        <div className='col-md-2 col-lg-4'></div>
                        <div className='col-md-8 col-lg-4'>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">
                                    <i className="bi bi-person-circle"></i>
                                </span>
                                <input type="text" ref={emailRef} className="form-control bg-transparent" placeholder="Email" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className='col-md-2 col-lg-4'></div>
                    </div>

                    <div className='row margenes-landing'>
                        <div className='col-md-2 col-lg-4'></div>
                        <div className='col-md-8 col-lg-4'>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">
                                    <i className="bi bi-key-fill"></i>
                                </span>
                                <input type="password" ref={passwordRef} className="form-control bg-transparent" placeholder="Password" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className='col-md-2 col-lg-4'></div>
                    </div>

                    <div className='row margenes-landing'>
                        <div className='col-0 col-md-2 col-lg-4'></div>
                        <div className='col-12 col-md-8 col-lg-4'>
                            <div className="input-group d-flex justify-content-start justify-content-sm-end">
                                <button className="btn btn-outline-secondary buttonAccederLogin" type="submit" id="button-addon1">Acceder</button>
                            </div>
                        </div>
                        <div className='col-0 col-md-2 col-lg-4'></div>
                    </div>

                </form>
            </div>
        </div>
    );

}

export default LoginPage;
