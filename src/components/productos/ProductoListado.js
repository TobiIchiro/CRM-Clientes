import React from "react";

const ProductoListado = () => {
    return (
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">{"$"} {precio} </p>
                {
                    imagen ? (<img src={`http://localhost:5000/${imagen}`}/>) : null
                }
            </div>
        </li>
    )
}

export default ProductoListado