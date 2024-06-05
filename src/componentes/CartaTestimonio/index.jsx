const CartaTestimonio = (props) => {
    return (
        <div className='col-md-6 col-lg-4 mx-auto mb-md-4 mb-lg-0'>

            <div className='card mb-3 mb-sm-0'>

                <div className="card-body">
                    <p className="card-text">
                        {props.comentario}
                    </p>
                    <div className='row'>
                        <div className='col-sm-2 col-2'>
                            <img src={"https://www.w3schools.com/bootstrap4/"+props.nombreFotoPerfil} className="card-img-top rounded-circle mt-1" alt="Foto perfil" />
                        </div>
                        <div className='col-sm-10 col-10'>
                            <div className="row">
                                <div className="col-12">
                                    <h5 className="card-title ms-4">{props.nombre}</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <p className="card-text ms-4">{props.profesion}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CartaTestimonio;
