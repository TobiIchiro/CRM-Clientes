import React, { useState, Fragment } from "react";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import clienteAxios from "../../config/axios";


const NuevoProducto = () => {
    let navigate = useNavigate()
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: ''
    })

    const [archivo, guardarArchivo] = useState('')

    const agregarProducto = async e => {
        e.preventDefault()
        const formDataa = new FormData();
        formDataa.append('nombre',producto.nombre)
        formDataa.append('precio',producto.precio)
        formDataa.append('imagen',archivo)

        try {
            const res = await clienteAxios.post('/productos',formDataa, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            if(res.status === 200){
                Swal.fire(
                    'PRODUCTO AGREGADO',
                    res.data.mensaje,
                    'success'
                )
                navigate('/');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Vuelva a intentarlo'
            })
        }
    }

    const leerInformacionProducto = e => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    const leerArchivo = e => {
        guardarArchivo(e.target.files[0])
    }

    return (
        <Fragment>
            <h2>Nuevo Producto</h2>

            <form
                onSubmit={agregarProducto}
            >

                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Producto"
                        name="nombre"
                        onChange={leerInformacionProducto}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input
                        type="number"
                        name="precio"
                        min="0.00"
                        step="0.01"
                        placeholder="Precio"
                        onChange={leerInformacionProducto}
                    />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    <input
                        type="file" 
                        name="imagen"
                        onChange={leerArchivo}
                    />
                </div>

                <div className="enviar">
                        <input
                            type="submit"
                            className="btn btn-azul"
                            value="Agregar Producto"
                        />
                </div>
            </form>
        </Fragment>
    )    
}

export default NuevoProducto