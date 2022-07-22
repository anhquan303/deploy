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
} from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import makeSelectSellerSetting from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getStore, getUser } from '../../utils/common';
import { getListWards, getStoreById } from './actions';

const useStyles = makeStyles(theme => ({
  upload: {
    backgroundColor: '#D9D9D9',
    padding: '20px',
    borderRadius: '10px',
  },
  btn: {
    position: 'relative',
    width: '100%',
    borderRadius: '10px',
    backgroundColor: '#ff9900',
    marginTop: '10px',
    '&:hover': {
      backgroundColor: '#FFA500',
      fontWeight: 'bold',
      color: '#000',
      boxShadow: '2rem 2rem 3rem rgba(132, 139, 200, 0.18)',
    },
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
  const [isInCampus, setIsInCampus] = useState(false);
  const [ward, setWard] = useState('');
  const user = getUser();

  const initialValues = {
    name: '',
    owner_name: '',
    phone: '',
    email: '',
    open_time: '',
    close_time: '',
    slogan: '',
    description: '',
    cover_image: '',
    avatar: '',
    location: '',
    district: '',
    town: '',
    address: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const store = getStore();

  const handleUploadClick = e => {
    const file = e.target.files[0];
    // file.preview = URL.createObjectURL(file)
    setAvatar(URL.createObjectURL(file));
  };

  useEffect(
    () => () => {
      URL.revokeObjectURL(avatar);
    },
    [avatar],
  );

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
      formValues.open_time = props.sellerSetting.user.open_time;
      formValues.close_time = props.sellerSetting.user.close_time;
      formValues.slogan = props.sellerSetting.user.slogan;
      formValues.description = props.sellerSetting.user.description;
      setIsInCampus(props.sellerSetting.user.isInCampus);

      formValues.district = props.sellerSetting.user.otherLocation.town;
      setWard(props.sellerSetting.user.otherLocation.village);
      formValues.town = props.sellerSetting.user.otherLocation.name;
      // const str = props.sellerSetting.user.location.split(",");
      setAvatar(props.sellerSetting.user.storeImage.avatar);
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

  console.log(avatar);

  return (
    <div style={{ paddingRight: '15px' }}>
      <div style={{ textAlign: 'center' }}>
        <p className={classes.font}>Thay đổi thông tin cửa hàng</p>
        <div className={classes.inside}>
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
                      multiple
                      type="file"
                      onChange={handleUploadClick}
                    />
                    <label htmlFor="contained-button-file">
                      {user ? (
                        <Avatar
                          sx={{ width: 150, height: 150 }}
                          component="span"
                          src={avatar || null}
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
                  multiline
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

            <Grid item sm={12} xs={12} md={6} className={classes.marginBot}>
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
                    formErrors.phone != null && formValues.phone.length == ''
                  }
                  required
                  id="outlined-textarea"
                  label="Số điện thoại"
                  placeholder="Số điện thoại"
                  multiline
                  name="phone"
                  value={formValues.phone}
                  onChange={handleChange}
                  helperText={
                    formErrors.phone && formValues.phone.length == ''
                      ? formErrors.phone
                      : null
                  }
                />
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
                <TextField
                  error={
                    formErrors.email != null && formValues.email.length == ''
                  }
                  required
                  id="outlined-textarea"
                  label="Email"
                  placeholder="Email"
                  multiline
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  helperText={
                    formErrors.email && formValues.email.length == ''
                      ? formErrors.email
                      : null
                  }
                />
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
                <TextField
                  // error={formErrors.name != null && formValues.name.length == ""}
                  required
                  id="outlined-textarea"
                  label="Thời gian mở cửa"
                  placeholder="Thời gian mở cửa"
                  multiline
                  name="name"
                  // value={formValues.name}
                  // onChange={handleChange}
                  // helperText={formErrors.name && formValues.name.length == "" ? formErrors.name : null}
                />
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
                <TextField
                  // error={formErrors.name != null && formValues.name.length == ""}
                  required
                  id="outlined-textarea"
                  label="Thời gian đóng cửa"
                  placeholder="Thời gian đóng cửa"
                  multiline
                  name="name"
                  // value={formValues.name}
                  // onChange={handleChange}
                  // helperText={formErrors.name && formValues.name.length == "" ? formErrors.name : null}
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
                    formErrors.slogan != null && formValues.slogan.length == ''
                  }
                  required
                  id="outlined-textarea"
                  label="Slogan"
                  placeholder="Slogan"
                  multiline
                  name="name"
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
                          onChange={() => setAccept(!accept)}
                        />
                      }
                      label="Dorm"
                    />
                  </FormGroup>
                </label>
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
                  disabled
                  error={
                    formErrors.district != null &&
                    formValues.district.length == ''
                  }
                  required
                  id="outlined-textarea"
                  label="Huyện"
                  placeholder="Huyện"
                  multiline
                  name="district"
                  value={formValues.district}
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
                  multiline
                  name="name"
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
                    formErrors.address != null &&
                    formValues.address.length == ''
                  }
                  required
                  id="outlined-textarea"
                  label="Địa chỉ"
                  placeholder="Địa chỉ"
                  multiline
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
            </Grid>

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
                >
                  Thay đổi
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
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
