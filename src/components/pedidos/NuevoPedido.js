
import React, {Fragment, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";

import Swal from "sweetalert2";

import ProductoListado from "../productos/producto";
import FormBuscarProducto from "./formBuscarProducto";
import FormCantidadProducto from "./FormCantidadProductos";

const NuevoPedido = () => {
    const {_id} = useParams()

    const [cliente, guardarCliente] = useState({})
    const [busqueda, guardarBusqueda] = useState('')
    const [productos2, guardarProducto2] = useState([])
    const [productos, guardarProducto] = useState([])
    const [total, guardarTotal] = useState(0)

    const consultarAPI = async () => {
        const result = await clienteAxios.get(`/clientes/${_id}`)
        guardarCliente(result.data)
    }

    useEffect(() => {
        consultarAPI();
        calcularTotal()
    }, [productos])

    const buscarProducto = async e => {
        e.preventDefault();

        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`)
        if(resultadoBusqueda.data[0]){
            let productoResultado = resultadoBusqueda.data[0];
            

            productoResultado.producto = resultadoBusqueda.data[0]._id
            productoResultado.cantidad = 0

            guardarProducto([...productos, productoResultado])
            
        }
        else{
            Swal.fire({
                title: 'Sin Resultados',
                text: 'No hay resultados',
                icon: 'error'
            })
        }
    }

    const leerDatosBusqueda = e => {
        guardarBusqueda(e.target.value)
    }

    const restarProductos = index => {
        const todosProductos = [...productos]

        if(todosProductos[index].cantidad === 0) return;

        todosProductos[index].cantidad--;
        guardarProducto(todosProductos)
        
    }

    const agregarProductos = index => {
        const todosProductos = [...productos]

        if(todosProductos[index].cantidad >= 30) return;

        todosProductos[index].cantidad++;
        guardarProducto(todosProductos)
    }

    const actualizarInput = (index,e) => {
        const todosProductos = [...productos]
        if(parseInt(e.target.value) <= 0) e.target.value = 0;
        if(parseInt(e.target.value) >= 30) e.target.value = 30;
        todosProductos[index].cantidad = e.target.value
        guardarProducto(todosProductos)
    }

    const calcularTotal = () => {
        if(productos.length === 0){
            guardarTotal(0)
            return
        }
        let nuevoTotal = 0
        productos.map(producto => nuevoTotal += producto.cantidad * producto.precio)
        guardarTotal(nuevoTotal)

    }

    return (
        <Fragment>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                <p>Telefono: {cliente.telefono}</p>
            </div>

            <FormBuscarProducto
                buscarProducto= {buscarProducto}
                leerDatosBusqueda= {leerDatosBusqueda}
            />
            {productos2[0] ? <ProductoListado/> : null}
            
            <ul className="resumen">
                {productos.map((producto, index) => (
                    <FormCantidadProducto
                        key={producto.producto}
                        producto={producto}
                        restarProductos={restarProductos}
                        agregarProductos={agregarProductos}
                        actualizarInput={actualizarInput}
                        index={index}
                    />
                ))}
                    
            </ul>
            <p className="total">Total: <span>$ {total}</span></p>
            {
                total > 0 ? (
                    <form
                    >
                        <input 
                            type="submit"
                            className="btn btn-verde btn-block"
                            value="Realizar Pedido"
                        />
                    </form>
                ) : null }
        </Fragment>
)}

export default NuevoPedido