//  COMPONENTES
import Sidebar from "../../componentes/Sidebar";
import AjaxLoader from "../../componentes/AjaxLoader";

//  HOOCKS
import UseGlobalRank from '../../hooks/useGlobalRank';

const BestPlayersPage = () => {

    const {globalRank, haRecibidoGlobalRank} = UseGlobalRank();

    /**
     * Este método se encarga de mostrar
     * las posiciones en el ranking
     * @param {Object} sesion
     * @param {Number} index
     * @returns {tr}
     */
    function mostrarRanks(rank, index){
        return  <>
                    <tr key={rank.posicion+index} role="button" tabIndex="0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                        <td>{rank.posicion}</td>
                        <td>{rank.user.pais}</td>
                        <td>{rank.user.name}</td>
                        <td>{rank.number_total_laps}</td>
                    </tr>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                            <h3 className="offcanvas-title ms-2" id="offcanvasRightLabel">Perfil</h3>
                            <button type="button" className="btn-close me-2" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body mt-5">
                            <div className="row me-0 mt-5">
                                <div className="col-12 text-center">
                                    <img className="w-50 h-100 rounded-circle" src="https://www.w3schools.com/bootstrap4/img_avatar1.png" alt="Imagen perfil" />
                                </div>
                            </div>
                            <div className="row me-0">
                                <div className="col-12 text-center">
                                    <h2 className="text-white">{rank.user.name}</h2>
                                </div>
                            </div>
                            <div className="row me-0 mt-3">
                                <div className="col-12 m-2">
                                    <h3 className="text-white">Estadisticas</h3>
                                </div>
                            </div>
                            <div className="row me-0 text-white ps-2 ">
                                <div className="row">
                                    <div className="col-6">
                                        <span className="fuenteOffCanvas fw-bold">LR: {rank.number_lap_record}</span>
                                    </div>
                                    <div className="col-6">
                                        <span className="fuenteOffCanvas fw-bold">LH: {rank.number_hot_laps}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <span className="fuenteOffCanvas fw-bold">TS: {rank.number_total_sesions}</span>
                                    </div>
                                    <div className="col-6">
                                        <span className="fuenteOffCanvas fw-bold">TL: {rank.number_total_laps}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
    }

    return (
        <Sidebar>
            <div className="p-sm-5">
                <div className="row">
                    <div className="col-12">
                        <h1>Global Leaderboard</h1>
                    </div>
                </div>
                {
                    !haRecibidoGlobalRank ? (
                        <AjaxLoader></AjaxLoader>
                    ) : (
                        globalRank.length > 0 ? (
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='table-responsive rounded mt-3'>
                                        <table className="table table-dark table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">POS</th>
                                                    <th scope="col">FLAG</th>
                                                    <th scope="col">NAME</th>
                                                    <th scope="col">TOTAL LAPS</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    globalRank.map(mostrarRanks)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='row'>
                                <div className='col-12'>
                                    <h4>No hay sesiones analizadas por el usuario</h4>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </Sidebar>
    )

}

export default BestPlayersPage;
