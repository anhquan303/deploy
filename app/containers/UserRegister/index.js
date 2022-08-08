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
import Logo from '../../images/Happy_Delivery_Man_logo_cartoon_art_illustration.jpg';
import { reset, sendOTP, sendSMS, signUp, verifyPhoneee } from './actions';
import Loading from '../../components/Loading';

const useStyles = makeStyles(theme => ({
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: `url(${BackGround})`,
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
    width: 650,
    height: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    backgroundColor: '#fff',
    textAlign: 'center',
    borderRadius: '20px',
    padding: '10px',
  },
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
  const [verifyPhone, setVerifyPhone] = useState(true);
  const [checkVerifyPhone, setCheckVerifyPhone] = useState(false);

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
    if (!values.userName) {
      errors.userName = 'username is required!';
    }
    if (!values.password) {
      errors.password = 'password is required!';
    }
    if (!values.firstName) {
      errors.firstName = 'firstName is required!';
    }
    if (!values.lastName) {
      errors.lastName = 'lastName is required!';
    }
    if (!values.phone) {
      errors.phone = 'phone is required!';
    }
    if (!values.email) {
      errors.email = 'email is required!';
    }
    if (!values.passwordVerify) {
      errors.passwordVerify = 'passwordVerify is required!';
    }
    if (values.passwordVerify != values.password) {
      errors.passwordVerify1 = 'password does not match';
    }
    // if (!values.address) {
    //   errors.address = "address is required!";
    // }
    if (regexEmail.test(values.email) == false) {
      errors.email1 = 'ex: abc@smt.com';
    }
    if (regexPhone.test(values.phone) == false) {
      errors.phone1 = 'match 10 digits';
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

      // let newPhone = formValues.phone.substring(1);
      // newPhone = "+84".concat(newPhone);
      // const data1 = {
      //   phoneNumber: newPhone,
      //   message: `NO NÊ SUPPORT KÍNH CHÁO QUÝ KHÁCH HÀNG`
      // }
      // dispatch(sendSMS(data1))
    }
  }, [formErrors]);

  // close toast
  const handleCloseToast = () => {
    setOpen(false);
  };

  // redirect to login page
  useEffect(() => {
    if (props.userRegister.message != '') {
      setOpen(true);
      if (props.userRegister.message == "REGISTER SUCCESSFUL") {
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

  console.log(props.userRegister.message)
  // verify phone

  // check validate
  const handleVerifyPhone = e => {
    e.preventDefault();
    setFormErrorsPhone(validatePhone(formValues));
    setIsSubmitPhone(true);
  };
  console.log(props.userRegister.messageOTP)

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
                    multiline
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
                    multiline
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
                    multiline
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
                    multiline
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
                        : null
                    }
                    error={
                      formErrors.password != null &&
                      formValues.password.length == ''
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
            <FormGroup style={{ marginLeft: '10px' }}>
              <FormControlLabel
                className=""
                control={<Checkbox onChange={() => setAccept(!accept)} />}
                label="Tôi đồng ý với điều khoản dịch vụ và chính sách bảo mật"
              />
            </FormGroup>
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
            style={{ marginTop: '10px' }}
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
            <Button
              className={classes.btn}
              style={{ width: '50%' }}
              variant="contained"
              component="span"
              onClick={handleVerifyPhone}
            >
              Lấy mã
            </Button>
            :
            <Button
              className={classes.btn}
              style={{ width: '50%' }}
              variant="contained"
              component="span"
              onClick={verifyPhonee}
            >
              Xác thực số điện thoại
            </Button>}
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
