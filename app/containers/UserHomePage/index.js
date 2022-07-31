/**
 *
 * UserHomePage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Box, Grid, MobileStepper, Container } from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import SwipeableViews from 'react-swipeable-views';
// import { autoPlay } from 'react-swipeable-views-utils';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import { CardItem } from '../CardItem';
import Headerr from '../Headerr';
import Avatar1 from '../../images/quan.jpg';
import Logo from '../../images/Happy_Delivery_Man_logo_cartoon_art_illustration.jpg';
import { fetchListFood, logOut } from './actions';
import { getStore, getUser, removeUserSession } from '../../utils/common';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectUserHomePage from './selectors';

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
    borderRadius: '20px',
    position: 'fixed',
    marginLeft: '90px',
    visibility: 'hidden',
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
}));

export function UserHomePage(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'userHomePage', reducer });
  useInjectSaga({ key: 'userHomePage', saga });

  const classes = useStyles();
  const [searched, setSearched] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  // const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  const store = getStore();

  const user = getUser();
  const handleLogout = () => {
    dispatch(logOut());
    removeUserSession();
    props.history.push('/');
  };

  const handleSellerRegister = () => {
    if (user) {
      props.history.push('/sellerRegister');
    } else {
      props.history.push('/login');
    }
  };

  const requestSearch = searchedVal => {
    // const filteredRows = props.dashboardStore.listStore.filter((row) => {
    //   return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    // });
    // setData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };

  const images = [
    {
      imgPath: 'http://shopeeplus.com//upload/images/1ma-giam-gia-shopee.png',
    },
    {
      imgPath:
        'https://product.hstatic.net/200000324415/product/img_4130_6703ef1ab42b474baa2bf4db587b787e_large.jpg',
    },
    {
      imgPath: 'https://file.vfo.vn/hinh/2016/01/anh-bia-ve-do-an-telasm-1.jpg',
    },
    {
      imgPath:
        'https://file.vfo.vn/hinh/2016/01/anh-bia-ve-do-an-telasm-16.jpg',
    },
  ];

  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };

  // get list food
  useEffect(() => {

    const data = {
      sid: store,
      search: props.location.state ? props.location.state.search : ""
    };
    dispatch(fetchListFood(data));

  }, [props.location.state]);


  return (
    <>
      <Headerr />
      <Container fixed>
        <div style={{ textAlign: 'center' }}>
          <Button
            className={classes.btn}
            variant="outlined"
            startIcon={<RestaurantIcon />}
          >
            All
          </Button>
          <Button
            className={classes.btn}
            variant="outlined"
            startIcon={<RiceBowlIcon />}
          >
            Rice
          </Button>
          <Button
            className={classes.btn}
            variant="outlined"
            startIcon={<RamenDiningIcon />}
          >
            Noodle
          </Button>
          <Button
            className={classes.btn}
            variant="outlined"
            startIcon={<FreeBreakfastIcon />}
          >
            Drink
          </Button>
          <Button
            className={classes.btn}
            variant="outlined"
            startIcon={<FastfoodIcon />}
          >
            Fast Food
          </Button>
          <Button
            className={classes.btn}
            variant="outlined"
            startIcon={<StarIcon />}
          >
            Top Favorite
          </Button>
        </div>

        {/* <Grid container spacing={2} style={{ marignTop: "10px" }}>
          {foods.map((item, index) =>

            <Grid item sm={4} xs={6} md={2} key={index} style={{ width: "100%" }}>
              <Link to={{ pathname: `/food/${item.id}`, state: { item: item } }}
                style={{ textDecoration: "none" }}>
                <CardItem foodName={item.foodName} storeName={item.storeName} address={item.address} img={item.img} />
              </Link>
            </Grid>

          )}
        </Grid> */}

        <Grid container spacing={2} style={{ marignTop: '10px' }}>
          {props.userHomePage.foodList.map((item, index) => (
            <Grid item sm={4} xs={6} md={3} key={index} style={{ width: '100%' }}>
              <Link
                to={{ pathname: `/food/${item.id}`, state: { item } }}
                style={{ textDecoration: 'none' }}
              >
                <CardItem
                  foodName={item.name}
                  storeName={item.foodStore.name}
                  address={item.foodStore.dormLocation == null ? item.foodStore.otherLocation : item.foodStore.dormLocation}
                  img={item.image}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

UserHomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userHomePage: makeSelectUserHomePage(),
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
)(UserHomePage);
