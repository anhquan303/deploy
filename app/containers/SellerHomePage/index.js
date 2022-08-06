/**
 *
 * SellerHomePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Box, Grid, Avatar, List, IconButton, Drawer,
  ListItemButton, ListItemIcon, ListItemText, Collapse, AppBar, Toolbar
} from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import PasswordIcon from '@mui/icons-material/Password';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { NavLink } from 'react-router-dom';
import { Headerr } from '../Headerr';
import Avatar1 from '../../images/quan.jpg';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectSellerHomePage from './selectors';
import { getUser } from '../../utils/common';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { getUserById } from './actions';

const useStyles = makeStyles(theme => ({
  btn: {
    position: 'relative',
    width: 'fit-content',
    borderRadius: '10px',
    backgroundColor: '#ff9900',
    margin: '10px 5px',
    '&:hover': {
      backgroundColor: '#FFA500',
      fontWeight: 'bold',
      color: '#000',
      boxShadow: '2rem 2rem 3rem rgba(132, 139, 200, 0.18)',
    },
  },
  center: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
  },
  font: {
    fontFamily: 'sans-serif',
    margin: '0',
  },
  link: {
    textDecoration: 'none',
    color: '#000',
    alignItems: 'center',
    '&.active': {
      color: '#FD4444',
    },
  },
  avatar: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center"
    }
  },
  side: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    [theme.breakpoints.down("md")]: {
      width: "200px"

    }
  }

}));

const drawerWidth = 260;

export function SellerHomePage(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'sellerHomePage', reducer });
  useInjectSaga({ key: 'sellerHomePage', saga });

  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const user = getUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const data = {
      id: user.id,
    }
    dispatch(getUserById(data));
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ marginTop: "15px", padding: "10px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} className={classes.avatar}>
          <Avatar
            alt="avatar"
            src={props.sellerHomePage.user != undefined ? props.sellerHomePage.user.avatar : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
            sx={{ width: 56, height: 56 }}
          />
        </Grid>
        <Grid item xs={12} md={8} className={classes.avatar}>
          <p className={classes.font}>
            {user.firstname} {user.lastname}
          </p>
        </Grid>
      </Grid>
      <hr />
      <div style={{ marginTop: '15px' }}>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: '#FAFAFA' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Tài khoản của tôi" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink to="/user/setting" className={classes.link}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ArticleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Hồ sơ" />
                </ListItemButton>
              </NavLink>
              <NavLink to="/user/address" className={classes.link}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Địa chỉ" />
                </ListItemButton>
              </NavLink>
              <NavLink to="/user/change-password" className={classes.link}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PasswordIcon />
                  </ListItemIcon>
                  <ListItemText primary="Đổi mật khẩu" />
                </ListItemButton>
              </NavLink>
            </List>
          </Collapse>
          <NavLink to="/user/order-history" className={classes.link}>
            <ListItemButton>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Lịch sử mua hàng" />
            </ListItemButton>
          </NavLink>
          <NavLink to="/user/voucher" className={classes.link}>
            <ListItemButton>
              <ListItemIcon>
                <ConfirmationNumberIcon />
              </ListItemIcon>
              <ListItemText primary="Voucher của tôi" />
            </ListItemButton>
          </NavLink>
          <NavLink to="/user/report" className={classes.link}>
            <ListItemButton>
              <ListItemIcon>
                <ReportProblemIcon />
              </ListItemIcon>
              <ListItemText primary="Báo cáo" />
            </ListItemButton>
          </NavLink>
        </List>
      </div>
    </div>
  )
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {/* <AppBar
          style={{ backgroundColor: '#FFAC30' }}
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >

        </AppBar> */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          {/* <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer> */}
          <div className={classes.side}>
            {drawer}
          </div>
        </Box>
      </Box>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

      </Toolbar>
    </>
  );
}

SellerHomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sellerHomePage: makeSelectSellerHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SellerHomePage);
