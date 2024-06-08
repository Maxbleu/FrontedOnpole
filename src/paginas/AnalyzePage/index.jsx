//  DEPENDENCIAS
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

//  COMPONENTES
import Sidebar from '../../componentes/Sidebar';
import AjaxLoader from './../../componentes/AjaxLoader';

//  CONTEXT
import { useStateContext } from '../../contexts/ContextProvider';

//  HOOCKS
import UsePostSesion from '../../hooks/usePostSesion';

const AnalyzePage = () => {

    //  NAVEGACION
    const navigate = useNavigate();

    //  CONTEXTS
    const {setSesionSeleccionada, coches, haRecibidoCoches, circuitos, haRecibidoCircuitos, user} = useStateContext();

    //  USE STATES
    const [isIncorrectTypeFile, setIncorrectTypeFile] = useState(false);
    const [isOnePlayerSesion, setIsOnePlayerSesion] = useState(true);
    const [errorMensage, setErrorMensage] = useState("");
    const [payloadSesion, setPayloadSesion] = useState({});

    //  HOOCKS
    const { haRecibidoSesionId, idSesionCreada } = UsePostSesion(payloadSesion);

    /**
     * Este método se encarga de leer
     * los datos obtenidos del fichero json
     * y en base a ellos crear el objeto sesion
     * @param {Object} sesionObj
     * @returns {Object}
     */
    function obtenerSesion(sesionObj, fileName){

        let circuito, coche, numero_mejor_vuelta, tipo_sesion, fecha;

        //  Obtenemos el circuito en base al nombre de este
        circuito = circuitos.find((circuito) => {return circuito.nombre_pista_juego.find((nombre) => {return nombre === sesionObj.track})})

        //  Obtenemos el coche con el que el jugador a conducido en la sesion
        coche = coches.find((coche)=>{return coche.nombreCocheJuego === sesionObj.players[0].car});

        //  Recorremos el array de vueltas
        //  comprobando si hay alguna vuelta invalida
        const vueltas = sesionObj.sessions[0].laps;
        vueltas.forEach((vuelta)=>{
            if(vuelta.time === -1){
                //  En caso de que sea así sustituiremos
                //  el valor de la vuelta anterior por el
                //  tiempo total de todos los sectores juntos
                vuelta.time = vuelta.sectors.reduce((acumulator,sectorTime)=>{
                    return acumulator + sectorTime;
                },0);
            }
        });

        //  Ordenamos todas las vueltas y obtenemos
        //  el número de vuelta más rapdio
        numero_mejor_vuelta = (sesionObj.sessions[0].laps.sort(
            (lap,nextLap) => {
                nextLap.time - lap.time
            }))[sesionObj.sessions[0].laps.length-1].lap+1;

        //  Obtenemos el tipo de sesion
        tipo_sesion = sesionObj.sessions[0].name;

        //  Obtenemos la fecha de la sesion

        let partesFecha = [];

        fecha = fileName.split("-")[0];

        for (let i = 0; i < fecha.length; i += 2) {

            partesFecha.push(fecha.substring(i, i + 2));

        }

        fecha = `${partesFecha[2]}/${partesFecha[1]}/20${partesFecha[0]}`;


        //  Extraer datos necesarios
        //  para el objeto sesion
        const payloadSesion = {
            "circuito_id" : circuito.id,
            "coche_id" : coche.id,
            "numero_mejor_vuelta" : numero_mejor_vuelta,
            "usuario_id" : user.id,
            "tipo_sesion" : tipo_sesion,
            "vueltas" : vueltas,
            "fecha" : fecha
        };

        return payloadSesion;
    }

    /**
     * Este método se encarga de comprobar si
     * el objeto sesion es correcto
     */
    function comprobarObjetoSesion(sesionObj){

        if(
            "track" in sesionObj && 
            "number_of_sessions" in sesionObj &&
            "players" in sesionObj &&
            "sessions" in sesionObj &&
            "extras" in sesionObj &&
            "__raceIni" in sesionObj &&
            "__quickDrive" in sesionObj){
                return true;
        }

        return false;

    }

    /**
     * Este método se encarga de enviar
     * a la base de datos del fichero
     * introducido por el usuario
     * @param {Event} event
     */
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        const fileName = file.name;
        const fileExtension = fileName.split('.').pop().toLowerCase();

        if (fileExtension === "json") {

            //  En caso de haber introducido un fichero json anteriormente
            //  y ahora introduce el fichero correcto escondemos los errores
            if(isIncorrectTypeFile){
                setIncorrectTypeFile(false);
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                let sesionObj;

                try {
                    sesionObj = JSON.parse(e.target.result);
                } catch (error) {
                    alert('The file must be in the content manager session format.');
                }

                //  Comprobamos que en el objeto hay 
                //  una propiedad llamada players
                if(comprobarObjetoSesion(sesionObj)){

                    //  Comprobamos que el fichero
                    //  de la sesion es de solo un jugador
                    if(sesionObj.players.length === 1){

                        //  Indicamos que el usuario a
                        //  introducido una sesion de un solo jugador
                        setIsOnePlayerSesion(true);

                        //  Obtenemos la sesion
                        setPayloadSesion(obtenerSesion(sesionObj, fileName));

                    }else{

                        setErrorMensage("The session file must have only one player to be analyzed.");
                        setIsOnePlayerSesion(false);

                    }
                }else{

                    setErrorMensage("The file must be in the content manager session format.");
                    setIncorrectTypeFile(true);

                }

            };
            reader.readAsText(file);
        }else{
            setErrorMensage("The session file must be .json.");
            setIncorrectTypeFile(true);
        }

        event.target.files = null;
    }

    /**
     * Este hoock se ejecutará cuando la
     * haRecibidoSesionId es true y en la
     * primera renderización del componente
     */
    useEffect(() => {
        //  Comprobamos si haRecibidoSesionId es true
        if(haRecibidoSesionId){

            //  Guardamos el id de la sesion para hacer las
            //  peticiones de los datos que necesitemos al servidor
            setSesionSeleccionada(idSesionCreada);

            //  Navegamos a la pagina de sesions
            navigate(`/sessions/${idSesionCreada}`);

        }
    }, [haRecibidoSesionId])

    return (

        <Sidebar>

            {
                !haRecibidoCircuitos && !haRecibidoCoches ? (

                    <AjaxLoader></AjaxLoader>

                ) : (
                    <div className='row  mx-auto me-0' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '90vh', }}>

                        <div className='col-sm-2'></div>

                        <div className='col-sm-8 border border-white pt-5 pb-5 rounded mx-auto'>

                            <div className='row'>

                                <div className='col-sm-12 text-center'>

                                    <h1>Analyze</h1>

                                </div>

                            </div>

                            <div className='row'>

                                <div className='col-sm-12 text-center'>

                                    <p className='textoSecundarioAnalyze'>
                                        Take your json file sesion and analyze it.
                                    </p>

                                    <p>
                                        Go to this path: AppData\Local\AcTools Content Manager\Progress\Sessions
                                    </p>

                                    <p className='fw-bold'>
                                        You need Content Manager
                                    </p>

                                </div>

                            </div>

                            <div className={isIncorrectTypeFile || !isOnePlayerSesion ? "d-block" : "d-none"}>

                                <div className="row">

                                    <div className='col-sm-1'></div>

                                    <div className='col-sm-10 mx-auto'>

                                        <div className="alert alert-danger d-flex align-items-center" role="alert">

                                            <i className="bi bi-exclamation-triangle-fill" />
                                            <div className='ms-2'>
                                                {errorMensage}
                                            </div>

                                        </div>

                                    </div>

                                    <div className='col-sm-1'></div>

                                </div>

                            </div>

                            <div className='row'>

                                <div className='col-sm-1'></div>

                                <div className='col-sm-10'>

                                    <div className="input-group mb-3 pe-5 ps-5">
                                        <input type="file" className="form-control" id="inputGroupFile02" onChange={handleFileChange} />
                                        <label className="input-group-text" name="inputGroupFile02">Analyze</label>
                                    </div>

                                </div>

                                <div className='col-sm-1'></div>

                            </div>

                        </div>
                        <div className='col-sm-2'></div>

                    </div>
                )
            }

        </Sidebar>

    )
}

export default AnalyzePage;
