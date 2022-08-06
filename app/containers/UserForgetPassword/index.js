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
import Logo from '../../images/Happy_Delivery_Man_logo_cartoon_art_illustration.jpg';
import { forgetPassword, reset } from './actions';

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

  // set value for input
  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const validate = values => {
    const regexEmail = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;
    const errors = {};
    if (!values.email) {
      errors.email = 'required!';
    }
    if (regexEmail.test(values.email) == false) {
      errors.email1 = 'ex: abc@smt.com';
    }
    if (!values.captcha) {
      errors.captcha = 'captcha is required!';
    }
    if (validateCaptcha(values.captcha) == false) {
      errors.captcha1 = 'captcha does not match!';
    }

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
        email: formValues.email,
      };
      dispatch(forgetPassword(data));
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
      setOpen(true);
    }
  }, [props.userForgetPassword.message]);

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
                    '& .MuiTextField-root': { m: 0, width: '70%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-textarea1"
                    label="Email"
                    placeholder="Email"
                    multiline
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

              <Grid item sm={12} xs={12} style={{ textAlign: 'center' }}>
                <LoadCanvasTemplate />
              </Grid>
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
                    id="outlined-textarea7"
                    label="Captcha"
                    placeholder="Captcha"
                    multiline
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
