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
import { getStore, getUser, removeUserSession } from '../../utils/common';
import { getCart, getStoreById, getUserById, logOut, reset } from './actions';
import Logo from '../../images/logoNone.png';
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
  partner: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'left',
    [theme.breakpoints.down("sm")]: {
      justifyContent: 'center',
      order: "2",
    },
  },
  loginBtn: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    justifyContent: "left",
    paddingLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      order: "0",
      justifyContent: 'right',
    },
  },
  cartIcon: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'right',
    [theme.breakpoints.down("sm")]: {
      order: "3",
      justifyContent: 'center',
    },
  },
  logo: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down("sm")]: {
      order: "1",
    },
  }
}));

export function Headerr(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'headerr', reducer });
  useInjectSaga({ key: 'headerr', saga });

  const classes = useStyles();
  const [searched, setSearched] = useState('');
  const user = getUser();
  const store = getStore();
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
    //console.log(searchedVal)
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
      dispatch(getUserById(data));
    }

    if (store != null) {
      const data = {
        id: store
      }
      dispatch(getStoreById(data));
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

  console.log(props.headerr.store)

  return (
    <div style={{ backgroundColor: '#fff', padding: "15px", boxShadow: '2rem 2rem 3rem rgba(132, 139, 200, 0.18)', }}>
      {/* <Container fixed style={{ padding: '10px' }}>
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
         
              {user == null ? (
                <>
                  <Button href="/userRegister"><FormattedMessage {...messages.signup} /></Button>|
                  <Button href="/login"><FormattedMessage {...messages.login} /> </Button>
                </>
              ) : (
                <>
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title={`${props.headerr.user ? props.headerr.user.firstname : null} ${props.headerr.user ? props.headerr.user.lastname : null}`}>
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="avatar" src={props.headerr.user != undefined ? props.headerr.user.avatar : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} />
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
      </Container> */}

      <Container fixed>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={3} className={classes.logo}>
            <div style={{ display: "flex", margin: '0 auto' }}>
              <div style={{ width: '60px', height: '60px', marginRight: "10px" }}>
                <img
                  src={Logo}
                  alt="logo"
                  style={{ width: '100%', height: '100%', borderRadius: '20px', cursor: "pointer" }}
                  onClick={() => history.push('/')}
                />
              </div>
              <div className={classes.center}>
                <p className={classes.title}>
                  No <span style={{ color: '#EA5E5E' }}>Nê</span>
                </p>
              </div>
            </div>

          </Grid>

          <Grid item xs={12} sm={12} md={4} className={classes.partner}>
            <div style={{ textAlign: 'center' }}>
              {(user && user.authorities[0].authority == 'USER') ||
                user == null ? (
                <Button onClick={handleSellerRegister}>
                  <FormattedMessage {...messages.becomeSeller} />
                </Button>
              ) : user && user.authorities[0].authority == 'SELLER' && props.headerr.store && props.headerr.store.status != "declined" ? (
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
              ) : <Typography className={classes.text}><span style={{ color: "#fe0000" }}>Cửa hàng của bạn tạm thời đang bị khóa</span></Typography>}

              {/* {user && user.authorities[0].authority == 'SELLER' && props.headerr.store && props.headerr.store.status != "declined" ? (
                <>
                  <div className={classes.center}>
                    <NavLink to="/my-store/manager-order" className={classes.link}>
                      <div className={classes.item}>
                        <StoreIcon className={classes.icon} />
                        <Typography className={classes.text}><FormattedMessage {...messages.myStore} /></Typography>
                      </div>
                    </NavLink>
                  </div>
                </>
              ) : <Typography className={classes.text}><span style={{ color: "#fe0000" }}>Cửa hàng của bạn tạm thời đang bị khóa</span></Typography>} */}
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={2} className={classes.cartIcon}>
            <div style={{ textAlign: 'center', cursor: "pointer" }}>
              <Badge badgeContent={result} color="primary" onClick={() => history.push("/cart")}>
                <AddShoppingCartIcon color="action" />
              </Badge>
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={3} className={classes.loginBtn} >
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
                    <Tooltip title={`${props.headerr.user ? props.headerr.user.firstname : null} ${props.headerr.user ? props.headerr.user.lastname : null}`}>
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="avatar" src={props.headerr.user != undefined ? props.headerr.user.avatar : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} />
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
