/**
 *
 * Payment
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPayment from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Headerr from './../Headerr';
import { Box, Grid, MobileStepper, Container } from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';

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
    backgroundColor: "#fff",
    margin: "5px 5px",
    "&:hover": {
      backgroundColor: "#fff",
      fontWeight: "bold",
      color: "#000",
      boxShadow: "2rem 2rem 3rem rgba(132, 139, 200, 0.18)",
    }
  },
  information: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "1rem",
    boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
    transition: "0.5s",
    height: "100%",
  },
  center: {
    flexWrap: "wrap",
    alignContent: "center",
    display: "flex"
  },
  font: {
    fontFamily: "san-serif",
    fontWeight: "500",
    fontSize: "20px",
    margin: "0"
  },
  btnSubmit: {
    position: "relative",
    width: "fit-content",
    borderRadius: "10px",
    backgroundColor: "#FF9900",
    margin: "5px 5px",
    "&:hover": {
      backgroundColor: "#FF9900",
      fontWeight: "bold",
      color: "#000",
      boxShadow: "2rem 2rem 3rem rgba(132, 139, 200, 0.18)",
    }
  },
  infor_text: {
    fontWeight: "500",
    fontSize: "25px"
  }

}));

export function Payment() {
  useInjectReducer({ key: 'payment', reducer });
  useInjectSaga({ key: 'payment', saga });

  const classes = useStyles();

  const orderList = [
    { storeId: 1, orderFood: { "1": 1, "2": 2 }, voucherId: null }
  ]

  return (
    <div>
      {/* <Helmet>
        <title>Payment</title>
        <meta name="description" content="Description of Payment" />
      </Helmet>
      <FormattedMessage {...messages.header} /> */}
      <Headerr />
      <Container fixed>
        <div>
          <p className={classes.font} style={{ fontWeight: "700", fontSize: "30px" }}>Thanh toán</p>
        </div>
        <div className={classes.information}>
          <Grid container spacing={0}>
            <Grid item sm={12} xs={12} md={12} >
              <p className={classes.font} style={{ fontWeight: "600", fontSize: "25px" }}>Địa chỉ nhận hàng</p>
            </Grid>
            <Grid container spacing={0}>
              <Grid item sm={12} xs={12} md={2} className={classes.center}>
                <span className={classes.infor_text}>Anh Quan</span>
              </Grid>
              <Grid item sm={12} xs={12} md={2} className={classes.center}>
                <span className={classes.infor_text}>0123465798</span>
              </Grid>
              <Grid item sm={12} xs={12} md={6} className={classes.center}>
                <span className={classes.infor_text} style={{ fontWeight: "300" }}>tro tuan cuong 1, thon 3, xa thach hoa, thach that</span>
              </Grid>
              <Grid item sm={12} xs={12} md={2} style={{ textAlign: "center" }}>
                <Button variant="contained" component="span" className={classes.btnSubmit} >
                  thay đổi
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <div className={classes.information}>

          <Grid container spacing={0}>
            <Grid item sm={12} xs={12} md={6}>
              <span className={classes.infor_text}>Món ăn</span>
            </Grid>
            <Grid item sm={12} xs={12} md={2} style={{ textAlign: "center" }}>
              <span className={classes.infor_text} style={{ color: "#C1BBC1" }}>Đơn giá</span>
            </Grid>
            <Grid item sm={12} xs={12} md={2} style={{ textAlign: "center" }}>
              <span className={classes.infor_text} style={{ color: "#C1BBC1" }}>Số lượng</span>
            </Grid>
            <Grid item sm={12} xs={12} md={2} style={{ textAlign: "center" }}>
              <span className={classes.infor_text} style={{ color: "#C1BBC1" }}>Thành tiền</span>
            </Grid>
          </Grid>
          <hr />

          <div>
            {/* {orderList.map((item, index) =>
              <div key={index}>
                <Grid item sm={12} xs={12} md={12}>
                  <span className={classes.infor_text}>tên quán</span>
                </Grid>
                <Grid container spacing={0}>
                  <Grid item sm={12} xs={12} md={6}>
                    <span className={classes.infor_text} style={{ fontSize: "20px" }}>món ăn 1</span>
                  </Grid>
                  <Grid item sm={12} xs={12} md={2} style={{ textAlign: "center" }}>
                    <span className={classes.infor_text} style={{ fontSize: "20px" }}>50.000 VND</span>
                  </Grid>
                  <Grid item sm={12} xs={12} md={2} style={{ textAlign: "center" }}>
                    <span className={classes.infor_text} style={{ fontSize: "20px" }}>2</span>
                  </Grid>
                  <Grid item sm={12} xs={12} md={2} style={{ textAlign: "center" }}>
                    <span className={classes.infor_text} style={{ fontSize: "20px" }}>100.000 VND</span>
                  </Grid>
                </Grid>
                <hr />
              </div>
            )} */}
            <Grid item sm={12} xs={12} md={12}>
              <span className={classes.infor_text}>tên quán</span>
            </Grid>
            <Grid container spacing={0}>
              <Grid item sm={12} xs={12} md={6}>
                <span className={classes.infor_text} style={{ fontSize: "20px" }}>món ăn 1</span>
              </Grid>
              <Grid item sm={12} xs={12} md={2} style={{ textAlign: "center" }}>
                <span className={classes.infor_text} style={{ fontSize: "20px" }}>50.000 VND</span>
              </Grid>
              <Grid item sm={12} xs={12} md={2} style={{ textAlign: "center" }}>
                <span className={classes.infor_text} style={{ fontSize: "20px" }}>2</span>
              </Grid>
              <Grid item sm={12} xs={12} md={2} style={{ textAlign: "center" }}>
                <span className={classes.infor_text} style={{ fontSize: "20px" }}>100.000 VND</span>
              </Grid>
            </Grid>
            <hr />

            <Grid item sm={12} xs={12} md={12}>
              <span className={classes.infor_text}>tên quán</span>
            </Grid>
            <Grid container spacing={0}>
              <Grid item sm={12} xs={12} md={6}>
                <span className={classes.infor_text} style={{ fontSize: "20px" }}>món ăn 2</span>
              </Grid>
              <Grid item sm={12} xs={12} md={2} style={{ textAlign: "center" }}>
                <span className={classes.infor_text} style={{ fontSize: "20px" }}>20.000 VND</span>
              </Grid>
              <Grid item sm={12} xs={12} md={2} style={{ textAlign: "center" }}>
                <span className={classes.infor_text} style={{ fontSize: "20px" }}>3</span>
              </Grid>
              <Grid item sm={12} xs={12} md={2} style={{ textAlign: "center" }}>
                <span className={classes.infor_text} style={{ fontSize: "20px" }}>60.000 VND</span>
              </Grid>
            </Grid>
            <hr />
          </div>

          <div>
            <Grid container spacing={0}>
              <Grid item sm={12} xs={12} md={3} className={classes.center}>
                <span className={classes.infor_text}>Phương thức thanh toán</span>
              </Grid>
              <Grid item sm={12} xs={12} md={3} style={{ textAlign: "center" }}>
                <Button variant="contained" component="span" className={classes.btn} >
                  Tài khoản ngân hàng
                </Button>
              </Grid>
              <Grid item sm={12} xs={12} md={3} >
                <Button variant="contained" component="span" className={classes.btn} >
                  Thanh toán khi nhận hàng
                </Button>
              </Grid>
            </Grid>
            <hr />
          </div>

          <div>
            <p className={classes.font} style={{ textAlign: "right", fontSize: "25px" }}>Tổng thanh toán: 160.000 VND</p>
            <p style={{ textAlign: "right" }}>
              <Button variant="contained" component="span" className={classes.btnSubmit} >
                thanh toán
              </Button>
            </p>
          </div>
        </div>
      </Container>

    </div>
  );
}

Payment.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  payment: makeSelectPayment(),
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
)(Payment);
