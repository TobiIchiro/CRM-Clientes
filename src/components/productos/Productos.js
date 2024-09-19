import { useEffect, useState, Fragment } from "react";
import React from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios";

import Producto from "./producto";



const Productos = () => {
    const consultarAPI = async () => {
        const ProductosConsulta = await clienteAxios.get('/productos')
        guardarProductos(ProductosConsulta.data)
    }
    const [productos,guardarProductos] = useState([])
    
    useEffect( () => {
        consultarAPI();
    }, [productos]);

    return (
        <Fragment>
            <h2>Productos</h2>

            <Link to="/productos/add" className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {productos.map( producto => (
                    <Producto
                        key = {producto.id}
                        producto = {producto}
                    />
                ))}
            </ul>
        </Fragment>
    )
}


export default Productos