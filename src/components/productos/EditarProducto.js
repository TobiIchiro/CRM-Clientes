import React, { useState, Fragment, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";

import clienteAxios from "../../config/axios";

const EditarProducto = () => {
    //Obtener ID
    let {_id} = useParams();

    //Para el redireccionamiento
    let navigate = useNavigate();
    
    const [producto, datosProducto] = useState({
        nombre: '',
        precio: '',
        imagen: ''
    })

    const [archivo, datosArchivo] = useState('')

    const consultarAPI = async () => {
        const productoConsulta = await clienteAxios.get(`/productos/${_id}`)
        datosProducto(productoConsulta.data)
    }

    useEffect( () => {
        consultarAPI();
    }, [])

    const leerInformacionProducto = e => {
        datosProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    const leerArchivo = e => {
        datosArchivo(e.target.files[0])
    }

    const {nombre, precio, imagen} = producto

    const actualizarProducto = async e => {
        e.preventDefault()

        const formDataa = new FormData();
        formDataa.append('nombre',producto.nombre)
        formDataa.append('precio',producto.precio)
        formDataa.append('imagen',archivo)

        try {
            const res = await clienteAxios.put(`/productos/${_id}`,formDataa, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            if(res.status === 200){
                Swal.fire(
                    'PRODUCTO EDITADO',
                    res.data.mensaje,
                    'success'
                )
                navigate('/productos');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Vuelva a intentarlo'
            })
        }
    }

    return (
        <Fragment>
            <h2>Editar Producto</h2>
            <form
                onSubmit={actualizarProducto}
            >

                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Producto"
                        name="nombre"
                        onChange={leerInformacionProducto}
                        defaultValue={nombre}
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
                        defaultValue={precio}
                    />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    {
                        imagen ? (<img src = {`http://localhost:5000/${imagen}`} alt="imagen" width="300" />) : null
                    }
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
                            value="Editar Producto"
                        />
                </div>
            </form>
        </Fragment>
    
)}

export default EditarProducto