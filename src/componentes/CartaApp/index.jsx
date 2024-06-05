const CartaApp = (props) => {
    return(
        <div className="card mt-3">
            <div className="row g-0">
                <div className="col-sm-5 col-md-4 col-lg-3">
                    <img src={props.foto} className="img-fluid rounded-start w-100" alt="Logo de app" />
                </div>
                <div className="col-sm-7 col-md-8 col-lg-9 textoCartaApp">
                    <div className="card-body">
                        <h4 className="card-title">
                            {props.nombre}
                        </h4>
                        <p className="card-text">
                            {props.descripcion}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartaApp;
