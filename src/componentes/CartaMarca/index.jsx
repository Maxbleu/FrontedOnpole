const CartaMarca = (props) => {
    return (
        <div className="cartaMarca card">
            <img className="mt-4 mb-4" src={props.imagen} alt={"Logo de " + props.nombre} />
        </div>
    )
}

export default CartaMarca;
