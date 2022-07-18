/**
 *
 * SellerSideBar
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import MenuIcon from '@mui/icons-material/Menu';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Logo from '../../images/Happy_Delivery_Man_logo_cartoon_art_illustration.jpg';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { AppBar, IconButton, Toolbar, Drawer, Box } from '@mui/material';
import { makeStyles, Container, Typography } from '@material-ui/core';
import { fontWeight } from '@mui/system';
import DashboardHeader from '../DashboardHeader';
import { getStore, getUser, removeUserSession } from '../../utils/common';


const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    paddingTop: theme.spacing(5),
    backgroundColor: "white",
    textDecoration: "none",

  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    transition: '0.4s',
    borderRadius: "10px",
    padding: "10px 0",

    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
      "&:hover": {
        color: "#FF9900",
        marginLeft: "20px",
        backgroundColor: "#FFD18C"
      },
    },

  },
  topLogo: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer"
    },
  },
  textLogo: {
    fontWeight: 600,
    fontSize: 30,
    [theme.breakpoints.down("sm")]: {
      //display: "none"
    }
  },
  text: {
    fontWeight: "580",
    [theme.breakpoints.down("sm")]: {
      //display: "none"
    }
  },
  logo: {
    width: "5rem",
    height: "4rem",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "4rem",
      height: "4rem",
    },
    [theme.breakpoints.up("sm")]: {
      width: "4rem",
      height: "4rem",
    }

  },
  link: {
    textDecoration: "none",
    color: "#7d8da1",
    alignItems: "center",
    "&.active": {
      color: "#FFAC30"
    }
  },
  icon: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(2),
    fontSize: "1.6rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "40px"
    }
  },
  span: {
    color: "#FFAC30"
  }

}));

const drawerWidth = 245


function SellerSideBar(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const classes = useStyles();

  const history = useHistory();

  const drawer = (
    <Container className={classes.container}>
      <div onClick={() => history.push("/")} className={classes.topLogo} >
        <img src={Logo} alt="logo" className={classes.logo} />
        <Typography className={classes.textLogo}>No <span className={classes.span}>Nê</span></Typography>
      </div>
      <NavLink to="/my-store/manager-order" className={classes.link} onClick={handleDrawerToggle}>
        <div className={classes.item}>
          <DashboardRoundedIcon className={classes.icon} />
          <Typography className={classes.text}>Manage Order</Typography>
        </div>
      </NavLink>
      <NavLink to="/my-store/manager-product" className={classes.link} onClick={handleDrawerToggle}>
        <div className={classes.item}>
          <PersonIcon className={classes.icon} />
          <Typography className={classes.text}>Manage Product</Typography>
        </div>
      </NavLink>
      <NavLink to="/my-store/turnover" className={classes.link} onClick={handleDrawerToggle}>
        <div className={classes.item}>
          <AccountBoxIcon className={classes.icon} />
          <Typography className={classes.text}>Turnover</Typography>
        </div>
      </NavLink>
      <NavLink to="/my-store/setting" className={classes.link} onClick={handleDrawerToggle}>
        <div className={classes.item}>
          <StoreIcon className={classes.icon} />
          <Typography className={classes.text}>Store Setting</Typography>
        </div>
      </NavLink >
      <NavLink to="/myReport" className={classes.link} onClick={handleDrawerToggle}>
        <div className={classes.item}>
          <LocalGroceryStoreIcon className={classes.icon} />
          <Typography className={classes.text}>My Report</Typography>
        </div>
      </NavLink>
    </Container >
  );

  const location = useLocation();
  const path = location.pathname;
  const user = getUser();

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar style={{ backgroundColor: "#FFAC30" }}
        // position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
            {/* <span><p>Hello, Quan </p></span> */}
          </IconButton>
          {/* {path == "/myStore" ? <DashboardHeader text="MY STORE" user={user} /> :
            path == "/managerProduct" || path == "/managerProduct/:addProduct" ? <DashboardHeader text="MY STORE" user={user} /> : path == "/managerProduct/:id" ? <DashboardHeader text="PRODUCT" user={user} /> : null} */}
          <DashboardHeader text="MY STORE" user={user} />
          {/* {user != null && user.authorities[0].authority == 'USER' && path != "/" ? <DashboardHeader text="MY STORE" user={user} /> : null} */}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

SellerSideBar.propTypes = {};

export default memo(SellerSideBar);
