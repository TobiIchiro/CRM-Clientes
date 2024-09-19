import React from "react";
import { Link } from "react-router-dom";

const Producto = ({producto}) => {
    const {_id, nombre, precio, imagen} = producto
    return(
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">{precio} </p>
                {
                    imagen ? (<img src={`http://localhost:5000/${imagen}`}/>) : null
                }
            </div>
            <div className="acciones">
                <Link to={`/productos/edit/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Producto
                </Link>

                <button type="button" className="btn btn-rojo btn-eliminar">
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    )
}


export default Producto