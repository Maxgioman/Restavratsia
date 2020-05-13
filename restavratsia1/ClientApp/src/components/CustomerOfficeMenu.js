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
          <Typography>{children}</Typography>
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

export default function CustomerOfficeMenu() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <AppBar id="cust-office-tabs" position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab
              icon={<FontAwesomeIcon icon={faUserCircle} />}
              label="My Profile"
              {...a11yProps(0)}
            />
            <Tab
              icon={<FontAwesomeIcon icon={faListAlt} />}
              label="My Orders"
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ProfilePage usertype="customer" />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <CustomerOrders />
        </TabPanel>
      </Container>
    </div>
  );
}
