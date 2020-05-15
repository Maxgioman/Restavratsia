import React, { Component } from "react";
import OrderCard from "./OrderCard";
import Header from "./header";
import axios from "axios";
import OrderDeskFilters from "./OrderDeskFilters";
import { TextField, Button, IconButton } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class OrderDesk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      cardsAll: [],
      search: "",
      searchCancel: "d-none",
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearchChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
      searchCancel: "",
    });
  };

  handleSearch = async (e) => {
    const phrase = this.state.search;
    let searched = [];
    for (let i = 0; i < this.state.cards.length; i++) {
      if (this.state.cards[i].props.title.split(" ").includes(phrase)) {
        searched.push(this.state.cards[i]);
      }
    }
    await this.setState({ ...this.state, cards: searched });
  };

  handleSearchClear = () => {
    this.setState({
      ...this.state,
      cards: this.state.cardsAll,
      search: "",
      searchCancel: "d-none",
    });
  };

  componentDidMount = async () => {
    {
      let cards = [];
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
      this.setState({ ...this.state, cards: cards, cardsAll: cards });
    }
  };

  render() {
    return (
      <div className="section">
        <Header />
        <div id="order-desk" className="d-flex col-12 flex-dir-row">
          <div id="order-filters" className="col-3 pt-2 pr-2 pl-4 flex-column">
            <div className="flex-column-center mb-1 col-12 width-inherit ">
              <div className="col-12 flex-row-center">
                <TextField
                  id="search"
                  label="Search"
                  onChange={this.handleSearchChange}
                  value={this.state.search}
                  variant="outlined"
                  className="col-12"
                />
                <div className={this.state.searchCancel}>
                  <IconButton
                    aria-label="cancel"
                    onClick={this.handleSearchClear}
                  >
                    <Cancel />
                  </IconButton>
                </div>
              </div>
              <div className="mt-1 col-12">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.handleSearch}
                >
                  <FontAwesomeIcon icon={faSearch} className="mr-1" />
                  search
                </Button>
              </div>
            </div>
            <OrderDeskFilters />
          </div>
          <div
            id="orders-container"
            className="col-9 pt-2 pr-2 pl-2 height-100"
          >
            <div
              id="card-box"
              className="background-transparent col-12 height-100"
            >
              {this.state.cards}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderDesk;
