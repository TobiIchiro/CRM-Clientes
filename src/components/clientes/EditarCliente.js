import React, {Fragment, useState} from "react";
import {useNavigate, useParams} from "react-router-dom"
import Swal from "sweetalert2";

import clienteAxios from "../../config/axios";

function EditarCliente (props) {
    let {_id} = useParams()
    let navigate = useNavigate();

    const[cliente, guardarCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    })

    const validarCliente = () => {
        const {nombre, apellido, email, empresa, telefono} = cliente;

        return !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length
    }

    const actualizarState = e => {
        guardarCliente({
            ...cliente,
            [e.target.name] : e.target.value
        })
    }


    return(
        <Fragment>
            <h2>Nuevo Cliente</h2>
            <form>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input  type="text"
                            placeholder="Nombre Cliente"
                            name="nombre"
                            onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input  type="text"
                            placeholder="Apellido Cliente"
                            name="apellido"
                            onChange={actualizarState}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input  type="text"
                            placeholder="Empresa Cliente"
                            name="empresa"
                            onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input  type="email"
                            placeholder="Email Cliente"
                            name="email"
                            onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input  type="tel"
                            placeholder="Teléfono Cliente"
                            name="telefono"
                            onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                    <input  type="submit"
                            className="btn btn-azul"
                            value="Agregar Cliente"
                            disabled={validarCliente()}
                    />
                </div>

            </form>
        </Fragment>
    )
}

export default EditarCliente;