import React, { Component } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
    ThemeProvider
} from "@material-ui/core";
import {Redirect} from 'react-router-dom'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

class OrderCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      id : this.props.id,
      title: this.props.title,
      body: this.props.body,
      ref: null,
    }
  }

  handleClick=()=>{
    this.setState({
      ...this.state,
      ref: "/order-desk/co-order_id/"+this.state.id,
    })
  };

  render() {
    let title;
    if(this.state.title.length >37){
      title = this.state.title.substring(0,37)+' ...';
    }else title = this.state.title;

    const ref = this.state.ref;
    if (ref) return <Redirect to={ref} />;

    return (
      <div className='m-auto'>
        <Card className='card m-1' variant='outlined'>
          <CardActionArea onClick={this.handleClick}>
            <CardMedia
                component='img'
                alt='some image'
                className='card-img'
                image={require('./css-styles/images/1bfabe3ab7a5a66739e564dec2c8a4d0.jpg')}
                title="Order Title"
            />
            <CardContent>
              <ThemeProvider theme={theme}>
                <CardMedia
                    title={this.state.title}
                >
                  <Typography gutterBottom variant="h6" component="h3" >
                    {title}
                  </Typography>
                </CardMedia>
                <Typography variant="body2" color="textSecondary" component="p">
                  {this.state.id}
                </Typography>
              </ThemeProvider>
            </CardContent>
          </CardActionArea>
          <div className='align-items-end'>
            <CardActions >
              <Button size="small" color="primary" onClick={this.handleClick}>
                Learn More
              </Button>
            </CardActions>
          </div>
        </Card>
      </div>
    );
  }
}

export default OrderCard;
