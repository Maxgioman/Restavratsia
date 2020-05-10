import React, { Component, Suspense, Fragment } from "react";
import OrderCard from "./OrderCard";
import Header from "./header";
import axios from "axios";
import OrderDeskFilters from "./OrderDeskFilters";

class OrderDesk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };
  }

  componentDidMount = async () => {
    {let cards = [];
    let response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    if (response.status === 200) {
      response.data.map((elem) => {
        cards.push(
          <OrderCard id={elem.id} title={elem.title} body={elem.body} />
        );
      });
    } else {
      return "error occured";
    }
    this.setState({ cards: cards });}

  };

  render() {
    return (
      <div className="section">
        <Header />
        <div id="order-desk" className="d-flex col-12 flex-dir-row">
          <div id="order-filters" className="col-3 pt-2 pr-2 pl-4">
            <OrderDeskFilters />
          </div>
          <div id="card-container" className="col-9 pt-2 pr-2 pl-2 height-100">
            <div id="card-box" className="col-12 height-100">
              {this.state.cards}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderDesk;
