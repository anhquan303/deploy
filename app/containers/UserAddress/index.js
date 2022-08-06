/**
 *
 * UserAddress
 *
 */

import React, { memo, useEffect, useState, SyntheticEvent } from 'react';
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
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { makeStyles, Button, Fab, CardContent, Backdrop } from '@material-ui/core';
import SaveIcon from '@mui/icons-material/Save';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUser } from '../../utils/common';
import {
  addLocation,
  changeDefaultLocation,
  deleteLocation,
  getAllLocation,
  getListWards,
  getLocationById,
  getLocationByUserId,
  reset,
  updateLocation,
} from './actions';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectUserAddress from './selectors';
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
    justifyContent: 'right',
    paddingRight: '10px',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
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
    padding: '10px',
  },
}));

export function UserAddress(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'userAddress', reducer });
  useInjectSaga({ key: 'userAddress', saga });

  const classes = useStyles();
  const user = getUser();
  const [open, setOpen] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const initialValues = {
    address: '',
    district: 'Thạch Thất',
    town: '',
    addressUpdate: '',
    townUpdate: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [type, setType] = useState('');
  const [vertical, setVertical] = useState('top');
  const [horizontal, setHorizontal] = useState('right');
  const [openAlert, setOpenAlert] = useState(false);
  const [idUpdate, setIdUpdate] = useState('');
  const [typeUpdate, setTypeUpdate] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [idDelete, setIdDelete] = useState('');

  // get all location
  useEffect(() => {
    const data = {
      id: user.id
    }
    dispatch(getLocationByUserId(data));
    //dispatch(getAllLocation());
    dispatch(getListWards());
  }, []);

  // set value for input
  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // add loction
  const closeModal = () => {
    const data = {
      name: formValues.address,
      village: `${formValues.town}, ${type}, ${formValues.district}`,
    };
    dispatch(addLocation(data));
    setOpen(false);
    setType;
  };

  // set ward
  const handleChangeType = e => {
    setType(e.target.value);
  };

  // set ward for update
  const handleChangeTypeUpdate = e => {
    setTypeUpdate(e.target.value);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseAlert = event => {
    setOpenAlert(false);
  };

  useEffect(() => {
    if (props.userAddress.message != '') {
      const data = {
        id: user.id
      };
      setOpenAlert(true);
      dispatch(getLocationByUserId(data));
      //dispatch(getAllLocation());
      setTimeout(() => dispatch(reset()), 6000);
    }
  }, [props.userAddress.message]);

  const getLocationByIdd = id => {
    const data = {
      id,
    };
    dispatch(getLocationById(data));
  };

  // set data for update
  useEffect(() => {
    if (props.userAddress.location != undefined && props.userAddress.location != null) {
      formValues.addressUpdate = props.userAddress.location.name;
      const str = props.userAddress.location.village.split(',');
      formValues.townUpdate = str[0];
      setTypeUpdate(str[1].trim());
      setIdUpdate(props.userAddress.location.id);
      setOpenUpdateModal(true);
    }
  }, [props.userAddress.location]);

  // update location
  const updateLocation1 = id => {
    const data = {
      id,
      name: formValues.addressUpdate,
      village: `${formValues.townUpdate}, ${typeUpdate}, ${formValues.district
        }`,
    };
    dispatch(updateLocation(data));
    setOpenUpdateModal(false);
  };

  // delete location
  const deleteLocation1 = id => {
    const data = {
      id,
    };
    dispatch(deleteLocation(data));
    setOpenDialog(false);
  };

  const handleDialog = id => {
    setIdDelete(id);
    setOpenDialog(true);
  };

  const handleSetDefault = (id) => {
    const data = {
      id: id
    }
    dispatch(changeDefaultLocation(data));
  }

  console.log(props.userAddress.locationUser)

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={6} md={6}>
          <div>
            <p
              className={classes.font}
              style={{ fontWeight: '500', fontSize: '25px' }}
            >
              Địa chỉ của tôi
            </p>
            <p
              className={classes.font}
              style={{ fontWeight: 'lighter', fontSize: '15px' }}
            >
              Quản lý thông tin để bảo mật tài khoản
            </p>
          </div>
        </Grid>
        <Grid item xs={6} md={6}>
          <div style={{ textAlign: 'right' }}>
            <Button
              className={classes.btn}
              variant="outlined"
              startIcon={<HomeRoundedIcon />}
              onClick={() => setOpen(true)}
            >
              Thêm địa chỉ
            </Button>
          </div>
        </Grid>
      </Grid>

      <hr />
      {props.userAddress.locationUser != null ? props.userAddress.locationUser.map((item, index) => (
        <div key={index}>
          <Grid container spacing={0}>
            <Grid item xs={12} md={8} className={classes.center}>
              <Grid container spacing={0}>
                <Grid item xs={3} md={3}>
                  <p
                    className={classes.font}
                    style={{
                      fontWeight: '500',
                      fontSize: '20px',
                      color: '#7E7E7E',
                      textAlign: 'right',
                    }}
                  >
                    Họ và tên
                  </p>
                </Grid>
                <Grid item xs={9} md={9}>
                  <p
                    className={classes.font}
                    style={{
                      fontWeight: '500',
                      fontSize: '20px',
                      color: '#000',
                      textAlign: 'left',
                      paddingLeft: '10px',
                    }}
                  >
                    {user.firstname} {user.lastname}
                  </p>
                </Grid>
              </Grid>
              <Grid container spacing={0}>
                <Grid item xs={3} md={3}>
                  <p
                    className={classes.font}
                    style={{
                      fontWeight: '500',
                      fontSize: '20px',
                      color: '#7E7E7E',
                      textAlign: 'right',
                    }}
                  >
                    Số điện thoại
                  </p>
                </Grid>
                <Grid item xs={9} md={9}>
                  <p
                    className={classes.font}
                    style={{
                      fontWeight: '500',
                      fontSize: '20px',
                      color: '#000',
                      textAlign: 'left',
                      paddingLeft: '10px',
                    }}
                  >
                    {user.phone}
                  </p>
                </Grid>
              </Grid>
              <Grid container spacing={0}>
                <Grid item xs={3} md={3}>
                  <p
                    className={classes.font}
                    style={{
                      fontWeight: '500',
                      fontSize: '20px',
                      color: '#7E7E7E',
                      textAlign: 'right',
                    }}
                  >
                    Địa chỉ
                  </p>
                </Grid>
                <Grid item xs={9} md={9}>
                  <p
                    className={classes.font}
                    style={{
                      fontWeight: '500',
                      fontSize: '20px',
                      color: '#000',
                      paddingLeft: '10px',
                    }}
                  >
                    {item.name} - {item.village}
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              className={classes.center}
              style={{ justifyContent: 'right' }}
            >
              <div>
                <p style={{ textAlign: 'right' }}>
                  <Button
                    className={classes.btn}
                    variant="outlined"
                    startIcon={<SettingsIcon />}
                    onClick={() => getLocationByIdd(item.id)}
                  >
                    Sửa
                  </Button>
                </p>
                <p style={{ textAlign: 'right' }}>
                  <Button disabled={item.defaultLocation == true} className={classes.btn} variant="outlined" onClick={() => handleSetDefault(item.id)}>
                    Chọn mặc định
                  </Button>
                </p>
                <p style={{ textAlign: 'right' }}>
                  <Button
                    className={classes.btn}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDialog(item.id)}
                  >
                    Xóa
                  </Button>
                </p>
              </div>
            </Grid>
          </Grid>
          <hr />
        </div>
      )) : null}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginTop: '10px' }}
          >
            Thêm địa chỉ
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Grid container spacing={0} style={{ padding: '20px' }}>
              <Grid
                item
                sm={12}
                xs={12}
                style={{ width: '100%', margin: '10px 0' }}
              >
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

              <Grid
                item
                sm={12}
                xs={12}
                style={{ width: '100%', margin: '10px 0' }}
              >
                <div style={{ width: '100%' }}>
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
                        value={type}
                        label="Xã"
                        onChange={handleChangeType}
                      >
                        {props.userAddress.listWard.map((item, index) => (
                          <MenuItem key={index} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </Grid>

              <Grid
                item
                sm="auto"
                xs="auto"
                style={{ width: '100%', margin: '10px 0' }}
              >
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
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
                    name="town"
                    value={formValues.town}
                    helperText={
                      formErrors.town && formValues.town.length == ''
                        ? formErrors.town
                        : null
                    }
                    error={formErrors.town != null && formValues.town == ''}
                  />
                </Box>
              </Grid>

              <Grid
                item
                sm="auto"
                xs="auto"
                style={{ width: '100%', margin: '10px 0' }}
              >
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-textarea"
                    label="Địa chỉ"
                    placeholder="Địa chỉ"
                    multiline
                    onChange={handleChange}
                    name="address"
                    value={formValues.address}
                    helperText={
                      formErrors.address && formValues.address.length == ''
                        ? formErrors.address
                        : null
                    }
                    error={
                      formErrors.address != null && formValues.address == ''
                    }
                  />
                </Box>
              </Grid>
            </Grid>
          </Typography>
          <Button
            className={classes.btn}
            style={{ width: '50%' }}
            variant="contained"
            component="span"
            onClick={closeModal}
          >
            Thêm
          </Button>
        </Box>
      </Modal>

      <Modal
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginTop: '10px' }}
          >
            Sửa địa chỉ
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Grid container spacing={0} style={{ padding: '20px' }}>
              <Grid
                item
                sm={12}
                xs={12}
                style={{ width: '100%', margin: '10px 0' }}
              >
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

              <Grid
                item
                sm={12}
                xs={12}
                style={{ width: '100%', margin: '10px 0' }}
              >
                <div style={{ width: '100%' }}>
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
                        value={typeUpdate}
                        label="Xã"
                        onChange={handleChangeTypeUpdate}
                      >
                        {props.userAddress.listWard.map((item, index) => (
                          <MenuItem key={index} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </Grid>

              <Grid
                item
                sm="auto"
                xs="auto"
                style={{ width: '100%', margin: '10px 0' }}
              >
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
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
                    name="townUpdate"
                    value={formValues.townUpdate}
                    helperText={
                      formErrors.townUpdate &&
                        formValues.townUpdate.length == ''
                        ? formErrors.townUpdate
                        : null
                    }
                    error={
                      formErrors.townUpdate != null &&
                      formValues.townUpdate == ''
                    }
                  />
                </Box>
              </Grid>

              <Grid
                item
                sm="auto"
                xs="auto"
                style={{ width: '100%', margin: '10px 0' }}
              >
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-textarea"
                    label="Địa chỉ"
                    placeholder="Địa chỉ"
                    multiline
                    onChange={handleChange}
                    name="addressUpdate"
                    value={formValues.addressUpdate}
                    helperText={
                      formErrors.addressUpdate &&
                        formValues.addressUpdate.length == ''
                        ? formErrors.addressUpdate
                        : null
                    }
                    error={
                      formErrors.addressUpdate != null &&
                      formValues.addressUpdate == ''
                    }
                  />
                </Box>
              </Grid>
            </Grid>
          </Typography>
          <Button
            className={classes.btn}
            style={{ width: '50%' }}
            variant="contained"
            component="span"
            onClick={() => updateLocation1(idUpdate)}
          >
            Sửa
          </Button>
        </Box>
      </Modal>



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
          {props.userAddress.message}
        </Alert>
      </Snackbar>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Bạn có chắc chắn xóa địa chỉ này?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Địa chỉ này sẽ bị xóa vĩnh viễn nếu bạn nhấn "Xác nhận"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Trở lại</Button>
          <Button onClick={() => deleteLocation1(idDelete)} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.userAddress.loading}
      >
        <Loading />
      </Backdrop>
    </div>
  );
}

UserAddress.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userAddress: makeSelectUserAddress(),
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
)(UserAddress);
