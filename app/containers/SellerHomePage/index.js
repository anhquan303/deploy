/**
 *
 * SellerHomePage
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSellerHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  Box, Grid, Container, Avatar, Typography, List, FormControlLabel, Radio, RadioGroup,
  ListItemButton, ListItemIcon, ListItemText, Collapse, OutlinedInput, Select, MenuItem
} from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import Avatar1 from '../../images/quan.jpg';

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
import { Headerr } from '../Headerr';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../utils/common';

const useStyles = makeStyles((theme) => ({
  btn: {
    position: "relative",
    width: "fit-content",
    borderRadius: "10px",
    backgroundColor: "#ff9900",
    margin: "10px 5px",
    "&:hover": {
      backgroundColor: "#FFA500",
      fontWeight: "bold",
      color: "#000",
      boxShadow: "2rem 2rem 3rem rgba(132, 139, 200, 0.18)",
    }
  },
  center: {
    flexWrap: "wrap",
    alignContent: "center",
    display: "flex"
  },
  font: {
    fontFamily: "sans-serif",
    margin: "0"
  },
  link: {
    textDecoration: "none",
    color: "#000",
    alignItems: "center",
    "&.active": {
      color: "#FFAC30",
    }
  },

}));

export function SellerHomePage() {
  useInjectReducer({ key: 'sellerHomePage', reducer });
  useInjectSaga({ key: 'sellerHomePage', saga });

  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const user = getUser();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} className={classes.center}>
            {user ? <Avatar alt="avatar store" src={Avatar1} sx={{ width: 56, height: 56 }} /> :
              <Avatar src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" />
            }
          </Grid>
          <Grid item xs={12} md={9}>
            <p >{user.firstname} {user.lastname}</p>
          </Grid>
        </Grid>
        <hr />
        <div style={{ marginTop: "15px" }}>
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
            <ListItemButton>
              <ListItemIcon>
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText primary="Voucher của tôi" />
            </ListItemButton>
          </List>
        </div>
      </div >
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
