//  COMPONENTES
import BarraNavegacion from './../../componentes/BarraNavegacion';
import Pie from './../../componentes/Pie';

const ContactUSPage = () => {

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

                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className="input-group flex-nowrap justify-content-center">
                                <input type="text" className="form-control bg-transparent" placeholder="Name" />
                            </div>
                        </div>
                    </div>

                    <div className='row mt-4'>
                        <div className='col-sm-12'>
                            <div className="input-group flex-nowrap justify-content-center">
                                <input type="text" className="form-control bg-transparent" placeholder="Email" />
                            </div>
                        </div>
                    </div>

                    <div className='row mt-4'>
                        <div className='col-sm-12'>
                            <textarea className="form-control bg-transparent" placeholder='Message' rows="8"></textarea>
                        </div>
                    </div>

                    <div className='row mt-4 mb-5 mb-sm-0'>
                        <div className='col-sm-12'>
                            <button className="btn btn-outline-secondary w-100" type="button" id="inputGroupFileAddon03">Enviar</button>
                        </div>
                    </div>
                </div>
            </div>

            <Pie></Pie>

        </>
    );

}

export default ContactUSPage;