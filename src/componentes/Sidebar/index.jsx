//  DEPENDENCIAS
import { Link, useLocation  } from 'react-router-dom';
import { useEffect, useState } from 'react';

//  IMAGENES
import LogoOnpole from './../../../public/images/logoOnpole.png';

const Sidebar = ({children }) => {

    const location = useLocation();

    const nombreSeccionSeleccionada = useState(((location.pathname)
    .split("/"))[1]
    .toLowerCase()
    .trim().split(' ')
    .join(' '))[0];

    /**
     * Este hoock se encarga de actualizar
     * el estilo de la seccion seleccionada
     * por el usuario antes de que el componente
     * se devuelva para ser mostrado por pantalla
     */
    useEffect(() => {

            const activeClassName = "active";
            const seccionPerfil = "perfilSeccion";

            let seccionAunActiva = (document.getElementsByClassName(activeClassName))[0];
            let seccionPerfilObj = (document.getElementsByClassName(seccionPerfil))[0];

            let nombreSeccionAunActiva;
            if(!seccionPerfilObj.attributes[0].value.includes(activeClassName)){
                nombreSeccionAunActiva = seccionAunActiva.attributes[2].nodeValue.split("/")[1];
            }

            //  Comprobamos que la seccion aun activa
            //  no es la misma que ha seleccionado el usuario
            //  y no es igual a la seccion profile
            if (seccionAunActiva === undefined || nombreSeccionAunActiva !== nombreSeccionSeleccionada) {
                // Borramos el estilo de la sección en la que ya no se encuentra el usuario

                if(seccionAunActiva !== undefined){
                    seccionAunActiva.classList.remove(activeClassName);
                }else{
                    if(nombreSeccionAunActiva === "profile"){
                        seccionPerfilObj.children[0].remove(activeClassName);
                    }
                }

                if(nombreSeccionSeleccionada !== "profile"){
                    let listaSeccionesUser = Array.from(document.getElementById("listaSeccionesUser").children);
                    let enlaceSeccionSeleccionada = (listaSeccionesUser.find((seccion)=>{
                        return seccion.firstChild.attributes[2].nodeValue === `/${nombreSeccionSeleccionada}`;
                    })).firstChild;

                    listaSeccionesUser.forEach((obj) => {
                        // Comprobamos que el nombre de la sección es igual a la seccion seleccionada
                        let numeroEnlaceSeccion = parseInt(obj.children[0].attributes[1].value);
                        if (numeroEnlaceSeccion === parseInt(enlaceSeccionSeleccionada.attributes[1].value)) {
                        // Aplicamos el estilo a la sección
                            obj.children[0].classList.add(activeClassName);
                        }
                    });
                }else{
                    if(nombreSeccionSeleccionada === "profile"){
                        seccionPerfilObj.classList.add(activeClassName);
                    }
                }
            }

        }
    )

    return (

        <div className='container-fluid p-0 d-flex'>

            <div id="bdSidebar" className="vh-100 d-flex flex-column flex-shrink-0 p-3 bg-success text-white offcanvas-md offcanvas-start sidebar">
                <span className="navbar-brand text-center">
                    <h4 className='text-center'>OP</h4>
                </span>
                <hr/>
                <ul id='listaSeccionesUser' className="mynav nav nav-pills flex-column">
                    <li className="nav-item mb-1">
                        <Link to="/dashboard" className='active' value={1}>
                            <i className="bi bi-house ps-3 pe-3"></i>
                        </Link>
                    </li>
                    <li className="nav-item mb-1">
                        <Link to="/bestplayers" className="" value={2}>
                        <i className="bi bi-fire ps-3 pe-3"></i>
                        </Link>
                    </li>
                    <li className="nav-item mb-1">
                        <Link to="/leaderboards" className="" value={3}>
                            <i className="bi bi-trophy ps-3 pe-3"></i>
                        </Link>
                    </li>
                    <li className="nav-item mb-1">
                        <Link to="/analyze" className="" value={4}>
                            <i className="bi bi-bar-chart ps-3 pe-3"></i>
                        </Link>
                    </li>
                    <li className="nav-item mb-1">
                        <Link to="/sessions" className="" value={5}>
                            <i className="bi bi-files ps-3 pe-3"></i>
                        </Link>
                    </li>
                    <li className="nav-item mb-1">
                        <Link to="/combinations" className="" value={6}>
                            <i className="bi bi-car-front ps-3 pe-3"></i>
                        </Link>
                    </li>
                </ul>
                <hr className='mt-auto' />
                <div className="d-flex">
                    <Link to="/profile" className='text-decoration-none text-white perfilSeccion'>
                        <i className="bi bi-person-circle ps-3 pe-3"></i>
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
