//  DEPENDENCIAS
import { Link } from 'react-router-dom';

//  IMAGES
import Logo from './../../../public/images/logoOnpole.png';

//  COMPONENTES
import ButtonGetStarted from '../ButtonGetStarted';

const Pie = () => {
    return (
        <footer className='row padding-landing'>
            <div className='col-md-4 ps-sm-4'>
                <div className="row">
                    <div className='d-flex justify-content-center justify-content-md-start'>
                        <a className="navbar-brand" href="/">
                            <img src={Logo} alt="Logo Onpole"/>
                        </a>
                        <h3 className='ms-3'>Onpole</h3>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-12 text-center text-md-start">
                        <a href="mailto:onpole@gmail.com" className="email">
                            onpole@gmail.com
                        </a>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="d-flex justify-content-center justify-content-md-start">
                        <ButtonGetStarted></ButtonGetStarted>
                    </div>
                </div>
            </div>
            <div className='col-md-8'>
                <div className="row">
                    <div className="col-md-3 mt-3 mt-md-0 text-center text-md-start">
                        <h4>Racing Cars</h4>
                        <ul>
                            <li>
                                <Link to="/brandscars/Mercedes Benz/">
                                    Mercedes Benz
                                </Link>
                            </li>
                            <li>
                                <Link to="/brandscars/Ferrari/">
                                    Ferrari
                                </Link>
                            </li>
                            <li>
                                <Link to="/brandscars/Lamborghini/">
                                    Lamborghini
                                </Link>
                            </li>
                            <li>
                                <Link to="/brandscars/Porsche/">
                                    Porsche
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 mt-3 mt-md-0 text-center text-md-start">
                        <h4>Resources</h4>
                        <ul>
                            <li>
                                <Link to="/">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/brandscars">
                                    Cars
                                </Link>
                            </li>
                            <li>
                                <Link to="/contactus">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 mt-3 mt-md-0 text-center text-md-start">
                        <h4>Sesion</h4>
                        <ul>
                            <li>
                                <Link to="/login">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup">
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 mt-3 mt-md-0 text-center text-md-start">
                        <h4>Contact</h4>
                        <ul>
                            <li>
                                onpole@gmail<br />.com
                            </li>
                            <li>
                                604 85 81 34
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Pie;
