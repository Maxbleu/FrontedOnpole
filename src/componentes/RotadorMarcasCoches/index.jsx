//  DEPENDENCIAS
import Marquee from "react-fast-marquee";

//  MOCKS
import imagenes_marcas from "../../mocks/mocks-imagenes/mock-imagenes-marcas";

//  COMPONENTES
import CartaMarquee from "../CartaMarquee";
import AjaxLoader from './../../componentes/AjaxLoader';

//  CONTEXT
import { useStateContext } from './../../contexts/ContextProvider';

const RotadorMarcasCoches = () => {

    const {marcas, haRecibidoMarcas} = useStateContext();

    /**
     * Este método se encarga de mostrar
     * las tarjetas de las marcas de
     * coches en el marquee
     * @param {Object} marca
     * @param {Number} index
     * @returns {CartaMarquee}
     */
    function mostrarCardMarcas(marca, index){
        return <CartaMarquee
            key={index+marca.nombre+marca.pais}
            brandCarImg={imagenes_marcas[marca.nombre]}
            name={marca.nombre}></CartaMarquee>
    }

    return (

        !haRecibidoMarcas ? (
            <AjaxLoader></AjaxLoader>
        ) : (
            <Marquee>
                {
                    marcas.map(mostrarCardMarcas)
                }
            </Marquee>
        )
    )
}

export default RotadorMarcasCoches;
