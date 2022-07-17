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
import makeSelectSellerOrderDetail from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  Box, Grid, Container, Avatar, Typography, List, FormControlLabel, Radio, RadioGroup,
  ListItemButton, ListItemIcon, ListItemText, Collapse, OutlinedInput, Select, MenuItem
} from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import DeliveryDiningRoundedIcon from '@mui/icons-material/DeliveryDiningRounded';
import { changeStatusToOrder, changeStatusToPaid, getOrderDetailById, reset } from './actions';
import moment from 'moment';
import CustomTableResponsive from '../../components/CustomTableResponsive';
import DoneIcon from '@mui/icons-material/Done';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const useStyles = makeStyles((theme) => ({
  font: {
    fontFamily: "sans-serif",
    margin: "0"
  },
  center: {
    flexWrap: "wrap",
    alignContent: "center",
    display: "flex",
    justifyContent: "center"
  },
  text: {
    fontFamily: "sans-serif",
    margin: "0",
    fontSize: "15px",
    fontWeight: "700",
  },
  content: {
    border: "3px solid #000",
    padding: "10px",
    borderRadius: "10px"
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
  borderBot: {
    borderBottom: "1px solid #000"
  },
  information_one: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "1rem",
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    transition: "0.5s",
    height: "fit-content",
  },

}));

