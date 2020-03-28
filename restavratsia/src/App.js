import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './components/css-styles/main-styles.css';
import './components/css-styles/dynamic-styles.css';
import SignIn from 'components/SignIn'
import MainPage from "./components/MainPage";

export default function BaseApp() {
  return (
      <Router>
          <header className="d-flex-spacebtw">
              <div className="col-3">
                  <Link to="/"><img className="col-3 col-xl-3" src={require("./components/css-styles/images/logo_transparent.png")} id="logo"/></Link>
              </div>
              <nav className="menu flex-end-center col-9">
                  <div className="flex-row-center" >
                      <Link to="/sign-in" className="menu-link">sign in</Link>
                      <Link to="/sign-up" className="menu-link">sign up</Link>
                  </div>
              </nav>
          </header>

              <Switch>
                  <Route exact path="/">
                      <MainPage />
                  </Route>
                  <Route path="/sign-in">
                       <SignIn />
                  </Route>
                  <Route path="/sign-out">

                  </Route>
              </Switch>
      </Router>
  );
}
