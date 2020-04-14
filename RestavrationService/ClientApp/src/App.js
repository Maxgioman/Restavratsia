import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import StartApp from "./components/StartApp";

export default function App() {
  return (
    <Router>
      <Route path="/" component={StartApp} />
    </Router>
  );
}
