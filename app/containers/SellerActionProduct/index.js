/**
 *
 * SellerActionProduct
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
import makeSelectSellerActionProduct from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { useParams } from 'react-router-dom';
import { Backdrop, Box, TextField } from '@mui/material';

import { CardContent, Avatar } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { makeStyles, Grid, Button } from '@material-ui/core';
import Snackbar from '@mui/material/Snackbar';
import { activeProduct, deactiveProduct, deleteProduct, getProductById, reset, updateProduct } from './actions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getStore } from '../../utils/common';
import Switch from '@mui/material/Switch';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Loading from '../../components/Loading';


const useStyles = makeStyles((theme) => ({
  upload: {
    backgroundColor: "#D9D9D9",
    padding: "20px",
    borderRadius: "10px"
  },
  btn: {
    position: "relative",
    width: "100%",
    borderRadius: "10px",
    backgroundColor: "#ff9900",
    marginTop: "10px",
    "&:hover": {
      backgroundColor: "#FFA500",
      fontWeight: "bold",
      color: "#000",
      boxShadow: "2rem 2rem 3rem rgba(132, 139, 200, 0.18)",
    }
  },
  input: {
    display: 'none',
  },
  center: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
  },
  inside: {
    width: "25%",
    margin: "0 auto",
    [theme.breakpoints.down("lg")]: {
      width: "35%",
    },
    [theme.breakpoints.down("md")]: {
      width: "45%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "65%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    }
  },
  marginBot: {
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "5px",
    }
  },
  font: {
    margin: "0",
    fontFamily: "san-serif",
    fontSize: "30px",
    fontWeight: "700"
  }
}));


export function SellerActionProduct(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'sellerActionProduct', reducer });
  useInjectSaga({ key: 'sellerActionProduct', saga });

  let param = useParams();

  const classes = useStyles();
  const store = getStore();
  const [type, setType] = useState();
  const [storeId, setStoreId] = useState(store);
  const initialValues = { name: "", price: "", description: "", image: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("right");
  const [isSubmit, setIsSubmit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [checked, setChecked] = useState(true);
  const [foodImage, setFoodImage] = useState('');
  const [image, setImage] = useState('');


  //set value for input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  //validate
  const HandleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

  }

  //set Type
  const handleChangeType = (e) => {
    setType(e.target.value);
  };

  //close notification
  const handleCloseToast = () => {
    setOpen(false);
  }

  const validate = (values) => {
    const errors = {};
    const regexPrice = /^[0-9]*$/;
    if (!values.name) {
      errors.name = "name is required!";
    }
    if (!values.price) {
      errors.price = "price is required!";
    }
    if (!values.description) {
      errors.description = "description is required!";
    }
    if (regexPrice.test(values.price) == false) {
      errors.price1 = "number only!";
    }
    return errors;
  }

  //update Product
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const data = {
        id: props.location.state.id,
        name: formValues.name,
        price: formValues.price,
        type: type,
        description: formValues.description,
        image: image != "" ? image : null,
        storeId: storeId
      }
      dispatch(updateProduct(data));

    }

  }, [formErrors])

  const deleteProduct1 = () => {
    const data = {
      id: props.location.state.id,
      storeId: store
    }
    dispatch(deleteProduct(data));
  }

  useEffect(() => {
    if (props.sellerActionProduct.message == "DELETE SUCCESSFUL" || props.sellerActionProduct.message == "UPDATE SUCCESSFUL") {
      props.history.push("/my-store/manager-product")
      setOpen(true);
      dispatch(reset());
    }
  }, [props.sellerActionProduct.message])

  useEffect(() => {
    const data = {
      id: props.location.state.id
    }
    dispatch(getProductById(data));

  }, []);


  useEffect(() => {
    if (props.sellerActionProduct.food) {
      setType(props.sellerActionProduct.food.type);
      formValues.name = props.sellerActionProduct.food.name;
      formValues.price = props.sellerActionProduct.food.price;
      formValues.description = props.sellerActionProduct.food.description;
      formValues.image = props.sellerActionProduct.food.image;
      setFoodImage(props.sellerActionProduct.food.image);
    }
  }, [props.sellerActionProduct.food]);


  const handleChangeActive = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    if (checked == true) {
      const data = {
        sid: storeId,
        fid: props.location.state.id
      }
      dispatch(activeProduct(data));
    } else {
      const data = {
        sid: storeId,
        fid: props.location.state.id
      }
      dispatch(deactiveProduct(data));
    }
  }, [checked])

  const handleUploadClick = e => {
    const file = e.target.files[0];
    // file.preview = URL.createObjectURL(file)
    setFoodImage(URL.createObjectURL(file));
    const file1 = e.target.files;
    const data = new FormData();
    data.append(file1, file1[0]);
    setImage(file1[0]);
  };


  return (
    <div style={{ paddingRight: "15px" }}>
      <div style={{ textAlign: "center" }}>

        <p className={classes.font}>Thay đổi sản phẩm</p>
        <div className={classes.inside}>
          <div style={{ textAlign: "right" }}>
            {props.sellerActionProduct.active == "ACTIVE" ?
              <span style={{ color: "#20D167", fontWeight: "700" }}>{props.sellerActionProduct.active}</span>
              : <span style={{ color: "#FE0000", fontWeight: "700" }}>{props.sellerActionProduct.active}</span>}
            <Switch
              checked={checked}
              onChange={handleChangeActive}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
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
                  <Avatar
                    sx={{ width: 150, height: 150 }}
                    component="span"
                    src={foodImage != "" ? foodImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
                  >
                    <AddPhotoAlternateIcon />
                  </Avatar>
                </label>
              </Grid>
            </CardContent>
          </div>
          <form>
            <Grid container spacing={0} >
              <Grid item sm={12} xs={12} className={classes.marginBot}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    error={formErrors.name != null && formValues.name.length == ""}
                    required
                    id="outlined-textarea"
                    label="Tên món ăn"
                    placeholder="Tên món ăn"
                    multiline
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    helperText={formErrors.name && formValues.name.length == "" ? formErrors.name : null}
                  />
                </Box>
              </Grid>
              <Grid container spacing={1} className={classes.marginBot}>
                <Grid item sm={6} xs={12} >
                  <Box sx={{ '& .MuiTextField-root': { m: 1 }, }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Type"
                        onChange={handleChangeType}
                      >
                        <MenuItem value="ComNong">Cơm Nóng</MenuItem>
                        <MenuItem value="ComRang">Cơm Rang</MenuItem>
                        <MenuItem value="ComTam">Cơm Tấm</MenuItem>
                        <MenuItem value="NemNuong">Nem Nướng</MenuItem>
                        <MenuItem value="Pho">Phở</MenuItem>
                        <MenuItem value="Banhmi">Bánh Mì</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item sm={6} xs={12} >
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
                      label="Giá tiền"
                      placeholder="Giá tiền"
                      multiline
                      name="price"
                      value={formValues.price}
                      onChange={handleChange}
                      helperText={formErrors.price && formValues.price.length == "" ? formErrors.price : formErrors.price1 ? formErrors.price1 : null}
                      error={formErrors.price != null && formValues.price.length == "" ? true : formErrors.price1 != null ? true : false}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Grid container spacing={1} >
                <Grid item sm={12} xs={12} >
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
                      label="Mô tả"
                      placeholder="Mô tả"
                      multiline
                      name="description"
                      value={formValues.description}
                      onChange={handleChange}
                      error={formErrors.description != null && formValues.description.length == ""}
                      helperText={formErrors.description && formValues.description.length == "" ? formErrors.description : null}
                    />
                  </Box>
                </Grid>

              </Grid>
              {/* <Grid item sm={12} xs={12} >
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <p>Ảnh món ăn*</p>
                  </div>
                  <div className={classes.upload}>
                    <input type="file" name="back" placeholder="upload an image" />
                  </div>
                </Box>
              </Grid> */}
              <Grid container spacing={1} >
                <Grid item sm={12} xs={12} md={12} lg={4}>
                  <Button onClick={() => props.history.push("/my-store/manager-product")} className={classes.btn} variant="contained" component="span" >
                    Trở về
                  </Button>
                </Grid>
                <Grid item sm={12} xs={12} md={12} lg={4}>
                  <Button className={classes.btn} variant="contained" component="span" onClick={() => setOpenDialog(true)}>
                    Xóa sản phẩm
                  </Button>
                </Grid>
                <Grid item sm={12} xs={12} md={12} lg={4}>
                  <Button className={classes.btn} variant="contained" component="span" onClick={HandleSubmit}>
                    Thay đổi sản phẩm
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleCloseToast}
            message={props.sellerActionProduct.message}
            autoHideDuration={5000}
          />
          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Bạn có chắc chắn xóa sản phẩm này?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Sản phẩm này sẽ bị xóa vĩnh viễn nếu bạn nhấn "Xác nhận"
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Trở lại</Button>
              <Button onClick={deleteProduct1} autoFocus>
                Xác nhận
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.sellerActionProduct.loading}
      >
        <Loading />
      </Backdrop>
    </div>
  );
}

SellerActionProduct.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sellerActionProduct: makeSelectSellerActionProduct(),
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
)(SellerActionProduct);
