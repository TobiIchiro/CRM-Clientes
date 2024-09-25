import React, {Fragment, useEffect, useState} from "react";

import clienteAxios from "../../config/axios";

import DetallesPedido from "./DetallesPedido";

const Pedidos = () => {


    const [pedidos, guardarPedidos] = useState([])

    useEffect(() => {
        const consultarAPI = async () => {
            const resultado = await clienteAxios.get('/pedidos');
            guardarPedidos(resultado.data)
        }

        consultarAPI()
    })



    return (
        <Fragment>
            <h2>Pedidos</h2>
            <ul class="listado-pedidos">
                {pedidos.map(pedido => (
                    <DetallesPedido
                        pedido={pedido}
                    />

                ))}
            </ul>
        </Fragment>
    )
    
    
}

export default Pedidos
