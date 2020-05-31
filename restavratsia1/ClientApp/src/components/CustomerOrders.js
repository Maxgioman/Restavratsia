import React, { Component } from "react";
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  Slide,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import OrderCard from "./OrderCard";
import CreateOrder from "./forms/CreateOrder";
import request from "./Utils/RequestWrapper";

class CustomerOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      username: window.localStorage.getItem("username"),
      orderCreateFormOpen: false,
    };
  }

  handleCreateFormOpen = () => {
    this.setState({ ...this.state, orderCreateFormOpen: true });
  };
  handleCreateFormClose = () => {
    this.setState({ ...this.state, orderCreateFormOpen: false });
  };
  Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  componentDidMount = async () => {
    let cards = [];
    let response = await request({
      method: "get",
      url: "ads/get_all/" + window.localStorage.getItem("userId"),
    });
    if (response.data) {
      response.data.map((elem, index) => {
        cards.push(
          <OrderCard
            key={index}
            usertype="customer"
            id={elem.id}
            title={elem.title}
            body={elem.description}
            specialization={elem.specializationSpecialization}
          />
        );
      });
    } else {
      cards = "error occured";
    }
    this.setState({ cards: cards });
  };

  render() {
    return (
      <div>
        <div>
          <div className="d-flex-spacebtw col-12">
            <h1 id="profile-title" className="text-default ml-3 mb-1 mt-1">
              {this.state.username}'s orders
            </h1>
            <div className="mr-3">
              <Button
                variant="contained"
                color="primary"
                component="span"
                onClick={this.handleCreateFormOpen}
              >
                <FontAwesomeIcon className="mr-2" icon={faPlus} />
                add
              </Button>
            </div>
          </div>
        </div>
        <div
          id="cust-orders-container"
          className="col-12 pt-2 pr-2 pl-2 height-100"
        >
          <div id="cust-order-box" className="col-12 height-100">
            {this.state.cards}
          </div>
        </div>
        <div>
          <Dialog
            fullScreen
            open={this.state.orderCreateFormOpen}
            //onClose={this.handleCreateFormClose}
            TransitionComponent={this.Transition}
          >
            <AppBar>
              <Toolbar>
                <div className="d-flex-spacebtw col-12">
                  <div>
                    <Typography variant="h4">Create Order</Typography>
                  </div>
                  <div>
                    <Button
                      autoFocus
                      color="inherit"
                      onClick={this.handleCreateFormClose}
                      className="flex-center"
                    >
                      close
                      <FontAwesomeIcon
                        id="create-order-close-icon"
                        icon={faTimes}
                        className="ml-2"
                      />
                    </Button>
                  </div>
                </div>
              </Toolbar>
            </AppBar>
            <CreateOrder />
          </Dialog>
        </div>
      </div>
    );
  }
}

export default CustomerOrders;
