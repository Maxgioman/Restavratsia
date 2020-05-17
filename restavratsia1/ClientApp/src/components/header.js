import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css-styles/styles.css";
import "./css-styles/individual-styles.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  createElemsWithHrefs = () => {
    let elems = [];
    for (let i = 0; i < this.props.elements_href.length; i++) {
      elems.push(
        <a
          key={i}
          href={this.props.hrefs[this.props.elements_href[i]]}
          className="menu-link"
        >
          {this.props.elements_href[i]}
        </a>
      );
    }
    return elems;
  };

  createElemsWithLinks = () => {
    let elems = [];
    for (let i = 0; i < this.props.elements_link.length; i++) {
      if (this.props.func_for_link) {
        elems.push(
          <Link
            key={i}
            to={this.props.links[this.props.elements_link[i]]}
            className="menu-link"
            onClick={this.props.func_for_link[this.props.elements_link[i]]}
          >
            {this.props.elements_link[i]}
          </Link>
        );
      } else {
        elems.push(
          <Link
            key={i}
            to={this.props.links[this.props.elements_link[i]]}
            className="menu-link"
          >
            {this.props.elements_link[i]}
          </Link>
        );
      }
    }
    return elems;
  };

  render() {
    let href_elems;
    let link_elems;
    if (this.props.hrefs && this.props.links) {
      href_elems = this.createElemsWithHrefs();
      link_elems = this.createElemsWithLinks();
    } else if (this.props.hrefs) href_elems = this.createElemsWithHrefs();
    else if (this.props.links) link_elems = this.createElemsWithLinks();

    return (
      <header className="d-flex-spacebtw">
        <div className="col-3">
          <Link to="/">
            <img
              className="col-3 col-xl-3"
              src={require("./css-styles/images/logo_transparent.png")}
              id="logo"
            />
          </Link>
        </div>
        <nav id="navigation" className="menu flex-end-center col-9">
          <div className="flex-row-center">
            {href_elems}
            {link_elems}
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
