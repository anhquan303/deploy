/**
 *
 * Payment
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
import { Box, Grid, MobileStepper, Container, Modal, Typography } from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import makeSelectPayment from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Headerr from '../Headerr';
import { createOrder, getListLocationByUserId, reset } from './actions';
import { getUser } from '../../utils/common';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useHistory } from 'react-router-dom';

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
    margin: '0 5px',
    '&:hover': {
      backgroundColor: '#FFA500',
      fontWeight: 'bold',
      color: '#000',
      boxShadow: '2rem 2rem 3rem rgba(132, 139, 200, 0.18)',
    },
  },
  information: {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    marginTop: '1rem',
    boxShadow: '0 2rem 3rem rgba(132, 139, 200, 0.18)',
    transition: '0.5s',
    height: '100%',
  },
  center: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
  },
  font: {
    fontFamily: 'san-serif',
    fontWeight: '500',
    fontSize: '20px',
    margin: '0',
  },
  btnSubmit: {
    position: 'relative',
    width: 'fit-content',
    borderRadius: '10px',
    backgroundColor: '#FF9900',
    margin: '5px 5px',
    '&:hover': {
      backgroundColor: '#FF9900',
      fontWeight: 'bold',
      color: '#000',
      boxShadow: '2rem 2rem 3rem rgba(132, 139, 200, 0.18)',
    },
  },
  infor_text: {
    fontWeight: '500',
    fontSize: '25px',
    fontFamily: 'san-serif',
    margin: '0',
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto"
    }
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    backgroundColor: '#fff',
    textAlign: 'center',
    borderRadius: '20px',
    padding: '10px',
  },
  payment: {
    textAlign: "left",
    padding: "10px",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    }
  }
}));


export function Payment(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'payment', reducer });
  useInjectSaga({ key: 'payment', saga });

  const classes = useStyles();
  const user = getUser();
  let dollarUSLocale = Intl.NumberFormat('en-US');
  const [openAlert, setOpenAlert] = useState(false);
  const [vertical, setVertical] = useState('top');
  const [horizontal, setHorizontal] = useState('right');
  let result = 0;
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const [nameAddress, setNameAddress] = useState();
  const [address, setAddress] = useState();

  const singleVal = Array.from(props.location.state.item.map(item => {
    return (item.food.price * item.quantity)
  }));


  for (var i = 0; i < singleVal.length; i++) {
    result += parseInt(singleVal[i]);
  }

  const handlePayment = () => {
    const data = {
      uid: user.id,
      data: {
        orderCreateRequests:
          props.location.state.item.map((item) => {
            return (
              {
                storeId: item.food.foodStore.id,
                orderFood: [
                  {
                    foodId: item.food.id,
                    quantity: item.quantity
                  }
                ],
                voucherId: null
              }
            )
          })
      }
    }
    dispatch(createOrder(data));
  }

  useEffect(() => {
    setOpenAlert(false);
    dispatch(reset());
    const data = {
      id: user.id
    }
    dispatch(getListLocationByUserId(data));
  }, []);

  useEffect(() => {
    if (props.payment.message.includes("thành công")) {
      setOpenAlert(true);
      setTimeout(() => dispatch(reset()), 6000);
      setTimeout(() => history.push("/user/order-history"), 2000);
    }
  }, [props.payment.message])

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseAlert = event => {
    setOpenAlert(false);
  };

  console.log(props.payment.listLocation)

  useEffect(() => {
    if (props.payment.listLocation) {
      setNameAddress(props.payment.listLocation[0].name);
      setAddress(props.payment.listLocation[0].village);
    }
  }, [props.payment.listLocation])

  const handleChangeLocation = (name, village) => {
    setNameAddress(name);
    setAddress(village);
    setOpenModal(false);
  }


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
          <p
            className={classes.font}
            style={{ fontWeight: '700', fontSize: '30px' }}
          >
            Thanh toán
          </p>
        </div>
        <div className={classes.information}>
          <Grid container spacing={0}>
            <Grid item sm={12} xs={12} md={12}>
              <p
                className={classes.font}
                style={{ fontWeight: '600', fontSize: '25px' }}
              >
                Địa chỉ nhận hàng
              </p>
            </Grid>
            <Grid container spacing={0}>
              <Grid item sm={12} xs={12} md={12} lg={2} className={classes.center}>
                <span className={classes.infor_text}>{user.firstname} {user.lastname}</span>
              </Grid>
              <Grid item sm={12} xs={12} md={12} lg={2} className={classes.center}>
                <span className={classes.infor_text}>{user.phone}</span>
              </Grid>
              <Grid item sm={12} xs={12} md={12} lg={6} className={classes.center}>
                <span
                  className={classes.infor_text}
                  style={{ fontWeight: '300' }}
                >
                  {nameAddress}, {address}
                </span>
              </Grid>
              <Grid item sm={12} xs={12} md={12} lg={2} style={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  component="span"
                  className={classes.btnSubmit}
                  onClick={() => setOpenModal(true)}
                >
                  thay đổi
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <div className={classes.information}>
          <Grid container spacing={0}>
            <Grid item sm={6} xs={6} md={6}>
              <span className={classes.infor_text}>Món ăn</span>
            </Grid>
            <Grid item sm={2} xs={2} md={2} style={{ textAlign: 'center' }}>
              <span className={classes.infor_text} style={{ color: '#C1BBC1' }}>
                Đơn giá
              </span>
            </Grid>
            <Grid item sm={2} xs={2} md={2} style={{ textAlign: 'center' }}>
              <span className={classes.infor_text} style={{ color: '#C1BBC1' }}>
                Số lượng
              </span>
            </Grid>
            <Grid item sm={2} xs={2} md={2} style={{ textAlign: 'center' }}>
              <span className={classes.infor_text} style={{ color: '#C1BBC1' }}>
                Thành tiền
              </span>
            </Grid>
          </Grid>
          <hr />

          <div>
            {props.location.state.item.map((item, index) =>
              <div key={index}>
                <Grid item sm={12} xs={12} md={12}>
                  <span className={classes.infor_text}>{item.food.foodStore.name}</span>
                </Grid>
                <Grid container spacing={0}>
                  <Grid item sm={6} xs={6} md={6}>
                    <span className={classes.infor_text} style={{ fontSize: "20px" }}>{item.food.name}</span>
                  </Grid>
                  <Grid item sm={2} xs={2} md={2} style={{ textAlign: "center" }}>
                    <span className={classes.infor_text} style={{ fontSize: "20px" }}>{dollarUSLocale.format(item.food.price)} VND</span>
                  </Grid>
                  <Grid item sm={2} xs={2} md={2} style={{ textAlign: "center" }}>
                    <span className={classes.infor_text} style={{ fontSize: "20px" }}>{item.quantity}</span>
                  </Grid>
                  <Grid item sm={2} xs={2} md={2} style={{ textAlign: "center" }}>
                    <span className={classes.infor_text} style={{ fontSize: "20px" }}>{dollarUSLocale.format(parseInt(item.food.price) * parseInt(item.quantity))} VND</span>
                  </Grid>
                </Grid>
                <hr />
              </div>
            )}

            {/* {props.location.state.item.map(item => item.cartFoodResponses.map((nestItem) => {
              return (
                <div key={nestItem.food.foodStore.id}>
                  <Grid item sm={12} xs={12} md={12}>
                    <span className={classes.infor_text}>{nestItem.food.foodStore.name}</span>
                  </Grid>
                  <Grid container spacing={0}>
                    <Grid item sm={12} xs={12} md={6}>
                      <span className={classes.infor_text} style={{ fontSize: "20px" }}>{nestItem.food.name}</span>
                    </Grid>
                    <Grid item sm={12} xs={12} md={2} style={{ textAlign: "center" }}>
                      <span className={classes.infor_text} style={{ fontSize: "20px" }}>{nestItem.food.price} VND</span>
                    </Grid>
                    <Grid item sm={12} xs={12} md={2} style={{ textAlign: "center" }}>
                      <span className={classes.infor_text} style={{ fontSize: "20px" }}>{nestItem.quantity}</span>
                    </Grid>
                    <Grid item sm={12} xs={12} md={2} style={{ textAlign: "center" }}>
                      <span className={classes.infor_text} style={{ fontSize: "20px" }}>{parseInt(nestItem.food.price) * parseInt(nestItem.quantity)}</span>
                    </Grid>
                  </Grid>
                  <hr />
                </div>
              )
            }))} */}




          </div>

          <div>
            <Grid container spacing={0}>
              <Grid item sm={12} xs={12} md={3} className={classes.center}>
                <p className={classes.infor_text}>
                  Phương thức thanh toán
                </p>
              </Grid>
              <Grid item sm={12} xs={12} md={3} className={classes.payment}>
                <Button
                  variant="contained"
                  component="span"
                  className={classes.btn}
                >
                  Tài khoản ngân hàng
                </Button>
              </Grid>
              <Grid item sm={12} xs={12} md={4} className={classes.payment}>
                <Button
                  variant="contained"
                  component="span"
                  className={classes.btn}
                >
                  Thanh toán khi nhận hàng
                </Button>
              </Grid>
            </Grid>
            <hr />
          </div>

          <div>
            <p
              className={classes.font}
              style={{ textAlign: 'right', fontSize: '25px' }}
            >
              Tổng thanh toán: {dollarUSLocale.format(result)} VND
            </p>
            <p style={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                component="span"
                className={classes.btnSubmit}
                onClick={handlePayment}
              >
                thanh toán
              </Button>
            </p>
          </div>
        </div>
      </Container>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginTop: '10px' }}
          >
            Thay đổi địa chỉ
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.payment.listLocation.map((item) => {
              return (
                <div key={item.id}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} md={8} className={classes.center}>
                      <Grid container spacing={0}>
                        <Grid item xs={3} md={3}>
                          <p
                            className={classes.font}
                            style={{
                              fontWeight: '500',
                              fontSize: '20px',
                              color: '#7E7E7E',
                              textAlign: 'right',
                            }}
                          >
                            Họ và tên
                          </p>
                        </Grid>
                        <Grid item xs={9} md={9}>
                          <p
                            className={classes.font}
                            style={{
                              fontWeight: '500',
                              fontSize: '20px',
                              color: '#000',
                              textAlign: 'left',
                              paddingLeft: '10px',
                            }}
                          >
                            {user.firstname} {user.lastname}
                          </p>
                        </Grid>
                      </Grid>
                      <Grid container spacing={0}>
                        <Grid item xs={3} md={3}>
                          <p
                            className={classes.font}
                            style={{
                              fontWeight: '500',
                              fontSize: '20px',
                              color: '#7E7E7E',
                              textAlign: 'right',
                            }}
                          >
                            Số điện thoại
                          </p>
                        </Grid>
                        <Grid item xs={9} md={9}>
                          <p
                            className={classes.font}
                            style={{
                              fontWeight: '500',
                              fontSize: '20px',
                              color: '#000',
                              textAlign: 'left',
                              paddingLeft: '10px',
                            }}
                          >
                            {user.phone}
                          </p>
                        </Grid>
                      </Grid>
                      <Grid container spacing={0}>
                        <Grid item xs={3} md={3}>
                          <p
                            className={classes.font}
                            style={{
                              fontWeight: '500',
                              fontSize: '20px',
                              color: '#7E7E7E',
                              textAlign: 'right',
                            }}
                          >
                            Địa chỉ
                          </p>
                        </Grid>
                        <Grid item xs={9} md={9}>
                          <p
                            className={classes.font}
                            style={{
                              fontWeight: '500',
                              fontSize: '20px',
                              color: '#000',
                              paddingLeft: '10px',
                              textAlign: 'left',
                            }}
                          >
                            {item.name} - {item.village}
                          </p>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={4}
                      className={classes.center}
                      style={{ justifyContent: 'right' }}
                    >
                      <div>
                        <p style={{ textAlign: 'right' }}>
                          <Button className={classes.btn} variant="outlined" onClick={() => handleChangeLocation(item.name, item.village)}>
                            Chọn
                          </Button>
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                  <hr />
                </div>
              )
            })}

          </Typography>
        </Box>
      </Modal>

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
          {props.payment.message}
        </Alert>
      </Snackbar>
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
