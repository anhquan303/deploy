/**
 *
 * SellerOrderDetail
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
  Container,
  Avatar,
  Typography,
  List,
  FormControlLabel,
  Radio,
  RadioGroup,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  OutlinedInput,
  Select,
  MenuItem,
} from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import DeliveryDiningRoundedIcon from '@mui/icons-material/DeliveryDiningRounded';
import moment from 'moment';
import DoneIcon from '@mui/icons-material/Done';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import CustomTableResponsive from '../../components/CustomTableResponsive';
import {
  changeStatusToDelivered,
  changeStatusToDelivery,
  changeStatusToOrder,
  changeStatusToPaid,
  getOrderDetailById,
  reset,
} from './actions';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectSellerOrderDetail from './selectors';

const useStyles = makeStyles(theme => ({
  font: {
    fontFamily: 'sans-serif',
    margin: '0',
  },
  center: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'sans-serif',
    margin: '0',
    fontSize: '15px',
    fontWeight: '700',
  },
  content: {
    border: '3px solid #000',
    padding: '10px',
    borderRadius: '10px',
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
  borderBot: {
    borderBottom: '1px solid #000',
  },
  information_one: {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    marginTop: '1rem',
    boxShadow:
      'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
    transition: '0.5s',
    height: 'fit-content',
  },
}));

export function SellerOrderDetail(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'sellerOrderDetail', reducer });
  useInjectSaga({ key: 'sellerOrderDetail', saga });

  const classes = useStyles();
  const [data, setData] = useState(
    props.sellerOrderDetail.orderDetail.orderItem_foods,
  );
  const [check, setCheck] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [vertical, setVertical] = useState('top');
  const [horizontal, setHorizontal] = useState('right');
  const [delivery, setDelivery] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [paid, setPaid] = useState(false);
  let dollarUSLocale = Intl.NumberFormat('en-US');

  useEffect(() => {
    const data = {
      id: props.location.state.id,
    };
    dispatch(getOrderDetailById(data));

  }, [props.sellerOrderDetail.orderDetail.status]);

  useEffect(() => {
    if (props.sellerOrderDetail.message.includes("SUCCESS")) {
      const data = {
        id: props.location.state.id,
      };
      dispatch(getOrderDetailById(data));
      dispatch(reset());
    }
  }, [props.sellerOrderDetail.message]);

  console.log(props.sellerOrderDetail.orderDetail.status)

  useEffect(() => {
    if (props.sellerOrderDetail.orderDetail) {
      if (props.sellerOrderDetail.orderDetail.status == 'NEW') {
        setCheck(false);
        setDelivered(false);
        setDelivery(false);
        setPaid(false);
      }
      if (props.sellerOrderDetail.orderDetail.status == 'ORDER') {
        setCheck(true);
        setDelivered(false);
        setDelivery(false);
        setPaid(false);
      }
      if (props.sellerOrderDetail.orderDetail.status == 'DELIVERY') {
        setCheck(true);
        setDelivered(false);
        setDelivery(true);
        setPaid(false);
      }
      if (props.sellerOrderDetail.orderDetail.status == 'DELIVERED') {
        setCheck(true);
        setDelivered(true);
        setDelivery(true);
        setPaid(false);
      }
      if (props.sellerOrderDetail.orderDetail.status == 'PAID') {
        setCheck(true);
        setDelivered(true);
        setDelivery(true);
        setPaid(true);
      }
    }
  }, [props.sellerOrderDetail.orderDetail]);

  const columns1 = [
    { id: 'stt', label: 'STT', minWidth: 10, align: 'center' },
    { id: 'foodName', label: 'Món ăn', minWidth: 100, align: 'center' },
    { id: 'quantity', label: 'Số lượng', minWidth: 100, align: 'center' },
    { id: 'price', label: 'Đơn giá', minWidth: 100, align: 'center' },
    // { id: 'time', label: 'Time', minWidth: 100, align: 'center' },
  ];

  function createData(id, stt, foodName, quantity, price) {
    // const density = population / size;
    return { id, stt, foodName, quantity, price };
  }

  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (data) {
      setRows(
        data.map((item, index) =>
          createData(
            item.id,
            index + 1,
            item.food.name,
            item.quantity,
            item.price,
          ),
        ),
      );
    }
  }, [data]);

  useEffect(() => {
    setData(props.sellerOrderDetail.orderDetail.orderItem_foods);
  }, [props.sellerOrderDetail.orderDetail.orderItem_foods]);

  const changeStatus = () => {
    const data = {
      id: props.location.state.id,
    };
    dispatch(changeStatusToOrder(data));
  };

  const changeStatusDelivery = () => {
    const data = {
      id: props.location.state.id,
    };
    dispatch(changeStatusToDelivery(data));
  };

  const changeStatusDelivered = () => {
    const data = {
      id: props.location.state.id,
    };
    dispatch(changeStatusToDelivered(data));
  }

  const changeStatusPaid = () => {
    const data = {
      id: props.location.state.id,
    };
    dispatch(changeStatusToPaid(data));
  }

  useEffect(() => {
    if (props.sellerOrderDetail.message != '') {
      if (props.sellerOrderDetail.message == 'SUCCESS') {
        setCheck(true);
      }
      setOpenAlert(true);
      setTimeout(() => {
        dispatch(reset());
      }, 6000);
    }
  }, [props.sellerOrderDetail.message]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseAlert = event => {
    setOpenAlert(false);
  };

  console.log(props.sellerOrderDetail.orderDetail)

  return (
    <div style={{ padding: '10px' }}>
      <Grid container spacing={0}>
        <Grid item xs={6} md={6} style={{ padding: '10px' }}>
          <p
            className={classes.font}
            style={{ fontSize: '35px', fontWeight: '700' }}
          >
            {' '}
            Mã đơn hàng <span style={{ color: '#0000EE' }}>#{props.sellerOrderDetail.orderDetail.code}</span>
          </p>
        </Grid>
        <Grid item xs={6} md={6} className={classes.center} style={{ padding: '10px', justifyContent: "right" }}>
          {props.sellerOrderDetail.orderDetail ? props.sellerOrderDetail.orderDetail.status : null}
        </Grid>
      </Grid>

      <Grid container spacing={0}>
        <Grid item xs={12} md={7} style={{ padding: '10px' }}>
          <div>
            {props.sellerOrderDetail.orderDetail ? (
              <CustomTableResponsive
                columns={columns1}
                data={data}
                detailPage="my-store/manager-order"
                rows={rows}
              />
            ) : null}
          </div>

          <div
            className={classes.information_one}
            style={{ marginTop: '10px' }}
          >
            <p
              className={classes.font}
              style={{ fontSize: '30px', fontWeight: '700' }}
            >
              Thông tin khách hàng và đơn hàng
            </p>
            <Grid container spacing={0} className={classes.borderBot}>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p className={classes.text} style={{ fontSize: '20px' }}>
                  Tên
                </p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p
                  className={classes.text}
                  style={{ textAlign: 'right', fontSize: '20px' }}
                >
                  {props.sellerOrderDetail.orderDetail.user
                    ? props.sellerOrderDetail.orderDetail.user.firstname
                    : null}{' '}
                  {props.sellerOrderDetail.orderDetail.user
                    ? props.sellerOrderDetail.orderDetail.user.lastname
                    : null}
                </p>
              </Grid>
            </Grid>
            <Grid container spacing={0} className={classes.borderBot}>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p className={classes.text} style={{ fontSize: '20px' }}>
                  Số điện thoại
                </p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p
                  className={classes.text}
                  style={{ textAlign: 'right', fontSize: '20px' }}
                >
                  {props.sellerOrderDetail.orderDetail.user
                    ? props.sellerOrderDetail.orderDetail.user.phoneNumber
                    : null}
                </p>
              </Grid>
            </Grid>
            <Grid container spacing={0} className={classes.borderBot}>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p className={classes.text} style={{ fontSize: '20px' }}>
                  Phương thức thanh toán
                </p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p
                  className={classes.text}
                  style={{ textAlign: 'right', fontSize: '20px' }}
                >
                  Thanh toán khi nhận hàng
                </p>
              </Grid>
            </Grid>
            <Grid container spacing={0}>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p className={classes.text} style={{ fontSize: '20px' }}>
                  Ghi chú
                </p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p
                  className={classes.text}
                  style={{ textAlign: 'right', fontSize: '20px' }}
                >
                  N/A
                </p>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} md={5} style={{ padding: '10px' }}>
          <div className={classes.information_one}>
            <p
              className={classes.font}
              style={{ fontSize: '20px', fontWeight: '700' }}
            >
              Tóm tắt đơn hàng
            </p>
            <Grid container spacing={0}>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p className={classes.text}>Đơn hàng được tạo</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p className={classes.text} style={{ textAlign: 'right' }}>
                  {moment(
                    props.sellerOrderDetail.orderDetail
                      ? props.sellerOrderDetail.orderDetail.createdAt
                      : null,
                  ).format('DD-MM-YYYY')}
                </p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p className={classes.text}>Thời gian đặt hàng</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p className={classes.text} style={{ textAlign: 'right' }}>
                  {moment(
                    props.sellerOrderDetail.orderDetail
                      ? props.sellerOrderDetail.orderDetail.createdAt
                      : null,
                  ).format('HH:mm:ss')}
                </p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p className={classes.text}>Giá trị đơn hàng</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p className={classes.text} style={{ textAlign: 'right' }}>
                  {props.sellerOrderDetail.orderDetail
                    ? dollarUSLocale.format(props.sellerOrderDetail.orderDetail.total_price)
                    : null}{' '}
                  VND
                </p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p className={classes.text}>Phí vận chuyển</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p className={classes.text} style={{ textAlign: 'right' }}>
                  {dollarUSLocale.format(0)} VND
                </p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p className={classes.text}>Voucher</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p className={classes.text} style={{ textAlign: 'right' }}>
                  {props.sellerOrderDetail.orderDetail && props.sellerOrderDetail.orderDetail.voucherId == null ? <span>Không</span> : <span>Có</span>}
                </p>
              </Grid>
            </Grid>
          </div>

          <div
            className={classes.information_one}
            style={{ marginTop: '10px' }}
          >
            <Grid container spacing={0}>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p className={classes.text}>Tổng thanh toán</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p className={classes.text} style={{ textAlign: 'right' }}>
                  {props.sellerOrderDetail.orderDetail
                    ? dollarUSLocale.format(props.sellerOrderDetail.orderDetail.total_price)
                    : null}{' '}
                  VND
                </p>
              </Grid>
            </Grid>
          </div>

          <div
            className={classes.information_one}
            style={{ marginTop: '10px' }}
          >
            <p
              className={classes.font}
              style={{ fontSize: '20px', fontWeight: '700' }}
            >
              Địa chỉ giao hàng
            </p>
            <Grid container spacing={0}>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p className={classes.text}>Tên </p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p className={classes.text} style={{ textAlign: 'right' }}>
                  {props.sellerOrderDetail.orderDetail && props.sellerOrderDetail.orderDetail.location ? props.sellerOrderDetail.orderDetail.location.name : null}
                </p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p className={classes.text}>Địa chỉ</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                <p className={classes.text} style={{ textAlign: 'right' }}>
                  {props.sellerOrderDetail.orderDetail && props.sellerOrderDetail.orderDetail.location ? props.sellerOrderDetail.orderDetail.location.village : null}
                </p>
              </Grid>
            </Grid>
          </div>
          <div style={{ textAlign: 'center' }}>
            {check == false && delivery == false && delivered == false && paid == false ? <Button
              disabled={check == true}
              className={classes.btn}
              variant="outlined"
              startIcon={<DoneIcon />}
              onClick={changeStatus}
            >
              Xác nhận
            </Button> : null}

            {check == true && delivery == false && delivered == false && paid == false ? <Button
              disabled={check == false}
              className={classes.btn}
              variant="outlined"
              startIcon={<DeliveryDiningRoundedIcon />}
              onClick={changeStatusDelivery}
            >

              {/* {props.sellerOrderDetail.orderDetail && props.sellerOrderDetail.orderDetail.status == "DELIVERY" ? <span>Đang Giao hàng</span>
                : props.sellerOrderDetail.orderDetail && props.sellerOrderDetail.orderDetail.status == "DELIVERED" ? <span>Đã giao hàng</span>
                  : <span>Giao hàng</span>} */}
              Giao hàng
            </Button> : null}

            {delivery == true && check == true && delivered == false && paid == false ? <Button
              disabled
              className={classes.btn}
              variant="outlined"
              startIcon={<DeliveryDiningRoundedIcon />}
              onClick={changeStatusDelivery}
            >
              Đang giao hàng
            </Button> : null}

            {delivery == true && check == true && delivered == false && paid == false ?
              <Button
                disabled={delivered == true}
                className={classes.btn}
                variant="outlined"
                startIcon={<DeliveryDiningRoundedIcon />}
                onClick={changeStatusDelivered}
              >
                Đã giao hàng
              </Button> : null}

            {delivered == true && paid == false && delivery == true && check == true ?
              <Button
                disabled={paid == true}
                className={classes.btn}
                variant="outlined"
                startIcon={<DeliveryDiningRoundedIcon />}
                onClick={changeStatusPaid}
              >
                Đã thanh toán
              </Button> : null}

          </div>
        </Grid>
      </Grid>
      {/* <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        anchorOrigin={{ vertical, horizontal }}
        onClose={handleCloseAlert}
      >
       
        <Alert
          severity="success"
          onClose={handleCloseAlert}
          sx={{ width: '100%' }}
        >
          {props.sellerOrderDetail.message}
        </Alert>
      </Snackbar> */}
    </div>
  );
}

SellerOrderDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sellerOrderDetail: makeSelectSellerOrderDetail(),
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
)(SellerOrderDetail);
