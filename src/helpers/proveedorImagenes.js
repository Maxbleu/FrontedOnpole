//  MOCKS
import imagenes_coches from "../mocks/mocks-imagenes/mock-imagenes-coches";

function obtenerImagenCoche(sesion){
    let marcaCoche = Object.keys(imagenes_coches).filter(clave => {
        if(sesion.coche.nombre in imagenes_coches[clave]){
            return imagenes_coches[clave][sesion.coche.nombre];
        }
    })[0];
    return imagenes_coches[marcaCoche][sesion.coche.nombre];
}

export default obtenerImagenCoche;
