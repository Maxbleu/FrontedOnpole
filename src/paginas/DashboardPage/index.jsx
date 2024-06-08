//  DEPENDENCIAS
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

//  CONTEXT
import { useStateContext } from './../../contexts/ContextProvider';

//  COMPONENTES
import Sidebar from '../../componentes/Sidebar';
import AjaxLoader from '../../componentes/AjaxLoader';

//  HOOCKS
import UseUserEstadisticas from '../../hooks/useUserEtadisticas';
import UseGlobalRank from '../../hooks/useGlobalRank';
import UseLatestUserSesion from '../../hooks/useLatestUserSesion';
import UseAnalyzedLapsMonthyUser from '../../hooks/useAnalyzedLapsMonthyUser';

//  MOCKS
import citasPilotos from '../../mocks/mock-citas';
import imagenes_circuitos from '../../mocks/mocks-imagenes/mock-imagenes-circuitos';
import imagenes_coches from '../../mocks/mocks-imagenes/mock-imagenes-coches';

//  HELPER
import obtenerImagenCoche from '../../helpers/proveedorImagenes';
import { convertidorTiempoVuelta } from '../../helpers/convertidorTiempoVuelta';

const DashboardPage = () => {

    const {user, haRecibidoUser} = useStateContext();

    const {vueltasAnalizadasAlMesPorUser,haRecibidoVueltasAnalizadasAlMesPorUser} = UseAnalyzedLapsMonthyUser(user.id);
    const {estadisticas, haRebicibidoUserEstadisticas} = UseUserEstadisticas(user.id);
    const {latestSesion, haRecibidoLaUltimaSesionUsuario} = UseLatestUserSesion(user.id);
    const {globalRank, haRecibidoGlobalRank} = UseGlobalRank();

    const [listRank, setListRank] = useState([]);
    const [imagenCocheUltimaSesion, setImagenCocheUltimaSesion] = useState("");


    /**
     * Este método se encarga de
     * mostrar los rankings
     * @param {Object} rank
     * @param {Number} index
     * @returns {div}
     */
    function mostrarRanks(rank, index){
        let isYourUser = rank.user.id === user.id ? "yourProfile"  : "";
        return <div key={rank.user.name+index} className={'row ' + isYourUser}>
                    <hr />
                    <div className='col-3 mt-md-2 mb-md-2'>
                        <span>{rank.posicion}</span>
                    </div>
                    <div className='col-5 mt-md-2 mb-md-2'>
                        <span>{rank.user.name}</span>
                    </div>
                    <div className='col-4 mt-md-2 mb-md-2'>
                        <span>{rank.number_total_laps}</span>
                    </div>
                </div>
    }

    /**
     * Este método se encarga de
     * seleccionar aleatoriamente
     * una cita del mock de citas de
     * pilotos
     * @returns {string}
     */
    function elegirCita(){
        return citasPilotos[Math.floor(Math.random() * citasPilotos.length)];
    }

    useEffect(()=>{
        if(haRecibidoLaUltimaSesionUsuario && JSON.stringify(latestSesion) !== "{}"){
            setImagenCocheUltimaSesion(obtenerImagenCoche(latestSesion));
        }
    },[haRecibidoLaUltimaSesionUsuario])

    useEffect(()=>{

        if(haRecibidoGlobalRank && JSON.stringify(user) !== "{}"){

            if(globalRank.length > 2){

                let firstRanks = globalRank.slice(0,2);

                let yourRank = globalRank.find((rank)=>{
                    return rank.user.id === user.id;
                });

                if(firstRanks.some((rank)=>{
                    return rank.user.id === user.id
                })){

                    firstRanks.push(globalRank[firstRanks.length])

                }else{
                    firstRanks.push(yourRank);
                }

                setListRank(firstRanks);

            }else{

                setListRank(globalRank);

            }



        }

    },[globalRank, haRecibidoGlobalRank, user])

    return (

        <Sidebar>
            {
                !haRecibidoUser && !haRebicibidoUserEstadisticas && user !== null && !haRecibidoVueltasAnalizadasAlMesPorUser ? (
                    <AjaxLoader></AjaxLoader>
                ) : (
                    <div className='row'>
                        <div className='col-12'>
                            <div className='row d-none d-md-flex paginaDashBoard p-4'>
                                <div className='col-12'>
                                    <div className='row row-cols-3 gx-5'>
                                        <div className='col-3'>
                                            <div className='row userWelcomeDashboard border rounded'>
                                                <div className='col-12'>
                                                    <h2>Welcome</h2>
                                                    <h2>{user.name}</h2>
                                                </div>
                                            </div>
                                            <div className='row mt-4'>
                                                <div className='col-12'>
                                                    <span className='fs-5'>{elegirCita()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <Link to="/combinations" className='row border rounded text-decoration-none text-white'>
                                                <div className='col-12'>
                                                    <div className='row combinacionesDashBoard' style={{height: '40vh'}}>
                                                        <div className='col-12' style={{marginTop: '20vh'}}>
                                                            <h3 className='p-5'>Combinations</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className='col-3'>
                                            <div className='row'>
                                                <div className='col-12 border rounded'>
                                                    <div className='row p-2'>
                                                        <div className='col-12'>
                                                            <div className='row'>
                                                                <div className='col-12'>
                                                                    <span className='fs-4'>Lap records:</span>
                                                                </div>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-12 text-end'>
                                                                    <span className='mejorPosicionClasificada'>{estadisticas.number_lap_record}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row gx-5 mt-3'>
                                        <div className='col-3'></div>
                                        <div className='col-6'>
                                            <div className='row border rounded text-center estadisticasUsuarioDashboard'>
                                                <div className='col-4'>
                                                    <h3>LH: {estadisticas.number_hot_laps}</h3>
                                                </div>
                                                <div className='col-4'>
                                                    <h3>TS: {estadisticas.number_total_sesions}</h3>
                                                </div>
                                                <div className='col-4'>
                                                    <h3>TL: {estadisticas.number_total_laps}</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-3'></div>
                                    </div>
                                    <div className='row row-cols-3 gx-5'>
                                        <div className='col-3'>
                                            <Link to="/bestplayers" className='row mt-3 fondoHoverDefaultPrimary border rounded text-decoration-none text-white padding_bottom_Leaderboard'>
                                                <div className='col-12'>
                                                    <div className='row text-center text-md-start p-2'>
                                                        <div className='col-12'>
                                                            <h5>Glogal Rank</h5>
                                                        </div>
                                                    </div>
                                                    <>
                                                        {
                                                            !haRecibidoGlobalRank ? (
                                                                <AjaxLoader></AjaxLoader>
                                                            ) :
                                                            (
                                                                listRank.map(mostrarRanks)
                                                            )
                                                        }
                                                    </>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className='col-6'>
                                            <div className='row mt-3 border rounded'>
                                                <div className='col-12 '>
                                                    <div className='row'>
                                                        <div className='col-12'>
                                                            <h4 className='ms-3'>Monthly analyzed laps</h4>
                                                        </div>
                                                        <hr />
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-12 d-flex justify-content-center'>
                                                            <ResponsiveContainer width="62%" height={"100%"} aspect={3}>
                                                                <BarChart
                                                                    width={500}
                                                                    height={300}
                                                                    data={vueltasAnalizadasAlMesPorUser}
                                                                    margin={{
                                                                        top: 5,
                                                                        bottom: 5,
                                                                    }}
                                                                    >
                                                                    <CartesianGrid strokeDasharray="3 3" />
                                                                    <XAxis dataKey="nombre" />
                                                                    <YAxis />
                                                                    <Tooltip />
                                                                    <Bar dataKey="vueltasTotales" fill="#DA1832" activeBar={<Rectangle fill="#4C446B" stroke="purple" />} />
                                                                </BarChart>
                                                            </ResponsiveContainer>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            {
                                                JSON.stringify(latestSesion) === "{}" ? (
                                                    <div className='row marginTopLeaderboard border rounded p-4 text-center'>
                                                        <div className='col-12'>
                                                            <div className='row'>
                                                                <h4>No sessions analyzed by the user.</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className='row mt-3 border rounded fondoHoverDefaultPrimary'>
                                                        <div className='col-12'>
                                                            <div className='row'>
                                                                <div className='col-12 p-2 ps-md-3'>
                                                                    <h5>Latest session</h5>
                                                                </div>
                                                                <hr />
                                                            </div>
                                                            <Link to={`/sessions/${latestSesion.id}`} className='row mb-4 mt-3 text-decoration-none text-white'>
                                                                <div className='col-6'>
                                                                    <div className='row'>
                                                                        <div className='col-12'>
                                                                            <img className='w-100' src={imagenCocheUltimaSesion} alt="Imagen coche ultima sesion" />
                                                                        </div>
                                                                    </div>
                                                                    <div className='row'>
                                                                        <div className='col-12 text-center'>
                                                                            <span>{latestSesion.coche.nombre}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <div className='row mt-3'>
                                                                        <div className='col-12'>
                                                                            <span className='fs-5'>{latestSesion.fecha}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className='row'>
                                                                        <div className='col-12'>
                                                                            <span className='fs-5'>{latestSesion.circuito.nombre}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className='row'>
                                                                        <div className='col-12'>
                                                                            <span className='fs-5'>{convertidorTiempoVuelta(latestSesion.vueltas[latestSesion.numero_mejor_vuelta-1].tiempo_vuelta)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row d-block d-md-none paginaDashBoard'>
                                <div className='col-12'>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <div className='row text-center border rounded userEstadisticasDashboard'>
                                                <div className='col'>
                                                    <h4>HL : {estadisticas.number_hot_laps}</h4>
                                                </div>
                                                <div className='col'>
                                                    <h4>TS : {estadisticas.number_total_sesions}</h4>
                                                </div>
                                                <div className='col'>
                                                    <h4>TL : {estadisticas.number_total_laps}</h4>
                                                </div>
                                            </div>
                                            <div className='row mt-3 row-cols-2 gx-5'>
                                                <div className='col'>
                                                    <div className='row border rounded userWelcomeDashboard'>
                                                        <div className='col-12'>
                                                            <h3>Welcome {user.name}</h3>
                                                        </div>
                                                    </div>
                                                    <div className='row border rounded mt-3'>
                                                        <div className='col-12'>
                                                            <div className='row'>
                                                                <div className='col-12'>
                                                                    <span className='fs-3'>Lap records:</span>
                                                                </div>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-12 text-end'>
                                                                    <span className='mejorPosicionClasificada'>{estadisticas.number_lap_record}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <Link to="/bestplayers" className='row border rounded text-decoration-none text-white'>
                                                        <div className='col-12'>
                                                            <div className='row text-center'>
                                                                <div className='col-12'>
                                                                    <h5>Glogal Rank</h5>
                                                                </div>
                                                            </div>
                                                            <>
                                                                {
                                                                    !haRecibidoGlobalRank ? (
                                                                        <AjaxLoader></AjaxLoader>
                                                                    ) :
                                                                    (
                                                                        listRank.map(mostrarRanks)
                                                                    )
                                                                }
                                                            </>
                                                        </div>
                                                    </Link>
                                                    <div className='row mt-3'>
                                                        <div className='col-12'>
                                                            <span>{elegirCita()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link className='row mt-3 border rounded bg-transparent text-decoration-none' to="/combinations">
                                                <div className='col-6'>
                                                    <h4 className='text-white'>Combinations to enjoy</h4>
                                                </div>
                                                <div className='col-6 d-flex align-items-center '>
                                                    <img className='w-75' src={imagenes_coches["Ferrari"]["458 ITALIA"]} alt="Imagen coche" />
                                                    <img className='layoutCircuitoDashboardCombinations' src={imagenes_circuitos["Nurburgring Nordscheleife"].map} alt="Imagen nordschleife" />
                                                </div>
                                            </Link>
                                            {
                                                JSON.stringify(latestSesion) === "{}" ? (
                                                    <div className='row mt-4 border rounded p-4 text-center'>
                                                        <div className='col-12'>
                                                            <div className='row'>
                                                                <h4>No sessions analyzed by the user.</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Link className='row mt-3 border rounded text-decoration-none text-white' to={"/sessions/"+latestSesion.id}>
                                                        <div className='col-12'>
                                                            <div className='row'>
                                                                <div className='col-12'>
                                                                    <span className='fs-1'>Latest session</span>
                                                                    <hr />
                                                                </div>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-6'>
                                                                    <img className='w-100' src={imagenCocheUltimaSesion} alt="Imagen coche de la última sesion" />
                                                                </div>
                                                                <>
                                                                    {
                                                                        !haRecibidoLaUltimaSesionUsuario ? (
                                                                            <AjaxLoader></AjaxLoader>
                                                                        ) : (
                                                                            <div className='col-6'>
                                                                                <div className='row mt-2'>
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
                                                    </Link>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </Sidebar>

    )
}

export default DashboardPage;
