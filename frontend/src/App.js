import React from 'react'
import {BrowserRouter as Router , Route,Switch} from 'react-router-dom';
import Register from './components/auth/Signup';
import Login from './components/auth/Login';
import PrivateRoute from './components/APIcalls/PrivateRoute'
import Home from './components/Home'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/signup' exact component={Register} />
        <Route path='/home' exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
