/**
 *
 * Login
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import './login.css';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Logo from '../../images/logoNone.png';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
//import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import GoogleLogin from 'react-google-login';
import { Link, useHistory } from 'react-router-dom';
import { login, reset } from './actions';
import { getToken, getUser, removeUserSession } from '../../utils/common';
import Snackbar from '@mui/material/Snackbar';
import BackGround from '../../images/dhfpt.png';
import { Grid, LinearProgress, Modal, Typography } from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundImage: `url('https://cafefcdn.com/2020/3/25/db4c1279-1585103343848695628731.jpg')`,
    backgroundSize: "cover",
  },
  container: {
    position: "relative",
    width: "fit-content",
    minHeight: "600px",
    //display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "30px",
    margin: "20px",
    borderRadius: "30px"
  },
  registerTag: {
    fontWeight: "600",
    fontSize: "2em",
    width: "100%",
    textAlign: "center",
    textTransform: "uppercase",
    color: "#20d167",
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
  topLogo: {
    margin: "0 auto",
    display: "flex",
    marginBottom: "20px"
  },
  remember: {
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontSize: "0.85rem",
    display: "flex",
  },
  btnSubmit: {
    position: 'relative',
    width: '60%',
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
  google: {
    margin: "10px 0",
    textAlign: "center",
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
    padding: "20px"
  },
  center: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
  },
}));


export function Login(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });

  const responseGoogle = (response) => {
    //setToken(response.tokenObj.id_token);
    //console.log('google', response.tokenObj.id_token)
  }

  const classes = useStyles();
  const initialValues = { userName: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("right");
  const [isSubmit, setIsSubmit] = useState(false);
  const [openModal, setOpenModal] = useState(false);


  //validate
  const HandleLogin = event => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

  }

  //login
  useEffect(() => {
    if (isSubmit) {
      const data = {
        username: formValues.userName,
        password: formValues.password
      }
      dispatch(login(data));
      //setOpen(true);
    }

  }, [formErrors])

  const user = getUser();

  //redirect follow role
  useEffect(() => {
    if (user != null) {
      if (user.status == "Approved") {
        if (user.authorities[0].authority != "ADMIN") {
          //props.history.push("/");
          setTimeout(() => props.history.push("/"), 1000);
        } else {
          //props.history.push("/dashboard");
          setTimeout(() => props.history.push("/dashboard"), 1000);
        }
      } else {
        setOpenModal(true);
      }
    }
  }, [props.login.message, user]);


  //set value for input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const validate = (values) => {
    const errors = {};
    if (!values.userName || values.userName.trim() === "") {
      errors.userName = "tài khoản không được để trống!";
    }
    if (!values.password) {
      errors.password = "mật khẩu không được để trống!";
    }
    return errors;
  }

  // //close toast
  // const handleCloseToast = () => {
  //   setOpen(false);
  // }

  const Alert = React.forwardRef(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseAlert = (event) => {
    setOpen(false);
  };


  useEffect(() => {
    if (props.login.message != "") {

      setTimeout(() => dispatch(reset()), 1000);
      setOpen(true);
    }
    if (props.login.message == "ACCOUNT HAS NOT BEEN ACTIVATED") {
      setOpenModal(true);
      setTimeout(() => dispatch(reset()), 1000);
    }

  }, [props.login.message]);


  useEffect(() => {
    setOpen(false);
    dispatch(reset());
  }, []);

  useEffect(() => {
    const keyDownHandler = event => {

      if (event.key === 'Enter') {
        event.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);

      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  const closeModal = () => {
    dispatch(reset());
    setOpenModal(false);
  };
  return (
    <div className={classes.body}>
      <div className={classes.container}>

        <div className={classes.top}>
          <div className={classes.topLogo}>
            <img src={Logo} alt="logo" className={classes.logo} />
            <h2 style={{ color: "#FD4444" }}>No <span>Nê</span></h2>
          </div>
        </div>
        <h3 className={classes.registerTag}>Đăng nhập</h3>

        {props.login.loading && props.login.loading == true ? (
          <div style={{ margin: '10px 0' }}>
            <LinearProgress />
          </div>
        ) : null}

        <form>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12} style={{ textAlign: "center" }}>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 0, width: '80%' },
                }}
                noValidate
                autoComplete="off"
              >

                <TextField
                  error={formErrors.userName != null && formValues.userName.length == "" || formErrors.userName != null && formErrors.userName.trim() == ""}
                  id="outlined-textarea"
                  label="Tài khoản"
                  placeholder="Tài khoản"
                  type="text"
                  name="userName"
                  value={formValues.userName}
                  // onChange={(e) => setUserName(e.target.value)}
                  onChange={handleChange}
                  helperText={formErrors.userName && formValues.userName.length == "" ? formErrors.userName : formValues.userName.trim() == "" ? formErrors.userName : null}
                />

              </Box>
            </Grid>
            <Grid item sm={12} xs={12} style={{ textAlign: "center" }}>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 0, width: '80%' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  error={formErrors.password != null && formValues.password.length == ""}
                  id="outlined-password-input"
                  label="Mật khẩu"
                  type="password"
                  autoComplete="current-password"
                  name="password"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  value={formValues.password}
                  onChange={handleChange}
                  helperText={formErrors.password && formValues.password.length == "" ? formErrors.password : null}
                />
              </Box>
            </Grid>
          </Grid>


          {/* <div style={{ marginLeft: "40px" }}>
            <FormGroup>
              <FormControlLabel className={classes.remember} control={<Checkbox defaultChecked />} label="Nhớ mật khẩu" />
            </FormGroup>
          </div> */}

          <div style={{ textAlign: "center" }}>
            <Button className={classes.btnSubmit} type="submit" variant="contained" component="span" onClick={HandleLogin}>
              ĐĂNG NHẬP
            </Button>
          </div>
        </form>

        {/* <div className={classes.google} >
          <GoogleLogin
            clientId="525769427042-2vrp9m5sfv6g8fb03fdl2dm1ddv1q03r.apps.googleusercontent.com"
            buttonText="Đăng nhập với gmail"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            //isSignedIn={true}
            style={{ width: "100%" }}
          />
        </div> */}
        <br />
        <div style={{ textAlign: "center" }}>
          <div><a href="/" style={{ textDecoration: "none" }}>Trở về trang chủ</a></div>
          <br />
          <div><span>Quên mật khẩu ? </span><a href="/forget-password" style={{ textDecoration: "none" }}>Lấy lại mật khẩu</a></div>
          <div><span>Chưa có tài khoản ? </span><a href="/userRegister" style={{ textDecoration: "none" }}>Đăng ký ngay</a></div>
        </div>



        {/* <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleCloseToast}
          message={props.login.message}
          autoHideDuration={5000}
        /> */}

        <Snackbar open={open} autoHideDuration={1000} anchorOrigin={{ vertical, horizontal }} onClose={handleCloseAlert}>
          {/* {props.userAddress.message.includes("FAILED") == false || props.userAddress.message.includes("Failed") == false || props.userAddress.message != "Network Error" ? */}
          {/* <Alert severity="success" onClose={handleCloseAlert} sx={{ width: '100%' }}>
            {props.login.message}
          </Alert> */}
          {props.login.message && props.login.message == "Sai tài khoản hoặc mật khẩu" ?
            <Alert severity="error" onClose={handleCloseAlert} sx={{ width: '100%' }}>
              {props.login.message}
            </Alert>
            :
            <Alert severity="success" onClose={handleCloseAlert} sx={{ width: '100%' }}>
              {props.login.message}
            </Alert>
          }
        </Snackbar>

      </div>

      <Modal
        open={openModal}
        // onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <CancelIcon
              style={{ width: '20%', height: '20%', color: '#fe0000' }}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: '40px' }}>
              Tài khoản của bạn tạm thời đã bị khóa
            </p>
          </Typography>
          <Button
            className={classes.btnAccept}
            style={{ width: '50%' }}
            variant="contained"
            component="span"
            onClick={closeModal}
          >
            XÁC NHẬN
          </Button>
        </Box>
      </Modal>
    </div >
  );
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
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
)(Login);
