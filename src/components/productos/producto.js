import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

const Producto = ({producto}) => {
    const {_id, nombre, precio, imagen} = producto

    const eliminarProducto = idProducto => {
        Swal.fire({
            title: "¿Estas seguro de eliminar este producto?",
            text: "¡No podrás revertir esta acción!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/productos/${idProducto}`)
                .then(res => {
                    Swal.fire({
                        title: "Producto eliminado",
                        text: res.data.mensaje,
                        icon: "success"
                    });
                })
            }
          });
    }

    return(
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">{"$"} {precio} </p>
                {
                    imagen ? (<img src={`http://localhost:5000/${imagen}`}/>) : null
                }
            </div>
            <div className="acciones">
                <Link to={`/productos/edit/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Producto
                </Link>

                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarProducto(_id)}
                >
                    <i className="fas fa-times"></i>
                    Eliminar Producto
                </button>
            </div>
        </li>
    )
}


export default Producto