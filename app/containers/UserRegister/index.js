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
import makeSelectUserRegister from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import BackGround from '../../images/dhfpt.png';
import Logo from '../../images/Happy_Delivery_Man_logo_cartoon_art_illustration.jpg';
import { Grid, Box, FormGroup, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { signUp } from './actions';
import Snackbar from '@mui/material/Snackbar';
import { makeStyles, Container, Typography, Button } from '@material-ui/core';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha
} from "react-simple-captcha";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundImage: `url(${BackGround})`,
    backgroundSize: "cover",

  },
  container: {
    position: "relative",
    width: "fit-content",
    minHeight: "600px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "30px",
    margin: "20px",
    borderRadius: "30px"
  },
  logo: {
    width: "6rem",
    height: "5rem",
  },
  top: {
    display: "flex",
    margin: "0 auto",
    textAlign: "center"
  },
  registerTag: {
    fontWeight: "600",
    fontSize: "2em",
    width: "100%",
    textAlign: "center",
    textTransform: "uppercase",
    color: "#20d167",
  },
  btnSubmit: {
    position: "relative",
    width: "100%",
    borderRadius: "10px",
    backgroundColor: "#ff9900",
    marginTop: "10px",
    "&:hover": {
      backgroundColor: "orange",
      fontWeight: "bold",
      color: "#000",
    }
  },
  topLogo: {
    margin: "0 auto",
    display: "flex",
    marginBottom: "20px"
  }

}));


export function UserRegister(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'userRegister', reducer });
  useInjectSaga({ key: 'userRegister', saga });

  const classes = useStyles();
  const initialValues = { userName: "", password: "", firstName: "", lastName: "", phone: "", email: "", passwordVerify: "", captcha: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [accept, setAccept] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("right");
  const [open, setOpen] = useState(false);

  //set value for input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const validate = (values) => {
    const errors = {};
    const regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    //const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const regexEmail = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;
    if (!values.userName) {
      errors.userName = "username is required!";
    }
    if (!values.password) {
      errors.password = "password is required!";
    }
    if (!values.firstName) {
      errors.firstName = "firstName is required!";
    }
    if (!values.lastName) {
      errors.lastName = "lastName is required!";
    }
    if (!values.phone) {
      errors.phone = "phone is required!";
    }
    if (!values.email) {
      errors.email = "email is required!";
    }
    if (!values.passwordVerify) {
      errors.passwordVerify = "passwordVerify is required!";
    }
    if (values.passwordVerify != values.password) {
      errors.passwordVerify1 = "password does not match";
    }
    // if (!values.address) {
    //   errors.address = "address is required!";
    // }
    if (regexEmail.test(values.email) == false) {
      errors.email1 = "ex: abc@smt.com";
    }
    if (regexPhone.test(values.phone) == false) {
      errors.phone1 = "match 10 digits";
    }
    if (!values.captcha) {
      errors.captcha = "captcha is required!";
    }
    if (validateCaptcha(values.captcha) == false) {
      errors.captcha1 = "captcha does not match!";
    }


    return errors;
  }


  //check validate
  const handleSignup = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }

  //signup
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
      }
      dispatch(signUp(data))
      setOpen(true);
    }

  }, [formErrors]);

  //close toast
  const handleCloseToast = () => {
    setOpen(false);
  }

  //redirect to login page
  useEffect(() => {
    if (props.userRegister.message.includes('SUCCESS')) {
      props.history.push("/login");
    }
  }, [props.userRegister.message]);

  useEffect(() => {
    loadCaptchaEnginge(8);
  }, []);


  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <form className="">
          <div className={classes.top}>
            <div className={classes.topLogo}>
              <img src={Logo} alt="logo" className={classes.logo} />
              <h2>No <span>Nê</span></h2>
            </div>
          </div>
          <h3 className={classes.registerTag}>Đăng ký</h3>
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
                    helperText={formErrors.firstName && formValues.firstName.length == "" ? formErrors.firstName : null}
                    error={formErrors.firstName != null && formValues.firstName.length == ""}
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
                    id="outlined-textarea1"
                    label="Tên"
                    placeholder="Tên"
                    multiline
                    name="lastName"
                    onChange={handleChange}
                    helperText={formErrors.lastName && formValues.lastName.length == "" ? formErrors.lastName : null}
                    error={formErrors.lastName != null && formValues.lastName.length == ""}
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
                    helperText={formErrors.email && formValues.email.length == "" ? formErrors.email : formErrors.email1 ? formErrors.email1 : null}
                    error={formErrors.email != null && formValues.email.length == "" ? true : formErrors.email1 != null ? true : false}
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
                    id="outlined-textarea4"
                    label="Số điện thoại"
                    placeholder="Số điện thoại"
                    multiline
                    name="phone"
                    onChange={handleChange}
                    helperText={formErrors.phone != null && formValues.phone.length == "" ? formErrors.phone : formErrors.phone1 != null ? formErrors.phone1 : null}
                    error={formErrors.phone != null && formValues.phone.length == "" ? true : formErrors.phone1 != null ? true : false}
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
                    helperText={formErrors.userName && formValues.userName.length == "" ? formErrors.userName : null}
                    error={formErrors.userName != null && formValues.userName.length == ""}
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
                    helperText={formErrors.password && formValues.password.length == "" ? formErrors.password : null}
                    error={formErrors.password != null && formValues.password.length == ""}
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
                    helperText={formErrors.passwordVerify && formValues.passwordVerify.length == "" ? formErrors.passwordVerify : formErrors.passwordVerify1 ? formErrors.passwordVerify1 : null}
                    error={formErrors.passwordVerify != null && formValues.passwordVerify.length == "" ? true : formErrors.passwordVerify1 != null ? true : false}
                  />
                </Box>
              </Grid>
            </Grid>


            <Grid container spacing={2}>
              <Grid item sm={6} xs={12} style={{ textAlign: "center" }}>
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
                    helperText={formErrors.captcha && formValues.captcha.length == "" ? formErrors.captcha : formErrors.captcha1 ? formErrors.captcha1 : null}
                    error={formErrors.captcha != null && formValues.captcha.length == "" ? true : formErrors.captcha1 != null ? true : false}
                  />
                </Box>
              </Grid>
            </Grid>


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
          <label >
            <FormGroup style={{ marginLeft: "10px" }}>
              <FormControlLabel className="" control={<Checkbox onChange={() => setAccept(!accept)} />} label="Tôi đồng ý với điều khoản dịch vụ và chính sách bảo mật" />
            </FormGroup>
          </label>
          <Button disabled={accept == false} type="submit" className={classes.btnSubmit} variant="contained" component="span" onClick={handleSignup}>
            ĐĂNG KÝ
          </Button>
        </form>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleCloseToast}
          message={props.userRegister.message}
          autoHideDuration={5000}
        />
      </div>
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
