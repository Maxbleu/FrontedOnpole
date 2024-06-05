//  DEPENDENCIAS
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

//  MOCKS
import imagenes_marcas from './../../mocks/mocks-imagenes/mock-imagenes-marcas';
import imagenes_coches from './../../mocks/mocks-imagenes/mock-imagenes-coches';
import categorias_coches from './../../mocks/mocks-categorias-coches';

//  COMPONENTES
import CartaCoche from '../../componentes/CartaCoche';
import BarraNavegacion from '../../componentes/BarraNavegacion';
import Pie from '../../componentes/Pie';
import ElementosNoEncontrados from '../../componentes/ElementosNoEncontrados';
import AjaxLoader from './../../componentes/AjaxLoader';

//  CONTEXT
import { useStateContext } from '../../contexts/ContextProvider';

const CarsPage = () => {

    //  VALORES POR DEFECTO DE LOS INPUTS
    const COCHEBUSCADOPORDEFECTO = "";
    const CATEGORIAPORDEFECTO = categorias_coches[0].value;

    //  STATES
    const [cocheBuscado, setCocheBuscado] = useState(COCHEBUSCADOPORDEFECTO);
    const [categoriaBuscada, setCategoriaBuscada] = useState(CATEGORIAPORDEFECTO);

    const {marcas, haRecibidoMarcas} = useStateContext();

    const nombreMarcaSeleccionada = (useParams("marca")).marca;

    let marca;

    let cochesMarca;

    if(marcas.length > 0){

        //  Obtenemos la marca de cochesMarca
        marca = (marcas.filter((marca) => {return marca.nombre === nombreMarcaSeleccionada}))[0];

        //  Obtenemos los coches de la marca
        cochesMarca = marca.coches;

    }

    //  Lista de coches filtrada por busquedas
    //  (que utilizo para mostrar los datos en todo
    //  momento)
    const listaCochesFiltrada = filtrarListaCoches();

    /**
     * Este método se encarga de filtrar
     * la lista de cochesMarca de la marca
     * @returns {Array}
     */
    function filtrarListaCoches(){

        let listaCochesMarcaFiltrada = [];

        if(cocheBuscado === COCHEBUSCADOPORDEFECTO &&
            categoriaBuscada === CATEGORIAPORDEFECTO){
            listaCochesMarcaFiltrada = cochesMarca;
        }

        if(categoriaBuscada !== CATEGORIAPORDEFECTO){
            listaCochesMarcaFiltrada = cochesMarca.filter(filtrarPorCategoria);
        }

        if(cocheBuscado !== COCHEBUSCADOPORDEFECTO){
            if(listaCochesMarcaFiltrada.length === 0 ){
                listaCochesMarcaFiltrada = cochesMarca.filter(filtrarPorCocheBuscado);
            }else{
                listaCochesMarcaFiltrada = listaCochesMarcaFiltrada.filter(filtrarPorCocheBuscado);
            }
        }

        return listaCochesMarcaFiltrada;

    }

    /**
     * Este método se encarga de
     * filtar por los cochesMarca por
     * categoria
     * @param {Object} coche
     * @returns {boolean}
     */
    function filtrarPorCategoria(coche){
        return coche.categoria.includes(categoriaBuscada);
    }

    /**
     * Este método se encarga de
     * filtrar por el coche buscado
     * @param {Object} coche
     * @returns {boolean}
     */
    function filtrarPorCocheBuscado(coche){
        return coche.nombre.includes(cocheBuscado);
    }

    //  MOSTRADORES DE ELEMENTOS

    /**
     * Este método se encarga de
     * mostrar las cartas de los
     * cochesMarca de la marca
     * @param {Object} coche
     * @param {Number} index
     * @returns {CartaCoche}
     */
    function mostrarCoches(coche, index){
        let imagenCoche = imagenes_coches[marca.nombre][coche.nombre];
        return <CartaCoche
            key={index + coche.nombre}
            logoMarca={imagenes_marcas[marca.nombre]}
            imagen={imagenCoche}
            nombre={coche.nombre}
            category={coche.categoria}></CartaCoche>
    }

    /**
     * Este método se encarga de mostrar
     * todas las categorias de cochesMarca
     * @param {Object} opcion
     * @param {Number} index
     * @returns {option}
     */
    function mostrarCategoriasCoches(opcion, index){
        return <option
            key={index+opcion.nombre+opcion.value}
            value={opcion.value}>{opcion.nombre}</option>
    }

    return (
        <>
            {
                !haRecibidoMarcas ? (
                    <AjaxLoader></AjaxLoader>
                ) : (

                    <>
                        <BarraNavegacion></BarraNavegacion>

                        <div className='row margenes-landing mt-3 mb-3'>
                            <div className='col-sm-5 col-md-7 d-flex'>
                                <h1>{marca.nombre}</h1>
                                <img className='mx-4 mt-3 mb-3' src={`https://flagcdn.com/w80/${marca.pais}.webp`} alt={`Bandera ${marca.country}`} />
                            </div>
                            <div className='col-sm-7 col-md-5'></div>
                        </div>

                        <div className='row margenes-landing'>
                            <div className='col-sm-12'>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/" className='text-light text-decoration-none'>Home</Link></li>
                                        <li className="breadcrumb-item"><Link to="/brandsCars" className='text-light text-decoration-none'>Cars</Link></li>
                                        <li className="breadcrumb-item active text-light" aria-current="page">{marca.nombre}</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>

                        <div className='row margenes-landing mb-3'>
                            <div className='col-sm-6 col-md-4 col-lg-3'>
                                <div className="input-group flex-nowrap ">
                                    <input type="text" onChange={(event) => {setCocheBuscado(event.target.value)}} className="form-control bg-transparent" placeholder="Search car" />
                                </div>
                            </div>
                            <div className='col-sm-6 col-md-4 col-lg-3'>
                                <select onChange={(event) => {setCategoriaBuscada(event.target.value)}} className="form-select mt-3 mt-sm-0" aria-label="Default select example" defaultValue="category">
                                    {
                                        categorias_coches.map(mostrarCategoriasCoches)
                                    }
                                </select>
                            </div>
                            <div className="col-sm-0 col-md-8 col-lg-6"></div>
                        </div>

                        {
                            listaCochesFiltrada.length === 0 ? (
                                <ElementosNoEncontrados></ElementosNoEncontrados>
                            ) : (
                                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4 mb-5 margenes-landing">
                                    {
                                        listaCochesFiltrada.map(mostrarCoches)
                                    }
                                </div>
                            )
                        }

                        <Pie></Pie>
                    </>
                )
            }
        </>
    )
}

export default CarsPage;
