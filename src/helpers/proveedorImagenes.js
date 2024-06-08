//  MOCKS
import imagenes_coches from "../mocks/mocks-imagenes/mock-imagenes-coches";

/**
 * Este método se encarga de obtener la ruta de
 * la imagén del coche de la sesion
 * @param {Object} sesion 
 * @returns {string}
 */
function obtenerImagenCoche(sesion){
    let marcaCoche = Object.keys(imagenes_coches).filter(clave => {
        if(sesion.coche.nombre in imagenes_coches[clave]){
            return imagenes_coches[clave][sesion.coche.nombre];
        }
    })[0];
    return imagenes_coches[marcaCoche][sesion.coche.nombre];
}

export default obtenerImagenCoche;
