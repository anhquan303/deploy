/**
 *
 * UserResetPassword
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
import { useHistory } from 'react-router-dom';
import makeSelectUserResetPassword from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BackGround from '../../images/dhfpt.png';
import Logo from '../../images/logoNone.png';
import { reset, resetPassword } from './actions';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

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
    height: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '40px 10px',
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
    color: "#fff",
    '&:hover': {
      backgroundColor: '#FF1C1C',
      fontWeight: 'bold',
      color: '#000',
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

export function UserResetPassword(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'userResetPassword', reducer });
  useInjectSaga({ key: 'userResetPassword', saga });

  const classes = useStyles();

  const initialValues = { newPassword: '', verifyPassword: '', token: '' };
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

  const validate = values => {
    const regexEmail = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;
    const errors = {};
    if (!values.newPassword) {
      errors.newPassword = 'không được bỏ trống!';
    }
    if (!values.verifyPassword) {
      errors.verifyPassword = 'không được bỏ trống!';
    }
    if (values.verifyPassword != values.newPassword) {
      errors.verifyPassword1 = 'mật khẩu không trùng';
    }
    if (!values.token) {
      errors.token = 'không được bỏ trống!';
    }
    // if (!values.captcha) {
    //   errors.captcha = "captcha is required!";
    // }
    // if (validateCaptcha(values.captcha) == false) {
    //   errors.captcha1 = "captcha does not match!";
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
      const data = {
        password: formValues.newPassword,
        token: formValues.token,
      };
      dispatch(resetPassword(data));
      // setOpen(true);
    }
  }, [formErrors]);

  const closeModal = () => {
    dispatch(reset());
    setOpen(false);
    history.push('/login');
  };

  useEffect(() => {
    if (props.userResetPassword.message != '') {
      //setOpen(true);
      if (props.userResetPassword.message == "INVALID") {
        setOpenAlert(true);
        setTimeout(() => {
          dispatch(reset())
        }, 3000);
      } else {
        setOpen(true);
      }
    }
  }, [props.userResetPassword.message]);

  const handleCloseAlert = event => {
    setOpenAlert(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

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

          {props.userResetPassword.loading && props.userResetPassword.loading == true ? (
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
                    '& .MuiTextField-root': { m: 0, width: '70%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    error={
                      formErrors.newPassword != null &&
                      formValues.newPassword.length == ''
                    }
                    id="outlined-password-input1"
                    label="Mật khẩu mới"
                    type="password"
                    autoComplete="current-password"
                    name="newPassword"
                    value={formValues.newPassword}
                    onChange={handleChange}
                    helperText={
                      formErrors.newPassword &&
                        formValues.newPassword.length == ''
                        ? formErrors.newPassword
                        : null
                    }
                  />
                </Box>
              </Grid>

              {/* <Grid item sm={12} xs={12} style={{ textAlign: "center" }}>
                <LoadCanvasTemplate />
              </Grid> */}
              <Grid item sm={12} xs={12}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '70%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-password-input3"
                    label="Xác nhận mật khẩu"
                    type="password"
                    autoComplete="current-password"
                    value={formValues.passwordVerify}
                    name="verifyPassword"
                    onChange={handleChange}
                    helperText={
                      formErrors.verifyPassword &&
                        formValues.verifyPassword.length == ''
                        ? formErrors.verifyPassword
                        : formErrors.verifyPassword1
                          ? formErrors.verifyPassword1
                          : null
                    }
                    error={
                      formErrors.verifyPassword != null &&
                        formValues.verifyPassword.length == ''
                        ? true
                        : formErrors.verifyPassword1 != null
                    }
                  />
                </Box>
              </Grid>

              <Grid item sm={12} xs={12} style={{ margin: '5px 0' }}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '70%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-textarea1"
                    label="Mã"
                    placeholder="Mã"
                    name="token"
                    value={formValues.token}
                    onChange={handleChange}
                    helperText={
                      formErrors.token && formValues.token.length == ''
                        ? formErrors.token
                        : null
                    }
                    error={
                      formErrors.token != null && formValues.token.length == ''
                    }
                  />
                </Box>
              </Grid>
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
              Xác nhận
            </Button>
          </div>
        </form>
        <Modal
          open={open}
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
                {props.userResetPassword.message}
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
            {props.userResetPassword.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

UserResetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userResetPassword: makeSelectUserResetPassword(),
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
)(UserResetPassword);
