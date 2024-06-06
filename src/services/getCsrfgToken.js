/**
 * Este método se encarga de pedir a la
 * base de datos el token csrf para
 * hacer una solicitud de login en los
 * formularios.
 * @returns {string}
 */
export default function getCsrfToken(){
    return fetch("https://backendonpole-production.up.railway.app/api/csrf-token")
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch CSRF token');
            }
            return response.json();
        })
        .then(data => {
            return data.csrfToken;
        })
        .catch(error => {
            console.error('Error fetching CSRF token:', error);
            throw error;  // Re-throw the error for further handling if necessary
        });
}