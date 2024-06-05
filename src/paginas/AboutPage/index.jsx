//  COMPONENTES
import BarraNavegacion from './../../componentes/BarraNavegacion';
import Pie from './../../componentes/Pie';

const AboutPage = () => {

    return (
        <>
            <BarraNavegacion></BarraNavegacion>

            <div className='row margenes-landing text-center margenesAbout'>
                <div className='col-ms-12'>
                    <h1>Our mission: <br /> have fun driving</h1>
                </div>
            </div>

            <div className='row margenes-landing'>
                <div className='col-sm-6'>
                    <h2>
                        With our tools <br />
                        you will be much <br />
                        faster
                    </h2>
                </div>
                <div className='col-sm-6'>
                    <img className='w-100 rounded' src="./images/FerrariNurburgring.png" alt="" />
                </div>
            </div>

            <div className='row margenes-landing margenesSeccionesTrack d-flex'>
                <div className='col-sm-6 order-2 order-sm-1'>
                    <img className="w-100" src='./images/fotoCircuitos.png' alt="" />
                </div>
                <div className='col-sm-6 order-1 order-sm-2'>
                    <h2>Only for <br /> Assetto Corsa</h2>
                    <p className='textoSecundarioCabecera'>Enjoy in Nordschleife, Spa, Silverstone, <br /> Monza, Red Bull Ring, Imola and <br /> much more.</p>
                </div>
            </div>

            <Pie></Pie>
        </>
    );

}

export default AboutPage;