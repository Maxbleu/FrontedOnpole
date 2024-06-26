//  DEPENDENCIAS
import { useNavigate } from 'react-router-dom';

//  COMPONENTES
import Sidebar from '../../componentes/Sidebar';
import AjaxLoader from '../../componentes/AjaxLoader';

//  HOOCKS
import UseUserSesion from '../../hooks/useUserSesion';

//  CONTEXTS
import { useStateContext } from '../../contexts/ContextProvider';

//  HELPERS
import {convertidorTiempoVuelta} from '../../helpers/convertidorTiempoVuelta';

const SessionsPage = () => {

    //  CONTEXT
    const {user} = useStateContext();

    //  HOOCKS
    const {userSesions, haRecibidoUserSesion} = UseUserSesion(user.id);

    //  NAVEGADOR
    const navigate = useNavigate();

    /**
     * Este método se encarga de navegar desde
     * la pagina de sessions hasta la página de
     * la sesion seleccionada por el usuario
     * @param {Event} event
     */
    function navigateToSesionSelected(event){
        navigate(`/sessions/${event.currentTarget.attributes[0].nodeValue}`);
    }

    /**
     * Este método se encarga de mostrar las sesiones
     * del usuario en la tabla
     * @param {Object} sesion
     * @param {Number} index
     * @returns {tr}
     */
    function mostrarSesiones(sesion, index){
        return <tr value={sesion.id} role="button" tabIndex="0" key={sesion.id+index} onClick={navigateToSesionSelected}>
                    <td>{sesion.fecha}</td>
                    <td>{sesion.circuito.nombre}</td>
                    <td>{sesion.coche.nombre}</td>
                    <td>{convertidorTiempoVuelta(sesion.vueltas[sesion.numero_mejor_vuelta-1].tiempo_vuelta)}</td>
                </tr>
    }

    return (

        <Sidebar>
            <div className='p-sm-5'>
                <div className='row'>

                    <div className='col-12'>

                        <h1>Your sessions</h1>

                    </div>

                </div>

                {

                    !haRecibidoUserSesion ? (

                        <AjaxLoader></AjaxLoader>

                    ) : (

                        userSesions.length > 0 ? (

                            <div className='row'>

                                <div className='col-12'>

                                    <div className='table-responsive rounded mt-3'>
                                        <table className="table table-dark table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Track</th>
                                                    <th scope="col">Car</th>
                                                    <th scope="col">Best Lap Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    userSesions.map(mostrarSesiones)
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                </div>

                            </div>

                        ) : (

                            <div className='row'>

                                <div className='col-12'>

                                    <h4>There are no sessions analyzed by the user.</h4>

                                </div>

                            </div>

                        )

                    )

                }

            </div>
        </Sidebar>

    )
}

export default SessionsPage;
