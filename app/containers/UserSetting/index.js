/**
 *
 * UserSetting
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
  Box,
  Grid,
  Container,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  OutlinedInput,
  Select,
  MenuItem,
} from '@mui/material';
import { makeStyles, Button, Fab, CardContent } from '@material-ui/core';

import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import SaveIcon from '@mui/icons-material/Save';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { NavLink } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { getUserById, reset, updateUser } from './actions';
import { getUser, getStore } from '../../utils/common';
import Avatar1 from '../../images/quan.jpg';
import { Headerr } from '../Headerr';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectUserSetting from './selectors';

const useStyles = makeStyles(theme => ({
  btn: {
    position: 'relative',
    width: 'fit-content',
    borderRadius: '10px',
    backgroundColor: '#ff9900',
    margin: '10px 5px',
    '&:hover': {
      backgroundColor: '#FFA500',
      fontWeight: 'bold',
      color: '#000',
      boxShadow: '2rem 2rem 3rem rgba(132, 139, 200, 0.18)',
    },
  },
  center: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
  },
  font: {
    fontFamily: 'sans-serif',
    margin: '0',
  },
  input: {
    display: 'none',
  },
  text: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'left',
    paddingRight: '10px',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  textField: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  radioButton: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  dob: {
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  right: {
    textAlign: 'left',
    paddingRight: '10px',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  avatar: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    justifyContent: "right",
    [theme.breakpoints.down("sm")]:{
      justifyContent: "center"
    }
  }
}));

export function UserSetting(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'userSetting', reducer });
  useInjectSaga({ key: 'userSetting', saga });

  const classes = useStyles();
  const user = getUser();
  const store = getStore();
  const [open, setOpen] = useState(true);
  const [gender, setGender] = useState('');
  const [dob, setDOB] = useState(new Date());
  const initialValues = { firstname: '', lastname: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [vertical, setVertical] = useState('top');
  const [horizontal, setHorizontal] = useState('right');

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChangeGender = event => {
    setGender(event.target.value);
  };

  const handleUploadClick = () => {};

  const validate = values => {
    const errors = {};
    if (!values.firstname) {
      errors.firstname = 'firstname is required!';
    }
    if (!values.lastname) {
      errors.lastname = 'lastname is required!';
    }
    return errors;
  };

  // set value for input
  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleUpdateUser = e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  // update
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const data = {
        firstname: formValues.firstname,
        lastname: formValues.lastname,
        gender,
        dateOfBirth: dob,
      };
      dispatch(updateUser(data));
      // setOpen(true);
    }
  }, [formErrors]);

  // get user by id
  useEffect(() => {
    if (props.userSetting.message == 'UPDATE SUCCESS') {
      setOpenAlert(true);
      const data = {
        id: user.id,
      };
      dispatch(getUserById(data));
      setTimeout(() => dispatch(reset()), 6000);
    }
  }, [props.userSetting.message]);

  useEffect(() => {
    const data = {
      id: user.id,
    };
    dispatch(getUserById(data));
  }, []);

  useEffect(() => {
    if (props.userSetting.user) {
      setGender(props.userSetting.user.gender);
      setDOB(props.userSetting.user.dateOfBirth);
      formValues.firstname = props.userSetting.user.firstname;
      formValues.lastname = props.userSetting.user.lastname;
    }
  }, [props.userSetting.user]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseAlert = e => {
    setOpenAlert(false);
  };

  return (
    <div>
      <div>
        <p
          className={classes.font}
          style={{ fontWeight: '500', fontSize: '25px' }}
        >
          Hồ sơ của tôi
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
        <Grid item xs={12} md={4} style={{ padding: '10px' }}>
          <div className={classes.avatar} >
            <CardContent>
              <Grid container>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handleUploadClick}
                />
                <label htmlFor="contained-button-file">
                  {user ? (
                    <Avatar
                      sx={{ width: 150, height: 150 }}
                      component="span"
                      src={Avatar1}
                    >
                      <AddPhotoAlternateIcon />
                    </Avatar>
                  ) : (
                    <Avatar src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" />
                  )}
                </label>
              </Grid>
            </CardContent>
          </div>
        </Grid>
        <Grid item xs={12} md={7} style={{ padding: '10px' }}>
          <div>
            <Grid container spacing={0}>
              <Grid item xs={12} md={5} className={classes.text}>
                <span>Tên đăng nhập</span>
              </Grid>
              <Grid
                item
                xs={12}
                md={7}
                className={classes.text}
                style={{ fontWeight: 'lighter' }}
              >
                <span>{user.username}</span>
              </Grid>

              <Grid container spacing={0} style={{ marginTop: '10px' }}>
                <Grid item xs={12} md={5} className={classes.text}>
                  <span>Họ</span>
                </Grid>
                <Grid item xs={12} md={7} className={classes.textField}>
                  <OutlinedInput
                    style={{ width: '100%' }}
                    placeholder="Please enter text"
                    value={formValues.firstname}
                    onChange={handleChange}
                    name="firstname"
                    error={
                      formErrors.firstname != null &&
                      formValues.firstname.length == ''
                    }
                    helperText={
                      formErrors.firstname && formValues.firstname.length == ''
                        ? formErrors.firstname
                        : null
                    }
                  />
                </Grid>
              </Grid>

              <Grid container spacing={0} style={{ marginTop: '10px' }}>
                <Grid item xs={12} md={5} className={classes.text}>
                  <span>Tên</span>
                </Grid>
                <Grid item xs={12} md={7} className={classes.textField}>
                  <OutlinedInput
                    style={{ width: '100%' }}
                    placeholder="Please enter text"
                    value={formValues.lastname}
                    onChange={handleChange}
                    name="lastname"
                    error={
                      formErrors.lastname != null &&
                      formValues.lastname.length == ''
                    }
                    helperText={
                      formErrors.lastname && formValues.lastname.length == ''
                        ? formErrors.lastname
                        : null
                    }
                  />
                </Grid>
              </Grid>

              <Grid container spacing={0} style={{ marginTop: '10px' }}>
                <Grid item xs={12} md={5} className={classes.text}>
                  <span>Số điện thoại</span>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={5}
                  className={classes.text}
                  style={{ fontWeight: 'lighter' }}
                >
                  <span>
                    {props.userSetting.user
                      ? props.userSetting.user.phoneNumber
                      : null}
                  </span>
                </Grid>
                <Grid item xs={12} md={2} className={classes.text}>
                  <span style={{ fontSize: '13px' }}>
                    <a href="#">thay đổi</a>
                  </span>
                </Grid>
              </Grid>

              <Grid container spacing={0} style={{ marginTop: '10px' }}>
                <Grid item xs={12} md={5} className={classes.text}>
                  <span>Email</span>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={5}
                  className={classes.text}
                  style={{ fontWeight: 'lighter' }}
                >
                  <span>
                    {props.userSetting.user
                      ? props.userSetting.user.email
                      : null}
                  </span>
                </Grid>
                <Grid item xs={12} md={2} className={classes.text}>
                  <span style={{ fontSize: '13px' }}>
                    <a href="#">thay đổi</a>
                  </span>
                </Grid>
              </Grid>

              <Grid container spacing={0} style={{ marginTop: '10px' }}>
                <Grid item xs={12} md={5} className={classes.text}>
                  <span>Ngày tháng năm sinh</span>
                </Grid>
                <Grid item xs={12} md={7} className={classes.textField}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="DOB"
                      value={dob}
                      onChange={newValue => {
                        setDOB(newValue);
                      }}
                      renderInput={params => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>

              <Grid container spacing={0} style={{ marginTop: '10px' }}>
                <Grid item xs={12} md={5} className={classes.text}>
                  <span>Giới tính</span>
                </Grid>
                <Grid item xs={12} md={7}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-form-control-label-placement"
                    value={gender}
                    onChange={handleChangeGender}
                    className={classes.radioButton}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Nam"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="Nữ"
                    />
                    <FormControlLabel
                      value="diff"
                      control={<Radio />}
                      label="Khác"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <div style={{ textAlign: 'center' }}>
        <Button
          className={classes.btn}
          variant="outlined"
          startIcon={<SaveIcon />}
          onClick={handleUpdateUser}
        >
          Lưu
        </Button>
      </div>

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
          {props.userSetting.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

UserSetting.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userSetting: makeSelectUserSetting(),
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
)(UserSetting);
