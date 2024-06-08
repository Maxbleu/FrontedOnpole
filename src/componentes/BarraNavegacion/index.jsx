//  COMPONENTES
import { Link } from 'react-router-dom';

//  IMAGES
import Logo from './../../../public/images/logoOnpole.png';

const BarraNavegacion = () => {

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

                </ul>

                <div className='navbar-nav d-flex'>
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
