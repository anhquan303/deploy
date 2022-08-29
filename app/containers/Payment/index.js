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
import {
  Box, Grid, MobileStepper, Container, Modal, OutlinedInput,
  Typography, TextField, FormControl, InputLabel, Select, MenuItem, Backdrop
} from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import makeSelectPayment from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Headerr from '../Headerr';
import { addLocation, createOrder, createQR, getDefaultLocation, getListLocationByUserId, getListOrderByUserId, getListVoucher, getListVoucherByStoreId, getListWards, reset } from './actions';
import { getUser } from '../../utils/common';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useHistory } from 'react-router-dom';
import { id } from 'date-fns/locale';
import Loading from '../../components/Loading';
import { Footerr } from '../Footerr';

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
    backgroundColor: '#FD4444',
    color: '#fff',
    margin: '5px 5px',
    '&:hover': {
      backgroundColor: '#FF1C1C',
      fontWeight: 'bold',
      color: '#fff',
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
  const [openModalAddAddress, setOpenModalAddAddress] = useState(false);
  const [nameAddress, setNameAddress] = useState();
  const [address, setAddress] = useState();
  const initialValues = {
    address: '',
    district: 'Thạch Thất',
    town: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [type, setType] = useState('');
  const [locationId, setLocationId] = useState();
  const [paymentType, setPaymentType] = useState('');
  const [orderId, setOrderId] = useState('');
  const [voucher, setVoucher] = useState([]);
  let payment = [];
  let payment2 = [];
  let count = 0;
  let [listTest, setListTest] = useState([]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


  if (props.location.state.item.length == 2) {
    if (props.location.state.item[0].food.foodStore.name == props.location.state.item[1].food.foodStore.name) {
      payment[count] = { storeId: props.location.state.item[0].food.foodStore, listFood: [props.location.state.item[0], props.location.state.item[1]] };
    } else {
      payment[count] = { storeId: props.location.state.item[0].food.foodStore, listFood: [props.location.state.item[0]] };
      payment[count + 1] = { storeId: props.location.state.item[1].food.foodStore, listFood: [props.location.state.item[1]] };
    }

  } else {
    if (props.location.state.item.length == 1) {
      payment[count] = { storeId: props.location.state.item[0].food.foodStore, listFood: [props.location.state.item[0]] };
    } else {
      for (var i = 0; i < props.location.state.item.length - 1; ++i) {
        if (i != 0) {
          payment[count + 1] = { storeId: props.location.state.item[i + 1].food.foodStore, listFood: [props.location.state.item[i + 1]] };
        }
        payment[count] = { storeId: props.location.state.item[i].food.foodStore, listFood: [props.location.state.item[i]] };
        for (var j = i + 1; j < props.location.state.item.length; ++j) {
          if (props.location.state.item[i].food.foodStore.name == props.location.state.item[j].food.foodStore.name) {
            payment[count].listFood.push(props.location.state.item[j])
          }
        }
        ++count;
      }
    }
  }




  //console.log(payment);

  payment2 = payment.filter((ele, ind) => ind === payment.findIndex(elem => elem.storeId.id === ele.storeId.id))

  const [paymentList, setPaymentList] = useState(payment2);

  const singleVal = Array.from(props.location.state.item.map(item => {
    return (item.food.price * item.quantity)
  }));


  for (var i = 0; i < singleVal.length; i++) {
    result += parseInt(singleVal[i]);
  }

  //console.log('list', payment2)
  const handleChangeVoucher = (event) => {
    const { name } = event.target;

    if (event.target.value != 0) {
      setVoucher(event.target.value);
      const checkExist = listTest.some(element => {
        if (element.storeId.id == name) {
          return true;
        }
        return false;

      })

      for (var i = 0; i < payment2.length; i++) {
        // console.log('i', i)
        // console.log('payment', payment2[i].storeId.id)
        // console.log('name', name)
        if (payment2[i].storeId.id == name) {
          //console.log('here')
          if (checkExist == false) {
            payment2[i].voucher = event.target.value;
            listTest.push(Object.assign({}, payment2[i], { voucher: event.target.value }));

          } else {
            listTest.splice(i, 1);
            payment2[i].voucher = event.target.value;
            listTest.push(Object.assign({}, payment2[i], { voucher: event.target.value }));
          }

        } else {
          if (checkExist == false) {
            listTest.push(payment2[i]);
          }
        }

      }
      if (listTest.length != 0) {
        setPaymentList([]);
        setPaymentList(listTest);
      }
    } else {
      // const checkExist = paymentList.some(element => {
      //   if (element.storeId.id == name) {
      //     return true;
      //   }
      //   return false;

      // })
      paymentList.filter(item => item.storeId.id == name).map(voucher => delete voucher.voucher)
      const newList = [];
      paymentList.map(item => newList.push(item));
      setPaymentList(newList)
    }
  };

  const handlePayment = () => {


    const data = {
      uid: user.id,
      data: {
        orderCreateRequests:
          paymentList.map((item) => {
            return (
              {
                storeId: item.storeId.id,
                orderFood:
                  item.listFood.map((item1) => {
                    return (
                      {
                        foodId: item1.food.id,
                        quantity: item1.quantity
                      }
                    )
                  }),

                locationId: locationId,
                voucherId: item.voucher == null ? null : item.voucher.id
              }
            )
          }
          ),
        qr: paymentType
      }
    }
    dispatch(createOrder(data));

    // const data = {
    //   uid: user.id,
    //   data: {
    //     orderCreateRequests:
    //       paymentList.map((item) => {
    //         return (
    //           {
    //             storeId: item.storeId.id,
    //             orderFood:
    //               item.listFood.map((item1) => {
    //                 return (
    //                   {
    //                     foodId: item1.food.id,
    //                     quantity: item1.quantity
    //                   }
    //                 )
    //               })
    //             ,
    //             voucherId: item.voucher == null ? null : item.voucher.id,
    //             locationId: locationId
    //           }
    //         )
    //       })
    //   }
    // }
    // dispatch(createOrder(data));



  }

  useEffect(() => {
    setOpenAlert(false);
    dispatch(getListWards());

    const data = {
      id: user.id
    }
    dispatch(getListLocationByUserId(data));
    dispatch(getListVoucher(data));
    dispatch(reset());
    dispatch(getDefaultLocation());
    dispatch(getListVoucherByStoreId());
  }, []);

  useEffect(() => {
    if (props.payment.message.includes("Đặt hàng thành công")) {
      // if (paymentType == "transfer") {
      //   const data = {
      //     id: user.id
      //   }
      //   dispatch(getListOrderByUserId(data));
      // } else {
      setOpenAlert(true);
      setTimeout(() => dispatch(reset()), 3000);
      setTimeout(() => history.push("/user/order-history"), 2000);
      //}
    }
    if (props.payment.message.includes("Thêm địa chỉ thành công")) {
      const data = {
        id: user.id
      }
      dispatch(getListLocationByUserId(data));
      setOpenAlert(true);
      setTimeout(() => dispatch(reset()), 3000);
    }
    if (props.payment.message.includes("Chưa thêm địa chỉ giao hàng, phương thức thanh toán hoặc voucher không đủ điều kiện sử dụng")) {
      // const data = {
      //   id: user.id
      // }
      // dispatch(getListLocationByUserId(data));
      setOpenAlert(true);
      setTimeout(() => dispatch(reset()), 3000);
    }
  }, [props.payment.message])


  //get id of order
  // useEffect(() => {
  //   if (props.payment.listOrder && paymentType == "transfer") {
  //     if (props.payment.listOrder.length != 0) {
  //       setOrderId(props.payment.listOrder[props.payment.listOrder.length - 1].id);
  //     }
  //   }
  // }, [props.payment.listOrder]);

  //create qr code for order
  // useEffect(() => {
  //   if (orderId != '') {
  //     const data = {
  //       order_id: orderId
  //     }
  //     dispatch(createQR(data));
  //   }
  // }, [orderId])

  //qr code
  // useEffect(() => {
  //   if (props.payment.qrcode != "") {

  //     // setOpenAlert(true);
  //     // setTimeout(() => dispatch(reset()), 6000);
  //     // setTimeout(() => history.push("/user/order-history"), 2000);
  //     //window.open(props.payment.qrcode, '_blank', 'noopener,noreferrer');
  //   }
  // }, [props.payment.qrcode]);

  // const handlePaymentSuccess = () => {
  //   setTimeout(() => dispatch(reset()), 6000);
  //   setTimeout(() => history.push("/user/order-history"), 2000);
  // }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseAlert = event => {
    setOpenAlert(false);
  };

  useEffect(() => {
    if (props.payment.defaultLocationn != undefined) {
      setNameAddress(props.payment.defaultLocationn.name);
      setAddress(props.payment.defaultLocationn.village);
      setLocationId(props.payment.defaultLocationn.id);
    } else {
      if (props.payment.listLocation) {
        if (props.payment.listLocation.length != 0 && props.payment.listLocation != null) {
          setNameAddress(props.payment.listLocation[0].name);
          setAddress(props.payment.listLocation[0].village);
          setLocationId(props.payment.listLocation[0].id);
        } else {
          setNameAddress("");
          setAddress("");
        }
      } else {
        setNameAddress("");
        setAddress("");
      }
    }

  }, [props.payment.listLocation, props.payment.defaultLocationn])


  const handleChangeLocation = (name, village, id) => {
    setNameAddress(name);
    setAddress(village);
    setLocationId(id);
    setOpenModal(false);
  }

  // set value for input
  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // set ward
  const handleChangeType = e => {
    setType(e.target.value);
  };

  // set payment type
  const handleChangePaymentType = e => {
    setPaymentType(e.target.value);
  };

  //add address
  const closeModalAddress = () => {
    const data = {
      name: formValues.address,
      village: `${formValues.town}, ${type}, ${formValues.district}`,
    };
    dispatch(addLocation(data));
    setOpenModalAddAddress(false);
  }

  return (
    <>
      <div style={{ backgroundColor: "#F3F7F8", paddingBottom: "20px", height: "100%" }}>
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
              {props.payment.defaultLocationn == undefined ?
                <>
                  {props.payment.listLocation != null ?
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
                    :
                    <Grid container spacing={0}>
                      <Grid item sm={12} xs={12} md={12} lg={10} className={classes.center}>
                        Chưa có địa chỉ
                      </Grid>
                      <Grid item sm={12} xs={12} md={12} lg={2} style={{ textAlign: 'center' }}>
                        <Button
                          variant="contained"
                          component="span"
                          className={classes.btnSubmit}
                          onClick={() => setOpenModalAddAddress(true)}
                        >
                          thêm địa chỉ
                        </Button>
                      </Grid>
                    </Grid>
                  }
                </>
                : <>

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
                </>}

            </Grid>
          </div>

          <div className={classes.information}>
            <Grid container spacing={0}>
              <Grid item sm={6} xs={12} md={6}>
                <span className={classes.infor_text}>Món ăn</span>
              </Grid>
              <Grid item sm={2} xs={4} md={2} style={{ textAlign: 'center' }}>
                <span className={classes.infor_text} style={{ color: '#C1BBC1' }}>
                  Đơn giá
                </span>
              </Grid>
              <Grid item sm={2} xs={4} md={2} style={{ textAlign: 'center' }}>
                <span className={classes.infor_text} style={{ color: '#C1BBC1' }}>
                  Số lượng
                </span>
              </Grid>
              <Grid item sm={2} xs={4} md={2} style={{ textAlign: 'center' }}>
                <span className={classes.infor_text} style={{ color: '#C1BBC1' }}>
                  Thành tiền
                </span>
              </Grid>
            </Grid>
            <hr />

            <div>
              {payment2.length != 0 ? payment2.map((item, index) => {
                return (
                  <>
                    <div>
                      <Grid item sm={12} xs={12} md={12}>
                        <span className={classes.infor_text}>{item.storeId.name}</span>
                      </Grid>
                      {item.listFood.map(nestItem => {
                        return (
                          <Grid container spacing={0}>
                            <Grid item sm={6} xs={12} md={6}>
                              <span className={classes.infor_text} style={{ fontSize: "20px" }}>{nestItem.food.name}</span>
                            </Grid>
                            <Grid item sm={2} xs={4} md={2} style={{ textAlign: "center" }}>
                              <span className={classes.infor_text} style={{ fontSize: "20px" }}>{dollarUSLocale.format(nestItem.food.price)} VND</span>
                            </Grid>
                            <Grid item sm={2} xs={4} md={2} style={{ textAlign: "center" }}>
                              <span className={classes.infor_text} style={{ fontSize: "20px" }}>{nestItem.quantity}</span>
                            </Grid>
                            <Grid item sm={2} xs={4} md={2} style={{ textAlign: "center" }}>
                              <span className={classes.infor_text} style={{ fontSize: "20px" }}>{dollarUSLocale.format(parseInt(nestItem.food.price) * parseInt(nestItem.quantity))} VND</span>
                            </Grid>
                          </Grid>

                        )
                      })}
                    </div>
                    <Grid item md={12} sm={12} xs={12} className={classes.center} style={{ justifyContent: "right" }}>
                      <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-name-label">Voucher</InputLabel>
                        <Select
                          disabled={props.payment.qrcode != ""}
                          //labelId="demo-simple-select-label"
                          name={item.storeId.id}
                          //value={voucher}
                          //value=""
                          input={<OutlinedInput label="Voucher" />}
                          //multiple
                          placeholder="chọn voucher"
                          onChange={handleChangeVoucher}
                        >
                          <MenuItem value="0">Không sử dụng voucher</MenuItem>
                          {props.payment.listVoucher != [] ? props.payment.listVoucher.filter(voucher => voucher.store.id == item.storeId.id && voucher.active == true).map(nestItem =>
                          (
                            <MenuItem key={nestItem.id} value={nestItem}>Giảm {nestItem.percent}% tối thiểu {dollarUSLocale.format(nestItem.minPrice)}</MenuItem>
                          )
                          ) : <span>Không có voucher</span>}
                          {props.payment.listAllVoucher != [] ? props.payment.listAllVoucher.filter(voucher => voucher.store.id == item.storeId.id && voucher.active == true && voucher.quantity == -1).map(nestItem =>
                          (
                            <MenuItem key={nestItem.id} value={nestItem}>Giảm {nestItem.percent}% tối thiểu {dollarUSLocale.format(nestItem.minPrice)}</MenuItem>
                          )) : null}
                        </Select>
                      </FormControl>
                    </Grid>
                    <hr />
                  </>
                )
              }) : <span>Không có</span>}
              {/* {props.location.state.item.map((item, index) =>
              <div key={index}>
                <Grid item sm={12} xs={12} md={12}>
                  <span className={classes.infor_text}>{item.food.foodStore.name}</span>
                </Grid>
                <Grid container spacing={0}>
                  <Grid item sm={6} xs={12} md={6}>
                    <span className={classes.infor_text} style={{ fontSize: "20px" }}>{item.food.name}</span>
                  </Grid>
                  <Grid item sm={2} xs={4} md={2} style={{ textAlign: "center" }}>
                    <span className={classes.infor_text} style={{ fontSize: "20px" }}>{dollarUSLocale.format(item.food.price)} VND</span>
                  </Grid>
                  <Grid item sm={2} xs={4} md={2} style={{ textAlign: "center" }}>
                    <span className={classes.infor_text} style={{ fontSize: "20px" }}>{item.quantity}</span>
                  </Grid>
                  <Grid item sm={2} xs={4} md={2} style={{ textAlign: "center" }}>
                    <span className={classes.infor_text} style={{ fontSize: "20px" }}>{dollarUSLocale.format(parseInt(item.food.price) * parseInt(item.quantity))} VND</span>
                  </Grid>
                </Grid>
                <hr />
              </div>
            )} */}

            </div>

            <div>
              <Grid container spacing={0}>
                <Grid item sm={12} xs={12} md={4} className={classes.center}>
                  <p className={classes.infor_text}>
                    Phương thức thanh toán
                  </p>
                </Grid>
                <Grid item sm={12} xs={12} md={5}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Lựa chọn phương thức thanh toán
                    </InputLabel>
                    <Select
                      disabled={props.payment.qrcode != ""}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={paymentType}
                      label="Phương thức thanh toán"
                      onChange={handleChangePaymentType}
                    >
                      <MenuItem value="true">
                        Chuyển khoản
                      </MenuItem>
                      <MenuItem value="false">
                        Thanh toán khi nhận hàng
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <hr />
            </div>

            {/* <Grid container spacing={0}>
            <Grid item xs={12} md={6} sm={12}>
              <div style={{ margin: "0 auto" }}>
                {props.payment.qrcode != "" ?
                  <img src={props.payment.qrcode != "" ? props.payment.qrcode : null} />
                  : null}
              </div>
            </Grid>
          </Grid> */}


            <div>
              <p
                className={classes.font}
                style={{ textAlign: 'right', fontSize: '25px' }}
              >
                Tổng thanh toán: {dollarUSLocale.format(result)} VND
              </p>
              <p style={{ textAlign: 'right' }}>
                {/* {props.payment.qrcode != "" ?
                <Button
                  variant="contained"
                  component="span"
                  className={classes.btnSubmit}
                  onClick={handlePaymentSuccess}
                >
                  <span>Tôi đã thanh toán thành công</span>
                </Button>
                : null} */}
                {/* {props.payment.qrcode == "" ? */}
                < Button
                  variant="contained"
                  component="span"
                  className={classes.btnSubmit}
                  onClick={handlePayment}
                >
                  đặt hàng
                </Button>
                {/* : null} */}
              </p>
            </div>
          </div>
        </Container >


        <Modal
          open={openModalAddAddress}
          onClose={() => setOpenModalAddAddress(false)}
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
              Thêm địa chỉ
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Grid container spacing={0} style={{ padding: '20px' }}>
                <Grid
                  item
                  sm={12}
                  xs={12}
                  style={{ width: '100%', margin: '10px 0' }}
                >
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 0, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      disabled
                      id="outlined-textarea"
                      label="Huyện"
                      placeholder="Huyện"
                      onChange={handleChange}
                      name="district"
                      value={formValues.district}
                      helperText={
                        formErrors.district && formValues.district.length == ''
                          ? formErrors.district
                          : null
                      }
                      error={
                        formErrors.district != null &&
                        formValues.district.length == ''
                      }
                    />
                  </Box>
                </Grid>

                <Grid
                  item
                  sm={12}
                  xs={12}
                  style={{ width: '100%', margin: '10px 0' }}
                >
                  <div style={{ width: '100%' }}>
                    <Box
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Xã</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={type}
                          label="Xã"
                          onChange={handleChangeType}
                          MenuProps={MenuProps}
                        >
                          {props.payment.listWard.map((item, index) => (
                            <MenuItem key={index} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                </Grid>

                <Grid
                  item
                  sm="auto"
                  xs="auto"
                  style={{ width: '100%', margin: '10px 0' }}
                >
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 0, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-textarea"
                      label="Thôn"
                      placeholder="Thôn"
                      onChange={handleChange}
                      name="town"
                      value={formValues.town}
                      helperText={
                        formErrors.town && formValues.town.length == ''
                          ? formErrors.town
                          : null
                      }
                      error={formErrors.town != null && formValues.town == ''}
                    />
                  </Box>
                </Grid>

                <Grid
                  item
                  sm="auto"
                  xs="auto"
                  style={{ width: '100%', margin: '10px 0' }}
                >
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 0, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-textarea"
                      label="Địa chỉ"
                      placeholder="Địa chỉ"
                      onChange={handleChange}
                      name="address"
                      value={formValues.address}
                      helperText={
                        formErrors.address && formValues.address.length == ''
                          ? formErrors.address
                          : null
                      }
                      error={
                        formErrors.address != null && formValues.address == ''
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
            </Typography>
            <Button
              className={classes.btn}
              style={{ width: '50%' }}
              variant="contained"
              component="span"
              onClick={closeModalAddress}
            >
              Thêm
            </Button>
          </Box>
        </Modal>


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
              style={{ marginTop: '10px', fontSize: "20px", fontWeight: "600" }}
            >
              Thay đổi địa chỉ
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {props.payment.listLocation != null ? props.payment.listLocation.map((item) => {
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
                            <Button className={classes.btn} variant="outlined" onClick={() => handleChangeLocation(item.name, item.village, item.id)}>
                              Chọn
                            </Button>
                          </p>
                        </div>
                      </Grid>
                    </Grid>
                    <hr />
                  </div>
                )
              }) : null}

            </Typography>
          </Box>
        </Modal>

        <Snackbar
          open={openAlert}
          autoHideDuration={2000}
          anchorOrigin={{ vertical, horizontal }}
          onClose={handleCloseAlert}
        >
          {props.payment.message && props.payment.message.includes("500") || props.payment.message && props.payment.message.toLowerCase().includes("error") ?
            <Alert
              severity="error"
              onClose={handleCloseAlert}
              sx={{ width: '100%' }}
            >
              {props.payment.message}
            </Alert>
            :
            <Alert
              severity="success"
              onClose={handleCloseAlert}
              sx={{ width: '100%' }}
            >
              {props.payment.message}
            </Alert>
          }
        </Snackbar>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={props.payment.loading}
        >
          <Loading />
        </Backdrop>

      </div >
      <Footerr />
    </>
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
