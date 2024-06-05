//  IMAGES
import FotoBarcelona from './../../../public/images/circuitos/barcelona/layout_gp/bgr00.jpg';
import FotoSilverstone from './../../../public/images/circuitos/silverstone_1967/bgr00.jpg';
import FotoNordschleife from './../../../public/images/circuitos/nordschleife/nordschleife/bgr00.jpg';

const Carrusel = () => {
    return (
        <div className="container mt-3">
            <div id='carouselCircuitos' className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={FotoBarcelona} className="d-block w-100" alt="Foto de Barcelona" />
                        <div className="carousel-caption d-md-block">
                            <h5>Barcelona GP</h5>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={FotoNordschleife} className="d-block w-100" alt="Foto de Nordschleife" />
                        <div className="carousel-caption d-md-block">
                            <h5>Nordschleife</h5>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={FotoSilverstone} className="d-block w-100" alt="Foto de Silverstone" />
                        <div className="carousel-caption d-md-block">
                            <h5>Silverstone 1966</h5>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselCircuitos" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselCircuitos" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default Carrusel;
