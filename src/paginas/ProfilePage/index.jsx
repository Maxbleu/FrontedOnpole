//  DEPENDENCIAS
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//  COMPONENTES
import Sidebar from '../../componentes/Sidebar';
import AjaxLoader from '../../componentes/AjaxLoader';

//  CONTEXT
import { useStateContext } from '../../contexts/ContextProvider';

//  HOOCKS
import UseUserEstadisticas from '../../hooks/useUserEtadisticas';
import UseLatestUserSesion from '../../hooks/useLatestUserSesion';

//  HELPERS
import obtenerImagenCoche from '../../helpers/proveedorImagenes';

const ProfilePage = () => {

    const {user} = useStateContext();
    const [fechaMember, setFechaMember] = useState("");
    const [acronimoToUpperCase, setAcronimoToUpperCase] = useState("");
    const [imagenCocheUltimaSesion, setImagenCocheUltimaSesion] = useState("");

    const {estadisticas, haRebicibidoUserEstadisticas} = UseUserEstadisticas(user.id);
    const {latestSesion, haRecibidoLaUltimaSesionUsuario} = UseLatestUserSesion(user.id);

    const navigate = useNavigate();

    /**
     * Este método se encarga de
     * navegar hacia la pagina de settings
     */
    function navegarASettingsPage(event){
        event.preventDefault();

        navigate("settings");
    }

    useEffect(()=>{
        if(JSON.stringify(latestSesion) !== "{}"){
            setImagenCocheUltimaSesion(obtenerImagenCoche(latestSesion));
        }
    },[haRecibidoLaUltimaSesionUsuario])

    useEffect(()=>{
        if(JSON.stringify(user) !== "{}"){
            let fecha = user.created_at.split("T")[0];
            let fechaSplited = fecha.split("-");
            setFechaMember(`${fechaSplited[2]}/${fechaSplited[1]}/${fechaSplited[0]}`);
            setAcronimoToUpperCase(user.acronimo.toUpperCase());
        }
    },[user])

    return (

        <Sidebar>
            <div className='row'>
                <div className='col-12'>
                    <div className='row fondoCabeceraPerfil m-sm-3 border rounded'>
                        <div className='col-12'>
                            <div className='row'>
                                <div className='col-12 text-end'>
                                    <i className="bi bi-gear" onClick={navegarASettingsPage} role="button" tabIndex="0"></i>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6 col-sm-4 col-md-4 col-lg-2 text-center'>
                                    <img className="fotorPerfil rounded-circle" src="https://www.w3schools.com/bootstrap4/img_avatar1.png" alt="Imagen perfil" />
                                </div>
                                <div className='col-6 col-sm-8 col-md-8 col-lg-10'>
                                    <div color='row'>
                                        <div className='col-12'>
                                            <span className='fs-2 fw-bold'>{user.name}</span>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-3 col-sm-3 col-md-4'>
                                            {
                                                JSON.stringify(user) === "{}" ? (
                                                    <AjaxLoader></AjaxLoader>
                                                ) : (
                                                    <img className='fotoBanderaPerfil rounded' src={`https://flagcdn.com/w80/${user.pais}.webp`} alt="Bandera del usuario" />
                                                )
                                            }
                                        </div>
                                        <div className='col-9 col-sm-9 col-md-8 '></div>
                                    </div>
                                    <div color='row'>
                                        <div className='col-12'>
                                            <span className='fs-2 fw-bold'>{acronimoToUpperCase}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12 text-end'>
                                    <span>Member since: <br /> {fechaMember}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row m-sm-3 pt-5'>
                        <div className='col-sm-12'>
                            <div className='row'>
                                <div className='col-12'>
                                    <h3>Stadistics</h3>
                                </div>
                            </div>
                            {
                                !haRebicibidoUserEstadisticas ? (
                                    <AjaxLoader></AjaxLoader>
                                ) : (
                                    <div className='row border rounded text-center'>
                                        <div className='col-12'>
                                            <div className='row mt-2'>
                                                <div className='col'>
                                                    <span>Lap record</span>
                                                </div>
                                                <div className='col'>
                                                    <span>Hot laps</span>
                                                </div>
                                                <div className='col'>
                                                    <span>Total sesions</span>
                                                </div>
                                                <div className='col'>
                                                    <span>Total laps</span>
                                                </div>
                                            </div>
                                            <div className='row text-center'>
                                                <div className='col'>
                                                    <h2>{estadisticas.number_lap_record}</h2>
                                                </div>
                                                <div className='col'>
                                                    <h2>{estadisticas.number_hot_laps}</h2>
                                                </div>
                                                <div className='col'>
                                                    <h2>{estadisticas.number_total_sesions}</h2>
                                                </div>
                                                <div className='col'>
                                                    <h2>{estadisticas.number_total_laps}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className='row m-sm-3 pt-5'>
                        <div className='col-12'>
                            <div className='row'>
                                <div className='col-12'>
                                    <h3>Latest sessions</h3>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12'>
                                    {
                                        JSON.stringify(latestSesion) === "{}" ? (
                                            <div className='row mt-4 border rounded p-4 text-center'>
                                                <div className='col-12'>
                                                    <div className='row'>
                                                        <h4>No hay sesiones analizadas por el usuario</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='row mt-3'>
                                                <div className='col-12 border rounded'>
                                                    <div className='row'>
                                                        <div className='col-6 col-sm-4 col-md-2'>
                                                            <img className='w-100' src={imagenCocheUltimaSesion} alt="Imagen coche de la última sesion" />
                                                        </div>
                                                        <>
                                                            {
                                                                !haRecibidoLaUltimaSesionUsuario ? (
                                                                    <AjaxLoader></AjaxLoader>
                                                                ) : (
                                                                    <div className='col-6 col-sm-8 col-md-10'>
                                                                        <div className='row mt-2 mt-sm-3 mt-md-4'>
                                                                            <div className='col-12'>
                                                                                <span>{latestSesion.fecha}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className='row'>
                                                                            <div className='col-12'>
                                                                                <span>{latestSesion.circuito.nombre}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className='row'>
                                                                            <div className='col-12'>
                                                                                <span>{latestSesion.coche.nombre}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        </>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Sidebar>

    )
}

export default ProfilePage;
