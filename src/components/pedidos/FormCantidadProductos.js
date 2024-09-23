import React, {Fragment} from "react";

const FormCantidadProducto = (props) => {
    const {producto,restarProductos, agregarProductos, actualizarInput, index} = props

    const {nombre, precio, cantidad} = producto

    return(
        <Fragment>
            <li>
                <div className="texto-producto">
                    <p className="nombre">{nombre}</p>
                    <p className="precio">$ {precio}</p>
                </div>
                <div className="acciones">
                    <div className="contenedor-cantidad">
                        <i
                            className="fas fa-minus"
                            onClick={() => restarProductos(index)}
                        ></i>
                        <input
                            className="fas"
                            style={{width: 100, textAlign: "center"}}
                            type="text"
                            name="cantidad"
                            value={cantidad}
                            onChange={(e) => actualizarInput(index, e)}
                        />
                        {/*<p>{cantidad}</p> */}
                        <i
                            className="fas fa-plus"
                            onClick={() => agregarProductos(index)}
                        ></i>
                    </div>
                    <button type="button" className="btn btn-rojo">
                        <i className="fas fa-minus-circle"></i>
                            Eliminar Producto
                    </button>
                </div>
            </li>
        </Fragment>
    )
}

export default FormCantidadProducto