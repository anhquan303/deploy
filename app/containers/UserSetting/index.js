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
  Grid,
  Avatar,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { makeStyles, Button, CardContent, Backdrop } from '@material-ui/core';

import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import SaveIcon from '@mui/icons-material/Save';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { NavLink } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { getUserById, reset, sendOTP, sendOTPEmail, updateEmail, updatePhoneEmail, updateUser, verifyEmail, verifyPhoneee } from './actions';
import { getUser, getStore } from '../../utils/common';
import Avatar1 from '../../images/quan.jpg';
import { Headerr } from '../Headerr';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectUserSetting from './selectors';
import moment from 'moment';
import Loading from '../../components/Loading';

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
    [theme.breakpoints.down("sm")]: {
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
  const initialValues = { firstname: '', lastname: '', newPhone: '', otp: '', newEmail: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [vertical, setVertical] = useState('top');
  const [horizontal, setHorizontal] = useState('right');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [openChange, setOpenChange] = useState(false);
  const [isSubmitPhone, setIsSubmitPhone] = useState(false);
  const [formErrorsPhone, setFormErrorsPhone] = useState({});
  const [checkVerifyPhone, setCheckVerifyPhone] = useState(false);
  const [checkVerifyEmail, setCheckVerifyEmail] = useState(false);
  const [openChangeEmail, setOpenChangeEmail] = useState(false);
  const [isSubmitEmail, setIsSubmitEmail] = useState(false);
  const [formErrorsEmail, setFormErrorsEmail] = useState({});

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChangeGender = event => {
    setGender(event.target.value);
  };

  // avatar image
  const handleUploadClick = async e => {
    const file1 = e.target.files[0];
    setAvatarPreview(URL.createObjectURL(file1));
    const file = e.target.files;
    const data = new FormData();
    data.append(file, file[0]);
    setAvatar(file[0]);
  };

  const validate = values => {
    const errors = {};
    if (!values.firstname) {
      errors.firstname = 'họ không được bỏ trống!';
    }
    if (!values.lastname) {
      errors.lastname = 'tên không được bỏ trống!';
    }
    if (!gender) {
      errors.gender = 'vui lòng chọn giới tính!';
    }
    if (!dob) {
      errors.dob = 'vui lòng chọn ngày tháng năm sinh!';
    }
    if (moment.utc().diff(dob, 'minutes').toString().includes("-")) {
      errors.dob1 = 'ngày sinh không đúng!';
    }
    return errors;
  };


  const validatePhone = values => {
    const errors = {};
    const regexPhone = /^[0-9]{10}$/;
    if (!values.newPhone) {
      errors.newPhone = 'không được bỏ trống!';
    }
    if (regexPhone.test(values.newPhone) == false) {
      errors.newPhone1 = 'format: 10 số';
    }
    return errors;
  };

  const validateEmail = values => {
    const errors = {};
    const regexEmail = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;
    if (!values.newEmail) {
      errors.newEmail = 'không được bỏ trống!';
    }
    if (regexEmail.test(values.newEmail) == false) {
      errors.newEmail1 = 'format: abc@gmail.com';
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
        dateOfBirth: moment.utc(dob).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'),
        avatarFile: avatar != "" ? avatar : null,
      };
      dispatch(updateUser(data));
      // setOpen(true);
    }
  }, [formErrors]);

  // get user by id
  useEffect(() => {
    if (props.userSetting.message == 'Thay đổi thành công!') {
      setOpenAlert(true);
      const data = {
        id: user.id,
      };
      dispatch(getUserById(data));
      setTimeout(() => dispatch(reset()), 3000);
    }
    if (props.userSetting.message == 'Chúng tôi đã gửi mã đến số điện thoại mới!') {
      setCheckVerifyPhone(true);
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
    if (props.userSetting.message == "SUCCESSFUL") {
      setOpenAlert(false);
      const data = {
        phone: formValues.newPhone,
        email: null,
        doesPhoneNumber: true
      }
      dispatch(updatePhoneEmail(data));

      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    } else {
      setOpenAlert(true);
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }

    if (props.userSetting.message == 'Chúng tôi đã gửi mã tới địa chỉ email mới!') {
      setCheckVerifyEmail(true);
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }

    if (props.userSetting.message == 'File có dung lượng lớn hơn 600kB, vui lòng chọn file khác.') {
      setOpenAlert(true);
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  }, [props.userSetting.message]);


  useEffect(() => {
    if (props.userSetting.messageUpdate == 'Thay đổi số điện thoại thành công!') {
      setOpenAlert(true);
      setOpenChange(false);
      const data = {
        id: user.id,
      };
      dispatch(getUserById(data));
      setTimeout(() => dispatch(reset()), 3000);
    }
    if (props.userSetting.messageUpdate == 'Thay đổi email thành công!') {
      setOpenAlert(true);
      setOpenChangeEmail(false);
      const data = {
        id: user.id,
      };
      dispatch(getUserById(data));
      setTimeout(() => dispatch(reset()), 3000);
    }
  }, [props.userSetting.messageUpdate]);

  useEffect(() => {
    const data = {
      id: user.id,
    };
    dispatch(getUserById(data));
    dispatch(reset());
    setOpenAlert(false);
  }, []);

  useEffect(() => {
    if (props.userSetting.user != undefined) {
      setGender(props.userSetting.user.gender);
      setDOB(props.userSetting.user.dateOfBirth);
      formValues.firstname = props.userSetting.user.firstname;
      formValues.lastname = props.userSetting.user.lastname;
      setAvatarPreview(props.userSetting.user.avatar);

      var currentUser = JSON.parse(sessionStorage.getItem("user"));
      //currentUser.abc = props.userSetting.user.firstname;
      //console.log(JSON.parse(currentUser))
      const updateStorage = {
        ...currentUser,
        "firstname": props.userSetting.user.firstname,
        "lastname": props.userSetting.user.lastname,
        "avatar": props.userSetting.user.avatar,
        "phone": props.userSetting.user.phoneNumber,
      }
      sessionStorage.setItem("user", JSON.stringify(updateStorage))
    }
  }, [props.userSetting.user]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseAlert = e => {
    setOpenAlert(false);
  };

  const handleChangePhoneNumber = () => {
    setOpenChange(true);
  }

  const handleChangeEmail = () => {
    setOpenChangeEmail(true);
  }

  const handleClose = () => {
    setOpenChange(false);
  };

  const handleCloseChangeEmail = () => {
    setOpenChangeEmail(false);
  };

  const handleChangePhone = (e) => {
    // check validate
    e.preventDefault();
    setFormErrorsPhone(validatePhone(formValues));
    setIsSubmitPhone(true);
  }

  const handleChangeEmaill = (e) => {
    // check validate
    e.preventDefault();
    setFormErrorsEmail(validateEmail(formValues));
    setIsSubmitEmail(true);
  }

  useEffect(() => {
    if (Object.keys(formErrorsPhone).length === 0 && isSubmitPhone) {
      let newPhonee = formValues.newPhone.substring(1);
      newPhonee = "+84".concat(newPhonee);
      const data = {
        phoneNumber: newPhonee,
        message: "NO NÊ SUPPORT KÍNH CHÁO QUÝ KHÁCH HÀNG. ĐÂY LÀ MÃ XÁC NHẬN CỦA QUÝ KHÁCH: "
      }
      dispatch(sendOTP(data));

    }
  }, [formErrorsPhone]);

  useEffect(() => {
    if (Object.keys(formErrorsEmail).length === 0 && isSubmitEmail) {
      const data = {
        email: formValues.newEmail,
      }
      dispatch(verifyEmail(data));
    }
  }, [formErrorsEmail]);


  const handleVerifyPhone = () => {
    const data = {
      phone: formValues.newPhone,
      otp: formValues.otp
    }
    dispatch(verifyPhoneee(data));
  }

  const handleChangeEmaillll = () => {
    const data = {
      email: formValues.newEmail,
      otp: formValues.otp
    }
    dispatch(updateEmail(data));
  }

  useEffect(() => {
    if (props.userSetting.checkEmail != "") {
      setOpenAlert(true);
      if (props.userSetting.checkEmail != 'Không tìm thấy địa chỉ email') {
        const data = {
          email: formValues.newEmail,
        };
        dispatch(sendOTPEmail(data));

        setTimeout(() => {
          dispatch(reset());
        }, 3000);
      }
    }
  }, [props.userSetting.checkEmail]);

  return (
    <div >
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
                  <Avatar
                    sx={{ width: 150, height: 150 }}
                    component="span"
                    src={avatarPreview != "" ? avatarPreview : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
                  >
                    <AddPhotoAlternateIcon />
                  </Avatar>
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
                    <a onClick={handleChangePhoneNumber} href="#">thay đổi</a>
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
                    <a onClick={handleChangeEmail} href="#">thay đổi</a>
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
                      renderInput={(params) => (
                        <TextField
                          sx={{ width: '100%' }}
                          {...params}
                          helperText={formErrors.dob ? formErrors.dob : formErrors.dob1 ? formErrors.dob1 : null}
                          error={formErrors.dob ? formErrors.dob : formErrors.dob1 ? formErrors.dob1 : null}
                        />)}
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
                    {/* <FormControlLabel
                      value="diff"
                      control={<Radio />}
                      label="Khác"
                    /> */}
                  </RadioGroup>
                </Grid>
                {formErrors.gender != "" ?
                  <small id="passwordHelpBlock" class="form-text text-muted" style={{ fontSize: "15px", display: "block", color: "#fe0000" }}>{formErrors.gender}</small> : null}
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <div style={{ textAlign: 'center' }}>
        <Button
          disabled={props.userSetting.loading == true}
          className={classes.btn}
          variant="outlined"
          startIcon={<SaveIcon />}
          onClick={handleUpdateUser}
        >
          Lưu
        </Button>
      </div>

      {/* change Phone */}
      <Dialog open={openChange}>
        <DialogTitle>Thay đổi số điện thoại</DialogTitle>
        <DialogContent>

          <TextField
            disabled={checkVerifyPhone == true}
            autoFocus
            margin="dense"
            id="title"
            label="Số điện thoại mới"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            name="newPhone"
            helperText={
              formErrorsPhone.newPhone && formValues.newPhone.length == ''
                ? formErrorsPhone.newPhone
                : formErrorsPhone.newPhone1
                  ? formErrorsPhone.newPhone1
                  : null
            }
            error={
              formErrorsPhone.newPhone != null && formValues.newPhone.length == ''
                ? true
                : formErrorsPhone.newPhone1 != null
            }
          />

          {checkVerifyPhone == true ?
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="OTP"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              name="otp"

            />
            : null}

        </DialogContent>
        {checkVerifyPhone == false ?
          <DialogActions>
            <Button onClick={handleClose}>Trở lại</Button>
            <Button onClick={handleChangePhone}>Lấy mã</Button>
          </DialogActions>
          :
          <DialogActions>
            <Button onClick={handleClose}>Trở lại</Button>
            <Button onClick={handleVerifyPhone}>Xác thực</Button>
          </DialogActions>
        }

      </Dialog>


      {/* change email */}
      <Dialog open={openChangeEmail}>
        <DialogTitle>Thay đổi Email</DialogTitle>
        <DialogContent>

          <TextField
            disabled={checkVerifyEmail == true}
            autoFocus
            margin="dense"
            id="title"
            label="Email mới"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            name="newEmail"
            helperText={
              formErrorsEmail.newEmail && formValues.newEmail.length == ''
                ? formErrorsEmail.newEmail
                : formErrorsEmail.newEmail1
                  ? formErrorsEmail.newEmail1
                  : null
            }
            error={
              formErrorsEmail.newEmail != null && formValues.newEmail.length == ''
                ? true
                : formErrorsEmail.newEmail1 != null
            }
          />

          {checkVerifyEmail == true ?
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="OTP"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              name="otp"

            />
            : null}

        </DialogContent>
        {checkVerifyEmail == false ?
          <DialogActions>
            <Button onClick={handleCloseChangeEmail}>Trở lại</Button>
            <Button onClick={handleChangeEmaill}>Lấy mã</Button>
          </DialogActions>
          :
          <DialogActions>
            <Button onClick={handleCloseChangeEmail}>Trở lại</Button>
            <Button onClick={handleChangeEmaillll}>Xác thực</Button>
          </DialogActions>
        }

      </Dialog>



      {/* notification */}
      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        onClose={handleCloseAlert}
      >
        {props.userSetting.message != '' && props.userSetting.message.includes("500") || props.userSetting.message && props.userSetting.message.toLowerCase().includes("error")
          || props.userSetting.messageUpdate && props.userSetting.messageUpdate.includes("500") || props.userSetting.messageUpdate && props.userSetting.messageUpdate.toLowerCase().includes("error")
          || props.userSetting.checkEmail && props.userSetting.checkEmail.includes("500") || props.userSetting.checkEmail && props.userSetting.checkEmail.toLowerCase().includes("error") || props.userSetting.message && props.userSetting.message.includes("600kB")
          ?
          <Alert
            severity="error"
            onClose={handleCloseAlert}
            sx={{ width: '100%' }}
          >
            {props.userSetting.message != '' ? props.userSetting.message : props.userSetting.messageUpdate != '' ? props.userSetting.messageUpdate : props.userSetting.checkEmail}
          </Alert>
          :
          <Alert
            severity="success"
            onClose={handleCloseAlert}
            sx={{ width: '100%' }}
          >
            {props.userSetting.message != '' ? props.userSetting.message : props.userSetting.messageUpdate != '' ? props.userSetting.messageUpdate : props.userSetting.checkEmail}
          </Alert>
        }

      </Snackbar>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.userSetting.loading}
      >
        <Loading />
      </Backdrop>
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
