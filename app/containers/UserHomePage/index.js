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
import { Box, Grid, MobileStepper, Container, Backdrop, CircularProgress, Card, CardMedia, Tabs, Tab } from '@mui/material';
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
import Loading from '../../components/Loading';
import { Footerr } from '../Footerr';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';

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
    backgroundColor: '#EA5E5E',
    margin: '10px 5px',
    color: "#fff",
    '&:hover': {
      backgroundColor: '#EA5E5E',
      fontWeight: 'bold',
      color: '#fff',
      boxShadow: '2rem 2rem 3rem rgba(132, 139, 200, 0.18)',
    },
  },
  root: {
    height: "557px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: `url("https://scontent.fhan14-2.fna.fbcdn.net/v/t1.15752-9/295485308_402761288506747_6752222352704131353_n.png?_nc_cat=111&ccb=1-7&_nc_sid=ae9488&_nc_ohc=acIyVeFHsQ4AX_vdh7B&_nc_ht=scontent.fhan14-2.fna&oh=03_AVKkIkPoYKYsyGeJ3RdfdyaZlIYCEuRHaWTvh3X2ckRuwg&oe=6314B8CD")`,
    //filter: "blur(4px)",
    filter: "brightness(50%)",
    //backdropFilter: "blur(10px)",
    border: "1px solid #000"


  },
  profileImage: {
    zIndex: 2,
    position: "relative",
    // top: "25%",
    // left: "35%",
    justifyContent: "center",
    // width: "60px",
    height: "fit-content",
    padding: "10px",
    //width: "fit-content",
    margin: "0 auto",
    //backdropFilter: "blur(10px)",
    // backgroundColor: "rgb(0, 0, 0)", 
    // backgroundColor: "rgba(0, 0, 0, 0.4)",
    position: "absolute",

    [theme.breakpoints.down("sm")]: {
      top: "35%",
      //left: "30%",
      width: "100%"
    },
    [theme.breakpoints.up("md")]: {
      top: "25%",
      left: "35%",
    },
  },
  text: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: "500",
    fontSize: "64px",
    textAlign: "center",
    margin: "0",
    color: "#f1F6F7",
    [theme.breakpoints.down("sm")]: {
      fontWeight: "400",
      fontSize: "32px",
    },
    [theme.breakpoints.down("xs")]: {
      fontWeight: "400",
      fontSize: "25px",
    },
  },
  center: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  root1: {
    position: "relative",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "200px"
    },
  },
  image__img: {
    dispatch: "block",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "200px"
    },
  },
  overlay: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      height: "200px"
    },
  },
  search: {
    [theme.breakpoints.up("md")]: {
      width: "40%",
      margin: "0 auto"
    },
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      margin: "0 auto"
    },
  }
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
  const [value, setValue] = useState(0);
  const user = getUser();
  const [type, setType] = useState("");

  const handleSellerRegister = () => {
    if (user) {
      props.history.push('/sellerRegister');
    } else {
      props.history.push('/login');
    }
  };

  const requestSearch = searchedVal => {
    const data = {
      sid: store,
      search: searchedVal,
      type: type
    };
    dispatch(fetchListFood(data));
  };

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };


  // get list food
  useEffect(() => {
    const data = {
      sid: store,
      search: searched,
      type: type
    };
    dispatch(fetchListFood(data));
  }, [type]);


  useEffect(() => {
    if (value == 0) {
      setType("")
    }
    if (value == 1) {
      setType("BANHMI")
    }
    if (value == 2) {
      setType("COM")
    }
    if (value == 3) {
      setType("BUN")
    }
    if (value == 4) {
      setType("PHO")
    }
    if (value == 5) {
      setType("MIEN")
    }
    if (value == 6) {
      setType("MY")
    }
    if (value == 7) {
      setType("OTHER")
    }
    // const data = {
    //   sid: store,
    //   search: searched,
    //   type: type
    // };
    // dispatch(fetchListFood(data));
  }, [value])


  const handleChange = (event, newValue) => {
    setValue(newValue);

  };

  return (
    <>
      <div style={{ backgroundColor: "#F3F7F8", paddingBottom: "20px" }}>
        <Headerr />
        <div>
          <div className={classes.root1}>
            <img className={classes.image__img} src="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.15752-9/295485308_402761288506747_6752222352704131353_n.png?_nc_cat=111&ccb=1-7&_nc_sid=ae9488&_nc_ohc=acIyVeFHsQ4AX_vdh7B&_nc_ht=scontent.fhan14-2.fna&oh=03_AVKkIkPoYKYsyGeJ3RdfdyaZlIYCEuRHaWTvh3X2ckRuwg&oe=6314B8CD" />
            <div className={classes.overlay}>
              <div>
                <p className={classes.text}>Khám phá đồ ăn, <br /> ẩm thực xứ sở Hola</p>
                <SearchBar
                  className={classes.search}
                  value={searched}
                  onChange={searchVal => requestSearch(searchVal)}
                  onCancelSearch={() => cancelSearch()}
                  //placeholder="What would you like to eat today?"
                  placeholder="Bạn muốn ăn gì hôm nay?"
                />
              </div>
            </div>
          </div>

          {/* <div className={classes.root}></div>
          <div className={classes.profileImage} >
            <div>
              <p className={classes.text}>Khám phá đồ ăn, <br /> ẩm thực xứ sở Hola</p>
              <SearchBar
                value={searched}
                onChange={searchVal => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
                //placeholder="What would you like to eat today?"
                placeholder="Bạn muốn ăn gì hôm nay?"
              />
            </div>

          </div> */}

          <Container fixed>

            <div style={{ textAlign: 'center', margin: "30px auto" }}>
              <Box sx={{ maxWidth: { xs: 320, sm: 480, md: 560 }, bgcolor: 'background.paper', margin: "0 auto" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="scrollable force tabs example"
                >
                  <Tab icon={<FastfoodIcon />} label="Tất cả" />
                  <Tab icon={<BreakfastDiningIcon />} label="Bánh mì" />
                  <Tab icon={<RiceBowlIcon />} label="Cơm" />
                  <Tab icon={<RamenDiningIcon />} label="Bún" />
                  <Tab icon={<RamenDiningIcon />} label="Phở" />
                  <Tab icon={<RamenDiningIcon />} label="Miến" />
                  <Tab icon={<RamenDiningIcon />} label="Mỳ" />
                  <Tab icon={<RestaurantIcon />} label="Khác" />
                </Tabs>
              </Box>
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
                      price={item.price}
                    />
                  </Link>
                </Grid>
              ))}
            </Grid>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={props.userHomePage.loading}
            //open={true}
            // onClick={handleClose}
            >
              {/* <CircularProgress color="inherit" /> */}
              <Loading />
            </Backdrop>
          </Container>
        </div>

      </div>
      <Footerr />
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
