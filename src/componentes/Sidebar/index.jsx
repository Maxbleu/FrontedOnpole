//  DEPENDENCIAS
import { Link, useLocation  } from 'react-router-dom';
import { useEffect, useState } from 'react';

//  IMAGENES
import LogoOnpole from './../../../public/images/logoOnpole.png';

//  CONTEXT
import { useStateContext } from '../../contexts/ContextProvider';

const Sidebar = ({children }) => {

    const {user} = useStateContext();

    const location = useLocation();

    const nombreSeccionSeleccionada = useState(((location.pathname)
    .split("/"))[1]
    .toLowerCase()
    .trim().split(' ')
    .map( v => v[0].toUpperCase() + v.substr(1) )
    .join(' '))[0];

    /**
     * Este hoock se encarga de actualizar
     * el estilo de la seccion seleccionada
     * por el usuario antes de que el componente
     * se devuelva para ser mostrado por pantalla
     */
    useEffect(() => {

        const activeClassName = "active";

        let seccionAunActiva = (document.getElementsByClassName(activeClassName))[0];

        //  Comprobamos que la seccion aun activa
        //  no es la misma que ha seleccionado el usuario
        //  y no es igual a la seccion profile
        if (seccionAunActiva === undefined || seccionAunActiva.lastChild.data !== nombreSeccionSeleccionada) {
            // Borramos el estilo de la sección en la que ya no se encuentra el usuario
            if(seccionAunActiva !== undefined){
                seccionAunActiva.classList.remove(activeClassName);
            }

            let listaSeccionesUser = Array.from(document.getElementById("listaSeccionesUser").children);

            listaSeccionesUser.forEach((obj) => {
                // Comprobamos que el nombre de la sección es igual a la seccion seleccionada
                let textoOpcion = obj.children[0].lastChild.data;

                if (textoOpcion === "Best players") {
                let partesTituloSeccion = textoOpcion.split(" ");
                textoOpcion = partesTituloSeccion[0] + partesTituloSeccion[1];
                }

                if (textoOpcion === nombreSeccionSeleccionada) {
                // Aplicamos el estilo a la sección
                obj.children[0].classList.add(activeClassName);
                }
            });
            }

        }
    )

    return (

        <div className='container-fluid p-0 d-flex'>

            <div id="bdSidebar" className="vh-100 d-flex flex-column flex-shrink-0 p-3 bg-success text-white offcanvas-md offcanvas-start sidebar">
                <span className="navbar-brand">
                    <h4 className='text-center'>Onpole</h4>
                </span>
                <hr/>
                <ul id='listaSeccionesUser' className="mynav nav nav-pills flex-column">
                    <li className="nav-item mb-1">
                        <Link to="/dashboard" className='active'>
                            <i className="bi bi-house ps-3 pe-3"></i>
                            Dashboard
                        </Link>
                    </li>
                    <li className="nav-item mb-1">
                        <Link to="/bestplayers" className="">
                        <i className="bi bi-fire ps-3 pe-3"></i>
                            Best players
                        </Link>
                    </li>
                    <li className="nav-item mb-1">
                        <Link to="/leaderboards" className="">
                            <i className="bi bi-trophy ps-3 pe-3"></i>
                            Leaderboards
                        </Link>
                    </li>
                    <li className="nav-item mb-1">
                        <Link to="/analyze" className="">
                            <i className="bi bi-bar-chart ps-3 pe-3"></i>
                            Analyze
                        </Link>
                    </li>
                    <li className="nav-item mb-1">
                        <Link to="/sessions" className="">
                            <i className="bi bi-files ps-3 pe-3"></i>
                            Sessions
                        </Link>
                    </li>
                    <li className="nav-item mb-1">
                        <Link to="/combinations" className="">
                            <i className="bi bi-car-front ps-3 pe-3"></i>
                            Combinations
                        </Link>
                    </li>
                </ul>
                <hr className='mt-auto' />
                <div className="d-flex perfilSidebar">
                    <img src="https://www.w3schools.com/bootstrap4/img_avatar1.png" className="img-fluid rounded me-2 sidebarUserImg" alt="" />
                    <Link to="/profile" className='text-decoration-none text-white'>
                        <h6 className="mt-1 mb-0">{user.name}</h6>
                        <small>{user.email}</small>
                    </Link>
                </div>
            </div>

            <div className="flex-fill">
                <div className="p-2 d-md-none d-flex text-white bg-success navbar navbar-dark">
                    <Link className="navbar-brand me-auto mx-2" to="/dashboard">
                        <img src={LogoOnpole} alt="Logo Onpole"/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#bdSidebar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>

        </div>

    )
}

export default Sidebar;
