//  DEPENDENCIAS
import {useParams, Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

//  CONTEXT
import { useStateContext } from '../../contexts/ContextProvider';

//  COMPONENTES
import Sidebar from '../../componentes/Sidebar';
import AjaxLoader from './../../componentes/AjaxLoader';
import CustomTooltip from '../../componentes/CustomToolTip';

//  SERVICES
import getSesionById from './../../services/getSesionById';

//  MOOCKS
import imagenes_circuitos from './../../mocks/mocks-imagenes/mock-imagenes-circuitos';

//  HELPERS
import {convertidorTiempoVuelta, convertirMilisecondsToFloat} from '../../helpers/convertidorTiempoVuelta';
import obtenerImagenCoche from './../../helpers/proveedorImagenes';

const AnalyzeSesionPage = () => {

    //  CONSTEXTS
    const {sesionSeleccionada, setSesionSeleccionada, setVueltaSeleccionada, imagenCircuitoSesion, setImagenCircuitoSesion, imagenCocheSesion, setImagenCocheSesion} = useStateContext();

    //  CONTANTS
    const session_id = (useParams("session_id")).session_id;

    //  USE STATES
    const [haRecibidoSesion, setHaRecibidoSesion] = useState(false);
    const [elComponenteEstaListo, setElComponenteEstaListo] = useState(false);
    //  LAPS
    const [vueltas, setVueltas] = useState([]);
    const [bestLap, setBestLap] = useState({});
    const [theoricalBestLap, setTheoricalBestLap] = useState(
        {
            sector_1 : 0,
            sector_2 : 0,
            sector_3 : 0,
            lapTime : 0,
        }
    );
    const [listLapTimesSesion, setListLapTimesSesion] = useState([]);

    //  NAVEGACIÓN
    const navigate = useNavigate();

    /**
     * Este método se encarga de navegar
     * hacia la vuelta seleccionada por el
     * usuario
     * @param {Event} event
     */
    function navigateToLapSelected(event){
        let numberLap = parseInt(event.currentTarget.attributes[5].value)+1;
        let vueltaSeleccionada = sesionSeleccionada.vueltas.find((vuelta)=>{
            return vuelta.numero_vuelta_sesion === numberLap;
        });
        setVueltaSeleccionada(vueltaSeleccionada);

        //  Sumo +1 a la vuelta ya que para el usuario no existe la
        //  vuelta cero
        navigate(`/sessions/${sesionSeleccionada.id}/lap/${vueltaSeleccionada.numero_vuelta_sesion}`);
    }

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
                onClick={navigateToLapSelected}
                role="button" 
                tabIndex="0"
            />
        );
    };


    //  MOSTRADORES

    /**
     * Este método se encarga de mostrar
     * las vueltas de la sesion
     * @param {Object} vuelta
     * @param {Number} index
     * @returns {div}
     */
    function mostrarVueltas(vuelta, index){
        let tiempoFormateado = convertidorTiempoVuelta(vuelta.tiempo_vuelta);
        let diferenciaConLaMejorVuelta = vuelta.tiempo_vuelta - bestLap.tiempo_vuelta;
        return <div key={index+""+vuelta.tiempo_vuelta+""+vuelta.cuts} className='row ps-md-2'>
                    <div className='col'>
                        <span>Lap {vuelta.numero_vuelta_sesion}</span>
                    </div>
                    <div className='col'>
                        <span>{tiempoFormateado}</span>
                    </div>
                    <div className='col'>
                        {`+${convertidorTiempoVuelta(diferenciaConLaMejorVuelta)}`}
                    </div>
                </div>
    }

    //  INICIADORES DEL COMPONENTE

    /**
     * Este bloque de código se ejecuta una
     * sola vez y comprueba si el usuario
     * ha seleccionada una sesion previamente
     * o en caso de no ser así le pediremos la
     * sesion al servidor
     */
    useEffect(()=>{
        //  Comprobamos si ha recibido la sesión
        if(sesionSeleccionada){
            //  Solicitamos la sesión
            getSesionById(session_id)
                .then((data)=>{
                    //  Guardamos la sesión seleccionada
                    setSesionSeleccionada(data);
                    //  Indicamos que hemos guardado la sesion seleccionada
                    setHaRecibidoSesion(true);
                })
        }else{
            setHaRecibidoSesion(true);
        }
    },[])

    /**
     * Cuando tengamos la sesion y tengamos
     * la confirmacion de ello obtendremos,
     * comprobaremos si la pantalla es mayor
     * que la dimensión de una tablet en
     * caso de ser así obtendremos la imagen
     * de el coche de la sesión
     */
    useEffect(()=>{

        if(haRecibidoSesion){

            if(sesionSeleccionada.circuito.nombre in imagenes_circuitos){
                setImagenCircuitoSesion(imagenes_circuitos[sesionSeleccionada.circuito.nombre].map);
            }

            setImagenCocheSesion(obtenerImagenCoche(sesionSeleccionada));

            //  Guardamos todos los tiempos de todas las vueltas de la sesion
            setListLapTimesSesion(sesionSeleccionada.vueltas.map((vuelta)=>{

                return {
                    numero_vuelta : `Vuelta ${vuelta.numero_vuelta_sesion}`,
                    tiempo_vuelta : convertirMilisecondsToFloat(vuelta.tiempo_vuelta)
                }
            }));

            //  Obtenemos la teorica mejor vuelta
            let sector_1, sector_2, sector_3, lapTime;

            let sectores_1 = [];
            let sectores_2 = [];
            let sectores_3 = [];

            //  Obtenemos de cada vuelta todos los sectores
            //  para posteriormente obtener de todas las vueltas
            //  los mejores sectores
            for(let iterador = 0; iterador<sesionSeleccionada.vueltas.length; iterador++){

                sectores_1.push(sesionSeleccionada.vueltas[iterador]["sector_1"]);

                sectores_2.push(sesionSeleccionada.vueltas[iterador]["sector_2"]);

                sectores_3.push(sesionSeleccionada.vueltas[iterador]["sector_3"]);

            }

            sector_1 = (sectores_1.sort((sector_1, nextSector_1) => sector_1 - nextSector_1))[0];
            sector_2 = (sectores_2.sort((sector_2, nextSector_2) => sector_2 - nextSector_2))[0];
            sector_3 = (sectores_3.sort((sector_3, nextSector_3) => sector_3 - nextSector_3))[0];

            lapTime = sector_1 + sector_2 + sector_3;

            setTheoricalBestLap(
                {
                    sector_1 : sector_1,
                    sector_2 : sector_2,
                    sector_3 : sector_3,
                    lapTime : lapTime
                }
            );

            //  Ordenamos desde la mejor vuelta hasta la
            //  peor vuelta y las guardamos para mostrarlas
            //  en el apartado de sesion performance
            sesionSeleccionada.vueltas.sort(
                (lap,nextLap) => {
                    return lap.tiempo_vuelta - nextLap.tiempo_vuelta
                });

            //  Guardamos la mejor vuelta
            setBestLap(sesionSeleccionada.vueltas[0]);

            //  Guardamos las vueltas
            setVueltas(sesionSeleccionada.vueltas);

            setElComponenteEstaListo(true);

        }

    },[haRecibidoSesion])

    return (
        <Sidebar>
            {
                !elComponenteEstaListo ? (
                    <AjaxLoader></AjaxLoader>
                ) : (
                    <div className='row p-sm-3 paginaAnalyzeSesion'>

                        <div className='col-sm-12'>

                            <div className='row'>
                                <div className='col-sm-12'>
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link to="/sessions" className='text-decoration-none text-white'>
                                                    Sessions
                                                </Link>
                                            </li>
                                            <li className="breadcrumb-item active text-white" aria-current="page">
                                                Session {session_id}
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

                                                    <h3>{sesionSeleccionada.user.name}</h3>
                                                    <h3>Sesion {session_id}</h3>
                                                    <h3>{convertidorTiempoVuelta(bestLap.tiempo_vuelta)}</h3>

                                                </div>

                                                <div className='col-6 col-lg-6'>

                                                    <img className='w-100 h-100' src={imagenCocheSesion} alt="Imagen del coche de la sesion" />

                                                </div>

                                            </div>

                                            <div className='row mt-1 mb-1'>

                                                <div className='col-sm-6 ps-4'>
                                                    <span>{sesionSeleccionada.fecha}</span>
                                                </div>

                                                <div className='col-sm-6 text-center'>

                                                    <span>{sesionSeleccionada.coche.nombre}</span>

                                                </div>

                                            </div>

                                            <div className='row'>

                                                <div className='col-md-12'>

                                                    <div className='row'>

                                                        <div className='col-md-12'>

                                                            <h4 className='ps-2'>Theoretical best</h4>

                                                        </div>

                                                    </div>

                                                    <div className='row ps-2'>

                                                        <div className='col-md'>

                                                            <span>Sector 1</span>

                                                        </div>

                                                        <div className='col-md'>

                                                            <span>Sector 2</span>

                                                        </div>

                                                        <div className='col-md'>

                                                            <span>Sector 3</span>

                                                        </div>

                                                        <div className='col-md'>

                                                            <span className='fw-bold'>Lap Time</span>

                                                        </div>

                                                    </div>

                                                    <hr className='ms-2 me-2' />

                                                    <div className='row ps-2 mb-3'>

                                                        <div className='col-md'>

                                                            <span>{convertidorTiempoVuelta(theoricalBestLap.sector_1)}</span>

                                                        </div>

                                                        <div className='col-md'>

                                                            <span>{convertidorTiempoVuelta(theoricalBestLap.sector_2)}</span>

                                                        </div>

                                                        <div className='col-md'>

                                                            <span>{convertidorTiempoVuelta(theoricalBestLap.sector_3)}</span>

                                                        </div>

                                                        <div className='col-md'>

                                                            <span className='fw-bold'>{convertidorTiempoVuelta(theoricalBestLap.lapTime)}</span>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    <div className='row' style={{height:'40vh'}}>

                                        <div className='col-md-12 border rounded'>

                                            <div className='row'>

                                                <div className='col-md-12 mt-2'>

                                                    <h3 className='ps-2'>Sesion Performance</h3>

                                                </div>

                                            </div>

                                            <div className='row'>

                                                <ResponsiveContainer width="100%" maxHeight={90} aspect={3}>
                                                    <LineChart
                                                        width={500}
                                                        height={150}
                                                        data={listLapTimesSesion}
                                                        margin={{
                                                        right: 50,
                                                        }}
                                                    >
                                                        <Line type="monotone" dataKey="tiempo_vuelta" stroke="#DA1832" strokeWidth="3" activeDot={renderActiveDot} />
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="numero_vuelta" />
                                                        <YAxis dataKey="tiempo_vuelta" />
                                                        <Tooltip content={<CustomTooltip />} />
                                                    </LineChart>
                                                </ResponsiveContainer>

                                            </div>

                                            <div className='row ps-2'>

                                                <div className='col'>

                                                    <span>Lap Number</span>

                                                </div>

                                                <div className='col'>

                                                    <span>Time</span>

                                                </div>

                                                <div className='col'>

                                                    <span>Dif</span>

                                                </div>

                                            </div>

                                            <hr className='ms-2 me-2' />

                                            <div className='row mb-2'>

                                                <div className='col-12'>

                                                    {

                                                        vueltas.map(mostrarVueltas)

                                                    }

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className='col-md-6'>

                                    <div className='row' style={{height:'84vh'}}>

                                        <div className='col-md-12 border rounded ms-3'>

                                            <div className='row'>

                                                <div className='col-md-12 text-center'>

                                                    <img className='w-50 vh-50 ' src={imagenCircuitoSesion} alt="Imagen circuito sesion" />

                                                </div>

                                            </div>

                                            <div className='row mb-0'>

                                                <div className='col-sm-12'>

                                                    <div className='row text-center mt-4'>

                                                        <div className='col-md'>

                                                            <span>Sector 1</span>

                                                        </div>

                                                        <div className='col-md'>

                                                            <span>Sector 2</span>

                                                        </div>

                                                        <div className='col-md'>

                                                            <span>Sector 3</span>

                                                        </div>

                                                        <div className='col-md'>

                                                            <span className='fw-bold'>Lap Time</span>

                                                        </div>

                                                    </div>

                                                    <hr className='ms-2 me-2' />

                                                    <div className='row text-center mb-2'>

                                                        <div className='col-md'>

                                                            <span>{convertidorTiempoVuelta(bestLap.sector_1)}</span>

                                                        </div>

                                                        <div className='col-md'>

                                                            <span>{convertidorTiempoVuelta(bestLap.sector_2)}</span>

                                                        </div>

                                                        <div className='col-md'>

                                                            <span>{convertidorTiempoVuelta(bestLap.sector_3)}</span>

                                                        </div>

                                                        <div className='col-md'>

                                                            <span className='fw-bold'>{convertidorTiempoVuelta(bestLap.tiempo_vuelta)}</span>

                                                        </div>

                                                    </div>

                                                </div>

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

                                                    <h4>Sesion Performance</h4>

                                                </div>

                                            </div>

                                            <div className='row'>

                                                <ResponsiveContainer width="100%" aspect={3}>
                                                    <LineChart
                                                        width={500}
                                                        height={300}
                                                        data={listLapTimesSesion}
                                                        margin={{
                                                        right: 50,
                                                        }}
                                                    >
                                                        <Line type="monotone" dataKey="tiempo_vuelta" stroke="#DA1832" strokeWidth="3" activeDot={renderActiveDot} />
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="numero_vuelta" />
                                                        <YAxis dataKey="tiempo_vuelta" />
                                                        <Tooltip content={<CustomTooltip />} />
                                                    </LineChart>
                                                </ResponsiveContainer>

                                            </div>

                                            <div className='row'>

                                                <div className='col'>

                                                    <span>Lap Number</span>

                                                </div>

                                                <div className='col'>

                                                    <span>Time</span>

                                                </div>

                                                <div className='col'>

                                                    <span>Dif</span>

                                                </div>

                                            </div>

                                            <hr />

                                            <div className='row mb-2'>

                                                <div className='col-12'>

                                                    {

                                                        vueltas.map(mostrarVueltas)

                                                    }

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    <div className='row mb-4'>

                                        <div className='col-12 border rounded'>

                                            <div className='row'>

                                                <div className='col-12 mt-2'>

                                                    <h4>Best lap</h4>

                                                </div>

                                            </div>

                                            <div className='row'>

                                                <div className='col-3'>
                                                    <span>Sector 1</span>
                                                </div>

                                                <div className='col-3'>
                                                    <span>Sector 2</span>
                                                </div>

                                                <div className='col-3'>
                                                    <span>Sector 3</span>
                                                </div>

                                                <div className='col-3 text-end'>
                                                    <span className='fw-bold'>Lap Time</span>
                                                </div>

                                            </div>

                                            <hr />

                                            <div className='row mb-3'>

                                                <div className='col-3'>
                                                    <span>{convertidorTiempoVuelta(bestLap.sector_1)}</span>
                                                </div>

                                                <div className='col-3'>
                                                    <span>{convertidorTiempoVuelta(bestLap.sector_2)}</span>
                                                </div>

                                                <div className='col-3'>
                                                    <span>{convertidorTiempoVuelta(bestLap.sector_3)}</span>
                                                </div>

                                                <div className='col-3 text-end'>
                                                    <span className='fw-bold'>{convertidorTiempoVuelta(bestLap.tiempo_vuelta)}</span>
                                                </div>

                                            </div>

                                            <div className='row mb-3'>

                                                <div className='col-12'>

                                                    <img className='w-100' src={imagenCircuitoSesion} alt="Imagen circuito" />

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    <div className='row'>

                                        <div className='col-12 border rounded'>

                                            <div className='row mt-2'>

                                                <div className='col-12'>

                                                    <h4>Theoretical best time</h4>

                                                </div>

                                            </div>

                                            <div className='row'>

                                                <div className='col-3'>

                                                    <span>Sector 1</span>

                                                </div>

                                                <div className='col-3'>

                                                    <span>Sector 2</span>

                                                </div>

                                                <div className='col-3'>

                                                    <span>Sector 3</span>

                                                </div>

                                                <div className='col-3 text-end'>

                                                    <span className='fw-bold'>Lap Time</span>

                                                </div>

                                            </div>

                                            <hr />

                                            <div className='row mb-3'>

                                                <div className='col-3'>

                                                    <span>{convertidorTiempoVuelta(theoricalBestLap.sector_1)}</span>

                                                </div>

                                                <div className='col-3'>

                                                    <span>{convertidorTiempoVuelta(theoricalBestLap.sector_2)}</span>

                                                </div>

                                                <div className='col-3'>

                                                    <span>{convertidorTiempoVuelta(theoricalBestLap.sector_3)}</span>

                                                </div>

                                                <div className='col-3 text-end'>

                                                    <span className='fw-bold'>{convertidorTiempoVuelta(theoricalBestLap.lapTime)}</span>

                                                </div>

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

export default AnalyzeSesionPage;
