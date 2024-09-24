import React from "react";

const ProductoListado = (props) => {
    const {producto2, index, agregarProductos} = props
    const {nombre, precio, imagen} = producto2
    return (
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">{"$"} {precio} </p>
                {
                    imagen ? (<img src={`http://localhost:5000/${imagen}`}/>) : null
                }
                <button
                    type="button"
                    className="btn btn-verde"
                    onClick={() => agregarProductos(index)}
                >
                    <i>
                        Agregar al pedido
                    </i>
                </button>
            </div>
        </li>
    )
}

export default ProductoListado