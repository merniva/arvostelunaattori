import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Views/Home'
import Register from './Views/Register';
import Login from './Views/Login';
//import { Button } from 'react-bootstrap';
import './App.css';
//import "bootswatch/dist/minty/bootstrap.min.css"; 
import './Bootswatch.css';
//import TodoList from './Components/TodoList';


function LoginRequired({ loggedIn, children, ...rest}) {
  return <Route {...rest} render={
    ({ location }) => {
      if (loggedIn) {
        return children;
      } return <Redirect to={{
        pathname: "/login",
        state: { from: location }
      }}/>
    }
  }>
  </Route>
}

function LogOut({ setLoginStatus }) {
  useEffect(() => setLoginStatus(false))
  return <div>
  <p>Olet kirjautunut ulos</p>
  </div>
}

function App() {
  const [loggedIn, setLogin] = useState(localStorage.getItem("loginstatus") || false);
  const setLoginStatus = (status) => {
    setLogin(status);
    localStorage.setItem("loginstatus", status);
  }
  return (
    <div>
      <Router>
        
        <Header loggedIn={loggedIn}/>

        <div className="p-3">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <LoginRequired loggedIn={loggedIn} path="/profile">
            <div>
              <p>Olet kirjautunut sisään ja tämä on profiilisivusi</p>
            </div>
          </LoginRequired>
          <Route loggedIn={loggedIn} path="/logout">
            <LogOut setLoginStatus={setLoginStatus} />
          </Route>
          <Route path="/login">
            <div>
              <p>Kirjaudu sisään</p>
              <Login setLoginStatus={setLoginStatus} />
            </div>
          </Route>
          <LoginRequired loggedIn={!loggedIn} path="/register">
            <Register />
          </LoginRequired>
        </Switch>
        </div>

        <Footer />

      </Router>
    </div>
  );
}

export default App;
