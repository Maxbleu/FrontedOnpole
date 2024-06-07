//  DEPDENCIAS
import { useRef, useState } from 'react';

//  COMPONENTES
import BarraNavegacion from './../../componentes/BarraNavegacion';
import Pie from './../../componentes/Pie';

//  SERVICES
import postEmail from '../../services/postEmail';

const ContactUSPage = () => {

    //  USE STATES
    const [messageForm, setMessageForm] = useState("");
    const [messageFormError, setMessageFormError] = useState("");

    //  REFS
    const titleRef = useRef();
    const emailRef = useRef();
    const bodyRef = useRef();

    /**
     * Este evento se encarga de enviar 
     * los datos a laravel para enviar
     * emails
     * @param {event} event 
     */
    const handleSubmit = (event) => {
        event.preventDefault();

        const listInputs = [
            titleRef.current.value,
            emailRef.current.value,
            bodyRef.current.value
        ];

        let noEstanVacios = listInputs.every(textoInput => textoInput !== "");

        if(noEstanVacios){

            let payloadContact = {
                title : titleRef.current.value,
                email : emailRef.current.value,
                body : bodyRef.current.value
            };

            postEmail(payloadContact).then((response)=>{
                if(response.status === 200){
                    setMessageForm("Form submitted successfully.");
                }
            });

        }else{

            setMessageFormError("All fields are required.");

        }

    }

    return (
        <>
            <BarraNavegacion></BarraNavegacion>

            <div className='row margenes-landing'>
                <div className='col-md-7 col-lg-8'>
                    <iframe className='mt-5 mb-5' width="100%" height="470" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=Les%20Rambles,%201%20Barcelona,%20Spain+(Carlos%20III)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                        <a href="https://www.gps.ie/car-satnav-gps/">GPS car tracker</a>
                    </iframe>
                </div>
                <div className='col-md-5 col-lg-4'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <h2 className='mt-0 mt-sm-5'>Contact us</h2>
                        </div>
                    </div>

                    {
                        messageForm !== "" || messageFormError !== "" ? (
                            <div className='row margenes-landing'>
                                <div className='col-12'>
                                    <div class="alert alert-primary" role="alert">
                                        {messageForm !== "" ? messageForm : messageFormError}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )
                    }

                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className="input-group flex-nowrap justify-content-center">
                                <input type="text" ref={titleRef} className="form-control bg-transparent" placeholder="Title" />
                            </div>
                        </div>
                    </div>

                    <div className='row mt-4'>
                        <div className='col-sm-12'>
                            <div className="input-group flex-nowrap justify-content-center">
                                <input type="text" ref={emailRef} className="form-control bg-transparent" placeholder="Email" />
                            </div>
                        </div>
                    </div>

                    <div className='row mt-4'>
                        <div className='col-sm-12'>
                            <textarea className="form-control bg-transparent" ref={bodyRef} placeholder='Message' rows="8"></textarea>
                        </div>
                    </div>

                    <div className='row mt-4 mb-5 mb-sm-0'>
                        <div className='col-sm-12'>
                            <button className="btn btn-outline-secondary w-100" type="button" id="inputGroupFileAddon03" onClick={handleSubmit}>Enviar</button>
                        </div>
                    </div>
                </div>
            </div>

            <Pie></Pie>

        </>
    );

}

export default ContactUSPage;