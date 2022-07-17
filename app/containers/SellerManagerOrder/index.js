/**
 *
 * SellerManagerOrder
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSellerManagerOrder from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import moment from 'moment';
import {
  Box, Grid, Avatar
} from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CustomTable from '../../components/CustomTable';
import CustomTableResponsive from '../../components/CustomTableResponsive';
import { getStore } from '../../utils/common';
import { getOrderByStoreId } from './actions';

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
}));


export function SellerManagerOrder(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'sellerManagerOrder', reducer });
  useInjectSaga({ key: 'sellerManagerOrder', saga });

  const currentDate = moment().format('DD-MM-YYYY');
  const classes = useStyles();
  const store = getStore();
  const [data, setData] = useState(props.sellerManagerOrder.listOrder);

  useEffect(() => {
    setData(props.sellerManagerOrder.listOrder);
  }, [props.sellerManagerOrder.listOrder])



  const columns1 = [
    { id: 'stt', label: 'STT', minWidth: 10, align: 'center' },
    { id: 'code', label: 'Order ID', minWidth: 100, align: 'center' },
    { id: 'customerName', label: 'Customer Name', minWidth: 100, align: 'center' },
    { id: 'status', label: 'Status', minWidth: 100, align: 'center' },
    // { id: 'time', label: 'Time', minWidth: 100, align: 'center' },
  ];

  const order = [
    { id: "1", code: "#12323", totalPrice: "1260000", status: "pending", customerName: "Anh Quan", transaction: "Cash", time: "07/05/2022, 9:17:56" },
    { id: "2", code: "#12324", totalPrice: "5160000", status: "pending", customerName: "Anh Quan", transaction: "Cash", time: "07/05/2022, 9:17:56" },
    { id: "3", code: "#12325", totalPrice: "7830000", status: "pending", customerName: "Anh Quan", transaction: "Cash", time: "07/05/2022, 9:17:56" },
    { id: "4", code: "#12326", totalPrice: "8214000", status: "pending", customerName: "Anh Quan", transaction: "Cash", time: "07/05/2022, 9:17:56" },
    { id: "5", code: "#12327", totalPrice: "560000", status: "pending", customerName: "Anh Quan", transaction: "Cash", time: "07/05/2022, 9:17:56" },
    { id: "6", code: "#12328", totalPrice: "16000", status: "pending", customerName: "Anh Quan", transaction: "Cash", time: "07/05/2022, 9:17:56" },
    { id: "7", code: "#12329", totalPrice: "12600", status: "pending", customerName: "Anh Quan", transaction: "Cash", time: "07/05/2022, 9:17:56" },
    { id: "8", code: "#12310", totalPrice: "13000", status: "pending", customerName: "Anh Quan", transaction: "Cash", time: "07/05/2022, 9:17:56" },
    { id: "9", code: "#12311", totalPrice: "645000", status: "pending", customerName: "Anh Quan", transaction: "Cash", time: "07/05/2022, 9:17:56" },
  ];

  function createData(id, stt, code, customerName, status) {
    //const density = population / size;
    return { id, stt, code, customerName, status };
  }

  // const [rows, setRows] = useState(props.sellerManagerOrder.listOrder.map((item, index) =>
  //   createData(item.id, index + 1, item.code, item.user.username, item.status)
  // ));

  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (data) {
      setRows(data.map((item, index) =>
        createData(item.id, index + 1, item.code, item.user.username, item.status)
      ))
    }
  }, [data])

  useEffect(() => {
    const data = {
      id: store
    }
    dispatch(getOrderByStoreId(data));
  }, []);




  return (
    <div style={{ padding: "15px" }}>
      <p className={classes.font} style={{ fontWeight: "400", fontSize: "30px" }}>{currentDate}</p>
      <p className={classes.font} style={{ fontWeight: "700", fontSize: "35px" }}>Đơn hàng</p>
      <Grid container spacing={0} >
        <Grid item xs={12} md={4} style={{ padding: "10px" }}>
          <div style={{ border: "3px solid #000", borderRadius: "10px", background: "#FFF" }}>
            <Grid container spacing={0}>
              <Grid item xs={12} md={3} style={{ padding: "10px" }} className={classes.center}>
                <Avatar sx={{ width: 56, height: 56, backgroundColor: "#FF9900" }}>
                  <AddShoppingCartRoundedIcon sx={{ color: "#000" }} />
                </Avatar>
              </Grid>
              <Grid item xs={12} md={9} style={{ padding: "10px" }}>
                <p className={classes.font} style={{ fontWeight: "700", fontSize: "15px" }}>Tổng số đơn hàng</p>
                <p className={classes.font} style={{ fontWeight: "700", fontSize: "30px", color: "#0000EE" }}>{props.sellerManagerOrder.listOrder.length}</p>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} md={4} style={{ padding: "10px" }}>
          <div style={{ border: "3px solid #000", borderRadius: "10px", background: "#FFF" }}>
            <Grid container spacing={0}>
              <Grid item xs={12} md={3} style={{ padding: "10px" }} className={classes.center}>
                <Avatar sx={{ width: 56, height: 56, backgroundColor: "#FF9900" }}>
                  <HourglassTopRoundedIcon sx={{ color: "#000" }} />
                </Avatar>
              </Grid>
              <Grid item xs={12} md={9} style={{ padding: "10px" }}>
                <p className={classes.font} style={{ fontWeight: "700", fontSize: "15px" }}>Đơn hàng đang chờ</p>
                <p className={classes.font} style={{ fontWeight: "700", fontSize: "30px", color: "#0000EE" }}>12</p>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} md={4} style={{ padding: "10px" }}>
          <div style={{ border: "3px solid #000", borderRadius: "10px", background: "#FFF" }}>
            <Grid container spacing={0}>
              <Grid item xs={12} md={3} style={{ padding: "10px" }} className={classes.center}>
                <Avatar sx={{ width: 56, height: 56, backgroundColor: "#FF9900" }}>
                  <HighlightOffRoundedIcon sx={{ color: "#000" }} />
                </Avatar>
              </Grid>
              <Grid item xs={12} md={9} style={{ padding: "10px" }}>
                <p className={classes.font} style={{ fontWeight: "700", fontSize: "15px" }}>Đơn hàng bị hủy</p>
                <p className={classes.font} style={{ fontWeight: "700", fontSize: "30px", color: "#0000EE" }}>12</p>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      {props.sellerManagerOrder.listOrder ? <CustomTableResponsive columns={columns1} data={props.sellerManagerOrder.listOrder} detailPage="my-store/manager-order" rows={rows} /> : null}
    </div>
  );
}

SellerManagerOrder.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sellerManagerOrder: makeSelectSellerManagerOrder(),
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
)(SellerManagerOrder);
