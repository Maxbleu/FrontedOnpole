//  DEPENDENCIAS
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//  COMPONENTES
import Sidebar from '../../componentes/Sidebar';

//  CONTEXTS
import { useStateContext } from '../../contexts/ContextProvider';

//  MOCKS
import imagenes_circuitos from './../../mocks/mocks-imagenes/mock-imagenes-circuitos';

//  HOOCKS
import UseCombination from './../../hooks/useCombination';

//  HELPERS
import {convertidorTiempoVuelta} from '../../helpers/convertidorTiempoVuelta';

const LeaderboardPage = () => {

    const {circuitos, haRecibidoCircuitos, coches, haRecibidoCoches} = useStateContext();

    const [imagenCircuito, setImagenCircuito] = useState(imagenes_circuitos["Spa"].outline);

    const [payloadCombination, setPayloadCombination] = useState(
        {
            coche_id : 113,
            circuito_id : 34
        }
    );

    const navigate = useNavigate();

    const {combination, haRecibidoCombination} = UseCombination(payloadCombination);


    /**
     * Este método se encarga de hacerte navegar a la
     * sesion que has seleccionado de otro usuario en
     * el leaderboard
     * @param {event} event
     */
    function navigateToSesionSelected(event){
        navigate(`/sessions/${event.currentTarget.attributes.value.textContent}`);
    }

    /**
     * Este metodo se encarga de mostrar
     * las opciones de un select
     * @param {Object} objeto
     * @param {Number} index
     * @returns {option}
     */
    function mostrarOpcionesSelects(objeto, index){
        return <option key={objeto.nombre+index} value={objeto.nombre}>{objeto.nombre}</option>
    }

    /**
     * Este método se encarga de mostrar todas
     * las sesiones de la combinacion
     * @param {Object} combination
     * @param {Number} index
     */
    function mostrarCombinations(combination, index){
        let styleToAply;
        if(index === 0){
            styleToAply = "bestLapTimeCombination fw-bold";
        } else if (index === 1){
            styleToAply = "secondBestLapTimeCombination fw-bold";
        } else if (index === 2){
            styleToAply = "thirdBestLapTimeCombination fw-bold";
        }

        return !haRecibidoCombination ? (
            <tr>
                <td>
                    <div class="spinner-border text-info" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </td>
                <td>
                    <div class="spinner-border text-info" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </td>
                <td>
                    <div class="spinner-border text-info" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </td>
            </tr>
        ) : (
            <tr className={styleToAply} key={`${combination.coche_id}-${combination.circuito_id}-${combination.id}`} role="button" tabIndex="0" value={combination.id} onClick={navigateToSesionSelected}>
                <td>{index+1}</td>
                <td>{combination.user.name}</td>
                <td>{convertidorTiempoVuelta(combination.vueltas[combination.numero_mejor_vuelta-1].tiempo_vuelta)}</td>
            </tr>
        )
    }

    /**
     * Este método se encarga de cargar
     * la foto de del circuito
     * @param {event} event
     */
    function insertarCircuitoSeleccionado(event){
        setImagenCircuito(imagenes_circuitos[event.target.value].outline);
        let circuitoSeleccionado = circuitos.find((circuito)=>{
            return circuito.nombre === event.target.value;
        });
        setPayloadCombination(payloadCombination => ({...payloadCombination, circuito_id: circuitoSeleccionado.id}));
    }

    /**
     * Este método se encarga de insertar
     * el coche seleccionado en el objeto
     * para solicitar los datos a la base de
     * datos
     * @param {event} event
     */
    function insertarCocheSeleccionado(event){
        let cocheSeleccionado = coches.find((coche)=>{
            return coche.nombre === event.target.value;
        });
        setPayloadCombination(payloadCombination => ({...payloadCombination, coche_id: cocheSeleccionado.id}));
    }

    useEffect(()=>{
        if(haRecibidoCombination){
            if(combination.length > 1){
                combination.sort((combinacion, nextCombination)=>{
                    return combinacion.vueltas[combinacion.numero_mejor_vuelta-1].tiempo_vuelta - nextCombination.vueltas[nextCombination.numero_mejor_vuelta-1].tiempo_vuelta;
                });
            }
        }
    },[haRecibidoCombination])

    return (

        <Sidebar>
            <div className='p-sm-5'>

                <div className='row'>

                    <div className='col-sm-12'>

                        <h1>Leaderboards</h1>

                    </div>

                </div>

                <div className='row'>

                    <div className='col-sm-12 col-md-6 order-2 order-md-1'>

                        <div className='row mt-2 mt-md-5'>

                            <div className='col-12 col-md-10'>

                                {

                                    !haRecibidoCircuitos ? (
                                        <div className="spinner-border text-info" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <label htmlFor="floatingInput">Change track</label>
                                            <select className="form-select mt-1" aria-label="Default select example" defaultValue="Spa" onChange={insertarCircuitoSeleccionado}>
                                                {
                                                    circuitos.map(mostrarOpcionesSelects)
                                                }
                                            </select>
                                        </>
                                    )

                                }

                            </div>

                            <div className='col-0 col-md-2'></div>

                        </div>

                        <div className='row mt-2 mt-md-4'>

                            <div className='col-12 col-md-10'>

                                    {

                                        !haRecibidoCoches ? (
                                            <div className="spinner-border text-info" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <label htmlFor="floatingInput">Change car</label>
                                                <select className="form-select mt-1" aria-label="Default select example" defaultValue="MX5 CUP" onChange={insertarCocheSeleccionado}>
                                                    {
                                                        coches.map(mostrarOpcionesSelects)
                                                    }
                                                </select>
                                            </>
                                        )

                                    }

                            </div>

                            <div className='col-0 col-md-2'></div>

                        </div>

                    </div>

                    <div className='col-sm-12 col-md-6 order-1 order-md-2 text-center text-md-start'>

                        <img className='w-75 h-100' src={imagenCircuito} alt="Imagen circuito" />

                    </div>

                </div>

                <div className='row mt-5'>

                    <div className='col-sm-12'>

                        {
                            combination.length === 0 ? (
                                <div className='row'>

                                    <div className='col-sm-2'></div>

                                    <div className='col-sm-8 text-center'>
                                        <h3>
                                            No items related to the search were found.
                                        </h3>
                                    </div>

                                    <div className='col-sm-2'></div>

                                </div>
                            ) : (
                                <div className='table-responsive rounded mt-3'>
                                    <table className="table table-dark table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Position</th>
                                                <th scope="col">User</th>
                                                <th scope="col">LapTime</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                combination.map(mostrarCombinations)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }

                    </div>

                </div>

            </div>
        </Sidebar>

    )
}

export default LeaderboardPage;
