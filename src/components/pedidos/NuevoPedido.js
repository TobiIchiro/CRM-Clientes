
import React, {Fragment, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";

import Swal from "sweetalert2";

import ProductoListado from "./ProductoListado";
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
    }, [productos, productos2])

    const buscarProducto = async e => {
        e.preventDefault();

        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`)
        if(resultadoBusqueda.data[0]){
          guardarProducto2(resultadoBusqueda.data)
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

    const agregarProductos = index => {
        let productoAgregar = productos2[index]
        productoAgregar.producto = productos2[index]._id
        productoAgregar.cantidad = 1
        guardarProducto([...productos, productoAgregar])
        guardarProducto2([])


    }

    const restarCantidad = index => {
        const todosProductos = [...productos]

        if(todosProductos[index].cantidad === 1) return;

        todosProductos[index].cantidad--;
        guardarProducto(todosProductos)
        
    }

    const agregarCantidad = index => {
        const todosProductos = [...productos]

        if(todosProductos[index].cantidad >= 30) return;

        todosProductos[index].cantidad++;
        guardarProducto(todosProductos)
    }

    const actualizarInput = (index,e) => {
        const todosProductos = [...productos]
        if(parseInt(e.target.value) <= 1) e.target.value = 1;
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

    const eliminarProducto = id => {
        const todosProductos = productos.filter(producto => producto.producto !== id);
        guardarProducto(todosProductos)

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
            {productos2[0] ?
                productos2.map((producto2,index) => (
                    <ProductoListado
                    key={producto2._id}
                        producto2={producto2}
                        index={index}
                        agregarProductos={agregarProductos}
                    />
                ))
             : null}
            
            <ul className="resumen">
                {productos.map((producto, index) => (
                    <FormCantidadProducto
                        key={producto.producto}
                        producto={producto}
                        restarCantidad={restarCantidad}
                        agregarCantidad={agregarCantidad}
                        actualizarInput={actualizarInput}
                        eliminarProducto={eliminarProducto}
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