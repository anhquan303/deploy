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
import makeSelectUserHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Box, Grid, MobileStepper, Container } from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import { getStore, getUser, removeUserSession } from '../../utils/common';
import { fetchListFood, logOut } from './actions';
import Logo from '../../images/Happy_Delivery_Man_logo_cartoon_art_illustration.jpg';
import SearchBar from "material-ui-search-bar";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Avatar1 from '../../images/quan.jpg';
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
import { CardItem } from '../CardItem';
import Headerr from './../Headerr';
import { Link } from 'react-router-dom';

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
    borderRadius: "20px",
    position: "fixed",
    marginLeft: "90px",
    visibility: "hidden"
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

export function UserHomePage(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'userHomePage', reducer });
  useInjectSaga({ key: 'userHomePage', saga });

  const classes = useStyles();
  const [searched, setSearched] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  //const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  const store = getStore();

  const user = getUser();
  const handleLogout = () => {
    dispatch(logOut());
    removeUserSession();
    props.history.push("/")
  }

  const handleSellerRegister = () => {
    if (user) {
      props.history.push("/sellerRegister")
    } else {
      props.history.push("/login")
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

  const images = [
    {
      imgPath:
        'http://shopeeplus.com//upload/images/1ma-giam-gia-shopee.png',
    },
    {
      imgPath:
        'https://product.hstatic.net/200000324415/product/img_4130_6703ef1ab42b474baa2bf4db587b787e_large.jpg',
    },
    {
      imgPath:
        'https://file.vfo.vn/hinh/2016/01/anh-bia-ve-do-an-telasm-1.jpg',
    },
    {
      imgPath:
        'https://file.vfo.vn/hinh/2016/01/anh-bia-ve-do-an-telasm-16.jpg',
    },
  ];

  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  //get list food
  useEffect(() => {
    const data = {
      sid: store
    }
    dispatch(fetchListFood(data));
  }, []);

  return (
    // <div>
    //   <AppBar sx={{ background: "#fff" }} position='static'>
    //     <Toolbar>
    //       <Button onClick={handleSellerRegister}>Become a seller in No Ne </Button>
    //       {user ? <Button href='/myStore'>My Store </Button> : null}
    //       <Box sx={{ marginLeft: 'auto' }} >
    //         {user == null ?
    //           <>
    //             <Button href="/userRegister">Sign up </Button>
    //             <Button href="/login">Login </Button>
    //           </>
    //           : <Button onClick={handleLogout}>Logout </Button>}
    //       </Box>
    //     </Toolbar>
    //   </AppBar>
    <>
      <Headerr />
      {/* <div style={{ width: "100%", backgroundColor: "#ff9900", textAlign: "center" }}>
        <div style={{ backgroundColor: "#ff9900", padding: "20px", width: "1098px", margin: "0 auto" }}>
          <Grid container spacing={3}>
            <Grid item xs>
              <div style={{ textAlign: "center" }}>
                <Button onClick={handleSellerRegister}>Become a seller in No Ne </Button>
                {user ? <Button href='/myStore'>My Store </Button> : null}
              </div>
            </Grid>

            <Grid item xs={6}>
              <p className={classes.title}>No <span style={{ color: "#1168EB" }}>Nê</span></p>
            </Grid>
            <Grid item xs>
              <div style={{ textAlign: "center" }}>
                {user == null ?
                  <>
                    <Button href="/userRegister">Sign up </Button>
                    |
                    <Button href="/login">Login </Button>
                  </>
                  : <>
                    <div className={classes.avatar}>
                      <img src={Avatar1} alt="logo" style={{ width: "30px", height: "30px", borderRadius: "50px" }} />
                      <span style={{ marginLeft: "10px" }}>{user.firstname} {user.lastname}</span>
                      <div className={classes.action}>
                        <Button onClick={handleLogout}>Logout </Button><br />

                      </div>
                    </div>

                  </>}
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3} md={3}>
              <div style={{ width: "60px", height: "60px", margin: "0 auto" }}>
                <img src={Logo} alt="logo" style={{ width: "100%", height: "100%", borderRadius: "20px" }} />
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
                <AddShoppingCartIcon />
              </div>
            </Grid>
          </Grid>
        </div >
      </div > */}

      {/* slider */}
      <Container fixed>
        <Box sx={{ maxWidth: "100%", flexGrow: 1, margin: '10px 0' }}>
          {/* <Paper
              square
              elevation={0}
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: 50,
                pl: 2,
                bgcolor: 'background.default',
              }}
            >
              <Typography>{images[activeStep].label}</Typography>
            </Paper> */}
          {/* <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images.map((step, index) => (
              <div key={index}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      height: 400,
                      display: 'block',
                      maxWidth: '100%',
                      overflow: 'hidden',
                      width: '100%',
                    }}
                    src={step.imgPath}
                    alt={step.label}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          /> */}
        </Box>

        <div style={{ textAlign: "center" }}>
          <Button className={classes.btn} variant="outlined" startIcon={<RestaurantIcon />}>
            All
          </Button>
          <Button className={classes.btn} variant="outlined" startIcon={<RiceBowlIcon />}>
            Rice
          </Button>
          <Button className={classes.btn} variant="outlined" startIcon={<RamenDiningIcon />}>
            Noodle
          </Button>
          <Button className={classes.btn} variant="outlined" startIcon={<FreeBreakfastIcon />}>
            Drink
          </Button>
          <Button className={classes.btn} variant="outlined" startIcon={<FastfoodIcon />}>
            Fast Food
          </Button>
          <Button className={classes.btn} variant="outlined" startIcon={<StarIcon />}>
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

        <Grid container spacing={2} style={{ marignTop: "10px" }}>
          {props.userHomePage.foodList.map((item, index) =>
            <Grid item sm={4} xs={6} md={2} key={index} style={{ width: "100%" }}>
              <Link to={{ pathname: `/food/${item.id}`, state: { item: item } }}
                style={{ textDecoration: "none" }}>
                <CardItem foodName={item.name} storeName={item.foodStore.name} address={item.foodStore.email} img={item.image} />
              </Link>
            </Grid>

          )}
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
