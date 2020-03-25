import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './main-styles.css';

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
      <Router>
        <div>
          <ul className="disp-flex flex-dir-row justify-cont-space-btw">
            <li>
              <Link to="/">Home link</Link>
            </li>
            <li>
              <Link to="/about">About link</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard link</Link>
            </li>
          </ul>

          <hr />

          {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
      <div className="disp-flex justify-cont-center">
        <h2>This is home</h2>
      </div>
  );
}

function About() {
  return (
      <div className="disp-flex justify-cont-center">
        <h2>This is smth about</h2>
      </div>
  );
}

function Dashboard() {
  return (
      <div className="disp-flex justify-cont-center">
        <h2>this is dashboard</h2>
      </div>
  );
}
