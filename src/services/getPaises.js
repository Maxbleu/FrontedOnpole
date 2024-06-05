/**
 * Este método se encarga de
 * obtener los paises
 * @param {string} idioma
 * @returns {Array}
 */
export default function getPaises(idioma){
    return fetch(`https://flagcdn.com/${idioma}/codes.json`)
        .then(response => {
            return response.json();
    });
}
