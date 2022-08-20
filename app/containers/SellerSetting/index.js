/**
 *
 * SellerSetting
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
  TextField,
  TextareaAutosize,
  FormGroup,
  FormControl,
  MenuItem,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Grid,
  CardContent,
  Avatar,
  Backdrop,
  Switch,

} from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import makeSelectSellerSetting from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getStore, getUser } from '../../utils/common';
import { getListWards, getStoreById, reset, updateStore } from './actions';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from 'moment';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Loading from '../../components/Loading';


const useStyles = makeStyles(theme => ({
  upload: {
    backgroundColor: '#D9D9D9',
    padding: '20px',
    borderRadius: '10px',
  },
  btn: {
    position: "relative",
    width: "100%",
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
  inside: {
    width: '30%',
    margin: '0 auto',
    [theme.breakpoints.down('lg')]: {
      width: '35%',
    },
    [theme.breakpoints.down('md')]: {
      width: '60%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '65%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  marginBot: {
    marginBottom: '20px',
    padding: '5px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '5px',
    },
  },
  font: {
    margin: '0',
    fontFamily: 'san-serif',
    fontSize: '30px',
    fontWeight: '700',
  },
  input: {
    display: 'none',
  },
  center: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
  },
}));

export function SellerSetting(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'sellerSetting', reducer });
  useInjectSaga({ key: 'sellerSetting', saga });

  const classes = useStyles();
  const [imageSrc, setImageSrc] = useState();
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState();
  const [isInCampus, setIsInCampus] = useState(false);
  const [ward, setWard] = useState('');
  const user = getUser();
  const [startTime, setStartTime] = useState(new Date(null, null, null));
  const [endTime, setEndTime] = useState(new Date(null, null, null));
  const [isSubmit, setIsSubmit] = useState(false);
  const [coverImage, setCoverImage] = useState('');
  const [vertical, setVertical] = useState('top');
  const [horizontal, setHorizontal] = useState('right');
  const [openAlert, setOpenAlert] = useState(false);
  const [checked, setChecked] = useState(true);
  const [checkChangeActive, setCheckChangeActive] = useState(false);

  const initialValues = {
    name: '', phone: '', email: '', open_time: '', close_time: '', slogan: '', description: '', cover_image: '',
    avatar: '', location: '', district: '', town: '', address: '', dorm: '', room: '', owner_name: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const store = getStore();
  const [dorm, setDorm] = useState('');

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

  const handleChangeActive = (event) => {
    setChecked(event.target.checked);
    //setCheckChangeActive(true)
  };


  useEffect(() => {
    if (checkChangeActive == true) {
      // if (checked == true) {
      //   const data = {
      //     sid: storeId,
      //     fid: props.location.state.id
      //   }
      //   dispatch(activeProduct(data));
      // } else {
      //   const data = {
      //     sid: storeId,
      //     fid: props.location.state.id
      //   }
      //   dispatch(deactiveProduct(data));
      // }
    }
  }, [checked])

  const handleUploadClick = e => {
    const file1 = e.target.files[0];
    setAvatarPreview(URL.createObjectURL(file1));
    const file = e.target.files;
    const data = new FormData();
    data.append(file, file[0]);
    // setCertificate("/C/Users/anhqu/OneDrive/Desktop/" + file[0].name)
    setAvatar(file[0]);
  };

  useEffect(() => {
    const data = {
      id: store,
    };
    dispatch(getStoreById(data));
    dispatch(getListWards());
  }, []);

  useEffect(() => {
    if (props.sellerSetting.user != undefined) {
      formValues.name = props.sellerSetting.user.name;
      formValues.owner_name = props.sellerSetting.user.owner_name;
      formValues.phone = props.sellerSetting.user.phone;
      formValues.email = props.sellerSetting.user.email;
      formValues.slogan = props.sellerSetting.user.slogan;
      formValues.description = props.sellerSetting.user.description;
      setIsInCampus(props.sellerSetting.user.inCampus);
      setCoverImage(props.sellerSetting.user.storeImage.cover_image);
      if (props.sellerSetting.user.inCampus != true) {

        formValues.district = props.sellerSetting.user.otherLocation.town;
        setWard(props.sellerSetting.user.otherLocation.village);
        formValues.town = props.sellerSetting.user.otherLocation.name;
      } else {
        //formValues.dorm = props.sellerSetting.user.dormLocation.dormName;
        setDorm(props.sellerSetting.user.dormLocation.dormName)
        formValues.room = props.sellerSetting.user.dormLocation.room_number;
      }

      setAvatarPreview(props.sellerSetting.user.storeImage.avatar);
      setStartTime(`"Sun Dec 31 1899" ${props.sellerSetting.user.open_time} "GMT+0706 (Indochina Time)`);
      setEndTime(`"Sun Dec 31 1899" ${props.sellerSetting.user.close_time} "GMT+0706 (Indochina Time)`);
      setChecked(props.sellerSetting.user.actived);
    }
  }, [props.sellerSetting.user]);


  // set value for input
  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // set ward for update
  const handleChangeTypeUpdate = e => {
    setWard(e.target.value);
  };

  const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'name is required!';
    }
    // if (!values.open_time) {
    //   errors.open_time = 'open_time is required!';
    // }
    // if (!values.close_time) {
    //   errors.close_time = 'close_time is required!';
    // }
    if (!values.description) {
      errors.description = 'description is required!';
    }
    if (!values.slogan) {
      errors.slogan = 'slogan is required!';
    }
    return errors;
  };

  const handleChangeEndTime = newValue => {
    setEndTime(newValue)
  };

  const handleChangeStartTime = newValue => {
    setStartTime(newValue)
  };

  // submit
  const SubmitAll = e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const data = {
        id: store,
        name: formValues.name,
        owner_name: formValues.owner_name,
        description: formValues.description,
        slogan: 'ok',
        // phone: formValues.phone,
        // email: formValues.email,
        open_time: moment(startTime).format('HH:mm:ss'),
        close_time: moment(endTime).format('HH:mm:ss'),
        cover_image: null,
        avatar: avatar != "" ? avatar : null,
        isInCampus: isInCampus,
        location: isInCampus == false ? `[other_location]|${formValues.town}|${ward}|${formValues.district}` : `[dorm_location]|${dorm}|${formValues.room}`,
        isActived: checked
      };
      dispatch(updateStore(data));
    }
  }, [formErrors]);

  useEffect(() => {
    if (props.sellerSetting.message != "") {
      if (props.sellerSetting.message.includes("thành công")) {
        setOpenAlert(true);
        setTimeout(() => dispatch(reset()), 3000);
      }
    }
  }, [props.sellerSetting.message]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseAlert = e => {
    setOpenAlert(false);
  };


  const handleChangeDorm = (e) => {
    setDorm(e.target.value);
  }

  return (
    <div style={{ paddingRight: '15px' }}>
      <div style={{ textAlign: 'center' }}>
        <p className={classes.font}>Thay đổi thông tin cửa hàng</p>
        <div className={classes.inside}>
          <div style={{ textAlign: "right" }}>
            {checked == true ?
              <span style={{ color: "#20D167", fontWeight: "700" }}>ACTIVE</span>
              : <span style={{ color: "#FE0000", fontWeight: "700" }}>INACTIVE</span>}
            <Switch
              checked={checked}
              onChange={handleChangeActive}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
          <Grid container spacing={0}>
            <Grid item sm={12} xs={12} md={12}>
              <div
                className={classes.center}
                style={{ justifyContent: 'center' }}
              >
                <CardContent>
                  <Grid container>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
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

            <Grid item sm={12} xs={12} md={12} className={classes.marginBot}>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 0, width: '100%' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  error={
                    formErrors.name != null && formValues.name.length == ''
                  }
                  required
                  id="outlined-textarea"
                  label="Tên cửa hàng"
                  placeholder="Tên cửa hàng"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  helperText={
                    formErrors.name && formValues.name.length == ''
                      ? formErrors.name
                      : null
                  }
                />
              </Box>
            </Grid>

            {/* <Grid item sm={12} xs={12} md={6} className={classes.marginBot}>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 0, width: '100%' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  disabled
                  required
                  id="outlined-textarea"
                  label="Số điện thoại"
                  placeholder="Số điện thoại"
                  name="phone"
                  value={formValues.phone}
                />
              </Box>
            </Grid> */}

            {/* <Grid item sm={12} xs={12} md={6} className={classes.marginBot}>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 0, width: '100%' },
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
                  name="email"
                  value={formValues.email}
                />
              </Box>
            </Grid> */}

            <Grid item sm={12} xs={12} md={6} className={classes.marginBot}>
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
              </Box>
            </Grid>

            <Grid item sm={12} xs={12} md={6} className={classes.marginBot}>
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
              </Box>
            </Grid>

            <Grid item sm={12} xs={12} md={12} className={classes.marginBot}>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 0, width: '100%' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  error={
                    formErrors.slogan != null && formValues.slogan.length == ''
                  }
                  required
                  id="outlined-textarea"
                  label="Slogan"
                  placeholder="Slogan"
                  name="slogan"
                  value={formValues.slogan}
                  onChange={handleChange}
                  helperText={
                    formErrors.slogan && formValues.slogan.length == ''
                      ? formErrors.slogan
                      : null
                  }
                />
              </Box>
            </Grid>

            <Grid item sm={12} xs={12} md={12} className={classes.marginBot}>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 0, width: '100%' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  error={
                    formErrors.description != null &&
                    formValues.description.length == ''
                  }
                  required
                  id="outlined-textarea"
                  label="Mô tả"
                  placeholder="Mô tả"
                  multiline
                  name="description"
                  value={formValues.description}
                  onChange={handleChange}
                  helperText={
                    formErrors.description &&
                      formValues.description.length == ''
                      ? formErrors.description
                      : null
                  }
                />
              </Box>
            </Grid>

            {/* check dorm */}
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
              <Grid item sm={12} xs={12} md={12} className={classes.marginBot}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    disabled
                    error={
                      formErrors.district != null &&
                      formValues.district.length == ''
                    }
                    required
                    id="outlined-textarea"
                    label="Huyện"
                    placeholder="Huyện"
                    name="district"
                    value="Thạch thất"
                    onChange={handleChange}
                    helperText={
                      formErrors.district && formValues.district.length == ''
                        ? formErrors.district
                        : null
                    }
                  />
                </Box>
              </Grid>

              <Grid item sm={12} xs={12} md={12} className={classes.marginBot}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Xã</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={ward}
                      label="Xã"
                      onChange={handleChangeTypeUpdate}
                    >
                      {props.sellerSetting.listWard.map((item, index) => (
                        <MenuItem key={index} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item sm={12} xs={12} md={12} className={classes.marginBot}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    error={
                      formErrors.town != null && formValues.town.length == ''
                    }
                    required
                    id="outlined-textarea"
                    label="Thôn"
                    placeholder="Thôn"
                    name="town"
                    value={formValues.town}
                    onChange={handleChange}
                    helperText={
                      formErrors.town && formValues.town.length == ''
                        ? formErrors.town
                        : null
                    }
                  />
                </Box>
              </Grid>

              {/* <Grid item sm={12} xs={12} md={12} className={classes.marginBot}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    error={
                      formErrors.address != null &&
                      formValues.address.length == ''
                    }
                    required
                    id="outlined-textarea"
                    label="Địa chỉ"
                    placeholder="Địa chỉ"
                    name="address"
                    value={formValues.address}
                    onChange={handleChange}
                    helperText={
                      formErrors.address && formValues.address.length == ''
                        ? formErrors.address
                        : null
                    }
                  />
                </Box>
              </Grid> */}
            </> :
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

            <Grid container spacing={1} style={{ marginBottom: '15px' }}>
              <Grid item sm={6} xs={12}>
                <Button
                  onClick={() =>
                    props.history.push('/my-store/manager-product')
                  }
                  className={classes.btn}
                  variant="contained"
                  component="span"
                >
                  Trở về
                </Button>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Button
                  className={classes.btn}
                  variant="contained"
                  component="span"
                  onClick={SubmitAll}
                >
                  Thay đổi
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
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
          {props.sellerSetting.message}
        </Alert>
      </Snackbar>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.sellerSetting.loading}
      >
        <Loading />
      </Backdrop>
    </div>
  );
}

SellerSetting.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sellerSetting: makeSelectSellerSetting(),
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
)(SellerSetting);
