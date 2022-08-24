/**
 *
 * SellerManagerProduct
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
import { Box, TextField, Grid, Backdrop } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { makeStyles, Button } from '@material-ui/core';
import CustomTable from '../../components/CustomTable';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectSellerManagerProduct from './selectors';
import { fetchListFood, searchFood } from './actions';
import { getStore } from '../../utils/common';
import CustomTableResponsive from '../../components/CustomTableResponsive';
import moment from 'moment';
import Loading from '../../components/Loading';

const useStyles = makeStyles(theme => ({
  information_image: {
    background: '#fff',
    padding: '10px',
    borderRadius: '5px',
    margin: '0 auto',
    boxShadow: '0 2rem 3rem rgba(132, 139, 200, 0.18)',
    transition: '0.5s',
    height: 'fit-content',
    backgroundSize: 'cover',
    width: '100%',
  },
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
  priceFrom: {
    padding: '0 20px',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '20px',
    },
  },
  search: {
    padding: '0 20px',
  },
  center: {
    textAlign: 'center',
  },
}));

export function SellerManagerProduct(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'sellerManagerProduct', reducer });
  useInjectSaga({ key: 'sellerManagerProduct', saga });

  const [nameSearch, setNameSearch] = useState('');
  const initialValues = { priceFrom: "", priceTo: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  // const [priceFrom, setPriceFrom] = useState('');
  // const [priceTo, setPriceTo] = useState('');
  const store = getStore();
  const classes = useStyles();
  let dollarUSLocale = Intl.NumberFormat('en-US');
  const [type, setType] = useState("");

  const validate = (values) => {
    const errors = {};
    const numberOnly = /^[0-9]*$/;
    if (numberOnly.test(values.priceFrom) == false) {
      errors.priceFrom = 'chỉ nhập số';
    }
    if (numberOnly.test(values.priceTo) == false) {
      errors.priceTo = 'chỉ nhập số';
    }
    if ((parseInt(values.priceTo) - parseInt(values.priceFrom)) < 0) {
      errors.priceTo1 = 'giá đến nhỏ hơn giá từ';
    }
    return errors;
  }

  // set value for input
  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const columns1 = [
    { id: 'stt', label: 'STT', minWidth: 10, align: 'center' },
    { id: 'name', label: 'Tên món ăn', minWidth: 100, align: 'center' },
    { id: 'price', label: 'Giá', minWidth: 100, align: 'center' },
    { id: 'createdAt', label: 'Tạo lúc', minWidth: 100, align: 'center' },
    { id: 'type', label: 'Loại', minWidth: 100, align: 'center' },
    { id: 'actived', label: 'Trạng thái', minWidth: 100, align: 'center' },
  ];

  function createData(id, stt, name, price, createdAt, type, actived) {
    // const density = population / size;
    return { id, stt, name, price, createdAt, type, actived };
  }

  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (props.sellerManagerProduct.foodList) {
      setRows(
        props.sellerManagerProduct.foodList.map((item, index) =>
          createData(
            item.id,
            index + 1,
            item.name,
            dollarUSLocale.format(item.price),
            moment.utc(item.createdAt).format('DD/MM/YYYY,  h:mm:ss a'),
            item.type,
            item.actived,
          ),
        ),
      );
    }
  }, [props.sellerManagerProduct.foodList]);



  useEffect(() => {
    const data = {
      id: store,
    };
    dispatch(fetchListFood(data));
  }, []);

  // set Type
  const handleChangeType = e => {
    setType(e.target.value);
  };

  const searchFood1 = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    // const data = {
    //   name: nameSearch,
    //   startPrice: formValues.priceFrom,
    //   endPrice: formValues.priceTo,
    //   id: store,
    // };
    // dispatch(searchFood(data));
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const data = {
        name: nameSearch,
        startPrice: formValues.priceFrom,
        endPrice: formValues.priceTo,
        id: store,
        type: type
      };
      dispatch(searchFood(data));
    }
  }, [formErrors]);

  const reset = (e) => {
    e.preventDefault();
    setNameSearch('');
    setType("");
    setFormValues({ ['priceFrom']: "", ['priceTo']: "" });
    //setFormValues({ ['priceTo']: "" });
  };

  return (
    <div style={{ paddingRight: '15px' }}>
      <div>
        <Grid container spacing={0} className={classes.information_image}>
          <Grid container spacing={0} style={{ marginBottom: '20px' }}>
            <Grid item md={6} sm={12} xs={12} className={classes.search}>
              <div className={classes.center}>
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
                    label="Tên món ăn"
                    placeholder="Tên món ăn"
                    value={nameSearch}
                    onChange={e => setNameSearch(e.target.value)}
                  />
                </Box>
              </div>
            </Grid>
            <Grid item md={6} sm={12} xs={12} className={classes.priceFrom}>
              <div className={classes.center}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type}
                      label="Type"
                      onChange={handleChangeType}
                    >
                      <MenuItem value=""></MenuItem>
                      <MenuItem value="BANHMI">Bánh mì</MenuItem>
                      <MenuItem value="COM">Cơm</MenuItem>
                      <MenuItem value="BUN">Bún</MenuItem>
                      <MenuItem value="PHO">Phở</MenuItem>
                      <MenuItem value="MIEN">Miến</MenuItem>
                      <MenuItem value="MY">Mỳ</MenuItem>
                      <MenuItem value="OTHER">Khác</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            {/* <Grid item md={6} sm={12} xs={12} className={classes.search}>
              <div className={classes.center}>
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
                    label="Trạng thái"
                    placeholder="Trạng thái"
                  />
                </Box>
              </div>
            </Grid> */}
            <Grid item md={6} sm={12} xs={12} className={classes.priceFrom}>
              <div className={classes.center}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Grid container spacing={2}>
                    <Grid item md={6} sm={12} xs={12}>
                      <TextField
                        id="outlined-textarea"
                        label="Giá từ"
                        placeholder="Giá từ"
                        name="priceFrom"
                        value={formValues.priceFrom}
                        onChange={handleChange}
                        helperText={formErrors.priceFrom != null ? formErrors.priceFrom : null}
                        error={formErrors.priceFrom != null ? true : null}
                      />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                      <TextField
                        id="outlined-textarea"
                        label="đến"
                        placeholder="đến"
                        name="priceTo"
                        value={formValues.priceTo}
                        onChange={handleChange}
                        helperText={
                          formErrors.priceTo != null
                            ? formErrors.priceTo
                            : formErrors.priceTo1 != null
                              ? formErrors.priceTo1
                              : null
                        }
                        error={
                          formErrors.priceTo != null
                            ? true
                            : formErrors.priceTo1 != null
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </Grid>
          </Grid>
          <Grid item md={12} sm={12} xs={12} style={{ padding: '0 30px' }}>
            <Grid container spacing={0}>
              <Grid item md={6} sm={6} xs={12}>
                <div className={classes.center}>
                  <Button
                    className={classes.btn}
                    variant="contained"
                    component="span"
                    style={{ width: 'fit-content' }}
                    onClick={reset}
                  >
                    Đặt lại
                  </Button>
                </div>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <div className={classes.center}>
                  <Button
                    className={classes.btn}
                    variant="contained"
                    component="span"
                    style={{ width: 'fit-content' }}
                    onClick={searchFood1}
                  >
                    Tìm kiếm
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Button
          onClick={() =>
            props.history.push('/my-store/manager-product/addProduct')
          }
          className={classes.btn}
          variant="contained"
          component="span"
          style={{ width: 'fit-content', display: 'block', marginLeft: 'auto' }}
        >
          Thêm sản phẩm
        </Button>
      </div>
      {/* <CustomTable data={props.sellerManagerProduct.foodList} itemPerPage={5} totalItem={props.sellerManagerProduct.foodList.length} detailPage="my-store/manager-product" columns={columns} action={action} /> */}
      {props.sellerManagerProduct.foodList ? (
        <CustomTableResponsive
          columns={columns1}
          data={props.sellerManagerProduct.foodList}
          detailPage="my-store/manager-product"
          rows={rows}
        />
      ) : null}

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.sellerManagerProduct.loading}
      >
        <Loading />
      </Backdrop>
    </div>
  );
}

SellerManagerProduct.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sellerManagerProduct: makeSelectSellerManagerProduct(),
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
)(SellerManagerProduct);
