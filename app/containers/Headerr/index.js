/**
 *
 * Headerr
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHeaderr from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Box, Grid, MobileStepper, Container, Badge } from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import { getUser, removeUserSession } from '../../utils/common';
import { getCart, logOut } from './actions';
import Logo from '../../images/Happy_Delivery_Man_logo_cartoon_art_illustration.jpg';
import SearchBar from "material-ui-search-bar";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Avatar1 from '../../images/quan.jpg';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    margin: "0",
    fontWeight: "800",
    fontSize: "30px",
    fontFamily: "sans-serif"
  },
  avatar: {
    margin: "0 auto",
    width: "100%",
    "&:hover": {
      "& $action": {
        visibility: "visible",
      }
    },
  },
  action: {
    backgroundColor: "#fff",
    position: "fixed",
    marginLeft: "90px",
    visibility: "hidden",
    transition: "0.2s"
  },
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

}));

export function Headerr(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'headerr', reducer });
  useInjectSaga({ key: 'headerr', saga });

  const classes = useStyles();
  const [searched, setSearched] = useState("");
  const user = getUser();
  const history = useHistory();

  // console.log(props)
  const handleLogout = () => {
    dispatch(logOut());
    removeUserSession();
    history.push("/")
  }

  const handleSellerRegister = () => {
    if (user) {
      history.push("/sellerRegister")
    } else {
      history.push("/login")
    }
  }


  const requestSearch = (searchedVal) => {
    // const filteredRows = props.dashboardStore.listStore.filter((row) => {
    //   return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    // });
    // setData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  useEffect(() => {
    if (user != null) {
      const data = {
        id: user.id
      }
      dispatch(getCart(data));
    }
  }, [])


  return (
    <div style={{ backgroundColor: "#FF9900" }}>
      <Container fixed style={{ padding: "10px" }}>
        <Grid container spacing={3}>
          <Grid item xs>
            <div style={{ textAlign: "center" }}>
              {user && user.authorities[0].authority == 'USER' || user == null ? <Button onClick={handleSellerRegister}>Become a seller in No Ne </Button> : null}
              {user && user.authorities[0].authority == 'SELLER' ? <Button href='/my-store/manager-order'>My Store </Button> : null}
            </div>
          </Grid>

          <Grid item xs={6}>
            <p className={classes.title}>No <span style={{ color: "#1168EB" }}>Nê</span></p>
          </Grid>
          <Grid item xs>
            <div style={{ textAlign: "center" }}>
              {user == null ?
                <>
                  <Button href="/userRegister">Đăng ký </Button>
                  |
                  <Button href="/login">Đăng nhập </Button>
                </>
                : <>
                  <div className={classes.avatar}>
                    <img src={Avatar1} alt="logo" style={{ width: "30px", height: "30px", borderRadius: "50px" }} />
                    <span style={{ marginLeft: "10px" }}>{user.firstname} {user.lastname}</span>
                    <div className={classes.action}>
                      <Button href="/user/setting">Tài khoản của tôi</Button><br />
                      <Button onClick={handleLogout}>Đăng xuất </Button><br />
                    </div>
                  </div>

                </>}
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3} md={3}>
            <div style={{ width: "60px", height: "60px", margin: "0 auto" }}>
              <img src={Logo} alt="logo" style={{ width: "100%", height: "100%", borderRadius: "20px" }} onClick={() => history.push("/")} />
            </div>

          </Grid>
          <Grid item xs={6} md={6} style={{ marginTop: "5px" }}>
            <SearchBar
              value={searched}
              onChange={(searchVal) => requestSearch(searchVal)}
              onCancelSearch={() => cancelSearch()}
              placeholder="What would you like to eat today?"
            />
          </Grid>
          <Grid item xs={3} md={3}>
            <div style={{ textAlign: "center", marginTop: "15px" }}>
              <Badge badgeContent={props.headerr.cart.length} color="primary">
                <AddShoppingCartIcon color="action" />
              </Badge>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

Headerr.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  headerr: makeSelectHeaderr(),
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
)(Headerr);
