/**
 *
 * SellerAddProduct
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
import { Box, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { makeStyles, Grid, Button } from '@material-ui/core';
import Snackbar from '@mui/material/Snackbar';
import { addProduct, reset } from './actions';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectSellerAddProduct from './selectors';
import { getStore } from '../../utils/common';

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
  marginBot: {
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '5px',
    },
  },
}));

export function SellerAddProduct(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'sellerAddProduct', reducer });
  useInjectSaga({ key: 'sellerAddProduct', saga });
  const classes = useStyles();
  const store = getStore();

  console.log(props);

  const [type, setType] = useState('');
  const [storeId, setStoreId] = useState(store);
  const initialValues = { name: '', price: '', description: '', image: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [vertical, setVertical] = useState('top');
  const [horizontal, setHorizontal] = useState('right');
  const [isSubmit, setIsSubmit] = useState(false);

  // set value for input
  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // validate
  const HandleSubmit = e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  // set Type
  const handleChangeType = e => {
    setType(e.target.value);
  };

  // close notification
  const handleCloseToast = () => {
    setOpen(false);
  };

  const validate = values => {
    const errors = {};
    const regexPrice = /^[0-9]*$/;
    if (!values.name) {
      errors.name = 'name is required!';
    }
    if (!values.price) {
      errors.price = 'price is required!';
    }
    if (!values.description) {
      errors.description = 'description is required!';
    }
    if (regexPrice.test(values.price) == false) {
      errors.price1 = 'number only!';
    }
    return errors;
  };

  // add Product
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const data = {
        name: formValues.name,
        price: formValues.price,
        type,
        description: formValues.description,
        image: 'A',
        storeId,
      };
      dispatch(addProduct(data));
      setOpen(true);
    }
  }, [formErrors]);

  useEffect(() => {
    if (props.sellerAddProduct.message === 'ADD SUCCESSFUL') {
      props.history.push('/my-store/manager-product');
      dispatch(reset());
    }
  }, [props.sellerAddProduct.message]);

  return (
    <div style={{ paddingRight: '15px' }}>
      <div style={{ textAlign: 'center' }}>
        <p>Thêm sản phảm mới</p>
        <div className={classes.inside}>
          <form>
            <Grid container spacing={0}>
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
                    error={
                      formErrors.name != null && formValues.name.length == ''
                    }
                    required
                    id="outlined-textarea"
                    label="Tên món ăn"
                    placeholder="Tên món ăn"
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
              <Grid container spacing={1} className={classes.marginBot}>
                <Grid item sm={6} xs={12}>
                  <Box sx={{ '& .MuiTextField-root': { m: 1 } }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Type
                      </InputLabel>
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
                <Grid item sm={6} xs={12}>
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
                      helperText={
                        formErrors.price && formValues.price.length == ''
                          ? formErrors.price
                          : formErrors.price1
                            ? formErrors.price1
                            : null
                      }
                      error={
                        formErrors.price != null &&
                        formValues.price.length == ''
                          ? true
                          : formErrors.price1 != null
                      }
                    />
                  </Box>
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item sm={12} xs={12}>
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
                      error={
                        formErrors.description != null &&
                        formValues.description.length == ''
                      }
                      helperText={
                        formErrors.description &&
                        formValues.description.length == ''
                          ? formErrors.description
                          : null
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid item sm={12} xs={12}>
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
                    <input
                      type="file"
                      name="back"
                      placeholder="upload an image"
                    />
                  </div>
                </Box>
              </Grid>
              <Grid container spacing={1}>
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
                    onClick={HandleSubmit}
                  >
                    Thêm sản phẩm
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleCloseToast}
            message={props.sellerAddProduct.message}
            autoHideDuration={5000}
          />
        </div>
      </div>
    </div>
  );
}

SellerAddProduct.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sellerAddProduct: makeSelectSellerAddProduct(),
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
)(SellerAddProduct);
