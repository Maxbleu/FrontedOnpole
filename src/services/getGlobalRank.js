//  DATA PROVIDER
import axiosClient from "../axios-client";

/**
 * Este método se encarga de solicitar
 * y al servidor el ranking global de
 * los mejores usuarios en la web
 * @returns {Object}
 */
export default function getGlobalRank(numberPage) {
    return axiosClient.get(`/estadistica/global?page=${numberPage}`)
        .then(response => {
            return response.data;
        });
}
