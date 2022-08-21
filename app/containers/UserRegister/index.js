/**
 *
 * UserRegister
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
  Grid,
  Box,
  FormGroup,
  TextField,
  FormControlLabel,
  Checkbox,
  Stack,
  CircularProgress,
  Fade,
  LinearProgress,
  Backdrop,
  Modal,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { makeStyles, Container, Typography, Button } from '@material-ui/core';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from 'react-simple-captcha';
import makeSelectUserRegister from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import BackGround from '../../images/dhfpt.png';
import Logo from '../../images/logoNone.png';
import { reset, sendOTP, sendSMS, signUp, verifyEmail, verifyPhoneee } from './actions';
import Loading from '../../components/Loading';

const useStyles = makeStyles(theme => ({
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: `url('https://cafefcdn.com/2020/3/25/db4c1279-1585103343848695628731.jpg')`,
    backgroundSize: 'cover',
  },
  container: {
    position: 'relative',
    width: 'fit-content',
    minHeight: '600px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '30px',
    margin: '20px',
    borderRadius: '30px',
  },
  logo: {
    width: '6rem',
    height: '5rem',
  },
  top: {
    display: 'flex',
    margin: '0 auto',
    textAlign: 'center',
  },
  registerTag: {
    fontWeight: '600',
    fontSize: '2em',
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#20d167',
  },
  btnSubmit: {
    position: 'relative',
    width: '100%',
    borderRadius: '10px',
    backgroundColor: '#FD4444',
    color: "#fff",
    marginTop: '10px',
    '&:hover': {
      backgroundColor: '#FF1C1C',
      fontWeight: 'bold',
      color: '#fff',
    },
  },
  topLogo: {
    margin: '0 auto',
    display: 'flex',
    marginBottom: '20px',
  },
  center: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "40%",
    height: "fit-content",
    bgcolor: 'background.paper',
    p: 4,
    backgroundColor: '#fff',
    textAlign: 'center',
    borderRadius: '5px',
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    padding: '10px',
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    }
  },
  link: {
    textDecoration: "none",
    color: "#FD4444",
    '&:hover': {
      cursor: "pointer",
    },
  }
}));

export function UserRegister(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'userRegister', reducer });
  useInjectSaga({ key: 'userRegister', saga });

  const classes = useStyles();
  const initialValues = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    passwordVerify: '',
    captcha: '',
    otp: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [formErrorsPhone, setFormErrorsPhone] = useState({});
  const [accept, setAccept] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSubmitPhone, setIsSubmitPhone] = useState(false);
  const [vertical, setVertical] = useState('top');
  const [horizontal, setHorizontal] = useState('right');
  const [open, setOpen] = useState(false);
  const [openAlertOTP, setOpenAlertOTP] = useState(false);
  const [verifyPhone, setVerifyPhone] = useState(true);
  const [checkVerifyPhone, setCheckVerifyPhone] = useState(false);
  const [openDKDV, setOpenDKDV] = useState(false);
  const [openCSBM, setOpenCSBM] = useState(false);

  // set value for input
  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = values => {
    const errors = {};
    const regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    // const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const regexEmail = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;
    const regexPassword = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,15})$/;
    if (!values.userName) {
      errors.userName = 'tài khoản không được để trống!';
    }
    if (!values.password) {
      errors.password = 'mật khẩu không được để trống!';
    }

    if (!values.firstName) {
      errors.firstName = 'họ không được để trống!';
    }
    if (!values.lastName) {
      errors.lastName = 'tên không được để trống!';
    }
    if (!values.phone) {
      errors.phone = 'số điện thoại không được để trống!';
    }
    if (!values.email) {
      errors.email = 'email không được để trống!';
    }
    if (!values.passwordVerify) {
      errors.passwordVerify = 'xác nhận mật khẩu không được để trống!';
    }
    if (values.passwordVerify != values.password) {
      errors.passwordVerify1 = 'mật khẩu không giống';
    }
    // if (!values.address) {
    //   errors.address = "address is required!";
    // }
    if (regexEmail.test(values.email) == false) {
      errors.email1 = 'format: abc@smt.com';
    }
    if (regexPhone.test(values.phone) == false) {
      errors.phone1 = 'format: 10 số';
    }
    if (regexPassword.test(values.password) == false) {
      errors.password1 = 'mật khẩu yêu cầu mẫu có ít nhất một chữ số, một chữ hoa, một chữ thường và một ký hiệu đặc biệt';
    }
    // if (!values.captcha) {
    //   errors.captcha = 'captcha is required!';
    // }
    // if (validateCaptcha(values.captcha) == false) {
    //   errors.captcha1 = 'captcha does not match!';
    // }

    return errors;
  };



  // check validate
  const handleSignup = e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  // signup
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const data1 = {
        email: formValues.email
      }
      dispatch(verifyEmail(data1));

      // const data = {
      //   userName: formValues.userName,
      //   password: formValues.password,
      //   phone: formValues.phone,
      //   firstName: formValues.firstName,
      //   lastName: formValues.lastName,
      //   email: formValues.email,
      //   location: formValues.address,
      //   otp: formValues.otp
      // };
      // dispatch(signUp(data));

    }
  }, [formErrors]);

  useEffect(() => {
    if (props.userRegister.checkEmail != '') {
      if (props.userRegister.checkEmail == "DELIVERABLE") {
        const data = {
          userName: formValues.userName,
          password: formValues.password,
          phone: formValues.phone,
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
          location: formValues.address,
          otp: formValues.otp
        };
        dispatch(signUp(data));
      }
    }

  }, [props.userRegister.checkEmail]);


  // redirect to login page
  useEffect(() => {
    if (props.userRegister.message != '') {
      setOpen(true);
      if (props.userRegister.message == "REGISTER SUCCESSFUL !") {
        setTimeout(() => {
          props.history.push('/login');
        }, 2000);
      }
      // if (props.userRegister.messageOTP == "WE ALREADY SEND VERIFICATION CODE TO YOUR PHONE") {
      //   setCheckVerifyPhone(true);
      // }
      setTimeout(() => {
        dispatch(reset());
      }, 2000);
    }
  }, [props.userRegister.message]);

  useEffect(() => {
    if (props.userRegister.messageOTP != '') {
      setOpenAlertOTP(true);
      if (props.userRegister.messageOTP == "WE ALREADY SEND VERIFICATION CODE TO YOUR PHONE") {

        setCheckVerifyPhone(true);
        setTimeout(() => {
          dispatch(reset());
        }, 2000);
      }
      if (props.userRegister.messageOTP == "SUCCESSFUL") {
        setVerifyPhone(false);
        setTimeout(() => {
          dispatch(reset());
        }, 2000);
      }

      setTimeout(() => {
        dispatch(reset());
      }, 2000);
    }
  }, [props.userRegister.messageOTP])

  useEffect(() => {
    setCheckVerifyPhone(false);
    dispatch(reset());
  }, [])

  // useEffect(() => {
  //   loadCaptchaEnginge(8);
  // }, []);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseAlert = event => {
    setOpen(false);
  };

  const handleCloseAlertOTP = event => {
    setOpenAlertOTP(false);
  };
  // verify phone

  // check validate
  const handleVerifyPhone = e => {
    e.preventDefault();
    setFormErrorsPhone(validatePhone(formValues));
    setIsSubmitPhone(true);
  };

  const validatePhone = values => {
    const errors = {};
    const regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!values.phone) {
      errors.phone = 'phone is required!';
    }
    if (regexPhone.test(values.phone) == false) {
      errors.phone1 = 'match 10 digits';
    }
    // if (!values.otp) {
    //   errors.otp = 'otp is required!';
    // }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrorsPhone).length === 0 && isSubmitPhone) {
      let newPhone = formValues.phone.substring(1);
      newPhone = "+84".concat(newPhone);
      const data = {
        phoneNumber: newPhone,
        message: "NO NÊ SUPPORT KÍNH CHÁO QUÝ KHÁCH HÀNG. ĐÂY LÀ MÃ XÁC NHẬN CỦA QUÝ KHÁCH: "
      }
      dispatch(sendOTP(data));

    }
  }, [formErrorsPhone]);

  const verifyPhonee = () => {
    const data = {
      phone: formValues.phone,
      otp: formValues.otp
    }
    dispatch(verifyPhoneee(data));
  }

  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <form className="">
          <div className={classes.top}>
            <div className={classes.topLogo}>
              <img src={Logo} alt="logo" className={classes.logo} />
              <h2>
                No <span>Nê</span>
              </h2>
            </div>
          </div>
          <h3 className={classes.registerTag}>Đăng ký</h3>

          {props.userRegister.loading && props.userRegister.loading == true ? (
            <div style={{ margin: '10px 0' }}>
              <LinearProgress />
            </div>
          ) : null}

          {/* <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ height: 40 }}>
              <Fade
                in={loading}
                style={{
                  transitionDelay: loading ? '800ms' : '0ms',
                }}
                unmountOnExit
              >

              </Fade>
            </Box>
          </Box> */}
          <div>
            <Grid container spacing={2}>
              <Grid item sm={3} xs={12}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-textarea1"
                    label="Họ"
                    placeholder="Họ"
                    name="firstName"
                    onChange={handleChange}
                    helperText={
                      formErrors.firstName && formValues.firstName.length == ''
                        ? formErrors.firstName
                        : null
                    }
                    error={
                      formErrors.firstName != null &&
                      formValues.firstName.length == ''
                    }
                  />
                </Box>
              </Grid>
              <Grid item sm={3} xs={12}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-textareaaa"
                    label="Tên"
                    placeholder="Tên"
                    name="lastName"
                    onChange={handleChange}
                    helperText={
                      formErrors.lastName && formValues.lastName.length == ''
                        ? formErrors.lastName
                        : null
                    }
                    error={
                      formErrors.lastName != null &&
                      formValues.lastName.length == ''
                    }
                  />
                </Box>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-textarea2"
                    label="Email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    helperText={
                      formErrors.email && formValues.email.length == ''
                        ? formErrors.email
                        : formErrors.email1
                          ? formErrors.email1
                          : null
                    }
                    error={
                      formErrors.email != null && formValues.email.length == ''
                        ? true
                        : formErrors.email1 != null
                    }
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    disabled
                    id="outlined-textarea4"
                    label="Số điện thoại"
                    placeholder="Số điện thoại"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                    helperText={
                      formErrors.phone != null && formValues.phone.length == ''
                        ? formErrors.phone
                        : formErrors.phone1 != null
                          ? formErrors.phone1
                          : null
                    }
                    error={
                      formErrors.phone != null && formValues.phone.length == ''
                        ? true
                        : formErrors.phone1 != null
                    }
                  />
                </Box>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-textarea3"
                    label="Tên tài khoản"
                    placeholder="Tên tài khoản"
                    name="userName"
                    onChange={handleChange}
                    helperText={
                      formErrors.userName && formValues.userName.length == ''
                        ? formErrors.userName
                        : null
                    }
                    error={
                      formErrors.userName != null &&
                      formValues.userName.length == ''
                    }
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-password-input2"
                    label="Mật khẩu"
                    type="password"
                    autoComplete="current-password"
                    name="password"
                    onChange={handleChange}
                    helperText={
                      formErrors.password && formValues.password.length == ''
                        ? formErrors.password
                        : formErrors.password1
                          ? formErrors.password1
                          : null
                    }
                    error={
                      formErrors.password != null && formValues.password.length == ''
                        ? true
                        : formErrors.password1 != null
                    }
                  />
                </Box>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-password-input"
                    label="Xác nhận mật khẩu"
                    type="password"
                    autoComplete="current-password"
                    name="passwordVerify"
                    onChange={handleChange}
                    helperText={
                      formErrors.passwordVerify &&
                        formValues.passwordVerify.length == ''
                        ? formErrors.passwordVerify
                        : formErrors.passwordVerify1
                          ? formErrors.passwordVerify1
                          : null
                    }
                    error={
                      formErrors.passwordVerify != null &&
                        formValues.passwordVerify.length == ''
                        ? true
                        : formErrors.passwordVerify1 != null
                    }
                  />
                </Box>
              </Grid>
            </Grid>

            {/* <Grid container spacing={2}>
              <Grid item sm={6} xs={12} style={{ textAlign: 'center' }}>
                <LoadCanvasTemplate />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-textarea7"
                    label="Captcha"
                    placeholder="Captcha"
                    multiline
                    name="captcha"
                    onChange={handleChange}
                    helperText={
                      formErrors.captcha && formValues.captcha.length == ''
                        ? formErrors.captcha
                        : formErrors.captcha1
                          ? formErrors.captcha1
                          : null
                    }
                    error={
                      formErrors.captcha != null &&
                        formValues.captcha.length == ''
                        ? true
                        : formErrors.captcha1 != null
                    }
                  />
                </Box>
              </Grid>
            </Grid> */}

            {/* <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-textarea5"
                    label="Địa chỉ"
                    placeholder="Địa chỉ"
                    multiline
                    name="address"
                    onChange={handleChange}
                    helperText={formErrors.address && formValues.address.length == "" ? formErrors.address : null}
                    error={formErrors.address != null && formValues.address.length == ""}
                  />
                </Box> */}
          </div>
          <label>
            {/* <FormGroup style={{ marginLeft: '10px' }}>
              <FormControlLabel
                className=""
                control={<Checkbox onChange={() => setAccept(!accept)} />}
                label="Tôi đồng ý với điều khoản dịch vụ và chính sách bảo mật"
              >sdsadsa</FormControlLabel>
            </FormGroup> */}

            <input
              type="checkbox"
              className="custom-control-input"
              id="123"
              onChange={() => setAccept(!accept)}
              style={{ marginLeft: '10px' }}
            />
            <label
              className="custom-control-label"
              style={{ fontFamily: "sans-serif", marginLeft: "15px", fontSize: "20px" }}
            >
              Tôi đồng ý với <a className={classes.link} onClick={() => setOpenDKDV(true)}>điều khoản dịch vụ</a> và <a className={classes.link} onClick={() => setOpenCSBM(true)}>chính sách bảo mật</a>
            </label>
          </label>
          <Button
            disabled={accept == false}
            type="submit"
            className={classes.btnSubmit}
            variant="contained"
            component="span"
            onClick={handleSignup}
          >
            ĐĂNG KÝ
          </Button>
        </form>
        {/* <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleCloseToast}
          message={props.userRegister.message}
          autoHideDuration={5000}
        /> */}
        <Snackbar
          open={open}
          autoHideDuration={2000}
          anchorOrigin={{ vertical, horizontal }}
          onClose={handleCloseAlert}
        >
          <Alert
            severity="success"
            onClose={handleCloseAlert}
            sx={{ width: '100%' }}
          >
            {props.userRegister.message}
          </Alert>
        </Snackbar>

        <Snackbar
          open={openAlertOTP}
          autoHideDuration={2000}
          anchorOrigin={{ vertical, horizontal }}
          onClose={handleCloseAlertOTP}
        >

          <Alert
            severity="success"
            onClose={handleCloseAlertOTP}
            sx={{ width: '100%' }}
          >
            {props.userRegister.messageOTP}
          </Alert>
        </Snackbar>
      </div>

      <Modal
        open={verifyPhone}
        //onClose={() => setVerifyPhone(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginTop: '10px', fontSize: "35px" }}
          >
            Xác thực số điện thoại
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
                    disabled={checkVerifyPhone == true}
                    id="outlined-textareaa"
                    label="Số điện thoại"
                    placeholder="Số điện thoại"
                    onChange={handleChange}
                    name="phone"
                    helperText={
                      formErrorsPhone.phone != null && formValues.phone.length == ''
                        ? formErrorsPhone.phone
                        : formErrorsPhone.phone1 != null
                          ? formErrorsPhone.phone1
                          : null
                    }
                    error={
                      formErrorsPhone.phone != null && formValues.phone.length == ''
                        ? true
                        : formErrorsPhone.phone1 != null
                    }
                  />
                </Box>
              </Grid>

              {checkVerifyPhone == true ?
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

                      id="outlined-textareaa"
                      label="Nhập mã xác thực"
                      placeholder="Nhập mã xác thực"
                      onChange={handleChange}
                      name="otp"
                    // helperText={
                    //   formErrors.otp && formValues.otp.length == ''
                    //     ? formErrors.otp
                    //     : null
                    // }
                    // error={
                    //   formErrors.otp != null &&
                    //   formValues.otp.length == ''
                    // }
                    />
                  </Box>
                </Grid>
                : null}
            </Grid>
          </Typography>
          {checkVerifyPhone == false ?
            <>
              <Button
                className={classes.btnSubmit}
                style={{ width: '50%' }}
                variant="contained"
                component="span"
                onClick={handleVerifyPhone}
              >
                Lấy mã
              </Button>
              <div style={{ padding: "20px" }}><a href="/" style={{ textDecoration: "none" }}>Trở về trang chủ</a></div>
            </>
            :
            <>
              <Button
                className={classes.btnSubmit}
                style={{ width: '50%' }}
                variant="contained"
                component="span"
                onClick={verifyPhonee}
              >
                Xác thực số điện thoại
              </Button>
              <div style={{ padding: "20px" }}><a href="/" style={{ textDecoration: "none" }}>Trở về trang chủ</a></div>
            </>
          }
        </Box>
      </Modal>

      <Modal
        open={openDKDV}
        onClose={() => setOpenDKDV(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box className={classes.modal} style={{ overflowY: "auto", height: "80%", alignContent: "center" }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginTop: '10px', fontSize: "35px", textTransform: "uppercase" }}
          >
            Điều khoản dịch vụ
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h3 style={{ color: "#FD4444" }}>GIỚI THIỆU</h3>
            <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
              Chào mừng bạn đến với hệ thống mua bán đồ ăn No Nê. Trước khi sử dụng hệ thống No Nê hoặc tạo tài khoản No Nê,
              vui lòng đọc kỹ các Điều Khoản Dịch Vụ dưới đây và Quy Chế Hoạt Động hệ thống mua bán đồ ăn No Nê để hiểu rõ quyền lợi và nghĩa
              vụ hợp pháp của mình.
            </p>
            <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
              Dịch Vụ bao gồm dịch vụ sàn giao dịch trực tuyến kết nối người tiêu dùng với nhau nhằm mang đến cơ hội kinh doanh giữa người mua
              (“Người Mua”) và người bán (“Người Bán”). Hợp đồng mua bán thật sự là trực tiếp
              giữa Người Mua và Người Bán. Các Bên liên quan đến giao dịch đó sẽ chịu trách nhiệm đối với hợp đồng mua bán giữa họ, việc đăng bán hàng
              hóa và tương tự. No Nê không can thiệp vào giao dịch giữa các Người Sử Dụng. No Nê có thể hoặc không sàng lọc trước
              Người Sử Dụng hoặc Nội Dung hoặc thông tin cung cấp bởi Người Sử Dụng. No Nê bảo lưu quyền loại bỏ bất cứ Nội Dung hoặc thông tin nào không phù hợp hoặc sai tiêu chí.
              No Nê không bảo đảm cho việc các Người Sử Dụng sẽ thực tế hoàn thành giao dịch. Lưu ý, No Nê sẽ là bên
              trung gian quản lý tình trạng hàng hóa và mua bán giữa Người Mua và Người Bán, trừ khi Người Mua và Người Bán
              thể hiện mong muốn tự giao dịch với nhau một cách rõ ràng.
            </p>
            <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
              No Nê bảo lưu quyền từ chối yêu cầu mở Tài Khoản hoặc các truy cập của bạn tới Trang Shopee hoặc Dịch Vụ theo quy định pháp luật và Điều khoản dịch vụ.
            </p>

            <h3 style={{ color: "#FD4444" }}>QUYỀN RIÊNG TƯ</h3>
            <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
              Cho phép No Nê thu thập, sử dụng, công bố và/hoặc xử lý các Nội Dung, dữ liệu cá nhân của bạn và Thông Tin Người Sử Dụng như được quy định trong Chính Sách Bảo Mật.
            </p>
            <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
              Không tiết lộ các Thông Tin Người Sử Dụng cho bất kỳ bên thứ ba nào, hoặc bằng bất kỳ phương thức nào cho phép bất kỳ bên thứ ba nào
              được truy cập hoặc sử dụng Thông Tin Người Dùng.
            </p>

            <h3 style={{ color: "#FD4444" }}>ĐIỀU KHOẢN SỬ DỤNG</h3>
            <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
              Người Sử Dụng không được phép:
            </p>
            <ul>
              <li>
                <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                  tải lên, đăng, truyền tải hoặc bằng cách khác công khai bất cứ Nội Dung nào trái pháp luật, có hại, đe dọa, lạm dụng, quấy rối, gây hoang mang,
                  lo lắng, xuyên tạc, phỉ báng, xúc phạm, khiêu dâm, bôi nhọ, xâm phạm quyền riêng tư của người khác, gây căm phẫn, hoặc phân biệt chủng tộc, dân tộc
                  hoặc bất kỳ nội dung không đúng đắn nào khác
                </p>
                <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                  đăng tải, truyền tin, hoặc bằng bất kỳ hình thức nào khác hiển thị bất kỳ Nội dung nào có sự xuất hiện của người chưa thành niên hoặc sử dụng Dịch vụ
                  gây tổn hại cho người chưa thành niên dưới bất kỳ hình thức nào
                </p>
                <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                  khai thác hoặc thu thập bất kỳ thông tin nào liên quan đến Tài Khoản của Người  Sử Dụng khác, bao gồm bất kỳ thông tin hoặc dữ liệu cá nhân nào
                </p>
              </li>
            </ul>

            <h3 style={{ color: "#FD4444" }}>VI PHẠM ĐIỀU KHOẢN DỊCH VỤ</h3>
            <p style={{ fontFamily: "sans-serif", textAlign: "left" }}> Việc vi phạm chính sách này có thể dẫn tới một số hành động, bao gồm bất kỳ hoặc tất cả các hành động sau:</p>
            <ul>
              <li>
                <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                  Xóa danh mục sản phẩm
                </p>
              </li>
              <li>
                <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                  Chấm dứt Tài Khoản
                </p>
              </li>
            </ul>

            <h3 style={{ color: "#FD4444" }}>HỦY ĐƠN HÀNG, TRẢ HÀNG VÀ HOÀN TIỀN</h3>
            <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
              Người Mua chỉ có thể hủy đơn hàng trước khi cửa hàng xác nhận đơn hàng.
            </p>
            <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
              No Nê không quản lý việc hủy đơn hàng, hoàn tiền của các đơn hàng tự giao dịch giữa Người Bán và Người Mua.
            </p>

            <h3 style={{ color: "#FD4444" }}>TRÁCH NHIỆM CỦA NGƯỜI BÁN</h3>
            <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
              Người Bán phải quản lý và đảm bảo độ chính xác và đầy đủ của các thông tin chẳng hạn liên quan đến giá cả và
              chi tiết sản phẩm, số lượng sản phẩm và không được phép đăng tải các thông tin không chính xác hoặc gây nhầm lẫn.
            </p>
            <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
              Giá sản phẩm được Người Bán toàn quyền quyết định. Giá
              sản phẩm nên bao gồm toàn bộ số tiền mà Người Mua cần thanh toán (ví dụ: các loại thuế, phí, v.v.) và Người Bán sẽ
              không yêu cầu Người Mua thanh toán thêm hoặc riêng bất kỳ khoản tiền nào khác. Nếu thông tin giá hàng hóa hoặc dịch
              vụ niêm yết không thể hiện rõ giá đó đã bao gồm hay chưa bao gồm những chi phí liên quan đến việc mua hàng hóa hoặc
              dịch vụ như thuế, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác thì giá này được hiểu là đã bao gồm mọi
              chi phí liên quan nói trên.
            </p>
          </Typography>

        </Box>
      </Modal>

      <Modal
        open={openCSBM}
        onClose={() => setOpenCSBM(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box className={classes.modal} style={{ overflowY: "auto", height: "80%", alignContent: "center" }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginTop: '10px', fontSize: "35px", textTransform: "uppercase" }}
          >
            Chính sách bảo mật
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h3 style={{ color: "#FD4444" }}>KHI NÀO NO NÊ SẼ THU THẬP DỮ LIỆU CÁ NHÂN</h3>
            <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
              Chúng tôi sẽ/có thể thu thập dữ liệu cá nhân về bạn:
            </p>
            <ul>
              <li>
                <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                  khi bạn đăng ký và/hoặc sử dụng Các Dịch Vụ hoặc Nền tảng của chúng tôi, hoặc mở một tài khoản với chúng tôi
                </p>
              </li>
              <li>
                <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                  khi bạn thực hiện các giao dịch thông qua Dịch vụ của chúng tôi
                </p>
              </li>
              <li>
                <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                  khi bạn cung cấp ý kiến phản hồi hoặc gửi khiếu nại cho chúng tôi
                </p>
              </li>
            </ul>

            <h3 style={{ color: "#FD4444" }}>NO NÊ SẼ THU THẬP NHỮNG DỮ LIỆU GÌ</h3>
            <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
              Dữ liệu cá nhân mà No Nê có thể thu thập bao gồm:
            </p>
            <ul>
              <li>
                <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                  họ tên
                </p>
              </li>
              <li>
                <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                  địa chỉ email
                </p>
              </li>
              <li>
                <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                  ngày sinh
                </p>
              </li>
              <li>
                <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                  tài khoản ngân hàng
                </p>
              </li>
              <li>
                <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                  địa chỉ giao nhận hàng hóa
                </p>
              </li>
              <li>
                <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                  số điện thoại
                </p>
              </li>
              <li>
                <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                  giới tính
                </p>
              </li>
              <li>
                <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                  thông tin sử dụng và giao dịch, bao gồm chi tiết về lịch sử tìm kiếm, giao dịch, quảng cáo và nội dung hiển thị mà tương tác với Nền Tảng, cũng như các sản phẩm và dịch vụ có liên quan của bạn
                </p>
              </li>
              <li>
                <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                  dữ liệu tổng hợp về nội dung người dùng sử dụng.
                </p>
              </li>
            </ul>

            <h3 style={{ color: "#FD4444" }}>CHÚNG TÔI SỬ DỤNG THÔNG TIN BẠN CUNG CẤP CHO CHÚNG TÔI NHƯ THẾ NÀO</h3>
            <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
              Chúng tôi có thể thu thập, sử dụng, tiết lộ và/hoặc xử lý dữ liệu cá nhân của bạn cho các mục đích sau đây:
            </p>
            <ul>
              <li>
                <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                  để xem xét và/hoặc xử lý đơn đăng ký/giao dịch của bạn với chúng tôi hoặc giao dịch hay báo cáo của bạn
                </p>
              </li>
              <li>
                <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                  để thực thi các Điều Khoản Dịch Vụ của chúng tôi hoặc bất kỳ thỏa thuận giấy phép người dùng cuối nào áp dụng
                </p>
              </li>
              <li>
                <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                  để phục vụ mục đích nhận dạng, xác minh, đánh giá pháp lý hoặc để nhận biết khách hàng
                </p>
              </li>
              <li>
                <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                  để lập số liệu thống kê và nghiên cứu đáp ứng yêu cầu báo cáo
                </p>
              </li>
            </ul>


          </Typography>

        </Box>
      </Modal>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.userRegister.loading}
      >
        {/* <CircularProgress color="inherit" /> */}
        <Loading />
      </Backdrop>
    </div>
  );
}

UserRegister.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userRegister: makeSelectUserRegister(),
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
)(UserRegister);
