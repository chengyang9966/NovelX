import React from 'react';
import './App.css';
import Login from './components/login';
import ForgetPassword from './components/ForgetPassword';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './routes/private'
import Register from './components/register';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/forgetPassword' exact component={ForgetPassword} />
        <Route path='/passwordReset' component={ResetPassword} />
        <PrivateRoute/>
      </Switch>

    </Router>
    </>
  );
}

export default App;
