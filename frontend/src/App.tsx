import React from 'react';
import CreateOrder from './pages/CreateOrder';
import OrderDetail from './pages/OrderDetail';
import OrderList from './pages/OrderList';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from "./layout/Nabvar";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
    <Switch>
          <Route path="/" exact>
            <OrderList />
          </Route>
          <Route path="/create" exact>
            <CreateOrder />
          </Route>
          <Route path="/detail/:id" exact>
            <OrderDetail />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
