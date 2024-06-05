//  DEPENDECIAS
import { useEffect, useState } from 'react';

//  COMPONENTES
import Sidebar from '../../componentes/Sidebar';

//  MOCKS
import imagenes_circuitos from '../../mocks/mocks-imagenes/mock-imagenes-circuitos';
import imagenes_coches from '../../mocks/mocks-imagenes/mock-imagenes-coches';

const CombinationsPage = () => {

    //  CONSTANTS
    const COMBINACIONES_POR_PAGINA = 4;

    //  USESTATES
    const [paginaActual, setPaginaActual] = useState(1);

    const [imagenCoche, setImagenCoche] = useState("");
    const [nombreCoche, setNombreCoche] = useState("");

    const [imagenesCircuito, setImagenCircuito] = useState("");
    const [nombreCircuito, setNombreCircuito] = useState("");

    //  LISTAS
    const listaCircuitos = Object.keys(imagenes_circuitos);
    const listaMarcas = Object.keys(imagenes_coches);

    const [listaCombinacionesGeneradas, setListaCombinacionesGeneradas] = useState([]);
    const [listaCombinacionesPagina, setListaCombinacionesPagina] = useState([]);

    let paginas = [];

    if (listaCombinacionesGeneradas.length > 0) {
        let division = Math.ceil(listaCombinacionesGeneradas.length / COMBINACIONES_POR_PAGINA);
        paginas = Array.from({ length: division }, (_, index) => index + 1);
    }

    /**
     * Este método se encarga de obtener
     * una posicion aleatorio de la lista
     * que le pasas por parámetro al método
     * @param {Array} lista
     * @returns {number}
     */
    function generarNumeroEnUnaLista(lista){
        return Math.floor(Math.random() * (lista.length-1 + 1));
    }

    /**
     * Este método se encarga de generar
     * una combinación random cada vez que
     * el usuario pulsa el boton de generar
     * combinar
     * @param {event} event
     */
    function generarCombinacionRandom(event){
        event.preventDefault();

        if(imagenesCircuito !== "" && imagenCoche != ""){
            setListaCombinacionesGeneradas([...listaCombinacionesGeneradas,{
                circuito : nombreCircuito,
                coche : nombreCoche
            }]);
        }

        let posicionCircuitoSeleccionado = generarNumeroEnUnaLista(listaCircuitos);
        setNombreCircuito(listaCircuitos[posicionCircuitoSeleccionado]);
        setImagenCircuito(imagenes_circuitos[listaCircuitos[posicionCircuitoSeleccionado]].outline);

        let posicionMarcaSeleccionada = generarNumeroEnUnaLista(listaMarcas);
        let listaCoche = Object.keys(imagenes_coches[listaMarcas[posicionMarcaSeleccionada]]);
        let posicionCocheSeleccionado = generarNumeroEnUnaLista(listaCoche);
        setNombreCoche(listaCoche[posicionCocheSeleccionado]);
        setImagenCoche(imagenes_coches[listaMarcas[posicionMarcaSeleccionada]][listaCoche[posicionCocheSeleccionado]]);

        if ((listaCombinacionesGeneradas.length + 1) % COMBINACIONES_POR_PAGINA === 0) {
            setPaginaActual(paginas.length + 1);
        }

    }

    /**
     * Este método se encarga de colocar
     * el coche y circuito que ha seleccionado
     * el usuario para colocarlos en las imagenes
     * @param {event} event
     */
    function insertarCombinacionSeleccionada(event){
        let partesCombinacion = event.currentTarget.attributes[0].value.split("-");
        setImagenCircuito(imagenes_circuitos[partesCombinacion[0]].outline);
        let marca = Object.keys(imagenes_coches).filter(clave => {
            if(partesCombinacion[1] in imagenes_coches[clave]){
                return imagenes_coches[clave][partesCombinacion[1]];
            }
        })[0];
        setImagenCoche(imagenes_coches[marca][partesCombinacion[1]]);
    }

    /**
     * Este método se encarga de mostrar
     * las filas de todas las combinaciones
     * genearadas por el usuario hasta el
     * momento
     * @param {Object} combinacion
     * @param {number} index
     * @returns {tr}
     */
    function mostrarCombinacionesGeneradas(combinacion, index){
        return <tr key={combinacion.coche+combinacion.circuito+index} value={combinacion.circuito+"-"+combinacion.coche} role="button" tabIndex="0" onClick={insertarCombinacionSeleccionada}>
                    <td>{combinacion.circuito}</td>
                    <td>{combinacion.coche}</td>
                </tr>
    }

    /**
     * Este método se encarga de mostrar
     * las paginas de la lista de combinaciones
     * @param {number} numPagina
     * @param {number} index
     * @returns {li}
     */
    function mostrarPaginadores(numPagina, index) {
        return (
            <li key={numPagina + index} className={`page-item ${paginaActual === numPagina ? 'active' : ''}`}>
                <a className="page-link" href="#" onClick={() => cambiarPagina(numPagina)}>
                    {numPagina}
                </a>
            </li>
        );
    }

    /**
     * Este método se encarga de
     * cambiar de pagina y insertar
     * en la lista las combinaciones
     * de la pagina
     * @param {number} numPagina
     */
    function cambiarPagina(numPagina) {
        setPaginaActual(numPagina);
        const inicio = (numPagina - 1) * COMBINACIONES_POR_PAGINA;
        const fin = inicio + COMBINACIONES_POR_PAGINA;
        setListaCombinacionesPagina(listaCombinacionesGeneradas.slice(inicio, fin));
    }

    useEffect(()=>{
        let evento = new Event('build');
        generarCombinacionRandom(evento);
    },[])

    useEffect(() => {
        cambiarPagina(paginaActual);
    }, [listaCombinacionesGeneradas, paginaActual]);

    return (

        <Sidebar>
            <div className='row p-sm-5 me-0'>
                <div className='col-12'>
                    <h1>Combinations</h1>
                </div>
            </div>
            <div className='row me-0 align-items-center'>
                <div className='col-0 col-lg-2'></div>
                <div className='col-12 col-sm-4 col-md-3 cartaCombinations border rounded m-2 m-sm-0'>
                    <img className='w-100 mt-2' src={imagenCoche} alt="" />
                </div>
                <div className='col-0 col-sm-4 col-md-2'></div>
                <div className='col-12 col-sm-4 col-md-3 cartaCombinations border rounded m-2 m-sm-0'>
                    <img className='w-100 h-100' src={imagenesCircuito} alt="" />
                </div>
                <div className='col-0 col-lg-2'></div>
            </div>
            <div className='row mt-5 me-0'>
                <div className='col-0 col-sm-5'></div>
                <div className='col-12 col-sm-2 text-center'>
                    <button className="btn btn-outline-secondary w-100" type="button" id="inputGroupFileAddon03" onClick={generarCombinacionRandom}>Combinar</button>
                </div>
                <div className='col-0 col-sm-5'></div>
            </div>
            {
                listaCombinacionesGeneradas.length > 0 ? (
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='table-responsive rounded mt-5'>
                                <table className="table table-dark table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Track</th>
                                            <th scope="col">Car</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaCombinacionesPagina.map(mostrarCombinacionesGeneradas)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }

            {
                paginas.length > 0 ? (
                    <div className='row'>
                        <div className='col-12'>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    {
                                        paginas.map(mostrarPaginadores)
                                    }
                                </ul>
                            </nav>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }
        </Sidebar>

    )
}

export default CombinationsPage;
