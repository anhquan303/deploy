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
import LocaleToggle from './../LocaleToggle';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Box, Grid, MobileStepper, Container, Badge,
  Tooltip, IconButton, Avatar, Menu, MenuItem, Typography
} from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { NavLink, useHistory } from 'react-router-dom';
import makeSelectHeaderr from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getUser, removeUserSession } from '../../utils/common';
import { getCart, logOut, reset } from './actions';
import Logo from '../../images/Happy_Delivery_Man_logo_cartoon_art_illustration.jpg';
import Avatar1 from '../../images/quan.jpg';
import StoreIcon from '@mui/icons-material/Store';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    margin: '0',
    fontWeight: '800',
    fontSize: '30px',
    fontFamily: 'sans-serif',
  },
  avatar: {
    margin: '0 auto',
    width: '100%',
    '&:hover': {
      '& $action': {
        visibility: 'visible',
      },
    },
  },
  action: {
    backgroundColor: '#fff',
    position: 'fixed',
    marginLeft: '90px',
    visibility: 'hidden',
    transition: '0.2s',
  },
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
  userName: {
    marginLeft: "5px",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  myStore: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px"
    }
  },
  link: {
    textDecoration: 'none',
    color: '#000',
    alignItems: 'center',
  },
  icon: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(2),
    fontSize: '1.6rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '40px',
    },
  },
  text: {
    fontWeight: '580',
    [theme.breakpoints.down('sm')]: {
      display: "none"
    },
  },
  item: {
    display: 'flex',
    transition: '0.4s',
    borderRadius: '10px',
  },
  center: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  zero: {
    [theme.breakpoints.down("sm")]: {
      order: "1"
    },
  },
  one: {
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      order: "0",
    },
  },
  two: {
    [theme.breakpoints.down("sm")]: {
      order: "2"
    },
  },
}));

export function Headerr(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'headerr', reducer });
  useInjectSaga({ key: 'headerr', saga });

  const classes = useStyles();
  const [searched, setSearched] = useState('');
  const user = getUser();
  const history = useHistory();
  const [check, setCheck] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleLogout = () => {
    dispatch(logOut());
    removeUserSession();
    history.push('/');
  };

  const handleSellerRegister = () => {
    if (user) {
      history.push('/sellerRegister');
    } else {
      history.push('/login');
    }
  };

  const requestSearch = (searchedVal) => {
    // const filteredRows = props.dashboardStore.listStore.filter((row) => {
    //   return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    // });
    // setData(filteredRows);
    console.log(searchedVal)
    const location = {
      pathname: `/`,
      state: {
        search: searchedVal
      },
    };
    history.push(location);
  };

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };



  useEffect(() => {
    if (user != null) {
      const data = {
        id: user.id,
      };
      dispatch(getCart(data));
    }
  }, []);


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const singleVal = Array.from(props.headerr.cart.map(item =>
    item.cartFoodResponses.map(nestItem => {
      return (nestItem.food.length);
    })
  ));

  let result = 0;

  for (var i = 0; i < singleVal.length; i++) {
    result += parseInt(singleVal[i].length);
  }

  return (
    <div style={{ backgroundColor: '#FF9900', marginBottom: "1rem" }}>
      <Container fixed style={{ padding: '10px' }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={3} className={classes.zero}>
            <div style={{ textAlign: 'center' }}>
              {(user && user.authorities[0].authority == 'USER') ||
                user == null ? (
                <Button onClick={handleSellerRegister}>
                  <FormattedMessage {...messages.becomeSeller} />
                </Button>
              ) : null}
              {user && user.authorities[0].authority == 'SELLER' ? (
                <>
                  {/* <span className={classes.myStore}><Button startIcon={<StoreIcon />} href="/my-store/manager-order" ><span ><FormattedMessage {...messages.myStore} /></span> </Button></span> */}
                  <div className={classes.center}>
                    <NavLink to="/my-store/manager-order" className={classes.link}>
                      <div className={classes.item}>
                        <StoreIcon className={classes.icon} />
                        <Typography className={classes.text}><FormattedMessage {...messages.myStore} /></Typography>
                      </div>
                    </NavLink>
                  </div>
                </>
              ) : null}
            </div>
          </Grid>

          <Grid item xs={12} md={6} sm={12} className={classes.one}>
            <p className={classes.title}>
              No <span style={{ color: '#1168EB' }}>Nê</span>
            </p>
          </Grid>

          <Grid item xs={12} md={3} sm={12} className={classes.two}>
            <div style={{ textAlign: 'center' }}>
              {/* <LocaleToggle /> */}
              {user == null ? (
                <>
                  <Button href="/userRegister"><FormattedMessage {...messages.signup} /></Button>|
                  <Button href="/login"><FormattedMessage {...messages.login} /> </Button>
                </>
              ) : (
                <>
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="avatar" src={Avatar1} />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >

                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography onClick={() => history.push('/user/setting')} textAlign="center"><FormattedMessage {...messages.myAccount} /></Typography>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography onClick={handleLogout} textAlign="center"><FormattedMessage {...messages.logout} /></Typography>
                      </MenuItem>

                    </Menu>
                  </Box>
                </>
              )}
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3} md={3}>
            <div style={{ width: '60px', height: '60px', margin: '0 auto' }}>
              <img
                src={Logo}
                alt="logo"
                style={{ width: '100%', height: '100%', borderRadius: '20px' }}
                onClick={() => history.push('/')}
              />
            </div>
          </Grid>
          <Grid item xs={6} md={6} style={{ marginTop: '5px' }}>
            <SearchBar
              value={searched}
              onChange={searchVal => requestSearch(searchVal)}
              onCancelSearch={() => cancelSearch()}
              //placeholder="What would you like to eat today?"
              placeholder="Bạn muốn ăn gì hôm nay?"
            />
          </Grid>
          <Grid item xs={3} md={3}>
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <Badge badgeContent={result} color="primary" onClick={() => history.push("/cart")}>
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
