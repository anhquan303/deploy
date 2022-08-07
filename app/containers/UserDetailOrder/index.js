/**
 *
 * UserDetailOrder
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
import { Box, Grid, Container, Avatar, Backdrop } from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import makeSelectUserDetailOrder from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { cancelOrder, getOrderDetailById, getVoucherById, reset } from './actions';
import Loading from '../../components/Loading';

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
  center: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'right',
  },
  font: {
    fontFamily: 'sans-serif',
    margin: '0',
  },
  storeName: {
    '&:hover': {
      cursor: "pointer",
      fontWeight: 'bold',
      color: '#000',
    },
  }
}));

export function UserDetailOrder(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'userDetailOrder', reducer });
  useInjectSaga({ key: 'userDetailOrder', saga });

  const classes = useStyles();
  const [data, setData] = useState();
  const history = useHistory();
  let dollarUSLocale = Intl.NumberFormat('en-US');

  useEffect(() => {
    const data = {
      id: props.location.state.id,
    };
    dispatch(getOrderDetailById(data));
  }, []);

  useEffect(() => {
    setData(props.userDetailOrder.order.orderItem_foods);
  }, [props.userDetailOrder.order]);

  const handleComment = item => {
    const location = {
      pathname: `/user/rating-comment/${item.food.id}`,
      state: {
        fid: item.food.id,
        sid: props.userDetailOrder.order.store.id,
      },
    };
    history.push(location);
  };

  const cancelOrderr = () => {
    const data = {
      id: props.location.state.id,
    };
    dispatch(cancelOrder(data));
  };

  console.log(props.userDetailOrder.voucher)
  console.log(props.userDetailOrder.order)

  const singleVal = [];
  const [money, setMoney] = useState([]);
  useEffect(() => {
    if (props.userDetailOrder.order) {
      if (props.userDetailOrder.order.voucherId) {
        const data = {
          id: props.userDetailOrder.order.voucherId
        }
        dispatch(getVoucherById(data));
      }
      if (props.userDetailOrder.order.orderItem_foods) {
        props.userDetailOrder.order.orderItem_foods.map(item => {
          //return (item.price * item.quantity)
          singleVal.push(item.price * item.quantity)
        });
      }
    }
    setMoney(singleVal)
  }, [props.userDetailOrder.order])


  let beforeUseVoucher = 0;
  for (var i = 0; i < money.length; i++) {
    beforeUseVoucher += parseInt(money[i]);
  }

  const [discountMoney, setDiscountMoney] = useState(0);
  useEffect(() => {
    if (props.userDetailOrder.voucher) {
      let percent1 = parseFloat(parseFloat(props.userDetailOrder.voucher.percent) / 100);
      console.log(percent1)
      console.log(beforeUseVoucher)
      setDiscountMoney(parseFloat(beforeUseVoucher) * percent1);
    } else {
      setDiscountMoney(0);
    }
  }, [props.userDetailOrder.voucher, beforeUseVoucher]);

  console.log(discountMoney)

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
    if (props.userDetailOrder.message != "") {
      if (props.userDetailOrder.message.includes("thành công")) {
        const data = {
          id: props.location.state.id,
        };
        dispatch(getOrderDetailById(data));
        dispatch(reset());
      }
    }
  }, [props.userDetailOrder.message]);
  

  return (
    <div>
      <Grid container spacing={0} style={{ padding: '10px' }}>
        <Grid item xs={6} md={6} sm={6}>
          <Button
            //href="/user/order-history"
            className={classes.btn}
            variant="outlined"
            onClick={() => history.goBack()}
          >
            Trở lại
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
          md={6}
          sm={6}
          className={classes.center}
          style={{ justifyContent: 'right' }}
        >
          <span style={{ fontWeight: '700', fontSize: '20px' }}>
            ID đơn hàng:
          </span>
          <span
            style={{
              fontWeight: '700',
              fontSize: '20px',
              color: '#1168EB',
              margin: '0 10px',
            }}
          >
            #{props.userDetailOrder.order ? props.userDetailOrder.order.code : null}
          </span>
          <span
            style={{ fontWeight: '700', fontSize: '20px', color: '#20D167' }}
          >
            {props.userDetailOrder.order != undefined
              ? props.userDetailOrder.order.status != "CANCEL" ?
                <span style={{ color: '#20D167' }}>{props.userDetailOrder.order.status}</span>
                : <span style={{ color: '#fe0000' }}>{props.userDetailOrder.order.status}</span> : null}

          </span>
        </Grid>
      </Grid>
      <hr />
      <Grid container spacing={0} style={{ padding: '10px' }}>
        <Grid item xs={12} md={4} sm={12} style={{ padding: '10px' }}>
          <div style={{ border: '1px solid #000', padding: '10px' }}>
            <p
              className={classes.font}
              style={{ fontWeight: '700', fontSize: '20px' }}
            >
              Địa chỉ nhận hàng
            </p>
            <p
              className={classes.font}
              style={{ fontWeight: '700', fontSize: '16px', margin: '10px 0' }}
            >
              {props.userDetailOrder.order.user
                ? props.userDetailOrder.order.user.firstname
                : null}{' '}
              {props.userDetailOrder.order.user
                ? props.userDetailOrder.order.user.lastname
                : null}
            </p>
            <p
              className={classes.font}
              style={{ fontWeight: '700', fontSize: '16px', margin: '10px 0' }}
            >
              {props.userDetailOrder.order.user
                ? props.userDetailOrder.order.user.phoneNumber
                : null}
            </p>
            <p
              className={classes.font}
              style={{ fontWeight: '700', fontSize: '16px', margin: '10px 0' }}
            >
              {props.userDetailOrder.order.user && props.userDetailOrder.order
                ? <span>{props.userDetailOrder.order.location.name},{props.userDetailOrder.order.location.village}</span>
                : null}
            </p>
          </div>
        </Grid>

        <Grid item xs={12} md={8} sm={12} style={{ padding: '10px' }}>
          <div style={{ border: '1px solid #000', padding: '10px' }}>
            <div>
              <span className={classes.storeName} onClick={() => toStoreProfile(props.userDetailOrder.order.store.id)}>
                {props.userDetailOrder.order.store
                  ? props.userDetailOrder.order.store.name
                  : null}
              </span>
              {/* <Button className={classes.btn} variant="outlined">
                Xem quán
              </Button> */}
            </div>
            <hr />

            {data
              ? data.map((item, index) => (
                <div key={index}>
                  <Grid container spacing={0} style={{ padding: '10px' }}>
                    <Grid item xs={12} md={6} sm={12}>
                      <Grid container spacing={0} style={{ padding: '10px' }}>
                        <Grid item xs={12} md={4} sm={12}>
                          <Avatar
                            variant="square"
                            src="https://i.ytimg.com/vi/A_o2qfaTgKs/maxresdefault.jpg"
                          />
                        </Grid>
                        <Grid item xs={12} md={8} sm={12}>
                          {item.food.name} <br />x{item.quantity}
                        </Grid>
                        {props.userDetailOrder.order != undefined
                          ? props.userDetailOrder.order.status != "CANCEL" ?
                            <Grid item xs={12} md={12} sm={12}>
                              <Button
                                className={classes.btn}
                                variant="outlined"
                                onClick={() => handleComment(item)}
                              >
                                Đánh giá
                              </Button>
                            </Grid>
                            : null : null}

                      </Grid>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      md={6}
                      sm={12}
                      className={classes.center}
                    >
                      {dollarUSLocale.format(item.price)} VND
                    </Grid>
                  </Grid>
                  <hr />
                </div>
              ))
              : null}

            <Grid container spacing={0} style={{ padding: '10px' }}>
              <Grid
                item
                xs={12}
                md={12}
                sm={12}
                className={classes.center}
                style={{ justifyContent: 'right' }}
              >
                Tổng số tiền:{' '}
                {props.userDetailOrder.order
                  ?
                  dollarUSLocale.format(props.userDetailOrder.order.total_price)
                  : null}{' '}
                VND
              </Grid>
            </Grid>

            {/* <Grid container spacing={0} style={{ padding: "10px" }}>
              <Grid item xs={12} md={6} sm={12}>
                <Grid container spacing={0} style={{ padding: "10px" }}>
                  <Grid item xs={12} md={4} sm={12}>
                    <Avatar variant="square" src="https://i.ytimg.com/vi/A_o2qfaTgKs/maxresdefault.jpg" />
                  </Grid>
                  <Grid item xs={12} md={8} sm={12}>
                    Bún Bò Huế <br />
                    x2
                  </Grid>
                  <Grid item xs={12} md={12} sm={12}>
                    <Button className={classes.btn} variant="outlined">
                      Đánh giá
                    </Button>
                  </Grid>

                </Grid>
              </Grid>

              <Grid item xs={12} md={6} sm={12} className={classes.center}>
                40.000 VND
              </Grid>
            </Grid> */}

            {/* <hr />

            <Grid container spacing={0} style={{ padding: "10px" }}>
              <Grid item xs={12} md={12} sm={12} className={classes.center} style={{ justifyContent: "right" }}>
                Tổng số tiền: 80.000 VND
              </Grid>
            </Grid> */}
          </div>
        </Grid>
      </Grid>
      <hr />
      <div>
        <Grid container spacing={0} style={{ padding: '10px' }}>
          <Grid item xs={6} md={6} sm={6}>
            <span style={{ fontSize: '20px', fontWeight: '700' }}>
              Tổng tiền hàng
            </span>
          </Grid>
          <Grid item xs={6} md={6} sm={6} className={classes.center}>
            <span style={{ fontSize: '20px', fontWeight: '700' }}>
              {props.userDetailOrder.order
                ? dollarUSLocale.format(beforeUseVoucher)

                : null}{' '}
              VND
            </span>
          </Grid>
        </Grid>
      </div>
      <hr />
      <div>
        <Grid container spacing={0} style={{ padding: '10px' }}>
          <Grid item xs={6} md={6} sm={6}>
            <span style={{ fontSize: '20px', fontWeight: '700' }}>
              Phí vận chuyển
            </span>
          </Grid>
          <Grid item xs={6} md={6} sm={6} className={classes.center}>
            <span style={{ fontSize: '20px', fontWeight: '700' }}>0 VND</span>
          </Grid>
        </Grid>
      </div>
      <hr />
      <div>
        <Grid container spacing={0} style={{ padding: '10px' }}>
          <Grid item xs={6} md={6} sm={6}>
            <span style={{ fontSize: '20px', fontWeight: '700' }}>
              Voucher từ quán
            </span>
          </Grid>
          <Grid item xs={6} md={6} sm={6} className={classes.center}>
            <span style={{ fontSize: '20px', fontWeight: '700' }}>- {dollarUSLocale.format(discountMoney)} VND</span>
          </Grid>
        </Grid>
      </div>
      <hr />
      <div>
        <Grid container spacing={0} style={{ padding: '10px' }}>
          <Grid item xs={6} md={6} sm={6}>
            <span style={{ fontSize: '20px', fontWeight: '700' }}>
              Tổng thanh toán
            </span>
          </Grid>
          <Grid item xs={6} md={6} sm={6} className={classes.center}>
            <span style={{ fontSize: '20px', fontWeight: '700' }}>
              {props.userDetailOrder.order
                ? dollarUSLocale.format(props.userDetailOrder.order.total_price)
                : null}{' '}
              VND
            </span>
          </Grid>
        </Grid>
      </div>
      <hr />
      <div>
        <Grid container spacing={0} style={{ padding: '10px' }}>
          <Grid item xs={6} md={6} sm={6}>
            <span style={{ fontSize: '20px', fontWeight: '700' }}>
              Phương thức thanh toán
            </span>
          </Grid>
          <Grid item xs={6} md={6} sm={12} className={classes.center}>
            <span style={{ fontSize: '20px', fontWeight: '700' }}>
              Thanh toán khi nhận hàng
            </span>
          </Grid>
        </Grid>
      </div>

      <div
        className={classes.center}
        style={{ justifyContent: 'right', marginTop: '10px' }}
      >
        <Button
          disabled={props.userDetailOrder.order ? props.userDetailOrder.order.status != "NEW" : true}
          className={classes.btn}
          variant="outlined"
          onClick={cancelOrderr}
        >
          Hủy đơn hàng
        </Button>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.userDetailOrder.loading}
      >
        <Loading />
      </Backdrop>
    </div>
  );
}

UserDetailOrder.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userDetailOrder: makeSelectUserDetailOrder(),
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
)(UserDetailOrder);
