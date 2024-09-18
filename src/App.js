import React, {Fragment} from "react";

//Routing
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

/* Layout */
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";

/* Componentes */
import Clientes from "./components/clientes/Clientes";
import Pedidos from "./components/pedidos/Pedidos";
import Productos from "./components/productos/Clientes";

function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <div className="grid contenedor contenido-principal">
          <Navegacion />
          <main class="caja-contenido col-9">
            <Switch>
              <Route exact path="/" component={Clientes}/>

              <Route exact path="/" component={Productos}/>

              <Route exact path="/" component={Pedidos}/>
            </Switch>
          </main>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
