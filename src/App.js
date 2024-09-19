import React, {Fragment} from "react";

//Routing
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

/* Layout */
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";

/* Componentes */
import Clientes from "./components/clientes/Clientes";
import NuevoCliente from "./components/clientes/NuevoCliente";
import EditarCliente from "./components/clientes/EditarCliente";

import Pedidos from "./components/pedidos/Pedidos";

import Productos from "./components/productos/Productos";
import NuevoProducto from "./components/productos/NuevoProducto";
import EditarProducto from "./components/productos/EditarProducto";


function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <div className="grid contenedor contenido-principal">
          <Navegacion />
          <main className="caja-contenido col-9">
            <Routes>
              <Route exact path="/clientes" element={<Clientes/>}/>
              <Route exact path="/clientes/add" element={<NuevoCliente/>}/>
              <Route exact path="/clientes/edit/:_id" element={<EditarCliente/>}/>

              <Route exact path="/productos" element={<Productos/>}/>
              <Route exact path="/productos/add" element={<NuevoProducto/>}/>
              <Route exact path="/productos/edit/:_id" element={<EditarProducto/>}/>

              <Route exact path="/pedidos" element={<Pedidos/>}/>
            </Routes>
          </main>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
