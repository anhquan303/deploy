/**
 *
 * UserForgetPassword
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
  Modal,
  LinearProgress
} from '@mui/material';
import { makeStyles, Container, Typography, Button } from '@material-ui/core';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from 'react-simple-captcha';
import { useHistory } from 'react-router-dom';
import makeSelectUserForgetPassword from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BackGround from '../../images/dhfpt.png';
import Logo from '../../images/logoNone.png';
import { forgetPassword, reset, verifyEmail } from './actions';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

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
    height: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '40px 50px',
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
    width: 'fit-content',
    borderRadius: '10px',
    backgroundColor: '#FD4444',
    marginTop: '10px',
    color: '#fff',
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
  },
  btnAccept: {
    position: 'relative',
    width: '100%',
    borderRadius: '10px',
    backgroundColor: '#ff9900',
    margin: '10px 0',
    '&:hover': {
      backgroundColor: '#FFA500',
      fontWeight: 'bold',
      color: '#000',
      boxShadow: '2rem 2rem 3rem rgba(132, 139, 200, 0.18)',
    },
  },
}));

export function UserForgetPassword(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'userForgetPassword', reducer });
  useInjectSaga({ key: 'userForgetPassword', saga });

  const classes = useStyles();
  const initialValues = { email: '', captcha: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [openAlert, setOpenAlert] = useState(false);
  const [vertical, setVertical] = useState('top');
  const [horizontal, setHorizontal] = useState('right');

  // set value for input
  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // useEffect(() => {
  //   loadCaptchaEnginge(6);
  // }, []);

  const validate = values => {
    const regexEmail = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;
    const regexPhone = /^[0-9]{10}$/;
    const errors = {};
    if (!values.email) {
      errors.email = 'không được bỏ trống!';
    }
    // if (regexEmail.test(values.email) == false) {
    //   errors.email1 = 'ex: abc@smt.com';
    // } else if (regexPhone.test(values.email) == false) {
    //   errors.email1 = '10 số';
    // }
    if (isNaN(values.email) == true) {
      if (regexEmail.test(values.email) == false) {
        errors.email1 = 'format: abc@smt.com';
      }
    } else {
      if (regexPhone.test(values.email) == false) {
        errors.email1 = 'format: 10 số';
      }
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
  const handlesubmit = e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  // submit
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      if (isNaN(formValues.email) == true) {
        const data = {
          email: formValues.email,
        };
        dispatch(verifyEmail(data));
        //dispatch(forgetPassword(data));
      } else {
        let newPhone = formValues.email.substring(1);
        newPhone = "+84".concat(newPhone);
        const data = {
          inputProvider: newPhone,
        };
        dispatch(forgetPassword(data));
      }

      // setOpen(true);
    }
  }, [formErrors]);

  const closeModal = () => {
    dispatch(reset());
    setOpen(false);
    history.push('/reset-password');
  };

  useEffect(() => {
    if (props.userForgetPassword.message != '') {
      if (props.userForgetPassword.message == "Không tìm thấy số điện thoại!") {
        setOpenAlert(true);
        setTimeout(() => {
          dispatch(reset());
        }, 3000);
      } else {
        setOpen(true);
      }
      //setOpen(true);
    }
  }, [props.userForgetPassword.message]);


  useEffect(() => {
    if (props.userForgetPassword.checkEmail != "") {
      setOpenAlert(true);
      if (props.userForgetPassword.checkEmail != 'Không tìm thấy địa chỉ email') {
        const data = {
          inputProvider: formValues.email,
        };
        dispatch(forgetPassword(data));

        setTimeout(() => {
          dispatch(reset());
        }, 3000);
      }
    }

  }, [props.userForgetPassword.checkEmail]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseAlert = event => {
    setOpenAlert(false);
  };

  useEffect(() => {
    dispatch(reset())
  }, [])

  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <form className="">
          <div className={classes.top}>
            <div className={classes.topLogo}>
              <img src={Logo} alt="logo" className={classes.logo} />
              <h2 style={{ color: "#FD4444" }}>
                No <span>Nê</span>
              </h2>
            </div>
          </div>
          <h3 className={classes.registerTag}>Quên Mật Khẩu</h3>

          {props.userForgetPassword.loading && props.userForgetPassword.loading == true ? (
            <div style={{ margin: '10px 0' }}>
              <LinearProgress />
            </div>
          ) : null}


          <div>
            <Grid container spacing={2} style={{ textAlign: 'center' }}>
              <Grid item sm={12} xs={12} style={{ margin: '5px 0' }}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-textarea1"
                    label="Email/Số điện thoại"
                    placeholder="Email/Số điện thoại"
                    name="email"
                    value={formValues.email}
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

              {/* <Grid item sm={12} xs={12} style={{ textAlign: 'center' }}>
                <LoadCanvasTemplate />
              </Grid> */}
              {/* <Grid item sm={12} xs={12}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '70%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-textarea7"
                    label="Captcha"
                    placeholder="Captcha"
                    name="captcha"
                    onChange={handleChange}
                    value={formValues.captcha}
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
              </Grid> */}
            </Grid>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button
              type="submit"
              className={classes.btnSubmit}
              variant="contained"
              component="span"
              onClick={handlesubmit}
            >
              GỬI
            </Button>
          </div>
        </form>

        <Modal
          open={open}
          // onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.modal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <CheckCircleIcon
                style={{ width: '20%', height: '20%', color: '#32C670' }}
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: '40px' }}>
                {props.userForgetPassword.message}
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

        {/* <Modal
          open={open}
          // onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.modal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <CheckCircleIcon
                style={{ width: '20%', height: '20%', color: '#32C670' }}
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: '40px' }}>
                {props.userForgetPassword.message}
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
        </Modal> */}

        <Snackbar
          open={openAlert}
          autoHideDuration={3000}
          anchorOrigin={{ vertical, horizontal }}
          onClose={handleCloseAlert}
        >
          {/* {props.userAddress.message.includes("FAILED") == false || props.userAddress.message.includes("Failed") == false || props.userAddress.message != "Network Error" ? */}
          <Alert
            severity="success"
            onClose={handleCloseAlert}
            sx={{ width: '100%' }}
          >
            {props.userForgetPassword.checkEmail != '' ? props.userForgetPassword.checkEmail : props.userForgetPassword.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

UserForgetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userForgetPassword: makeSelectUserForgetPassword(),
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
)(UserForgetPassword);
