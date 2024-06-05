const CartaMarcaCocheHorizontal = (props) => {
    return (
        <div className="cardMarquee">
            <img className="logoMarcaMarquee" src={props.brandCarImg} alt={"Logo de " + props.nombre} />
        </div>
    )
}

export default CartaMarcaCocheHorizontal
