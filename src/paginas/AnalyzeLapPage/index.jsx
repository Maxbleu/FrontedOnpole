//  DEPENDENCIAS
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

//  CONTEXT
import { useStateContext } from '../../contexts/ContextProvider';

//  COMPONENTES
import Sidebar from '../../componentes/Sidebar';
import CustomTooltip from '../../componentes/CustomToolTip';

//  SERVICES
import getSesionById from './../../services/getSesionById';

//  HELPERS
import {convertidorTiempoVuelta, convertirMilisecondsToFloat} from '../../helpers/convertidorTiempoVuelta';
import obtenerImagenCoche from './../../helpers/proveedorImagenes';

//  MOCKS
import imagenes_circuitos from './../../mocks/mocks-imagenes/mock-imagenes-circuitos';

const AnalyzeLapPage = () => {

    const session_id = (useParams("session_id")).session_id;
    const number_lap = parseInt((useParams("number_lap")).number_lap);

    const {user, vueltaSeleccionada, setVueltaSeleccionada, sesionSeleccionada, setSesionSeleccionada, imagenCircuitoSesion, setImagenCircuitoSesion, imagenCocheSesion, setImagenCocheSesion} = useStateContext();
    const [haRecibidoSesionSeleccionada, setHaRecibidoSesionSeleccionada] = useState(false);
    const [elComponenteEstaListo, setElComponenteEstaListo] = useState(false);
    const [mejorVuelta, setMejorVuelta] = useState({});

    const [vueltasACompararGrafico, setVueltasACompararGrafico] = useState([]);

    /**
     * Este componente se encarga de carga
     * que el componente pueda tener acciones
     * para navegar de la sesion a analizar
     * la vuelta seleccionada.
     * @param {props} props
     * @returns {circle}
     */
    const renderActiveDot = (props) => {
        const { cx, cy, index } = props;
        return (
            <circle
                cx={cx}
                cy={cy}
                r={5}
                stroke="none"
                fill="#8884d8"
                values={index}
                style={{ cursor: 'pointer' }}
            />
        );
    };

    /**
     * Este método se encarga de comprobar
     * si la diferencia entre el sector de la
     * vuelta y el sector de la vuelta más rapida
     * sea más lento o más rapido que la vuelta más
     * rápida
     * @param {Number} tiempo
     * @returns {string}
     */
    function elSectorEsRapido(tiempo){
        let esMasLento = tiempo > 0 ? true : false;
        let tiempoFormateado = convertidorTiempoVuelta(tiempo);
        tiempoFormateado = `${esMasLento ? '+' : '-'}${tiempoFormateado}`;
        return tiempoFormateado;
    }

    useEffect(()=>{
        if(JSON.stringify(sesionSeleccionada) === "{}"){

            getSesionById(session_id).then((sesion)=>{

                setSesionSeleccionada(sesion);
                setVueltaSeleccionada(sesion.vueltas.find((vuelta)=>{
                    return vuelta.numero_vuelta_sesion === number_lap;
                }));
                setHaRecibidoSesionSeleccionada(true);

            });

        }else{

            setVueltaSeleccionada(sesionSeleccionada.vueltas.find((vuelta)=>{
                return vuelta.numero_vuelta_sesion === number_lap;
            }));
            setHaRecibidoSesionSeleccionada(true);

        }
    },[])

    useEffect(()=>{
        if(haRecibidoSesionSeleccionada){

            if(imagenCircuitoSesion === ""){
                setImagenCircuitoSesion(imagenes_circuitos[sesionSeleccionada.circuito.nombre].map);
            }

            if(imagenCocheSesion === ""){
                setImagenCocheSesion(obtenerImagenCoche(sesionSeleccionada));
            }

            let bestLapSesion = sesionSeleccionada.vueltas.find((vuelta)=>{
                return vuelta.numero_vuelta_sesion === sesionSeleccionada.numero_mejor_vuelta;
            });

            setVueltasACompararGrafico(
                [
                    {
                        name : "Sector 1",
                        sectorBestLap : convertirMilisecondsToFloat(bestLapSesion.sector_1),
                        sectorLapToCompared : convertirMilisecondsToFloat(vueltaSeleccionada.sector_1)
                    },
                    {
                        name : "Sector 2",
                        sectorBestLap : convertirMilisecondsToFloat(bestLapSesion.sector_2),
                        sectorLapToCompared : convertirMilisecondsToFloat(vueltaSeleccionada.sector_2)
                    },
                    {
                        name : "Sector 3",
                        sectorBestLap : convertirMilisecondsToFloat(bestLapSesion.sector_3),
                        sectorLapToCompared : convertirMilisecondsToFloat(vueltaSeleccionada.sector_3)
                    }
                ]
            );

            setMejorVuelta(bestLapSesion);

            setElComponenteEstaListo(true);

        }
    },[sesionSeleccionada, haRecibidoSesionSeleccionada])

    return (
        <Sidebar>
            {
                !elComponenteEstaListo ? (
                    <div className="spinner-border text-info" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    <div className='p-sm-4 paginaAnalyzeSesionLap'>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/sessions" className='text-decoration-none text-white'>
                                                Sessions
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link to={"/sessions/"+session_id} className='text-decoration-none text-white'>
                                                Sesion {session_id}
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active text-white" aria-current="page">
                                            Lap {number_lap}
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <div className='row d-none d-md-flex'>
                            <div className='col-md-6'>
                                <div className='row mb-3'>
                                    <div className='col-md-12 border rounded'>
                                        <div className='row'>

                                            <div className='col-6 col-lg-6 ps-4 pt-3'>

                                                <h3>{user.name}</h3>
                                                <h3>Lap {number_lap}</h3>
                                                <h3>{convertidorTiempoVuelta(vueltaSeleccionada.tiempo_vuelta)}</h3>

                                            </div>

                                            <div className='col-6 col-lg-6'>

                                                <img className='w-100' src={imagenCocheSesion} alt="Imagen del coche de la sesion" />

                                            </div>

                                        </div>
                                        <div className='row mt-1 mb-5'>

                                            <div className='col-sm-6 ps-4'>
                                                <span>{sesionSeleccionada.fecha}</span>
                                            </div>

                                            <div className='col-sm-6 text-center'>

                                                <span>{sesionSeleccionada.coche.nombre}</span>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12 border rounded'>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <h4>Lap performance</h4>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-sm-12'>
                                                <ResponsiveContainer width="100%" aspect={3}>
                                                    <LineChart
                                                        width={500}
                                                        height={300}
                                                        data={vueltasACompararGrafico}
                                                        margin={{
                                                        right: 30,
                                                        }}
                                                    >
                                                        <Line type="monotone" dataKey="sectorBestLap" stroke="#be28c4" strokeWidth="3" activeDot={renderActiveDot} />
                                                        <Line type="monotone" dataKey="sectorLapToCompared" stroke="#3b82f6" strokeWidth="3" activeDot={renderActiveDot} />
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="name" />
                                                        <YAxis />
                                                        <Tooltip content={<CustomTooltip />} />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                        <div className='row text-center'>
                                            <div className='col'>
                                                <span>Sector 1</span>
                                            </div>
                                            <div className='col'>
                                                <span>Sector 2</span>
                                            </div>
                                            <div className='col'>
                                                <span>Sector 3</span>
                                            </div>
                                        </div>
                                        <hr className='me-2 ms-2' />
                                        <div className='row'>
                                            <div className='col-sm-12 text-center'>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <span>{convertidorTiempoVuelta(mejorVuelta.sector_1)}</span>
                                                    </div>
                                                    <div className='col'>
                                                        <span>{convertidorTiempoVuelta(mejorVuelta.sector_2)}</span>
                                                    </div>
                                                    <div className='col'>
                                                        <span>{convertidorTiempoVuelta(mejorVuelta.sector_3)}</span>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <span>{`${elSectorEsRapido(vueltaSeleccionada.sector_1-mejorVuelta.sector_1)}`}</span>
                                                    </div>
                                                    <div className='col'>
                                                        <span>{`${elSectorEsRapido(vueltaSeleccionada.sector_2-mejorVuelta.sector_2)}`}</span>
                                                    </div>
                                                    <div className='col'>
                                                        <span>{`${elSectorEsRapido(vueltaSeleccionada.sector_3-mejorVuelta.sector_3)}`}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='col-md-12 border rounded'>
                                    <div className='row mb-3'>

                                        <div className='col-md-12 text-center'>

                                            <img className='w-50 h-100' src={imagenCircuitoSesion} alt="Imagen circuito sesion" />

                                        </div>

                                    </div>
                                    <div className='row text-center'>
                                        <div className='col-3'>
                                            <span>Sector 1</span>
                                        </div>
                                        <div className='col-3'>
                                            <span>Sector 2</span>
                                        </div>
                                        <div className='col-3'>
                                            <span>Sector 3</span>
                                        </div>
                                        <div className='col-3 fw-bold'>
                                            <span>LapTime</span>
                                        </div>
                                    </div>
                                    <hr className='me-4 ms-4' />
                                    <div className='row mb-3 text-center'>
                                        <div className='col-3'>
                                            <span>{convertidorTiempoVuelta(vueltaSeleccionada.sector_1)}</span>
                                        </div>
                                        <div className='col-3'>
                                            <span>{convertidorTiempoVuelta(vueltaSeleccionada.sector_2)}</span>
                                        </div>
                                        <div className='col-3'>
                                            <span>{convertidorTiempoVuelta(vueltaSeleccionada.sector_3)}</span>
                                        </div>
                                        <div className='col-3 fw-bold'>
                                            <span>{convertidorTiempoVuelta(vueltaSeleccionada.tiempo_vuelta)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row d-block d-md-none'>
                            <div className='col-12'>
                                <div className='row mb-4'>
                                    <div className='col-12 border rounded fondoTarjetaInicioSesion text-center pt-2 pb-2'>
                                        <span className='fw-bold'>{sesionSeleccionada.circuito.nombre} - {sesionSeleccionada.coche.nombre}</span>
                                    </div>
                                </div>
                                <div className='row mb-4'>
                                    <div className='col-12 border rounded'>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <h4>Lap performance</h4>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-sm-12'>
                                                <ResponsiveContainer width="100%" aspect={3}>
                                                    <LineChart
                                                        width={500}
                                                        height={300}
                                                        data={vueltasACompararGrafico}
                                                        margin={{
                                                        right: 30,
                                                        }}
                                                    >
                                                        <Line type="monotone" dataKey="sectorBestLap" stroke="#be28c4" strokeWidth="3" activeDot={renderActiveDot} />
                                                        <Line type="monotone" dataKey="sectorLapToCompared" stroke="#3b82f6" strokeWidth="3" activeDot={renderActiveDot} />
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="name" />
                                                        <YAxis />
                                                        <Tooltip content={<CustomTooltip />} />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                        <div className='row text-center'>
                                            <div className='col'>
                                                <span>Sector 1</span>
                                            </div>
                                            <div className='col'>
                                                <span>Sector 2</span>
                                            </div>
                                            <div className='col'>
                                                <span>Sector 3</span>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='row'>
                                            <div className='col-sm-12 text-center'>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <span>{convertidorTiempoVuelta(mejorVuelta.sector_1)}</span>
                                                    </div>
                                                    <div className='col'>
                                                        <span>{convertidorTiempoVuelta(mejorVuelta.sector_2)}</span>
                                                    </div>
                                                    <div className='col'>
                                                        <span>{convertidorTiempoVuelta(mejorVuelta.sector_3)}</span>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <span>{`${elSectorEsRapido(vueltaSeleccionada.sector_1-mejorVuelta.sector_1)}`}</span>
                                                    </div>
                                                    <div className='col'>
                                                        <span>{`${elSectorEsRapido(vueltaSeleccionada.sector_2-mejorVuelta.sector_2)}`}</span>
                                                    </div>
                                                    <div className='col'>
                                                        <span>{`${elSectorEsRapido(vueltaSeleccionada.sector_3-mejorVuelta.sector_3)}`}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row mb-4'>
                                    <div className='col-12 border rounded'>
                                        <div className='row'>

                                            <div className='col-12 mt-2'>

                                                <h4>Lap Time</h4>

                                            </div>

                                        </div>
                                        <div className='row text-center'>
                                            <div className='col-3'>
                                                <span>Sector 1</span>
                                            </div>
                                            <div className='col-3'>
                                                <span>Sector 2</span>
                                            </div>
                                            <div className='col-3'>
                                                <span>Sector 3</span>
                                            </div>
                                            <div className='col-3'>
                                                <span>LapTime</span>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='row mb-3 text-center'>
                                            <div className='col-3'>
                                                <span>{convertidorTiempoVuelta(vueltaSeleccionada.sector_1)}</span>
                                            </div>
                                            <div className='col-3'>
                                                <span>{convertidorTiempoVuelta(vueltaSeleccionada.sector_2)}</span>
                                            </div>
                                            <div className='col-3'>
                                                <span>{convertidorTiempoVuelta(vueltaSeleccionada.sector_3)}</span>
                                            </div>
                                            <div className='col-3'>
                                                <span>{convertidorTiempoVuelta(vueltaSeleccionada.tiempo_vuelta)}</span>
                                            </div>
                                        </div>
                                        <div className='row mb-3'>

                                            <div className='col-12'>

                                                <img className='w-100' src={imagenCircuitoSesion} alt="Imagen circuito" />

                                            </div>

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

export default AnalyzeLapPage;
