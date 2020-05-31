import React, { Component } from "react";
import { Link } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateOrder from "./forms/UpdateOrder";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  ThemeProvider,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import Header from "./header";
import request from "./Utils/RequestWrapper";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

class OrderInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.OrderViewCompany = this.OrderViewCompany.bind(this);
    this.OrderViewCustomer = this.OrderViewCustomer.bind(this);
  }

  componentDidMount = async () => {
    let id = this.props.match.params.id;
    let response = await request({
      url: "ads/get_order/" + id,
    });
    if (response.status === 200) {
      this.setState({
        ...this.state,
        id: id,
        title: response.data.title,
        specialization: response.data.specializationSpecialization,
        body: response.data.description,
        date: response.data.dateOfOrder,
      });
    } else
      this.setState({
        title: "",
        body: "error occured",
      });
  };

  handleChange = (e) => {
    let field = e.target.id;
    let value = e.target.value;
    this.setState({
      ...this.state,
      [field]: value,
    });
  };

  OrderViewCustomer = (props) => {
    return (
      <Card
        variant="outlined"
        className="height-100 m-1 flex-column-start_top align-items-start"
      >
        <CardActions>
          <Link
            id="order-link-back"
            className="link"
            to={"/customer-office/" + window.localStorage.getItem("userId")}
          >
            <Button size="medium" color="primary">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-1" /> back to my
              orders
            </Button>
          </Link>
        </CardActions>
        <CardMedia
          component="img"
          alt="some image"
          id="img-hw"
          className="flex-center"
          image={require("./css-styles/images/order.jpg")}
          title={props.title}
        />
        <UpdateOrder
          id={this.state.id}
          title={props.title}
          description={props.body}
          specialization={props.specialization}
          date={props.date}
        />
      </Card>
    );
  };

  OrderViewCompany = (props) => {
    return (
      <Card
        variant="outlined"
        className="height-100 m-1 flex-column-start_top align-items-start"
      >
        <CardActions>
          <Link
            id="order-link-back"
            className="link"
            to={"/company-office/" + window.localStorage.getItem("userId")}
          >
            <Button size="medium" color="primary">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-1" /> back to
              all orders
            </Button>
          </Link>
        </CardActions>
        <CardMedia
          component="img"
          alt="some image"
          id="img-hw"
          className="flex-center"
          image={require("./css-styles/images/order.jpg")}
          title={props.title}
        />
        <CardContent>
          <ThemeProvider theme={theme}>
            <Typography gutterBottom variant="h2" component="h3">
              {props.title}
            </Typography>
            <Typography gutterBottom variant="h6" component="h3">
              {props.date.substring(0, 10)}
            </Typography>
            <div className="col-12 mt-1 mb-1">
              <h3 className="mt-2 mb-2">Specialization</h3>
              <Typography gutterBottom variant="h6" component="h3">
                {props.specialization}
              </Typography>
            </div>
            <div className="col-12 mt-1 mb-1">
              <h3 className="mt-2 mb-2">Description</h3>
              <Typography gutterBottom variant="h6" component="h3">
                {props.body}
              </Typography>
            </div>
          </ThemeProvider>
        </CardContent>
        <CardActions className="d-flex align-items-center col-12">
          <Button size="large" color="primary">
            Apply For
          </Button>
        </CardActions>
      </Card>
    );
  };

  render() {
    let view;
    if (this.state.title) {
      const props = {
        title: this.state.title,
        body: this.state.body,
        specialization: this.state.specialization,
        date: this.state.date,
      };
      if (this.props.usertype === "customer")
        view = this.OrderViewCustomer(props);
      else view = this.OrderViewCompany(props);
    }

    return (
      <section
        id="order-iface"
        className="background-responsive section section-height-auto col-12"
      >
        <Header />
        <div className="container col-9 flex-center">
          <div
            id="order-if"
            className="d-flex align-items-center scroll-y-only col-11"
          >
            {view}
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(OrderInterface);
