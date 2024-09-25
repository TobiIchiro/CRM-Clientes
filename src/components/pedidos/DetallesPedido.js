import React from "react";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import clienteAxios from "../../config/axios";

const DetallesPedido = (props) => {
    let navigate = useNavigate()

    const {pedido,} = props
    const {_id, cliente, pedido: productos} = pedido

    const eliminarPedido = idPedido => {
        Swal.fire({
            title: "¿Estas seguro de eliminar este pedido?",
            text: "¡No podrás revertir esta acción!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar",
            cancelButtonText: "Cancelar"}).then( async (result) => {
                if(result.isConfirmed){
                    const resultado = await clienteAxios.delete(`/pedidos/${idPedido}`)
                    if(resultado.status === 200){
                        Swal.fire(
                            'Pedido eliminado',
                            resultado.data.mensaje,
                            'success'
                        )
                        navigate('/pedidos');
                    }
                    else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo agregar el pedido'
                        })
                    }
                }
            })}

    return (
        <li className="pedido">
            <div className="info-pedido">
                <p className="id">ID: {_id}</p>
                <p className="nombre">Cliente: {cliente.nombre} {cliente.apellido}</p>

                <div className="articulos-pedido">
                    <p className="productos">Artículos Pedido: </p>
                    <ul>
                        {productos.map(articulo => (
                            <li key={_id+articulo.producto._id}>
                                <p>{articulo.producto.nombre}</p>
                                <p>{articulo.producto.precio}</p>
                                <p>{articulo.producto.cantidad}</p>
                            </li>
                            
                        ))}
                    </ul>
                </div>
                <p className="total">Total: $ {pedido.total} </p>
            </div>
            <div className="acciones">
                <a href="#" className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Pedido
                </a>
                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarPedido(_id)}
                >
                    <i className="fas fa-times"></i>
                    Eliminar Pedido
                </button>
            </div>
        </li>
    )
}

export default DetallesPedido