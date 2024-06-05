const PATRON_VALIDACION_TIEMPO = /^\d+:[0-5][0-9]\.\d{3}$/;
const UN_MILISEGUNDO = 1000;
const MINUTO_EN_SEGUNDOS = 60;

/**
 * Este método valida si el tiempo
 * recibido por parámetros es correcto o no
 */
function validarFormatoTiempo(tiempo) {
    return PATRON_VALIDACION_TIEMPO.test(tiempo);
}

/**
 * Este método se encarga de formatear
 * el tiempo que recibe por parámetros
 * en caso de que el tiempo no cumpla
 * el patrón establecido.
 */
function formatearTiempo(tiempo) {
    let tiempoFormateado = tiempo;
    if (!validarFormatoTiempo(tiempo)) {
        let partes = tiempo.split(':');
        let minutos = partes[0];
        let segundosMilisegundos = partes[1].split('.');
        let segundos = segundosMilisegundos[0];
        let milisegundos = segundosMilisegundos[1];

        let minutosFormateados = parseInt(minutos, 10);
        let segundosFormateados = segundos.padStart(2, '0');
        let milisegundosFormateados = milisegundos.padStart(3, '0');

        tiempoFormateado = `${minutosFormateados}:${segundosFormateados}.${milisegundosFormateados}`;
    }

    return tiempoFormateado;
}

/**
 * Este método se encarga de convertir
 * el tiempo de milisegundos a minutos
 */
function convertidorTiempoVuelta(tiempo) {

    if(tiempo < 0){
        tiempo = -(tiempo);
    }

    let tiempoVueltaEnSegundos = tiempo / UN_MILISEGUNDO;
    let minutoVuelta = Math.floor(tiempoVueltaEnSegundos / MINUTO_EN_SEGUNDOS);
    let resto = tiempoVueltaEnSegundos % MINUTO_EN_SEGUNDOS;

    let tiempoFormateado = formatearTiempo(`${minutoVuelta}:${resto.toFixed(3)}`);

    return tiempoFormateado;
}

/**
 * Este método se encarga de convertir el tiempo
 * de milisegundos a tiempo formateado en float
 * para visualizar los tiempos en la grafica
 * @param {Number} tiempo
 * @returns {}
 */
function convertirMilisecondsToFloat(tiempo){
    let tiempoFormateado = convertidorTiempoVuelta(tiempo);
    return parseFloat(tiempoFormateado.split(".")[0].replace(":","."));
}

export { convertidorTiempoVuelta, convertirMilisecondsToFloat };

