import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Routes from "./components/Routes";

export default function App() {
  return (
    <Router>
      <Route path="/" component={Routes} />
    </Router>
  );
}
