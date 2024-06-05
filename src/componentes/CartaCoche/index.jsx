const CartaCoche = (props) => {

    function mostrarCategoria(){
        let backgroundSeleccionado;
        let nombreCategoria;

        switch(props.category){
            case "spcl":
                    backgroundSeleccionado = "text-bg-danger";
                    nombreCategoria = "Super classic";
                break;
            case "clsc":
                    backgroundSeleccionado = "text-bg-warning";
                    nombreCategoria = "Classic";
                break;
            case "opwh":
                backgroundSeleccionado = "text-bg-success";
                nombreCategoria = "Open wheel";
            break;
            case "rccr":
                backgroundSeleccionado = "text-bg-info";
                nombreCategoria = "Race";
            break;
            case "rlly":
                backgroundSeleccionado = "text-bg-secondary";
                nombreCategoria = "Rally";
            break;
            case "drft":
                backgroundSeleccionado = "text-bg-light";
                nombreCategoria = "Drift";
            break;
            case "sptc":
                backgroundSeleccionado = "text-bg-primary";
                nombreCategoria = "Sport car";
            break;
            case "strt":
                backgroundSeleccionado = "badge text-bg-dark";
                nombreCategoria = "Street";
            break;
        }

        return <span className={"badge " + backgroundSeleccionado}>{nombreCategoria}</span>
    }

    return (
        <div className="col">
            <div className="card cartaCoche card-model bg-transparent">
                <img className="position-absolute imagenLogoMarcaCartaCoche" src={props.logoMarca} alt="Logo marca" />
                <img className="w-100" src={props.imagen} alt={"Logo de " + props.nombre} />
            </div>
            <div className="row">
                <div className="col-6 col-sm-6">
                    <p className="mt-2 text-capitalize">{props.nombre}</p>
                </div>
                <div className="col-6 col-sm-6 d-flex justify-content-end">
                    {
                        mostrarCategoria()
                    }
                </div>
            </div>
        </div>
    )
}

export default CartaCoche;
