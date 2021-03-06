import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Axios from "axios";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Views/Home";
import AddBoard from "./Views/AddBoard";
import AddItem from "./Views/AddItem";
import AddReview from "./Views/AddReview";
import ShowTable from "./Views/Table";
import Register from "./Views/Register";
import Login from "./Views/Login";
import "./App.css";

window.post = (inputs) =>
  Axios.post("http://localhost:80/React/addreview.php", inputs);

function LoginRequired({ loggedIn, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (loggedIn) {
          return children;
        }
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    ></Route>
  );
}

function LogOut({ setLoginStatus }) {
  useEffect(() => setLoginStatus(false));
  localStorage.removeItem("access_token");
  localStorage.removeItem("expire_at");
  localStorage.removeItem("userid");
  return (
    <div>
      <p>Olet kirjautunut ulos</p>
    </div>
  );
}

function App() {
  const [loggedIn, setLogin] = useState(
    JSON.parse(localStorage.getItem("loginstatus")) || false
  );
  const setLoginStatus = (status) => {
    setLogin(status);
    localStorage.setItem("loginstatus", status);
  };
  return (
    <div>
      <Router>
        <Header loggedIn={loggedIn} />

        <div className="p-3">
          <Switch>
            <Route exact path="/">
              <div>
                <p>
                  Tämä on etusivu. Täällä ei ole paljon sisältöä - näkisit enemmän, jos rekisteröityisit!
                </p>
              </div>
            </Route>
            <LoginRequired loggedIn={loggedIn} path="/profile">
              <Home />
            </LoginRequired>
            <LoginRequired loggedIn={loggedIn} path="/addboard">
              <AddBoard />
            </LoginRequired>
            <LoginRequired loggedIn={loggedIn} path="/additem/:tableId">
              <AddItem />
            </LoginRequired>
            <LoginRequired
              loggedIn={loggedIn}
              path="/addreview/table/:tableId/item/:itemId"
            >
              <AddReview />
            </LoginRequired>
            <LoginRequired loggedIn={loggedIn} path="/tables/table_id/:tableId">
              <ShowTable />
            </LoginRequired>
            <Route loggedIn={loggedIn} path="/logout">
              <LogOut setLoginStatus={setLoginStatus} />
            </Route>
            <Route path="/login">
              <Login setLoginStatus={setLoginStatus} />
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
