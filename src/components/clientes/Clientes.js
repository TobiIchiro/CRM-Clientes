import React, {useEffect} from "react";

import clienteAxios from "../../config/axios";



function Clientes() {
    const consultarAPI = async () => {
        const clientesConsulta = await clienteAxios.get('/clientes')
    }

    useEffect( () => {
        consultarAPI();
    });

    <h2>Clientes</h2>
}



    

export default Clientes;