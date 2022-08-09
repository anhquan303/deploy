/**
 *
 * FoodDetail
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
import {
  Box,
  Grid,
  IconButton,
  Container,
  Avatar,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Rating,
} from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import CircleIcon from '@mui/icons-material/Circle';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchBar from 'material-ui-search-bar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {
  addToCart,
  getFoodById,
  getFoodByStoreId,
  getListCommentFoodById,
  getListCommentStore,
  getRatingFoodById,
  reset,
} from './actions';
import { getUser } from '../../utils/common';
import Avatar1 from '../../images/quan.jpg';
import Headerr from '../Headerr';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectFoodDetail from './selectors';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import { Footerr } from '../Footerr';

const useStyles = makeStyles(theme => ({
  btn: {
    position: "relative",
    width: "fit-content",
    borderRadius: "10px",
    backgroundColor: "#FD4444",
    color: "#fff",
    margin: "10px 5px",
    "&:hover": {
      backgroundColor: "#FF1C1C",
      fontWeight: "bold",
      color: "#fff",
      boxShadow: "2rem 2rem 3rem rgba(132, 139, 200, 0.18)",
    }
  },
  star: {
    color: '#FFCD29',
  },
  font: {
    fontFamily: 'sans-serif',
  },
  imgFood: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'center'

  },
  center: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
  },
  quantityNumber: {
    margin: '0 3px',
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
  },
  storeInfo: {
    padding: '20px',
    borderRadius: '5px',
    marginTop: '15px',
    backgroundColor: "#fff",
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
  },
  foodType: {
    background: '#fff',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
    transition: '0.5s',
    height: 'fit-content',
    width: '100%',
  },
}));

export function FoodDetail(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'foodDetail', reducer });
  useInjectSaga({ key: 'foodDetail', saga });

  const classes = useStyles();
  const [quantity, setQuantity] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [searched, setSearched] = useState('');
  const [star, setStar] = useState(0);
  const user = getUser();
  const [openAlert, setOpenAlert] = useState(false);
  const [vertical, setVertical] = useState('top');
  const [horizontal, setHorizontal] = useState('right');
  const history = useHistory();
  let dollarUSLocale = Intl.NumberFormat('en-US');

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity != 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
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

  useEffect(() => {
    const data = {
      id: props.location.state.item.id,
    };
    dispatch(getFoodById(data));
    dispatch(getRatingFoodById(data));
    dispatch(getListCommentFoodById(data));
  }, [props.location.state.item.id]);

  useEffect(() => {
    if (props.foodDetail.rating) {
      setStar(props.foodDetail.rating);
    }
  }, [props.foodDetail.rating]);

  const handleAddToCart = () => {
    if (!user) {
      history.push("/login");
    } else {
      const data = {
        uid: user.id,
        fid: props.location.state.item.id,
      };
      dispatch(addToCart(data));
    }
  };

  //console.log(props.location.state.item.id)

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseAlert = event => {
    setOpenAlert(false);
  };

  useEffect(() => {
    if (props.foodDetail.message != '') {
      setOpenAlert(true);
      setTimeout(() => dispatch(reset()), 6000);
    }
  }, [props.foodDetail.message]);

  useEffect(() => {
    setOpenAlert(false);
    dispatch(reset());
  }, []);

  const toStoreProfile = (id) => {
    const location = {
      pathname: `/store-profile`,
      state: {
        id: id
      },
    };
    history.push(location);
  }

  useEffect(() => {
    if (props.foodDetail.food != undefined) {
      const data = {
        id: props.foodDetail.food.foodStore.id
      }
      dispatch(getFoodByStoreId(data));
      dispatch(getListCommentStore(data));
    }
  }, [props.foodDetail.food]);

  console.log(props.foodDetail.food)

  return (
    <div style={{ backgroundColor: "#F3F7F8" }}>
      <Headerr />
      <Container fixed style={{ marginTop: "30px", backgroundColor: "#fff", boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} className={classes.imgFood}>
            <img src={props.location.state.item.image} style={{ width: "100%" }} />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <Button
              className={classes.btn}
              variant="outlined"
              startIcon={<ThumbUpIcon />}
            >
              Yêu thích
            </Button> */}
            <p className={classes.font} style={{ fontWeight: "600", fontSize: "25px" }}>
              {props.foodDetail.food ? props.foodDetail.food.name : null}
              {/* {props.foodDetail.food
                ? <span onClick={() => toStoreProfile(props.foodDetail.food.foodStore.id)} style={{ cursor: "pointer", color: "#000" }}>{props.foodDetail.food.foodStore.name}</span>
                : null} */}
            </p>
            {/* <p className={classes.font}>
              {props.location.state.item.foodStore.dormLocation == null
                ? <span>
                  {props.location.state.item.foodStore.otherLocation.name} - {props.location.state.item.foodStore.otherLocation.village} - {props.location.state.item.foodStore.otherLocation.town}</span>
                : <span>{props.location.state.item.foodStore.dormLocation.dormName} - {props.location.state.item.foodStore.dormLocation.room_number} </span>}
              - Hòa Lạc
            </p> */}

            <div>
              {/* <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
              <span>|</span><span style={{ margin: "5px 5px" }}>999+ đánh giá</span>
              <span>|</span><span style={{ margin: "0 5px" }}>999+ đã bán</span> */}
              <Grid container spacing={0}>
                <Grid item xs={5} sm={3} md={4} lg={3}>
                  <Rating
                    name="half-rating-read"
                    value={star}
                    precision={0.5}
                    readOnly
                  />
                </Grid>

                <Grid item xs={5} sm={3} md={4} lg={3}>
                  <span style={{ margin: '5px 5px' }}>
                    ({props.foodDetail.listComment.length})
                  </span>
                </Grid>
                {/* <Grid item xs={4} md={3}>
                  <span>|</span>
                  <span style={{ margin: '0 5px' }}>999+ đã bán</span>
                </Grid> */}
              </Grid>
            </div>
            {/* <div style={{ margin: '10px 0' }}>
              <CircleIcon
                style={{ color: '#128B02', width: '10px', height: '10px' }}
              />
              <span style={{ margin: '0 5px' }}>
                Mở cửa{' '}
                {props.foodDetail.food
                  ? props.foodDetail.food.foodStore.openTime
                  : null}{' '}
                -{' '}
                {props.foodDetail.food
                  ? props.foodDetail.food.foodStore.closeTime
                  : null}
              </span>
            </div> */}
            <p style={{ fontFamily: 'sans-serif', margin: '5px 0' }}>
              Giá bán{'     '}
              {props.foodDetail.food ? dollarUSLocale.format(props.foodDetail.food.price) : null} VND
            </p>
            <div>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} >
                  <Button
                    className={classes.btn}
                    variant="outlined"
                    onClick={handleAddToCart}
                    style={{ width: "100%", marginTop: "15px", borderRadius: "5px" }}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <hr />

        <div className={classes.storeInfo}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Grid container spacing={2}>
                <Grid item xs={3} md={3} lg={2} className={classes.center}>
                  <Avatar
                    alt="avatar store"
                    src={props.foodDetail.food != undefined ? props.foodDetail.food.foodStore.storeImage.avatar : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
                    sx={{ width: 56, height: 56 }}
                  />
                </Grid>
                <Grid item xs={9} md={9} lg={10} className={classes.center}>
                  <p style={{ margin: '0' }}>
                    {props.foodDetail.food
                      ? <span style={{ cursor: "pointer", color: "#000", fontFamily: "'Montserrat', sans-serif", fontSize: "22px", fontWeight: "600" }} onClick={() => toStoreProfile(props.foodDetail.food.foodStore.id)}>{props.foodDetail.food.foodStore.name}</span>
                      : null}
                  </p>
                  {/* <Button
                    className={classes.btn}
                    variant="outlined"
                    startIcon={<ThumbUpIcon />}
                  >
                    Yêu thích
                  </Button> */}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={8} className={classes.center}>
              <Grid container spacing={2}>
                <Grid item xs={4} md={4}>
                  Món ăn <span>{props.foodDetail.listFood ? props.foodDetail.listFood.length : 0}</span>
                </Grid>
                <Grid item xs={4} md={4}>
                  Đánh giá <span>{props.foodDetail.listCommentStore ? props.foodDetail.listCommentStore.length : 0}</span>
                </Grid>
                {/* <Grid item xs={4} md={4}>
                  Tham gia từ <span>06/28/2022</span>
                </Grid> */}
                {/* <Grid item xs={4} md={4}>
                  Người theo dõi <span>12</span>
                </Grid> */}
                <Grid item xs={4} md={4}>
                  Yêu thích <span>12</span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <div style={{ marginTop: '5px' }}>
          {/* <p
            className={classes.font}
            style={{ fontWeight: 'bold', fontSize: '25px', margin: '0' }}
          >
            Menu
          </p> */}
          <Grid container spacing={0} style={{ marginTop: '5px' }}>
            {/* <Grid item xs={12} md={3} style={{ padding: '10px' }}>
              <List
                component="nav"
                aria-label="secondary mailbox folder"
                className={classes.foodType}
              >
                <ListItemButton
                  selected={selectedIndex === 2}
                  onClick={event => handleListItemClick(event, 2)}
                >
                  <ListItemText primary="Món mới" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 3}
                  onClick={event => handleListItemClick(event, 3)}
                >
                  <ListItemText primary="Cơm suất" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 4}
                  onClick={event => handleListItemClick(event, 4)}
                >
                  <ListItemText primary="Phở" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 5}
                  onClick={event => handleListItemClick(event, 5)}
                >
                  <ListItemText primary="Bún" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 6}
                  onClick={event => handleListItemClick(event, 6)}
                >
                  <ListItemText primary="Đồ ăn vặt" />
                </ListItemButton>
              </List>
            </Grid> */}
            {/* <Grid item xs={12} md={6} style={{ padding: '10px' }}>
              <div className={classes.foodType}>
                <SearchBar
                  value={searched}
                  onChange={searchVal => requestSearch(searchVal)}
                  onCancelSearch={() => cancelSearch()}
                  style={{ border: '1px solid #000' }}
                  placeholder="Tìm món"
                />
                <p
                  className={classes.font}
                  style={{ fontWeight: 'bold', fontSize: '20px' }}
                >
                  Món mới
                </p>

                {props.foodDetail.listFood ? props.foodDetail.listFood.map((item) => {
                  return (
                    <Link
                      to={{ pathname: `/food/${item.id}`, state: { item } }}
                      style={{ textDecoration: 'none' }}
                    >
                      <Grid key={item.id} container spacing={0} style={{ margin: "5px 0" }}>
                        <Grid item sm={2} xs={12} md={2} className={classes.center}>
                          <Avatar
                            variant="rounded"
                            src={item.image}
                          />
                        </Grid>
                        <Grid item sm={7} xs={6} md={6} className={classes.center}>
                          <p style={{ margin: '0', fontFamily: 'sans-serif' }}>
                            {item.name}
                          </p>
                        </Grid>
                        <Grid item xs={6} md={4} sm={3} className={classes.center}>
                          <span
                            className={classes.center}
                            style={{ color: '#1168EB', fontWeight: 'bold' }}
                          >
                            {dollarUSLocale.format(item.price)} VND{' '}
                          </span>
                        </Grid>

                      </Grid>
                    </Link>
                  )
                }) : null}
              </div>
            </Grid> */}
            <Grid item xs={12} md={12} style={{ padding: '10px', marginBottom: "30px" }}>
              <div className={classes.foodType} style={{ height: "300px", overflowY: "scroll" }}>
                <p
                  className={classes.font}
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    marginTop: '0',
                    textAlign: 'center',
                  }}
                >
                  Đánh giá và bình luận từ khách hàng
                </p>
                <Grid container spacing={0} >
                  {props.foodDetail.listComment.slice(0).reverse().map((item, index) => (

                    <Grid key={index} item xs={12} md={6} style={{ padding: "5px" }}>
                      <Grid container spacing={0} >
                        <Grid item xs={3} md={2} className={classes.center} style={{ height: 'fit-content' }}>
                          <Avatar
                            alt="avatar store"
                            src={item.user.avatar ? item.user.avatar : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
                            sx={{ width: 50, height: 50, marginRight: '2px' }}
                          />
                        </Grid>
                        <Grid item xs={9} md={10}>
                          <Grid container spacing={0} >
                            <Grid item xs={6} md={6}>
                              <p style={{ margin: '0', fontSize: "22px", fontWeight: "600", fontFamily: "Montserrat, sans-serif" }}>{item.user.username}</p>
                            </Grid>
                            <Grid item xs={6} md={6}>
                              <div>
                                <Rating
                                  name="half-rating-read"
                                  value={5}
                                  precision={0.5}
                                  readOnly
                                />
                              </div>
                            </Grid>
                          </Grid>


                          <p className={classes.font} style={{ margin: '0' }}>
                            {item.description}
                          </p>
                          {/* <img src="https://phunuketnoi.com/wp-content/uploads/2021/03/mon-ngon-moi-ngay.jpg" style={{ width: "100%" }} /> */}
                          <p
                            className={classes.font}
                            style={{
                              margin: '0',
                              color: '#AFAFAF',
                              fontSize: '13px',
                            }}
                          >
                            {moment(item.create_at).format('DD/MM/YYYY')}
                          </p>
                        </Grid>
                      </Grid>
                    </Grid>

                  ))}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          anchorOrigin={{ vertical, horizontal }}
          onClose={handleCloseAlert}
        >
          {/* {props.userAddress.message.includes("FAILED") == false || props.userAddress.message.includes("Failed") == false || props.userAddress.message != "Network Error" ? */}
          <Alert
            severity="success"
            onClose={handleCloseAlert}
            sx={{ width: '100%' }}
          >
            {props.foodDetail.message}
          </Alert>
        </Snackbar>
      </Container>
      <Footerr />
    </div >
  );
}

FoodDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  foodDetail: makeSelectFoodDetail(),
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
)(FoodDetail);
