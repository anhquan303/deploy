/**
 *
 * UserChangePassword
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
import SaveIcon from '@mui/icons-material/Save';
import { Box, Grid, TextField, Container } from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import makeSelectUserChangePassword from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { changePassword, logout, reset } from './actions';
import { removeUserSession } from '../../utils/common';

const useStyles = makeStyles(theme => ({
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
  font: {
    fontFamily: 'sans-serif',
    margin: '0',
  },
  inside: {
    width: '25%',
    margin: '0 auto',
    [theme.breakpoints.down('lg')]: {
      width: '35%',
    },
    [theme.breakpoints.down('md')]: {
      width: '45%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '65%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));

export function UserChangePassword(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'userChangePassword', reducer });
  useInjectSaga({ key: 'userChangePassword', saga });
  const classes = useStyles();

  const initialValues = {
    newPassword: '',
    oldPassword: '',
    verifyPassword: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [vertical, setVertical] = useState('top');
  const [horizontal, setHorizontal] = useState('right');

  // set value for input
  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = values => {
    const errors = {};
    const regexPassword = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,15})$/;
    if (!values.newPassword) {
      errors.newPassword = 'mật khẩu mới không được bỏ trống!';
    }
    if (regexPassword.test(values.newPassword) == false) {
      errors.newPassword1 = 'mật khẩu yêu cầu mẫu có ít nhất một chữ số, một chữ hoa, một chữ thường và một ký hiệu đặc biệt';
    }
    if (!values.oldPassword) {
      errors.oldPassword = 'mật khẩu cũ không được bỏ trống!';
    }
    if (!values.verifyPassword) {
      errors.verifyPassword = 'xác nhận mật khẩu mới không được bỏ trống!';
    }
    if (values.verifyPassword != values.newPassword) {
      errors.verifyPassword1 = 'mật khẩu không giống!';
    }
    return errors;
  };

  // check validate
  const handlesubmit = e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  // change pass
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const data = {
        newPassword: formValues.newPassword,
        oldPassword: formValues.oldPassword,
        verifyPassword: formValues.verifyPassword,
      };
      dispatch(changePassword(data));
      // setOpen(true);
    }
  }, [formErrors]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseAlert = event => {
    setOpenAlert(false);
  };

  useEffect(() => {
    if (props.userChangePassword.message != '') {
      setOpenAlert(true);
      setTimeout(() => dispatch(reset()), 2000);
      if (props.userChangePassword.message == 'CHANGE PASSWORD SUCCESSFUL') {
        setTimeout(() => dispatch(logout()), 2000);
        removeUserSession();
        setTimeout(() => props.history.push('/login'), 2000);
      }
    }
  }, [props.userChangePassword.message]);

  return (
    <div>
      <div>
        <p
          className={classes.font}
          style={{ fontWeight: '500', fontSize: '25px' }}
        >
          Đổi mật khẩu
        </p>
        <p
          className={classes.font}
          style={{ fontWeight: 'lighter', fontSize: '15px' }}
        >
          Quản lý thông tin để bảo mật tài khoản
        </p>
      </div>
      <hr />
      <Grid container spacing={0} style={{ marginTop: '15px' }}>
        <Grid item xs={12} md={12} style={{ padding: '10px' }}>
          <div style={{ textAlign: 'center' }} className={classes.inside}>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 0, width: '100%' },
                marginBottom: '10px',
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                error={
                  formErrors.oldPassword != null &&
                  formValues.oldPassword.length == ''
                }
                id="outlined-password-input1"
                label="Mật khẩu cũ"
                type="password"
                autoComplete="current-password"
                name="oldPassword"
                value={formValues.oldPassword}
                onChange={handleChange}
                helperText={
                  formErrors.oldPassword && formValues.oldPassword.length == ''
                    ? formErrors.oldPassword
                    : null
                }
              />
            </Box>

            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 0, width: '100%' },
                marginBottom: '10px',
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-password-input2"
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
                    : formErrors.newPassword1
                      ? formErrors.newPassword1
                      : null
                }
                error={
                  formErrors.newPassword != null &&
                    formValues.newPassword.length == ''
                    ? true
                    : formErrors.newPassword1 != null
                }
              />
            </Box>

            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 0, width: '100%' },
                marginBottom: '10px',
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
            <Button
              className={classes.btn}
              variant="outlined"
              startIcon={<SaveIcon />}
              onClick={handlesubmit}
            >
              Lưu
            </Button>
          </div>
        </Grid>
      </Grid>

      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        onClose={handleCloseAlert}
      >
        {/* {props.userAddress.message.includes("FAILED") == false || props.userAddress.message.includes("Failed") == false || props.userAddress.message != "Network Error" ? */}
        <Alert
          severity="success"
          onClose={handleCloseAlert}
          sx={{ width: '100%' }}
        >
          {props.userChangePassword.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

UserChangePassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userChangePassword: makeSelectUserChangePassword(),
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
)(UserChangePassword);
