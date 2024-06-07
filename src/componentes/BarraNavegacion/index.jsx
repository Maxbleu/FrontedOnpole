//  COMPONENTES
import { Link } from 'react-router-dom';

//  IMAGES
import Logo from './../../../public/images/logoOnpole.png';

//  CONTEXTS
import { useStateContext } from '../../contexts/ContextProvider';

const BarraNavegacion = () => {

    const {setIdioma} = useStateContext();

    function insertarIdiomaSeleccionado(event){
        
    }

    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top rounded-0">

            <Link className="navbar-brand me-auto mx-2" to="/">
                <img src={Logo} alt="Logo Onpole"/>
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse pe-0 ps-0" id="collapsibleNavbar">

                <ul className="navbar-nav me-auto">

                    <li className="nav-item">
                        <Link className="nav-link text-decoration-none" to="/about">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-decoration-none" to="/brandscars">Cars</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-decoration-none" to="/contactus">Contact us</Link>
                    </li>

                </ul>

                <div className='navbar-nav d-flex'>
                    <div className='d-flex'>
                        <img value={"es"} onClick={insertarIdiomaSeleccionado} role="button" className='mt-2 mb-2 me-2 rounded-1' src="https://flagcdn.com/w40/es.webp" alt="Logo de banderas de España" />
                        <img value={"en"} onClick={insertarIdiomaSeleccionado} role="button" className='mt-2 mb-2 rounded-1' src="https://flagcdn.com/w40/gb.webp" alt="Logo de banderas de Gran Bretaña" />
                    </div>
                    <div className='nav-item'>
                        <Link className="nav-link text-decoration-none" to="/signup">Sign Up</Link>
                    </div>
                    <div className='nav-item buttonLogin rounded-1 me-sm-2'>
                        <Link className="nav-link text-decoration-none fw-bold text-center text-sm-start" to="/login">Login</Link>
                    </div>
                </div>

            </div>
        </nav>
    )

}

export default BarraNavegacion;
