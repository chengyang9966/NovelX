import React from 'react';
import './App.css';
import Login from './components/login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './routes/private'

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path='/login' exact component={Login} />
        <PrivateRoute/>
      </Switch>

    </Router>
    </>
  );
}

export default App;
