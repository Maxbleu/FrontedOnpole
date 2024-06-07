//  COMPONENTES
import BarraNavegacion from './../../componentes/BarraNavegacion';
import RotadorMarcasCoches from './../../componentes/RotadorMarcasCoches';
import Pie from '../../componentes/Pie';
import ButtonGetStarted from '../../componentes/ButtonGetStarted';
import Carrusel from '../../componentes/Carrusel';
import CartaTestimonio from '../../componentes/CartaTestimonio';
import CartaApp from '../../componentes/CartaApp';

//  MOCKS
import testimonios from '../../mocks/mock-testimonio';
import apps from '../../mocks/mock-apps';

//  IMAGES
import LogoAssetto from './../../../public/images/logoAssetto.png';

//  CONTEXTS
import { useStateContext } from '../../contexts/ContextProvider';

const HomePage = () => {

    const {idioma, mockIdioma} = useStateContext();

    /**
     * Este método se encargará de
     * mostrar todas las cartas de
     * los testimonios en la página
     * @param value
     * @param index
     * @returns {CartaTestimonio}
     */
    function mostrarCartaTestimonio(value, index){
        return <CartaTestimonio
            key={index+value.nombre}
            nombre={value.nombre}
            comentario={value.comentario}
            nombreFotoPerfil={value.nombreFotoPerfil}
            profesion={value.profesion}></CartaTestimonio>
    }

    /**
     * Este método se encargará de
     * mostrar todas las cartas de
     * las apps en la página
     * @param value
     * @param index
     * @returns {CartaApp}
     */
    function mostrarCartaApp(value, index){
        return <CartaApp
            key={index+value.nombre}
            nombre={value.nombre}
            foto={value.foto}
            descripcion={value.descripcion}></CartaApp>
    }

    return (

        <>
            <BarraNavegacion></BarraNavegacion>

            <header className='row margenes-landing'>
                <div className='col-md-12'>

                    <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                            <h1 className='tituloHome'>
                                Enjoy the speed,<br />
                                driving to the limit.
                            </h1>
                            <p className='textoSecundarioCabecera'>
                                Compare your best fastest laps <br />
                                and enjoy the best services to improve <br />
                                in
                            </p>
                            <img src={LogoAssetto} className='logoAssettoCorsa' alt="Log de Assetto Corsa" />
                            <ButtonGetStarted></ButtonGetStarted>
                        </div>
                        <div className='col-md-6 col-sm-0'>
                            <div>

                            </div>
                        </div>
                    </div>

                </div>
            </header>

            <div className='row rotadorMarcasCoches margenes-landing'>
                <div className='col-sm-12'>
                    <h3>Racing Brands</h3>
                    <RotadorMarcasCoches></RotadorMarcasCoches>
                </div>
            </div>

            <section className='row seccionMasQueUnaPaginaRanking margenes-landing'>
                <div className='col-sm-5'>
                    <h2>
                        Daily random <br />
                        combinations
                    </h2>
                    <p className='textoSecundarioSeccion'>
                        From sports cars, historic to even <br />
                        street cars, along with the most <br />
                        legendary circuits in history.
                    </p>
                    <div className='mt-5 mb-5 mb-sm-0'>
                        <ButtonGetStarted></ButtonGetStarted>
                    </div>
                </div>

                <div className='col-sm-7'>
                    <Carrusel></Carrusel>
                </div>
            </section>

            <section className='row seccionStast padding-landing'>
                <div className='col-md-3 col-sm-4 text-center'>
                    <h2>+20</h2>
                    <h4>Circuits avaleible</h4>
                </div>
                <div className='col-md-3 col-sm-4 text-center'>
                    <h2>+4</h2>
                    <h4>Types circuits</h4>
                </div>
                <div className='col-md-3 col-sm-4 text-center'>
                    <h2>+120</h2>
                    <h4>Cars avaleible</h4>
                </div>
                <div className='col-md-3 col-sm-4 text-center'>
                    <h2>+10</h2>
                    <h4>F1 and classics F1's</h4>
                </div>
            </section>

            <section className='row seccionApps margenes-landing'>
                <div className='col-sm-5 col-lg-6'>
                    <h2>
                        Apps externas para <br />
                        la comunidad
                    </h2>
                    <p className='mb-5 mb-sm-0 textoSecundarioApp'>
                        We also provide our consumers with <br />
                        external apps for the enjoyment of <br />
                        Assetto Corsa and to analyze <br />
                        your sessions.
                    </p>
                </div>

                <div className='col-sm-7 col-lg-6'>
                    {
                        apps.map(mostrarCartaApp)
                    }
                </div>
            </section>

            <section className='row seccionTestimonios margenes-landing'>

                <div className='col-md-12'>

                    <div className='row'>

                        <div className='col-md-12 text-center'>

                            <h2>Testimony</h2>

                        </div>

                    </div>

                    <div className='row mt-5'>

                        {
                            testimonios.map(mostrarCartaTestimonio)
                        }

                    </div>

                </div>

            </section>

            <Pie></Pie>

        </>
        );

}

export default HomePage;
