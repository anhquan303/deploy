/**
 *
 * SellerRegister
 *
 */

import React, { memo, useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Box, TextField, Tab, MenuItem, Tabs,
  TextareaAutosize, FormGroup, FormControl, InputLabel, FormControlLabel, Checkbox, LinearProgress
} from '@mui/material';
import { makeStyles, Container, Typography, Grid, Button, } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
// import TimePicker from 'react-time-picker';
import moment from 'moment';
import Modal from '@mui/material/Modal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import makeSelectSellerRegister from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Logo from '../../images/Happy_Delivery_Man_logo_cartoon_art_illustration.jpg';
import BackGround from '../../images/dhfpt.png';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getUser } from '../../utils/common';
import { getListBank, getListWards, reset, sellerSignUp, verifyBankAccount } from './actions';

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
    width: '800px',
    minHeight: '600px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '30px',
    margin: '20px',
    borderRadius: '30px',
    [theme.breakpoints.down('sm')]: {
      width: 'fit-content',
    },
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
    color: '#fff',
    marginTop: '10px',
    '&:hover': {
      backgroundColor: '#FF1C1C',
      fontWeight: 'bold',
      color: '#fff',
      boxShadow: '2rem 2rem 3rem rgba(132, 139, 200, 0.18)',
    },
  },
  btnBack: {
    position: 'relative',
    width: '100%',
    borderRadius: '10px',
    backgroundColor: '#fff',
    border: '1px solid #000',
    color: '#000',
    marginTop: '10px',
    '&:hover': {
      // backgroundColor: "#FFA500",
      fontWeight: 'bold',
      color: '#FFA500',
      boxShadow: '2rem 2rem 3rem rgba(132, 139, 200, 0.18)',
    },
  },
  topLogo: {
    margin: '0 auto',
    display: 'flex',
    marginBottom: '20px',
  },
  upload: {
    backgroundColor: '#D9D9D9',
    padding: '20px',
    borderRadius: '10px',
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

export function SellerRegister(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'sellerRegister', reducer });
  useInjectSaga({ key: 'sellerRegister', saga });

  const user = getUser();
  const [identityCardBack, setIdentityCardBack] = useState('');
  const [identityCardFront, setIdentityCardFront] = useState('');
  const [menu, setMenu] = useState('');
  const [certificate, setCertificate] = useState('');
  const [avatar, setAvatar] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [value, setValue] = useState(0);
  const [startTime, setStartTime] = useState(new Date(null, null, null));
  // moment().format('hh:mm:ss')
  const [endTime, setEndTime] = useState(new Date(null, null, null));
  const urlPromoRef = createRef();
  const [isInCampus, setIsInCampus] = useState(false);

  const initialValues = {
    name: '', description: '', slogan: '', avatar: '', images: [], email: user.email, phone: user.phone, isInCampus: '',
    owner_name: user.username, village: '', town: '', district: 'Thạch Thất', menu: '', bankAccount: '', dorm: '', room: ''
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [accept, setAccept] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [vertical, setVertical] = useState('top');
  const [horizontal, setHorizontal] = useState('right');
  const [open, setOpen] = useState(false);
  const [next, setNext] = useState(false);
  const [type, setType] = useState('');
  const [bank, setBank] = useState('');
  const classes = useStyles();

  const handleChangeTab = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  // can cuoc cong dan mat truoc
  const handleUploadFile = async e => {
    // const file = URL.createObjectURL(e.target.files[0])
    const file = e.target.files;
    // const data = new FormData();
    // data.append(file, file[0])
    // setIdentityCardFront("/C/Users/anhqu/OneDrive/Desktop/" + file[0].name);
    setIdentityCardFront(file[0]);
  };

  // can cuoc cong dan mat sau
  const handleUploadFile1 = async e => {
    const file = e.target.files;
    const data = new FormData();
    data.append(file, file[0]);
    // setIdentityCardBack("/C/Users/anhqu/OneDrive/Desktop/" + file[0].name);
    setIdentityCardBack(file[0]);
  };

  // anh dai dien cua quan an
  const handleUploadAvatar = async e => {
    const file = e.target.files;
    const data = new FormData();
    data.append(file, file[0]);
    // setAvatar("/C/Users/anhqu/OneDrive/Desktop/" + file[0].name)
    setAvatar(file[0]);
  };

  // anh bia cua quan an
  const handleUploadCoverImage = async e => {
    const file = e.target.files;
    const data = new FormData();
    data.append(file, file[0]);
    // setAvatar("/C/Users/anhqu/OneDrive/Desktop/" + file[0].name)
    setCoverImage(file[0]);
  };

  // chung nhan thuc pham sach
  const handleUploadCerti = async e => {
    const file = e.target.files;
    const data = new FormData();
    data.append(file, file[0]);
    // setCertificate("/C/Users/anhqu/OneDrive/Desktop/" + file[0].name)
    setCertificate(file[0]);
  };

  // menu
  const handleUploadMenu = async e => {
    const file = e.target.files;
    const data = new FormData();
    data.append(file, file[0]);
    setMenu(file[0]);
    // setMenu("/C/Users/anhqu/OneDrive/Desktop/" + file[0].name)
  };

  const handleChangeStartTime = newValue => {
    //setStartTime(moment(newValue, 'HH:mm:ss').format('hh:mm:ss'));
    setStartTime(newValue)


  };

  const handleChangeEndTime = newValue => {
    //setEndTime(moment(newValue, 'HH:mm:ss').format('hh:mm:ss'));
    setEndTime(newValue)
  };

  // set value for input
  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // save for first tab
  const FirstSubmit = e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setNext(true);
    // if (Object.keys(formErrors).length === 0) {
    //   setValue(1);
    // }
  };

  // save for second tab
  const SecondSubmit = e => {
    e.preventDefault();
    setFormErrors(validate2(formValues));
    setNext(true);
  };

  // validate for first tab
  const validate = values => {
    const errors = {};
    const regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const regexEmail = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;
    if (!values.name) {
      errors.name = 'name is required!';
    }
    if (!values.phone) {
      errors.phone = 'phone is required!';
    }
    if (regexPhone.test(values.phone) == false) {
      errors.phone1 = 'match 10 digits';
    }
    if (!values.email) {
      errors.email = 'email is required!';
    }
    if (regexEmail.test(values.email) == false) {
      errors.email1 = 'ex: abc@gmail.com';
    }
    if (isInCampus == false) {
      if (!values.village) {
        errors.village = 'village is required!';
      }
      if (!values.district) {
        errors.district = 'address is required!';
      }
    } else {
      if (!values.dorm) {
        errors.dorm = 'dorm is required!';
      }
      if (!values.room) {
        errors.room = 'room is required!';
      }
    }
    return errors;
  };

  // validate for second tab
  const validate2 = values => {
    const errors = {};
    if (!identityCardBack) {
      errors.identity_card_back = 'identity_card_back is required!';
    }
    if (!identityCardFront) {
      errors.identity_card_front = 'identity_card_front is required!';
    }
    if (!values.bankAccount) {
      errors.bankAccount = 'bank account is required!';
    }
    return errors;
  };

  // validate for third tab
  const validate3 = values => {
    const errors = {};
    if (!values.description) {
      errors.description = 'description is required!';
    }
    if (!menu) {
      errors.menu = 'menu is required!';
    }
    return errors;
  };

  // next tab
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && next && isSubmit == false) {
      setNext(false);
      setValue(value + 1);
    }
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const data = {
        name: formValues.name,
        description: formValues.description,
        slogan: 'ok',
        phone: formValues.phone,
        email: formValues.email,
        open_time: moment(startTime).format('HH:mm:ss'),
        close_time: moment(endTime).format('HH:mm:ss'),
        menu,
        image: {
          avatar: avatar,
          cover_image: coverImage,
          images: ['path1', 'path2', 'path3'],
        },
        certificate: {
          identity_card_back: identityCardBack,
          identity_card_front: identityCardFront,
          food_quality_certificate: certificate,
        },
        isInCampus: isInCampus,
        owner_name: formValues.owner_name,
        location: isInCampus == false ? `[other_location]|${formValues.village}|${type}|${formValues.district}` : `[dorm_location]|${formValues.dorm}|${formValues.room}`,
        bin: bank,
        account_number: formValues.bankAccount,
      };
      dispatch(sellerSignUp(data));
    }
  }, [formErrors]);

  // submit 3 pages
  const SubmitAll = e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setFormErrors(validate2(formValues));
    setFormErrors(validate3(formValues));
    setIsSubmit(true);
  };

  const closeModal = () => {
    dispatch(reset());
    setOpen(false);
    props.history.push('/');
  };

  // get list wards and bank
  useEffect(() => {
    dispatch(getListWards());
    dispatch(getListBank());
  }, []);

  // set ward
  const handleChangeType = e => {
    setType(e.target.value);
  };


  // set bank
  const handleChangeBank = e => {
    setBank(e.target.value);
  };

  useEffect(() => {
    if (props.sellerRegister.message != '') {
      setOpen(true);
    }
  }, [props.sellerRegister.message]);

  const handleVerifyBankAccount = () => {
    const data = {
      bin: bank,
      accountNumber: formValues.bankAccount
    }
    dispatch(verifyBankAccount(data));
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
          <h3 className={classes.registerTag}>Đăng Ký Đối Tác</h3>

          {props.sellerRegister.loading && props.sellerRegister.loading == true ? (
            <div style={{ margin: '10px 0' }}>
              <LinearProgress />
            </div>
          ) : null}

          <div style={{ display: 'flex', textAlign: 'center' }}>
            <Tabs
              style={{ margin: '0 auto' }}
              value={value}
              onChange={handleChangeTab}
              textColor="primary"
              indicatorColor="primary"
              scrollButtons
              allowScrollButtonsMobile
              variant="scrollable"
            >
              <Tab label="1. Thông tin quán - cơ bản" />
              <Tab label="2. Thông tin người đại diện" />
              <Tab label="3. Thông tin quán - chi tiết" />
            </Tabs>
          </div>

          <br />
          {value == 0 ? (
            <>
              <div style={{ textAlign: 'center' }}>
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
                        required
                        id="outlined-textarea"
                        label="Tên quán"
                        placeholder="Tên quán"
                        multiline
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        helperText={
                          formErrors.name && formValues.name.length == ''
                            ? formErrors.name
                            : null
                        }
                        error={
                          formErrors.name != null &&
                          formValues.name.length == ''
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
                        required
                        id="outlined-textarea"
                        label="Email"
                        placeholder="Email"
                        multiline
                        value={formValues.email}
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
                          formErrors.email != null &&
                            formValues.email.length == ''
                            ? true
                            : formErrors.email1 != null
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>


                <Grid item sm="auto" xs="auto" style={{ width: '100%' }}>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      required
                      id="outlined-textarea"
                      label="Số điện thoại liên hệ"
                      placeholder="Số điện thoại liên hệ"
                      multiline
                      name="phone"
                      value={formValues.phone}
                      onChange={handleChange}
                      helperText={
                        formErrors.phone != null &&
                          formValues.phone.length == ''
                          ? formErrors.phone
                          : formErrors.phone1 != null
                            ? formErrors.phone1
                            : null
                      }
                      error={
                        formErrors.phone != null &&
                          formValues.phone.length == ''
                          ? true
                          : formErrors.phone1 != null
                      }
                    />
                  </Box>
                </Grid>

                {/* check Dorm */}
                <Grid item sm={12} xs={12} md={12}>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <label style={{ textAlign: 'center', width: '100%' }}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isInCampus}
                              onChange={() => setIsInCampus(!isInCampus)}
                            />
                          }
                          label="Dorm"
                        />
                      </FormGroup>
                    </label>
                  </Box>
                </Grid>

                {/* location */}
                {isInCampus == false ? <>
                  <Grid item sm="auto" xs="auto" style={{ width: '100%' }}>
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
                        id="outlined-textarea"
                        label="Huyện"
                        placeholder="Huyện"
                        multiline
                        onChange={handleChange}
                        name="district"
                        value={formValues.district}
                        helperText={
                          formErrors.district && formValues.district.length == ''
                            ? formErrors.district
                            : null
                        }
                        error={
                          formErrors.district != null &&
                          formValues.district.length == ''
                        }
                      />
                    </Box>
                  </Grid>
                  <Grid item sm="auto" xs="auto" style={{ width: '100%' }}>
                    <div style={{ marginLeft: '8px', width: '100%' }}>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Xã
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Xã"
                            onChange={handleChangeType}
                          >
                            {props.sellerRegister.listWard.map((item, index) => (
                              <MenuItem key={index} value={item.name}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                  </Grid>
                  <Grid item sm="auto" xs="auto" style={{ width: '100%' }}>
                    <Box
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="outlined-textarea"
                        label="Thôn"
                        placeholder="Thôn"
                        multiline
                        onChange={handleChange}
                        name="village"
                        value={formValues.village}
                        helperText={
                          formErrors.village && formValues.village.length == ''
                            ? formErrors.village
                            : null
                        }
                        error={
                          formErrors.village != null &&
                          formValues.village.length == ''
                        }
                      />
                    </Box>
                  </Grid>
                </>
                  :
                  <>
                    <Grid item sm="auto" xs="auto" style={{ width: '100%' }}>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="outlined-textarea"
                          label="Dorm"
                          placeholder="Dorm"
                          multiline
                          onChange={handleChange}
                          name="dorm"
                          value={formValues.dorm}
                          helperText={
                            formErrors.dorm && formValues.dorm.length == ''
                              ? formErrors.dorm
                              : null
                          }
                          error={
                            formErrors.dorm != null &&
                            formValues.dorm.length == ''
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item sm="auto" xs="auto" style={{ width: '100%' }}>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="outlined-textarea"
                          label="Phòng"
                          placeholder="Phòng"
                          multiline
                          onChange={handleChange}
                          name="room"
                          value={formValues.room}
                          helperText={
                            formErrors.room && formValues.room.length == ''
                              ? formErrors.room
                              : null
                          }
                          error={
                            formErrors.room != null &&
                            formValues.room.length == ''
                          }
                        />
                      </Box>
                    </Grid>
                  </>
                }
              </div>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button
                  className={classes.btnSubmit}
                  variant="contained"
                  component="span"
                  style={{ width: '50%' }}
                  onClick={FirstSubmit}
                >
                  Lưu và tiếp tục
                </Button>
              </div>
            </>
          ) : // page 2
            value == 1 ? (
              <>
                <div style={{ textAlign: 'center' }}>
                  <Grid item sm={12} xs={12}>
                    <Box
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        required
                        id="outlined-textarea"
                        label="Tên đầy đủ của người đại diện"
                        placeholder="Tên đầy đủ của người đại diện"
                        multiline
                        value={user.username}
                        disabled
                      />
                    </Box>
                  </Grid>
                  <Grid item sm={12} xs={12}>
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
                        required
                        id="outlined-textarea"
                        label="Email"
                        placeholder="Email"
                        multiline
                        // name="email1"
                        value={user.email}
                      />
                    </Box>
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <Box
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        required
                        value={user.phone}
                        id="outlined-textarea"
                        label="Số điện thoại"
                        placeholder="Số điện thoại"
                        disabled
                      />
                    </Box>
                  </Grid>
                  <Grid item sm={12} xs={12}>
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
                        id="outlined-textarea"
                        label="Số nhà và đường phố"
                        placeholder="Số nhà và đường phố"
                        multiline
                        name="address1"
                        value=""
                      />
                    </Box>
                  </Grid>

                  {/* Tài khoản ngân hàng */}
                  <Grid container spacing={0}>
                    <Grid item sm={12} xs={12}>
                      <span>Tài khoản ngân hàng</span>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="outlined-textarea"
                          label="Số tài khoản"
                          placeholder="Số tài khoản"
                          multiline
                          onChange={handleChange}
                          name="bankAccount"
                          value={formValues.bankAccount}
                          helperText={formErrors.bankAccount && formValues.bankAccount.length == '' ? formErrors.bankAccount : null}
                          error={formErrors.bankAccount != null && formValues.bankAccount.length == ''}
                        />
                        {props.sellerRegister.bankAccountName != "" ? <span>{props.sellerRegister.bankAccountName}</span> : null}
                      </Box>
                    </Grid>
                    <div style={{ marginLeft: '8px', width: '100%' }}>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Ngân hàng
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={bank}
                            label="Ngân hàng"
                            onChange={handleChangeBank}
                          >
                            {props.sellerRegister.listBank.map((item) => (
                              <MenuItem key={item.id} value={item.bin}>
                                <img src={item.logo} style={{ width: "90px", height: "50px" }} />
                                {item.shortName} - {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                      </Box>
                    </div>
                    <Button
                      style={{ width: '100%' }}
                      className={classes.btnBack}
                      variant="contained"
                      component="span"
                      onClick={handleVerifyBankAccount}
                    >
                      Kiểm tra tài khoản
                    </Button>
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
                        <div>
                          <p>Ảnh chụp mặt trước CCCD *</p>
                        </div>
                        <div className={classes.upload}>
                          <input
                            type="file"
                            name="identity_card_front"
                            placeholder="upload an image"
                            onChange={handleUploadFile}
                          />
                        </div>
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
                        <div>
                          <p>Ảnh chụp mặt sau CCCD *</p>
                        </div>
                        <div className={classes.upload}>
                          <input
                            type="file"
                            name="identity_card_back"
                            placeholder="upload an image"
                            onChange={handleUploadFile1}
                          />
                        </div>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
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
                        <Button
                          style={{ width: '50%' }}
                          className={classes.btnBack}
                          variant="contained"
                          component="span"
                          onClick={() => setValue(0)}
                        >
                          Quay lại
                        </Button>
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
                        <Button
                          style={{ width: '50%' }}
                          className={classes.btnSubmit}
                          variant="contained"
                          component="span"
                          onClick={SecondSubmit}
                        >
                          Lưu và tiếp tục
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </>
            ) : (
              // page 3
              <>
                <div style={{ textAlign: 'center' }}>
                  <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 0, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <TimePicker
                            label="Thời gian mở cửa"
                            value={startTime}
                            onChange={handleChangeStartTime}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                        {/* <p style={{ fontFamily: 'san-serif', fontSize: '20px' }}>
                          Thời gian mở cửa
                        </p>
                        <TimePicker
                          onChange={handleChangeStartTime}
                          value={startTime}
                        /> */}
                      </Box>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 0, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <TimePicker
                            label="Thời gian đóng cửa"
                            value={endTime}
                            onChange={handleChangeEndTime}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                        {/* <p style={{ fontFamily: 'san-serif', fontSize: '20px' }}>
                          Thời gian đóng cửa
                        </p>
                        <TimePicker
                          onChange={handleChangeEndTime}
                          value={endTime}
                        /> */}
                      </Box>
                    </Grid>
                  </Grid>
                  <div style={{ marginTop: '20px' }}>
                    <Grid item sm="auto" xs="auto" style={{ width: '100%' }}>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextareaAutosize
                          aria-label="Miêu tả về quán"
                          minRows={3}
                          placeholder="Miêu tả về quán"
                          style={{ width: '100%' }}
                          name="description"
                          value={formValues.description}
                          onChange={handleChange}
                        />
                      </Box>
                    </Grid>
                  </div>

                  <div>
                    <Grid container spacing={3}>
                      <Grid item sm={6} xs={12}>
                        <Box
                          component="form"
                          sx={{
                            '& .MuiTextField-root': { m: 1, width: '100%' },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <div>
                            <p>Ảnh đại diện quán *</p>
                          </div>
                          <div className={classes.upload}>
                            <input
                              type="file"
                              name="front"
                              placeholder="upload an image"
                              onChange={handleUploadAvatar}
                            />
                          </div>
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
                          <div>
                            <p>Ảnh bìa quán *</p>
                          </div>
                          <div className={classes.upload}>
                            <input
                              type="file"
                              name="front"
                              placeholder="upload an image"
                              onChange={handleUploadCoverImage}
                            />
                          </div>
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
                          <div>
                            <p>Chứng nhận thực phẩm sạch *</p>
                          </div>
                          <div className={classes.upload}>
                            <input
                              type="file"
                              name="back"
                              placeholder="upload an image"
                              onChange={handleUploadCerti}
                            />
                          </div>
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
                          <div>
                            <p>Menu *</p>
                          </div>
                          <div className={classes.upload}>
                            <input
                              type="file"
                              name="menu"
                              placeholder="upload an image"
                              onChange={handleUploadMenu}
                            />
                          </div>
                        </Box>
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <Grid container spacing={2}>
                    <Grid item sm={12} xs={12}>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <label style={{ textAlign: 'center', width: '100%' }}>
                          <FormGroup style={{ margin: '0 auto', width: '65%' }}>
                            <FormControlLabel
                              control={
                                <Checkbox onChange={() => setAccept(!accept)} />
                              }
                              label="Tôi đồng ý với điều khoản dịch vụ và chính sách bảo mật"
                            />
                          </FormGroup>
                        </label>
                      </Box>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <Button
                          type="submit"
                          disabled={accept == false}
                          className={classes.btnSubmit}
                          style={{ width: '50%' }}
                          variant="contained"
                          component="span"
                          onClick={SubmitAll}
                        >
                          ĐĂNG KÝ
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </>
            )}
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
                {props.sellerRegister.message}
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

SellerRegister.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sellerRegister: makeSelectSellerRegister(),
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
)(SellerRegister);
