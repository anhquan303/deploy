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
import Logo from '../../images/logoNone.png';
import BackGround from '../../images/dhfpt.png';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getUser } from '../../utils/common';
import { getListBank, getListWards, reset, sellerSignUp, verifyBankAccount } from './actions';
import CancelIcon from '@mui/icons-material/Cancel';

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
      color: '#FD4444',
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
  link: {
    textDecoration: "none",
    color: "#FD4444",
    '&:hover': {
      cursor: "pointer",
    },
  }
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
  const [openAlertFalse, setOpenAlertFalse] = useState(false);
  const [next, setNext] = useState(false);
  const [type, setType] = useState('');
  const [bank, setBank] = useState('');
  const [dorm, setDorm] = useState('');
  const classes = useStyles();
  const [openDKDV, setOpenDKDV] = useState(false);
  const [openCSBM, setOpenCSBM] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

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
      errors.name = 'tên không được bỏ trống!';
    }
    if (!values.phone) {
      errors.phone = 'số điện thoại không được bỏ trống!';
    }
    if (regexPhone.test(values.phone) == false) {
      errors.phone1 = 'format: 10 số';
    }
    if (!values.email) {
      errors.email = 'email không được bỏ trống!';
    }
    if (regexEmail.test(values.email) == false) {
      errors.email1 = 'format: abc@gmail.com';
    }
    if (isInCampus == false) {
      if (!values.village) {
        errors.village = 'thôn không được bỏ trống!';
      }
      if (!values.district) {
        errors.district = 'địa chỉ không được bỏ trống!';
      }
    } else {
      // if (!values.dorm) {
      //   errors.dorm = 'dorm is required!';
      // }
      if (!dorm) {
        errors.dorm = 'dorm không được bỏ trống!';
      }
      if (!values.room) {
        errors.room = 'phòng không được bỏ trống!';
      }
    }
    return errors;
  };

  // validate for second tab
  const validate2 = values => {
    const errors = {};
    if (!identityCardBack) {
      errors.identity_card_back = 'cccd không được bỏ trống';
    }
    if (!identityCardFront) {
      errors.identity_card_front = 'cccd không được bỏ trống';
    }
    if (!values.bankAccount) {
      errors.bankAccount = 'số tài khoản không được bỏ trống';
    }
    return errors;
  };

  // validate for third tab
  const validate3 = values => {
    const errors = {};
    if (!values.description) {
      errors.description = 'mô tả không được bỏ trống';
    }
    if (!menu) {
      errors.menu = 'menu không được bỏ trống';
    }
    if (moment(endTime).diff(startTime, 'minutes').toString().includes("-")) {
      errors.time = 'thời gian đóng cửa sai';
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
        location: isInCampus == false ? `[other_location]|${formValues.village}|${type}|${formValues.district}` : `[dorm_location]|${dorm}|${formValues.room}`,
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

  const closeModalAlertFailed = () => {
    dispatch(reset());
    setOpenAlertFalse(false);
    setNewMessage("");
  }

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
      if (props.sellerRegister.message.includes("Network Error") || props.sellerRegister.message.includes("400")) {
        setNewMessage("Size ảnh quá 600kb");
        // setTimeout(() => {
        //   setNewMessage("")
        // });
        setOpenAlertFalse(true);
      } else {
        if (props.sellerRegister.message.includes("500")) {
          //setNewMessage("Size ảnh quá 600kb");
          setOpenAlertFalse(true);
        } else {
          setOpen(true);
        }
      }


    }
  }, [props.sellerRegister.message]);

  const handleVerifyBankAccount = () => {
    const data = {
      bin: bank,
      accountNumber: formValues.bankAccount
    }
    dispatch(verifyBankAccount(data));
  }

  const handleChangeDorm = (e) => {
    setDorm(e.target.value);
  }
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
              //onChange={handleChangeTab}
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
                        disabled
                        required
                        id="outlined-textarea"
                        label="Email"
                        placeholder="Email"
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
                      disabled
                      required
                      id="outlined-textarea"
                      label="Số điện thoại liên hệ"
                      placeholder="Số điện thoại liên hệ"
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
                      {/* <Box
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
                      </Box> */}

                      <div style={{ marginLeft: '8px', width: '100%' }}>
                        <Box
                          component="form"
                          sx={{
                            '& .MuiTextField-root': { m: 1, width: '100%', marginLeft: "10px" },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Dorm
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={dorm}
                              label="Dorm"
                              onChange={handleChangeDorm}
                              MenuProps={MenuProps}

                            >
                              <MenuItem value="Dorm A" >Dorm A</MenuItem>
                              <MenuItem value="Dorm B" >Dorm B</MenuItem>
                              <MenuItem value="Dorm C" >Dorm C</MenuItem>
                              <MenuItem value="Dorm D" >Dorm D</MenuItem>
                              <MenuItem value="Dorm E" >Dorm E</MenuItem>
                              <MenuItem value="Dorm F" >Dorm F</MenuItem>
                              <MenuItem value="Dorm G" >Dorm G</MenuItem>
                              <MenuItem value="Dorm H" >Dorm H</MenuItem>
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
                          label="Phòng"
                          placeholder="Phòng"
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

                <div style={{ padding: "20px" }}><a href="/" style={{ textDecoration: "none" }}>Trở về trang chủ</a></div>
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
                          onChange={handleChange}
                          name="bankAccount"
                          value={formValues.bankAccount}
                          helperText={formErrors.bankAccount && formValues.bankAccount.length == '' ? formErrors.bankAccount : null}
                          error={formErrors.bankAccount != null && formValues.bankAccount.length == ''}
                        />

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
                            MenuProps={MenuProps}

                          >
                            {props.sellerRegister.listBank.map((item) => (
                              <MenuItem key={item.id} value={item.bin} >
                                <img src={item.logo} style={{ width: "90px", height: "50px" }} />
                                {item.shortName} - {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                      </Box>
                    </div>
                    <Grid item sm={12} xs={12}>
                      {props.sellerRegister.bankAccountName == "Account number Invalid - Số tài khoản không hợp lệ" ? <span style={{ margin: "10px 0", color: "#fe0000" }}>{props.sellerRegister.bankAccountName}</span> : <span style={{ margin: "10px 0", color: "#1168EB" }}>{props.sellerRegister.bankAccountName}</span>}
                    </Grid>
                    <div style={{ margin: "0 auto" }}>
                      <Button
                        style={{ width: 'fit-content', margin: "10px 0" }}
                        className={classes.btnBack}
                        variant="contained"
                        component="span"
                        onClick={handleVerifyBankAccount}
                      >
                        Kiểm tra tài khoản
                      </Button>
                    </div>
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
                            accept="image/*"
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
                            accept="image/*"
                            type="file"
                            name="identity_card_back"
                            placeholder="upload an image"
                            //value={identityCardBack != '' ? identityCardBack.name : null}
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
                    <Grid item sm={12} xs={12}>
                      <div style={{ padding: "20px" }}><a href="/" style={{ textDecoration: "none" }}>Trở về trang chủ</a></div>
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
                            // renderInput={(params) => <TextField {...params} />}

                            renderInput={(params) => (
                              <TextField
                                sx={{ width: '100%' }}
                                {...params}
                                helperText={formErrors.time ? formErrors.time : null}
                                error={formErrors.time != null}
                              />)}
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
                              accept="image/*"
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
                              accept="image/*"
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
                              accept="image/*"
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
                              accept="image/*"
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
                        {/* <label style={{ textAlign: 'center', width: '100%' }}>
                          <FormGroup style={{ margin: '0 auto', width: '65%' }}>
                            <FormControlLabel
                              control={
                                <Checkbox onChange={() => setAccept(!accept)} />
                              }
                              label="Tôi đồng ý với điều khoản dịch vụ và chính sách bảo mật"
                            />
                          </FormGroup>
                        </label> */}
                        <label>
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="123"
                            onChange={() => setAccept(!accept)}
                            style={{ marginLeft: '10px' }}
                          />
                          <label
                            className="custom-control-label"
                            style={{ fontFamily: "sans-serif", marginLeft: "15px", fontSize: "20px" }}
                          >
                            Tôi đồng ý với <a className={classes.link} onClick={() => setOpenDKDV(true)}>điều khoản dịch vụ</a> và <a className={classes.link} onClick={() => setOpenCSBM(true)}>chính sách bảo mật</a>
                          </label>
                        </label>


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
                          className={classes.btnBack}
                          variant="contained"
                          component="span"
                          onClick={() => setValue(1)}
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
                    <Grid item sm={12} xs={12}>
                      <div style={{ padding: "20px" }}><a href="/" style={{ textDecoration: "none" }}>Trở về trang chủ</a></div>
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

        <Modal
          open={openAlertFalse}
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
                {props.sellerRegister.message.includes("400") || props.sellerRegister.message.includes("Network") ? newMessage : props.sellerRegister.message}
              </p>
            </Typography>
            <Button
              className={classes.btnAccept}
              style={{ width: '50%' }}
              variant="contained"
              component="span"
              onClick={closeModalAlertFailed}
            >
              XÁC NHẬN
            </Button>
          </Box>
        </Modal>

        <Modal
          open={openDKDV}
          onClose={() => setOpenDKDV(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >
          <Box className={classes.modal} style={{ overflowY: "auto", height: "80%", alignContent: "center", padding: "15px" }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ marginTop: '10px', fontSize: "35px", textTransform: "uppercase" }}
            >
              Điều khoản dịch vụ
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <h3 style={{ color: "#FD4444" }}>GIỚI THIỆU</h3>
              <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                Chào mừng bạn đến với hệ thống mua bán đồ ăn No Nê. Trước khi sử dụng hệ thống No Nê hoặc tạo tài khoản No Nê,
                vui lòng đọc kỹ các Điều Khoản Dịch Vụ dưới đây và Quy Chế Hoạt Động hệ thống mua bán đồ ăn No Nê để hiểu rõ quyền lợi và nghĩa
                vụ hợp pháp của mình.
              </p>
              <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                Dịch Vụ bao gồm dịch vụ sàn giao dịch trực tuyến kết nối người tiêu dùng với nhau nhằm mang đến cơ hội kinh doanh giữa người mua
                (“Người Mua”) và người bán (“Người Bán”). Hợp đồng mua bán thật sự là trực tiếp
                giữa Người Mua và Người Bán. Các Bên liên quan đến giao dịch đó sẽ chịu trách nhiệm đối với hợp đồng mua bán giữa họ, việc đăng bán hàng
                hóa và tương tự. No Nê không can thiệp vào giao dịch giữa các Người Sử Dụng. No Nê có thể hoặc không sàng lọc trước
                Người Sử Dụng hoặc Nội Dung hoặc thông tin cung cấp bởi Người Sử Dụng. No Nê bảo lưu quyền loại bỏ bất cứ Nội Dung hoặc thông tin nào không phù hợp hoặc sai tiêu chí.
                No Nê không bảo đảm cho việc các Người Sử Dụng sẽ thực tế hoàn thành giao dịch. Lưu ý, No Nê sẽ là bên
                trung gian quản lý tình trạng hàng hóa và mua bán giữa Người Mua và Người Bán, trừ khi Người Mua và Người Bán
                thể hiện mong muốn tự giao dịch với nhau một cách rõ ràng.
              </p>
              <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                No Nê bảo lưu quyền từ chối yêu cầu mở Tài Khoản hoặc các truy cập của bạn tới Trang Shopee hoặc Dịch Vụ theo quy định pháp luật và Điều khoản dịch vụ.
              </p>

              <h3 style={{ color: "#FD4444" }}>QUYỀN RIÊNG TƯ</h3>
              <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                Cho phép No Nê thu thập, sử dụng, công bố và/hoặc xử lý các Nội Dung, dữ liệu cá nhân của bạn và Thông Tin Người Sử Dụng như được quy định trong Chính Sách Bảo Mật.
              </p>
              <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                Không tiết lộ các Thông Tin Người Sử Dụng cho bất kỳ bên thứ ba nào, hoặc bằng bất kỳ phương thức nào cho phép bất kỳ bên thứ ba nào
                được truy cập hoặc sử dụng Thông Tin Người Dùng.
              </p>

              <h3 style={{ color: "#FD4444" }}>ĐIỀU KHOẢN SỬ DỤNG</h3>
              <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                Người Sử Dụng không được phép:
              </p>
              <ul>
                <li>
                  <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                    tải lên, đăng, truyền tải hoặc bằng cách khác công khai bất cứ Nội Dung nào trái pháp luật, có hại, đe dọa, lạm dụng, quấy rối, gây hoang mang,
                    lo lắng, xuyên tạc, phỉ báng, xúc phạm, khiêu dâm, bôi nhọ, xâm phạm quyền riêng tư của người khác, gây căm phẫn, hoặc phân biệt chủng tộc, dân tộc
                    hoặc bất kỳ nội dung không đúng đắn nào khác
                  </p>
                  <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                    đăng tải, truyền tin, hoặc bằng bất kỳ hình thức nào khác hiển thị bất kỳ Nội dung nào có sự xuất hiện của người chưa thành niên hoặc sử dụng Dịch vụ
                    gây tổn hại cho người chưa thành niên dưới bất kỳ hình thức nào
                  </p>
                  <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                    khai thác hoặc thu thập bất kỳ thông tin nào liên quan đến Tài Khoản của Người  Sử Dụng khác, bao gồm bất kỳ thông tin hoặc dữ liệu cá nhân nào
                  </p>
                </li>
              </ul>

              <h3 style={{ color: "#FD4444" }}>VI PHẠM ĐIỀU KHOẢN DỊCH VỤ</h3>
              <p style={{ fontFamily: "sans-serif", textAlign: "left" }}> Việc vi phạm chính sách này có thể dẫn tới một số hành động, bao gồm bất kỳ hoặc tất cả các hành động sau:</p>
              <ul>
                <li>
                  <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                    Xóa danh mục sản phẩm
                  </p>
                </li>
                <li>
                  <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                    Chấm dứt Tài Khoản
                  </p>
                </li>
              </ul>

              <h3 style={{ color: "#FD4444" }}>HỦY ĐƠN HÀNG, TRẢ HÀNG VÀ HOÀN TIỀN</h3>
              <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                Người Mua chỉ có thể hủy đơn hàng trước khi cửa hàng xác nhận đơn hàng.
              </p>
              <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                No Nê không quản lý việc hủy đơn hàng, hoàn tiền của các đơn hàng tự giao dịch giữa Người Bán và Người Mua.
              </p>

              <h3 style={{ color: "#FD4444" }}>TRÁCH NHIỆM CỦA NGƯỜI BÁN</h3>
              <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                Người Bán phải quản lý và đảm bảo độ chính xác và đầy đủ của các thông tin chẳng hạn liên quan đến giá cả và
                chi tiết sản phẩm, số lượng sản phẩm và không được phép đăng tải các thông tin không chính xác hoặc gây nhầm lẫn.
              </p>
              <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                Giá sản phẩm được Người Bán toàn quyền quyết định. Giá
                sản phẩm nên bao gồm toàn bộ số tiền mà Người Mua cần thanh toán (ví dụ: các loại thuế, phí, v.v.) và Người Bán sẽ
                không yêu cầu Người Mua thanh toán thêm hoặc riêng bất kỳ khoản tiền nào khác. Nếu thông tin giá hàng hóa hoặc dịch
                vụ niêm yết không thể hiện rõ giá đó đã bao gồm hay chưa bao gồm những chi phí liên quan đến việc mua hàng hóa hoặc
                dịch vụ như thuế, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác thì giá này được hiểu là đã bao gồm mọi
                chi phí liên quan nói trên.
              </p>
              <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                Người bán cần thanh toán 150.000 VND/tháng cho hệ thống No Nê.
              </p>
            </Typography>

          </Box>
        </Modal>

        <Modal
          open={openCSBM}
          onClose={() => setOpenCSBM(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >
          <Box className={classes.modal} style={{ overflowY: "auto", height: "80%", alignContent: "center", padding: "15px" }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ marginTop: '10px', fontSize: "35px", textTransform: "uppercase" }}
            >
              Chính sách bảo mật
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <h3 style={{ color: "#FD4444" }}>KHI NÀO NO NÊ SẼ THU THẬP DỮ LIỆU CÁ NHÂN</h3>
              <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                Chúng tôi sẽ/có thể thu thập dữ liệu cá nhân về bạn:
              </p>
              <ul>
                <li>
                  <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                    khi bạn đăng ký và/hoặc sử dụng Các Dịch Vụ hoặc Nền tảng của chúng tôi, hoặc mở một tài khoản với chúng tôi
                  </p>
                </li>
                <li>
                  <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                    khi bạn thực hiện các giao dịch thông qua Dịch vụ của chúng tôi
                  </p>
                </li>
                <li>
                  <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                    khi bạn cung cấp ý kiến phản hồi hoặc gửi khiếu nại cho chúng tôi
                  </p>
                </li>
              </ul>

              <h3 style={{ color: "#FD4444" }}>NO NÊ SẼ THU THẬP NHỮNG DỮ LIỆU GÌ</h3>
              <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                Dữ liệu cá nhân mà No Nê có thể thu thập bao gồm:
              </p>
              <ul>
                <li>
                  <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                    họ tên
                  </p>
                </li>
                <li>
                  <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                    địa chỉ email
                  </p>
                </li>
                <li>
                  <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                    ngày sinh
                  </p>
                </li>
                <li>
                  <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                    tài khoản ngân hàng
                  </p>
                </li>
                <li>
                  <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                    địa chỉ giao nhận hàng hóa
                  </p>
                </li>
                <li>
                  <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                    số điện thoại
                  </p>
                </li>
                <li>
                  <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                    giới tính
                  </p>
                </li>
                <li>
                  <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                    thông tin sử dụng và giao dịch, bao gồm chi tiết về lịch sử tìm kiếm, giao dịch, quảng cáo và nội dung hiển thị mà tương tác với Nền Tảng, cũng như các sản phẩm và dịch vụ có liên quan của bạn
                  </p>
                </li>
                <li>
                  <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                    dữ liệu tổng hợp về nội dung người dùng sử dụng.
                  </p>
                </li>
              </ul>

              <h3 style={{ color: "#FD4444" }}>CHÚNG TÔI SỬ DỤNG THÔNG TIN BẠN CUNG CẤP CHO CHÚNG TÔI NHƯ THẾ NÀO</h3>
              <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                Chúng tôi có thể thu thập, sử dụng, tiết lộ và/hoặc xử lý dữ liệu cá nhân của bạn cho các mục đích sau đây:
              </p>
              <ul>
                <li>
                  <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                    để xem xét và/hoặc xử lý đơn đăng ký/giao dịch của bạn với chúng tôi hoặc giao dịch hay báo cáo của bạn
                  </p>
                </li>
                <li>
                  <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                    để thực thi các Điều Khoản Dịch Vụ của chúng tôi hoặc bất kỳ thỏa thuận giấy phép người dùng cuối nào áp dụng
                  </p>
                </li>
                <li>
                  <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                    để phục vụ mục đích nhận dạng, xác minh, đánh giá pháp lý hoặc để nhận biết khách hàng
                  </p>
                </li>
                <li>
                  <p style={{ fontFamily: "sans-serif", textAlign: "left" }}>
                    để lập số liệu thống kê và nghiên cứu đáp ứng yêu cầu báo cáo
                  </p>
                </li>
              </ul>


            </Typography>

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
