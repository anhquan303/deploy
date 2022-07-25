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
  getListCommentFoodById,
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
import { useHistory } from 'react-router-dom';
import moment from 'moment';

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
    justifyContent: 'center',
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
    border: '3px solid #000',
    borderRadius: '20px',
    marginTop: '15px',
  },
  foodType: {
    background: '#fff',
    padding: '10px',
    borderRadius: '20px',
    boxShadow: '0 2rem 3rem rgba(132, 139, 200, 0.18)',
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
  }, []);

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

  return (
    <div>
      <Headerr />
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} className={classes.imgFood}>
            <img src="https://ofo-image.s3.amazonaws.com/store_image/11_avatar?fbclid=IwAR0vxhkzaE-EV9LWbgXTGoM65tqhAG8U_3mfSWy8a-8vfTOSQzHVtve9haQ" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              className={classes.btn}
              variant="outlined"
              startIcon={<ThumbUpIcon />}
            >
              Yêu thích
            </Button>
            <p className={classes.font}>
              {props.foodDetail.food ? props.foodDetail.food.name : null} -{' '}
              {props.foodDetail.food
                ? <span onClick={() => toStoreProfile(props.foodDetail.food.foodStore.id)} style={{ cursor: "pointer", color: "#000" }}>{props.foodDetail.food.foodStore.name}</span>
                : null}
            </p>
            <p className={classes.font}>
              {props.location.state.item.foodStore.dormLocation == null
                ? <span>
                  {props.location.state.item.foodStore.otherLocation.name} - {props.location.state.item.foodStore.otherLocation.village} - {props.location.state.item.foodStore.otherLocation.town}</span>
                : props.location.state.item.foodStore.dormLocation}{' '}
              - Hòa Lạc
            </p>
            <div>
              {/* <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
              <span>|</span><span style={{ margin: "5px 5px" }}>999+ đánh giá</span>
              <span>|</span><span style={{ margin: "0 5px" }}>999+ đã bán</span> */}
              <Grid container spacing={0}>
                <Grid item xs={4} md={3}>
                  <Rating
                    name="half-rating-read"
                    value={star}
                    precision={0.5}
                    readOnly
                  />
                </Grid>
                <Grid item xs={4} md={3}>
                  <span>|</span>
                  <span style={{ margin: '5px 5px' }}>
                    {props.foodDetail.listComment.length} đánh giá
                  </span>
                </Grid>
                <Grid item xs={4} md={3}>
                  <span>|</span>
                  <span style={{ margin: '0 5px' }}>999+ đã bán</span>
                </Grid>
              </Grid>
            </div>
            <div style={{ margin: '10px 0' }}>
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
            </div>
            <p style={{ fontFamily: 'sans-serif', margin: '5px 0' }}>
              Giá bán{' '}
              {props.foodDetail.food ? dollarUSLocale.format(props.foodDetail.food.price) : null} VND
            </p>
            <div>
              <Grid container spacing={2}>
                {/* <Grid item xs={12} md={6} className={classes.center}>
                  <span className={classes.center}>Số lượng</span>
                  <IconButton
                    style={{ color: '#FF9900' }}
                    onClick={decrementQuantity}
                  >
                    <IndeterminateCheckBoxIcon />
                  </IconButton>
                  <span className={classes.quantityNumber}>{quantity}</span>
                  <IconButton
                    style={{ color: '#FF9900' }}
                    onClick={incrementQuantity}
                  >
                    <AddBoxIcon />
                  </IconButton>
                </Grid> */}
                <Grid item xs={12} md={6} className={classes.center} style={{ justifyContent: "right" }}>
                  <Button
                    className={classes.btn}
                    variant="outlined"
                    onClick={handleAddToCart}
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
                <Grid item xs={2} md={2} className={classes.center}>
                  <Avatar
                    alt="avatar store"
                    src={Avatar1}
                    sx={{ width: 56, height: 56 }}
                  />
                </Grid>
                <Grid item xs={10} md={10}>
                  <p style={{ margin: '0' }}>
                    {props.foodDetail.food
                      ? <span style={{ cursor: "pointer", color: "#000" }} onClick={() => toStoreProfile(props.foodDetail.food.foodStore.id)}>{props.foodDetail.food.foodStore.name}</span>
                      : null}
                  </p>
                  <Button
                    className={classes.btn}
                    variant="outlined"
                    startIcon={<ThumbUpIcon />}
                  >
                    Yêu thích
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={4} md={4}>
                  Món ăn <span>12</span>
                </Grid>
                <Grid item xs={4} md={4}>
                  Đánh giá <span>12</span>
                </Grid>
                <Grid item xs={4} md={4}>
                  Tham gia từ <span>06/28/2022</span>
                </Grid>
                <Grid item xs={4} md={4}>
                  Người theo dõi <span>12</span>
                </Grid>
                <Grid item xs={4} md={4}>
                  Yêu thích <span>12</span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <div style={{ marginTop: '5px' }}>
          <p
            className={classes.font}
            style={{ fontWeight: 'bold', fontSize: '25px', margin: '0' }}
          >
            Menu
          </p>
          <Grid container spacing={0} style={{ marginTop: '5px' }}>
            <Grid item xs={12} md={3} style={{ padding: '10px' }}>
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
            </Grid>
            <Grid item xs={12} md={6} style={{ padding: '10px' }}>
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
                <Grid container spacing={0}>
                  <Grid item sm={2} xs={12} md={2} className={classes.center}>
                    <Avatar
                      variant="rounded"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN7rHMcnK0E9YocmOktrVKzdzeCgWg3oP04bIfqScZykQbYDs8m1e_qcnzzWNMLIG1ZZY&usqp=CAU"
                    />
                  </Grid>
                  <Grid item sm={7} xs={6} md={7}>
                    <p style={{ margin: '0', fontFamily: 'sans-serif' }}>
                      Hambuger hơi ngon
                    </p>
                    <p style={{ margin: '0', fontFamily: 'sans-serif' }}>
                      Đã bán: 999+ lần |{' '}
                      <span>
                        <ThumbUpIcon />
                      </span>{' '}
                      100+
                    </p>
                  </Grid>
                  <Grid item xs={6} md={3} sm={3} className={classes.center}>
                    <span
                      className={classes.center}
                      style={{ color: '#1168EB', fontWeight: 'bold' }}
                    >
                      25.000 VND{' '}
                    </span>
                    <IconButton style={{ color: '#FF9900' }}>
                      <AddBoxIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} md={3} style={{ padding: '10px' }}>
              <div className={classes.foodType}>
                <p
                  className={classes.font}
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    marginTop: '0',
                    textAlign: 'center',
                  }}
                >
                  Đánh giá và bình luận
                </p>

                {props.foodDetail.listComment.slice(0).reverse().map((item, index) => (
                  <Grid container spacing={0} key={index}>
                    <Grid
                      item
                      xs={2}
                      md={2}
                      className={classes.center}
                      style={{ height: 'fit-content' }}
                    >
                      <Avatar
                        alt="avatar store"
                        src={Avatar1}
                        sx={{ width: 26, height: 26, marginRight: '3px' }}
                      />
                    </Grid>
                    <Grid item xs={10} md={10}>
                      <p style={{ margin: '0' }}>{item.user.username}</p>
                      <div>
                        <Rating
                          name="half-rating-read"
                          value={5}
                          precision={0.5}
                          readOnly
                        />
                      </div>
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
                ))}
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
    </div>
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
