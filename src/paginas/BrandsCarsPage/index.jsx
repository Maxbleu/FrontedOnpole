//  DEPENDENCIAS
import { Link } from "react-router-dom";
import { useState } from "react";

//  MOCKS
import paises_marcas from "../../mocks/mock-paises-marcas";
import imagenes_marcas from "../../mocks/mocks-imagenes/mock-imagenes-marcas";

//  COMPONENTES
import BarraNavegacion from '../../componentes/BarraNavegacion';
import Pie from '../../componentes/Pie';
import CartaMarca from '../../componentes/CartaMarca';
import ElementosNoEncontrados from '../../componentes/ElementosNoEncontrados';
import AjaxLoader from "../../componentes/AjaxLoader";

//  CONTEXT
import { useStateContext } from "../../contexts/ContextProvider";

const BrandsCarsPage = () => {

    //  VALORES POR DEFECTO DE LOS INPUTS
    const PAISPORDEFECTO = paises_marcas[0].value;
    const TEXTOPORDEFECTO = "";

    //  STATES
    const [paisBuscado, setPaisBuscado] = useState(PAISPORDEFECTO);
    const [marcaBuscada, setMarcaBuscada] = useState(TEXTOPORDEFECTO);

    const {marcas, haRecibidoMarcas} = useStateContext();

    //  LISTA DE MARCAS FILTRADA
    const listaMarcasFiltrada = filtrarListaMarcas();

    /**
     * Este método se encarga de filtrar
     * de manera general toda la lista
     * de marcas
     * @returns {Array}
     */
    function filtrarListaMarcas(){
        let listaFiltrada = [];

        if(paisBuscado === PAISPORDEFECTO &&
            marcaBuscada === TEXTOPORDEFECTO){
            listaFiltrada = marcas;
        }

        if(paisBuscado !== PAISPORDEFECTO){
            listaFiltrada = marcas.filter(filtrarPorNacionalidad);
        }

        if(marcaBuscada !== TEXTOPORDEFECTO){
            if(listaFiltrada.length === 0 ){
                listaFiltrada = marcas.filter(filtrarPorMarcaBuscada);
            }else{
                listaFiltrada = listaFiltrada.filter(filtrarPorMarcaBuscada);
            }
        }

        return listaFiltrada;
    }

    /**
     * Este método se encarga de
     * filtrar la lista por nacionalidad
     * de las marcas
     * @param {Object} marca
     * @returns {boolean}
     */
    function filtrarPorNacionalidad(marca){
        return paisBuscado === marca.pais;
    }

    /**
     * Este método se encarga de filtrar
     * por la marca buscada en el buscador
     * @param {Object} marca
     * @returns {boolean}
     */
    function filtrarPorMarcaBuscada(marca){
        return marca.nombre.includes(marcaBuscada);
    }


    //  MOSTRADORES DE ELEMENTOS

    /**
     * Este método se encarga de cargar
     * las cartas de las marcas
     * @param {Object} marca
     * @param {Number} index
     * @returns {CartaMarcaCuadrada}
     */
    function mostrarMarcasCoches(marca, index){
        return <Link key={index + marca.nombre} className="col" to={"/brandsCars/"+marca.nombre+"/"}>
            <CartaMarca
                imagen={imagenes_marcas[marca.nombre]}
                nombre={marca.nombre}></CartaMarca>
        </Link>
    }

    /**
     * Este método se encarga de cargar
     * las opciones de pais de las marcas
     * @param {Object} pais
     * @param {Number} index
     * @returns {option}
     */
    function mostrarOpcionesPaisesMarcas(pais, index){
        return <option
            key={index+pais.nombre}
            value={pais.value}
            >{pais.nombre}</option>
    }

    return (
        <>
            <BarraNavegacion></BarraNavegacion>

            <div className='row margenes-landing'>
                <div className='col-sm-12 mt-0 mt-sm-5 text-center'>
                    <h1>Search your favourite car</h1>
                </div>
            </div>

            <div className='row margenes-landing'>
                <div className="col-sm-2"></div>
                <div className='col-sm-8'>
                    <div className="input-group flex-nowrap justify-content-center">
                        <input type="text" onChange={(event) => {setMarcaBuscada(event.target.value)}} className="form-control bg-transparent inputBuscarMarcas" placeholder="Your favorite car" />
                    </div>
                </div>
                <div className="col-sm-2"></div>
            </div>

            <div className="row margenes-landing mt-0 mt-sm-5 mb-4">
                <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
                    <select onChange={(event) => {setPaisBuscado(event.target.value)}} className="form-select mt-3 mt-sm-0" aria-label="Default select example" defaultValue="co">
                        {
                            paises_marcas.map(mostrarOpcionesPaisesMarcas)
                        }
                    </select>
                </div>
                <div className="col-sm-6 col-md-8 col-lg-8 col-xl-9"></div>
            </div>

            {
                !haRecibidoMarcas ? (
                    <AjaxLoader></AjaxLoader>
                ) : (
                    listaMarcasFiltrada.length === 0 ? (
                        <ElementosNoEncontrados></ElementosNoEncontrados>
                    ) : (
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4 mb-5 margenes-landing">
                            {
                                listaMarcasFiltrada.map(mostrarMarcasCoches)
                            }
                        </div>
                    )
                )
            }

            <Pie></Pie>
        </>
    );

}

export default BrandsCarsPage;
