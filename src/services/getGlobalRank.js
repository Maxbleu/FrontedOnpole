//  DATA PROVIDER
import axiosClient from "../axios-client";

/**
 * Este método se encarga de solicitar
 * y al servidor el ranking global de
 * los mejores usuarios en la web
 * @returns {Object}
 */
export default function getGlobalRank() {
    return axiosClient.get("/estadistica/global")
        .then(response => {
            const ranks = response.data.data;
            return ranks.map((rank, index) => {
                return { ...rank, posicion: index + 1 };
            });
        });
}
