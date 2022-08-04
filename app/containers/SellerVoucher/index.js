/**
 *
 * SellerVoucher
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
import makeSelectSellerVoucher from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  Box, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  TextField, Tabs, Tab, Chip, Modal, InputAdornment, Switch, Backdrop
} from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getStore } from '../../utils/common';
import { activeVoucherById, addVoucher, deleteVoucher, getVoucherById, getVoucherByStoreId, inActiveVoucherById, reset, updateVoucherById } from './actions';
import Loading from '../../components/Loading';


const useStyles = makeStyles(theme => ({
  center: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  btn: {
    position: 'relative',
    width: 'fit-content',
    borderRadius: '10px',
    backgroundColor: '#fff',
    margin: '10px 5px',
    color: "#7158fe",
    '&:hover': {
      backgroundColor: '#fff',
      fontWeight: 'bold',
      color: '#7158fe',
      boxShadow: '2rem 2rem 3rem rgba(132, 139, 200, 0.18)',
    },
  },
  couponCard: {
    background: "linear-gradient(135deg, #FF9900, #F5BB64)",
    color: "#fff",
    textAlign: "center",
    padding: "40px 40px",
    borderRadius: "15px",
    boxShadow: "0 10px 10px 0 rgba(0, 0, 0, 0.15)",
    position: "relative"
  },
  imgCoupon: {
    width: "100px",
    borderRadius: "8px",
    marginBottom: "10px"
  },
  couponRow: {
    display: "flex",
    alignItems: "center",
    margin: "20px auto",
    width: "fit-content"
  },
  couponCode: {
    border: "1px dashed #fff",
    padding: "10px 20px",
    borderRight: "0"
  },
  couponBtn: {
    border: "1px solid #fff",
    background: "#fff",
    padding: "10px 20px",
    cursor: "pointer",
    color: "#7158fe"
  },
  circle1: {
    background: "#f0fff3",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: "-25px"
  },
  circle2: {
    background: "#f0fff3",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    right: "-25px"
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
    [theme.breakpoints.down("sm")]: {
      width: 250,
    },
    [theme.breakpoints.down("md")]: {
      width: 500,
    },
  },
}));

export function SellerVoucher(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'sellerVoucher', reducer });
  useInjectSaga({ key: 'sellerVoucher', saga });

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [copied, setCopied] = useState(false);
  const initialValues = {
    name: '', nameUpdate: '',
    percent: '', percentUpdate: '',
    minPrice: '', minPriceUpdate: '',
    quantity: '', quantityUpdate: ''
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDateUpdate, setStartDateUpdate] = useState(null);
  const [endDateUpdate, setEndDateUpdate] = useState(null);
  const store = getStore();
  const [type, setType] = useState(false);
  const [idUpdate, setIdUpdate] = useState(0);
  let dollarUSLocale = Intl.NumberFormat('en-US');
  const [openDialog, setOpenDialog] = useState(false);
  const [checked, setChecked] = useState(true);
  const [idActive, setIdAvctive] = useState(0);
  const [isChangeActive, setIsChangeActive] = useState(false);

  // set value for input
  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'required!';
    }
    if (!values.percent) {
      errors.percent = 'required!';
    }
    return errors;
  };

  const validateUpdate = values => {
    const errors = {};
    if (!values.nameUpdate) {
      errors.nameUpdate = 'required!';
    }
    if (!values.percentUpdate) {
      errors.percentUpdate = 'required!';
    }
    return errors;
  };

  // check validate
  const closeModal = (e) => {
    e.preventDefault();
    setType(false);
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  // check validate
  const closeModalUpdate = (e) => {
    e.preventDefault();
    setType(true);
    setFormErrors(validateUpdate(formValues));
    setIsSubmit(true);
  };

  // add voucher
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      if (type == false) {
        const data = {
          storeId: store,
          name: formValues.name,
          percent: formValues.percent,
          minPrice: formValues.minPrice,
          startDate: startDate,
          endDate: endDate,
          quantity: formValues.quantity,
        };
        dispatch(addVoucher(data));

      }
      if (type == true) {
        const data = {
          id: idUpdate,
          body: {
            name: formValues.nameUpdate,
            percent: formValues.percentUpdate,
            minPrice: formValues.minPriceUpdate,
            startDate: startDateUpdate,
            endDate: endDateUpdate,
            quantity: formValues.quantityUpdate
          }
        };
        dispatch(updateVoucherById(data));
      }
      setType(false);
    }
  }, [formErrors]);

  useEffect(() => {
    if (props.sellerVoucher.message != "") {
      if (props.sellerVoucher.message.includes("thành công") == true) {
        setOpen(false);
        setOpenUpdate(false);
        setOpenDialog(false);
        formValues.name = "";
        formValues.percent = "";
        formValues.minPrice = "";
        setStartDate(null);
        setEndDate(null);
        formValues.quantity = "";
        const data = {
          id: store
        }
        dispatch(getVoucherByStoreId(data));
        dispatch(reset());
      }
    }
  }, [props.sellerVoucher.message]);

  useEffect(() => {
    const data = {
      id: store
    }
    dispatch(getVoucherByStoreId(data));
  }, [])


  const getVoucherByIdd = (id) => {
    setIdUpdate(id);
    const data = {
      id: id
    }
    dispatch(getVoucherById(data));
  }

  useEffect(() => {
    if (props.sellerVoucher.voucher != undefined) {
      formValues.nameUpdate = props.sellerVoucher.voucher.name;
      formValues.minPriceUpdate = props.sellerVoucher.voucher.minPrice;
      formValues.percentUpdate = props.sellerVoucher.voucher.percent;
      setStartDateUpdate(props.sellerVoucher.voucher.startDate);
      setEndDateUpdate(props.sellerVoucher.voucher.endDate);
      formValues.quantityUpdate = props.sellerVoucher.voucher.quantity;
      setOpenUpdate(true);
    }
  }, [props.sellerVoucher.voucher])

  const handleDeleteVoucher = (id) => {
    const data = {
      id: id
    }
    dispatch(deleteVoucher(data));

  }

  const handleChangeActive = (event, id) => {
    setIdAvctive(id)
    setChecked(event.target.checked);
    setIsChangeActive(true)
  };

  useEffect(() => {
    if (checked == true && isChangeActive == true) {
      const data = {
        id: idActive
      }
      dispatch(activeVoucherById(data));
    }

    if (checked == false && isChangeActive == true) {
      const data = {
        id: idActive
      }
      dispatch(inActiveVoucherById(data));
    }
    setIsChangeActive(false)

  }, [checked, idActive]);

  // const handleOpenAdd = () => {
  //   setOpen(true);
  //   setOpenUpdate(false);
  // }
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={12} className={classes.center} style={{ padding: '10px', justifyContent: "right" }}>
          <Button className={classes.btn} variant="outlined" onClick={() => setOpen(true)}>
            Thêm voucher
          </Button>
        </Grid>

        {props.sellerVoucher.listVoucher && props.sellerVoucher.listVoucher.length != 0 ? props.sellerVoucher.listVoucher.map((item) => {
          return (
            <Grid key={item.id} item xs={12} sm={12} md={4} style={{ padding: '10px' }} >
              <div className={classes.couponCard}>
                <div>
                  {item.active == true ? <span style={{ color: "#20D167", fontWeight: "700" }}>ACTIVE</span> : <span style={{ color: "#FE0000", fontWeight: "700" }}>INACTIVE</span>}
                  <Switch
                    checked={item.active}
                    onChange={(e) => handleChangeActive(e, item.id)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </div>
                <div >
                  <img className={classes.imgCoupon} src="https://www.mssdefence.com/wp-content/uploads/2016/11/Discount-Action-Mss-Defence.png" />
                  <h3 style={{ fontSize: "20px", fontWeight: "400" }}>{item.name}</h3>
                  <div className={classes.couponRow}>
                    <span className={classes.couponCode}>{item.code}</span>

                    <CopyToClipboard text={item.code}
                      onCopy={() => setCopied(true)}>
                      <span className={classes.couponBtn}>LƯU MÃ</span>
                    </CopyToClipboard>
                  </div>
                  <p style={{ fontSize: "15px", fontFamily: "sans-serif" }}>Giảm {item.percent}% cho đơn hàng tối thiểu {dollarUSLocale.format(item.minPrice)}VND</p>
                  {item.startDate ? <p style={{ fontSize: "15px", fontFamily: "sans-serif" }}>Có giá trị sử dụng từ : {item.startDate}</p> : null}
                  {item.endDate ? <p style={{ fontSize: "15px", fontFamily: "sans-serif" }}>Có giá trị sử dụng đến : {item.endDate}</p> : null}
                  <div className={classes.circle1}></div>
                  <div className={classes.circle2}></div>
                </div>
                <div>
                  <Button
                    className={classes.btn}
                    style={{ width: '50%' }}
                    variant="contained"
                    component="span"
                    onClick={() => getVoucherByIdd(item.id)}
                  >
                    Chỉnh sửa
                  </Button>
                </div>
              </div>
            </Grid>
          )
        }) : <span>Chưa có voucher nào</span>}


      </Grid>

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
            Thêm voucher
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Grid container spacing={0} style={{ padding: '20px' }}>
              <Grid item sm={12} xs={12} style={{ width: '100%', margin: '10px 0' }}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    required
                    id="outlined-textarea"
                    label="Tên voucher"
                    placeholder="Tên voucher"
                    multiline
                    onChange={handleChange}
                    name="name"
                    value={formValues.name}
                    helperText={formErrors.name && formValues.name.length == '' ? formErrors.name : null}
                    error={formErrors.name != null && formValues.name.length == ''}
                  />
                </Box>
              </Grid>

              <Grid item sm="auto" xs="auto" style={{ width: '100%', margin: '10px 0' }}>
                <Box component="form" sx={{
                  '& .MuiTextField-root': { m: 0, width: '100%' },
                }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-textarea"
                    label="Giá trị tối thiểu"
                    placeholder="Giá trị tối thiểu"
                    multiline
                    InputProps={{
                      endAdornment: <InputAdornment position="start">VND</InputAdornment>,
                    }}
                    onChange={handleChange}
                    name="minPrice"
                    value={formValues.minPrice}
                  // helperText={formErrors.name && formValues.name.length == '' ? formErrors.name : null}
                  // error={formErrors.name != null && formValues.name.length == ''}
                  />
                </Box>
              </Grid>

              <Grid item sm="auto" xs="auto" style={{ width: '100%', margin: '10px 0' }}>
                <Box component="form" sx={{
                  '& .MuiTextField-root': { m: 0, width: '100%' },
                }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    required
                    id="outlined-textarea"
                    label="Phần trăm giảm"
                    placeholder="Phần trăm giảm"
                    multiline
                    InputProps={{
                      endAdornment: <InputAdornment position="start">%</InputAdornment>,
                    }}
                    onChange={handleChange}
                    name="percent"
                    value={formValues.percent}
                    helperText={formErrors.percent && formValues.percent.length == '' ? formErrors.percent : null}
                    error={formErrors.percent != null && formValues.percent.length == ''}

                  />
                </Box>
              </Grid>

              <Grid item sm="auto" xs="auto" style={{ width: '100%', margin: '10px 0' }}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  {/* <TextField
                    id="outlined-textarea"
                    label="Ngày bắt đầu"
                    placeholder="Ngày bắt đầu"
                    multiline
                    onChange={handleChange}
                    name="startDate"
                    value={formValues.startDate}
                  /> */}
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Ngày bắt đầu"
                      value={startDate}
                      onChange={newValue => {
                        setStartDate(newValue);
                      }}
                      renderInput={params => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>

              <Grid item sm="auto" xs="auto" style={{ width: '100%', margin: '10px 0' }}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Ngày hết hạn"
                      value={endDate}
                      onChange={newValue => {
                        setEndDate(newValue);
                      }}
                      renderInput={params => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>

              <Grid item sm="auto" xs="auto" style={{ width: '100%', margin: '10px 0' }}>
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
                    label="Số lượng"
                    placeholder="Số lượng"
                    multiline
                    onChange={handleChange}
                    name="quantity"
                    value={formValues.quantity}
                  />
                </Box>
              </Grid>
            </Grid>
          </Typography>
          <Button
            className={classes.btn}
            //style={{ width: 'fit-content' }}
            variant="contained"
            component="span"
            onClick={closeModal}
          >
            Thêm
          </Button>
        </Box>
      </Modal>

      <Modal
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
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
            Sửa voucher
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Grid container spacing={0} style={{ padding: '20px' }}>
              <Grid item sm={12} xs={12} style={{ width: '100%', margin: '10px 0' }}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    required
                    id="outlined-textarea"
                    label="Tên voucher"
                    placeholder="Tên voucher"
                    multiline
                    onChange={handleChange}
                    name="nameUpdate"
                    value={formValues.nameUpdate}
                    helperText={formErrors.nameUpdate && formValues.nameUpdate.length == '' ? formErrors.nameUpdate : null}
                    error={formErrors.nameUpdate != null && formValues.nameUpdate.length == ''}
                  />
                </Box>
              </Grid>

              <Grid item sm="auto" xs="auto" style={{ width: '100%', margin: '10px 0' }}>
                <Box component="form" sx={{
                  '& .MuiTextField-root': { m: 0, width: '100%' },
                }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-textarea"
                    label="Giá trị tối thiểu"
                    placeholder="Giá trị tối thiểu"
                    multiline
                    InputProps={{
                      endAdornment: <InputAdornment position="start">VND</InputAdornment>,
                    }}
                    onChange={handleChange}
                    name="minPriceUpdate"
                    value={formValues.minPriceUpdate}
                  // helperText={formErrors.name && formValues.name.length == '' ? formErrors.name : null}
                  // error={formErrors.name != null && formValues.name.length == ''}
                  />
                </Box>
              </Grid>

              <Grid item sm="auto" xs="auto" style={{ width: '100%', margin: '10px 0' }}>
                <Box component="form" sx={{
                  '& .MuiTextField-root': { m: 0, width: '100%' },
                }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    required
                    id="outlined-textarea"
                    label="Phần trăm giảm"
                    placeholder="Phần trăm giảm"
                    multiline
                    InputProps={{
                      endAdornment: <InputAdornment position="start">%</InputAdornment>,
                    }}
                    onChange={handleChange}
                    name="percentUpdate"
                    value={formValues.percentUpdate}
                    helperText={formErrors.percentUpdate && formValues.percentUpdate.length == '' ? formErrors.percentUpdate : null}
                    error={formErrors.percentUpdate != null && formValues.percentUpdate.length == ''}

                  />
                </Box>
              </Grid>

              <Grid item sm="auto" xs="auto" style={{ width: '100%', margin: '10px 0' }}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  {/* <TextField
                    id="outlined-textarea"
                    label="Ngày bắt đầu"
                    placeholder="Ngày bắt đầu"
                    multiline
                    onChange={handleChange}
                    name="startDate"
                    value={formValues.startDate}
                  /> */}
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Ngày bắt đầu"
                      value={startDateUpdate}
                      onChange={newValue => {
                        setStartDateUpdate(newValue);
                      }}
                      renderInput={params => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>

              <Grid item sm="auto" xs="auto" style={{ width: '100%', margin: '10px 0' }}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Ngày hết hạn"
                      value={endDateUpdate}
                      onChange={newValue => {
                        setEndDateUpdate(newValue);
                      }}
                      renderInput={params => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>

              <Grid item sm="auto" xs="auto" style={{ width: '100%', margin: '10px 0' }}>
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
                    label="Số lượng"
                    placeholder="Số lượng"
                    multiline
                    onChange={handleChange}
                    name="quantityUpdate"
                    value={formValues.quantityUpdate}
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
            onClick={closeModalUpdate}
          >
            Sửa
          </Button>
          <Button
            className={classes.btn}
            style={{ width: '50%' }}
            variant="contained"
            component="span"
            onClick={() => setOpenDialog(true)}
          >
            Xóa
          </Button>
        </Box>
      </Modal>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Bạn có chắc chắn xóa voucher này?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voucher này sẽ bị xóa vĩnh viễn nếu bạn nhấn "Xác nhận"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Trở lại</Button>
          <Button onClick={() => handleDeleteVoucher(idUpdate)} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.sellerVoucher.loading}
      >
        <Loading />
      </Backdrop>
    </div>
  );
}

SellerVoucher.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sellerVoucher: makeSelectSellerVoucher(),
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
)(SellerVoucher);
