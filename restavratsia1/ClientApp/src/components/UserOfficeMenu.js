import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Container,
  AppBar,
  Tab,
  Tabs,
  Typography,
  Box,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faListAlt } from "@fortawesome/free-solid-svg-icons";
import ProfilePage from "./ProfilePage";
import CustomerOrders from "./CustomerOrders";
import OrderDesk from "./OrderDesk";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function UserOfficeMenu(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let orders;
  let labels = ["My Profile"];
  if (props.usertype === "customer") {
    orders = <CustomerOrders />;
    labels.push("My Orders");
  } else {
    orders = <OrderDesk />;
    labels.push("Orders");
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <AppBar id="cust-office-tabs" position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange} 
            indicatorColor="primary"
            textColor="#ff0000"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab
              icon={<FontAwesomeIcon icon={faUserCircle} />}
              label={labels[0]}
              {...a11yProps(0)}
            />
            <Tab
              icon={<FontAwesomeIcon icon={faListAlt} />}
              label={labels[1]}
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ProfilePage usertype={props.usertype} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {orders}
        </TabPanel>
      </Container>
    </div>
  );
}