export function SellerOrderDetail(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'sellerOrderDetail', reducer });
  useInjectSaga({ key: 'sellerOrderDetail', saga });

  const classes = useStyles();
  const [data, setData] = useState(props.sellerOrderDetail.orderDetail.orderItem_foods);
  const [check, setCheck] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("right");

  useEffect(() => {
    const data = {
      id: props.location.state.id
    }
    dispatch(getOrderDetailById(data));
    if (props.sellerOrderDetail.orderDetail.status == "ORDER") {
      setCheck(true);
    }
  }, []);


  const columns1 = [
    { id: 'stt', label: 'No.', minWidth: 10, align: 'center' },
    { id: 'foodName', label: 'Food Name', minWidth: 100, align: 'center' },
    { id: 'quantity', label: 'Quantity', minWidth: 100, align: 'center' },
    { id: 'price', label: 'Price', minWidth: 100, align: 'center' },
    // { id: 'time', label: 'Time', minWidth: 100, align: 'center' },
  ];

  function createData(id, stt, foodName, quantity, price) {
    //const density = population / size;
    return { id, stt, foodName, quantity, price };
  }

  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (data) {
      setRows(data.map((item, index) =>
        createData(item.id, index + 1, item.food.name, item.quantity, item.price)
      ))
    }
  }, [data])

  useEffect(() => {
    setData(props.sellerOrderDetail.orderDetail.orderItem_foods);
  }, [props.sellerOrderDetail.orderDetail.orderItem_foods])

  const changeStatus = () => {
    const data = {
      id: props.location.state.id
    }
    dispatch(changeStatusToOrder(data));
  }

  const changeStatusPaid = () => {
    const data = {
      id: props.location.state.id
    }
    dispatch(changeStatusToPaid(data));
  }


  useEffect(() => {
    if (props.sellerOrderDetail.message != "") {
      if (props.sellerOrderDetail.message == "SUCCESS") {
        setCheck(true);
      }
      console.log(props.sellerOrderDetail.message);
      setOpenAlert(true);
      setTimeout(() => {
        dispatch(reset())
      }, 6000);
    }
  }, [props.sellerOrderDetail.message]);

  const Alert = React.forwardRef(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseAlert = (event) => {
    setOpenAlert(false);
  };

  return (
    <div style={{ padding: "10px" }}>
      <p className={classes.font} style={{ fontSize: "35px", fontWeight: "700" }}> Mã đơn hàng <span style={{ color: "#0000EE" }}>#132132</span></p>
      <Grid container spacing={0} >
        <Grid item xs={12} md={7} style={{ padding: "10px" }}>
          <div>
            {props.sellerOrderDetail.orderDetail ? <CustomTableResponsive columns={columns1} data={data} detailPage="my-store/manager-order" rows={rows} /> : null}
          </div>

          <div className={classes.information_one} style={{ marginTop: "10px" }}>
            <p className={classes.font} style={{ fontSize: "30px", fontWeight: "700" }}>Thông tin khách hàng và đơn hàng</p>
            <Grid container spacing={0} className={classes.borderBot}>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ fontSize: "20px", }}>Tên</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right", fontSize: "20px", }}>{props.sellerOrderDetail.orderDetail.user ? props.sellerOrderDetail.orderDetail.user.firstname : null} {props.sellerOrderDetail.orderDetail.user ? props.sellerOrderDetail.orderDetail.user.lastname : null}</p>
              </Grid>
            </Grid>
            <Grid container spacing={0} className={classes.borderBot}>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ fontSize: "20px", }}>Số điện thoại</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right", fontSize: "20px", }}>{props.sellerOrderDetail.orderDetail.user ? props.sellerOrderDetail.orderDetail.user.phoneNumber : null}</p>
              </Grid>
            </Grid>
            <Grid container spacing={0} className={classes.borderBot}>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ fontSize: "20px", }}>Phương thức thanh toán</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right", fontSize: "20px", }}>Thanh toán khi nhận hàng</p>
              </Grid>
            </Grid>
            <Grid container spacing={0} >
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ fontSize: "20px", }}>Ghi chú</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right", fontSize: "20px", }}>N/A</p>
              </Grid>
            </Grid>
          </div>

        </Grid>
        <Grid item xs={12} md={5} style={{ padding: "10px" }}>
          <div className={classes.information_one}>
            <p className={classes.font} style={{ fontSize: "20px", fontWeight: "700" }}>Tóm tắt đơn hàng</p>
            <Grid container spacing={0} >
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text}>Đơn hàng được tạo</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right" }}>{moment(props.sellerOrderDetail.orderDetail ? props.sellerOrderDetail.orderDetail.createdAt : null).format('DD-MM-YYYY')}</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text}>Thời gian đặt hàng</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right" }}>{moment(props.sellerOrderDetail.orderDetail ? props.sellerOrderDetail.orderDetail.createdAt : null).format('HH:mm:ss')}</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text}>Giá trị đơn hàng</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right" }}>{props.sellerOrderDetail.orderDetail ? props.sellerOrderDetail.orderDetail.total_price : null} VND</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text}>Phí vận chuyển</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right" }}>0 VND</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text}>Voucher</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right" }}>Không</p>
              </Grid>
            </Grid>
          </div>

          <div className={classes.information_one} style={{ marginTop: "10px" }}>
            <Grid container spacing={0} >
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text}>Tổng thanh toán</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right" }}>{props.sellerOrderDetail.orderDetail ? props.sellerOrderDetail.orderDetail.total_price : null} VND</p>
              </Grid>
            </Grid>
          </div>

          <div className={classes.information_one} style={{ marginTop: "10px" }}>
            <p className={classes.font} style={{ fontSize: "20px", fontWeight: "700" }}>Địa chỉ giao hàng</p>
            <Grid container spacing={0} >
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text}>Dorm </p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right" }}>A</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text}>Phòng</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right" }}>A123R</p>
              </Grid>
            </Grid>
          </div>
          <div style={{ textAlign: "center" }}>
            <Button className={classes.btn} variant="outlined" startIcon={<DoneIcon />} onClick={changeStatus}>
              Xác nhận
            </Button>
            <Button disabled={check == false} className={classes.btn} variant="outlined" startIcon={<DeliveryDiningRoundedIcon />} onClick={changeStatusPaid}>
              Giao hàng
            </Button>
          </div>
        </Grid>
      </Grid>
      <Snackbar open={openAlert} autoHideDuration={6000} anchorOrigin={{ vertical, horizontal }} onClose={handleCloseAlert}>
        {/* {props.userAddress.message.includes("FAILED") == false || props.userAddress.message.includes("Failed") == false || props.userAddress.message != "Network Error" ? */}
        <Alert severity="success" onClose={handleCloseAlert} sx={{ width: '100%' }}>
          {props.sellerOrderDetail.message}
        </Alert>

      </Snackbar>
    </div >
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
