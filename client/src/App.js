import React from 'react';
import './App.css';
import './calander.css'
import LoginPage from './routes/public/LoginPage';
import RegisterPage from './routes/public/RegisterPage';
import ForgetPasswordPage from './routes/public/ForgetPasswordPage';
import Expired from './components/expired';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './routes/private'
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path='/login' exact component={LoginPage} />
        <Route path='/register' exact component={RegisterPage} />
        <Route path='/forgetPassword' exact component={ForgetPasswordPage} />
        <Route path='/passwordReset' exact component={ResetPassword} />
        <Route path='/expired' exact component={Expired} />
        <PrivateRoute/>
      </Switch>

    </Router>
    </>
  );
}

export default App;
