import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

class OrderInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    let id = this.props.match.params.id;
    let response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/" + id
    );
    if (response.status === 200) {
      this.setState({
        id: id,
        title: response.data.title,
        body: response.data.body,
      });
    } else
      this.setState({
        title: "",
        body: "error occured",
      });
  };

  render() {
    let view;
    const props = {
      title: this.state.title,
      body: this.state.body,
    };
    if (this.props.usertype === "customer") view = OrderViewCustomer(props);
    else view = OrderViewCompany(props);

    return (
      <section id='order-iface' className="section col-12 section-height-auto">
        <Header />
        <div className="container col-9 flex-center">
          <div
            id="order-if"
            className="d-flex align-items-center scroll-y-only col-12"
          >
            {view}
          </div>
        </div>
      </section>
    );
  }
}

const OrderViewCustomer = (props) => {
  return <div></div>;
};

const OrderViewCompany = (props) => {
  return (
    <Card
      variant="outlined"
      className="height-100 m-1 flex-column-start_top align-items-start"
    >
      <CardActions>
        <Link id="order-link-back" className="link" to={"/order-desk"}>
          <Button size="medium" color="primary">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-1" /> back to all
            orders
          </Button>
        </Link>
      </CardActions>
      <CardMedia
        component="img"
        alt="some image"
        id="img-hw"
        className="flex-center"
        image={require("./css-styles/images/1bfabe3ab7a5a66739e564dec2c8a4d0.jpg")}
        title={props.title}
      />
      <CardContent>
        <ThemeProvider theme={theme}>
          <Typography gutterBottom variant="h2" component="h3">
            {props.title}
          </Typography>
          <Typography gutterBottom variant="h5" component="h3">
            {props.body}
          </Typography>
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

export default withRouter(OrderInterface);
