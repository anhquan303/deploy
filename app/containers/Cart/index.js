/**
 *
 * Cart
 *
 */

import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  FormControlLabel,
  Container,
  Checkbox,
  IconButton,
  Avatar,
} from '@mui/material';
import { makeStyles, Grid, Button } from '@material-ui/core';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { textAlign } from '@mui/system';
import { id } from 'date-fns/locale';
import makeSelectCart from './selectors';
import reducer from './reducer';
import messages from './messages';
import Headerr from '../Headerr';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { getUser } from '../../utils/common';
import {
  addQuantityFood,
  deleteAllCart,
  deleteQuantityFood,
  getOrderCart,
  reset,
  subQuantityFood,
} from './actions';
import saga from './saga';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  bigGrid: {
    margin: '20px',
    backgroundColor: '#FFF',
    boxShadow:
      'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
  },
  smallGrid: {
    flexWrap: 'wrap',
    alignContent: 'center',
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'san-serif',
    fontSize: '16px',
    color: 'rgba(0,0,0,.8)',
    textTransform: 'capitalize',
  },
  shopCard: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'left',
    padding: '0 20px',
    height: '3.75rem',
    borderBottom: '1px solid rgba(0,0,0,1)',
  },
  itemCard: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'left',
    height: '6rem',
    borderBottom: '1px solid rgba(0,0,0,.09)',
    padding: '0 20px',
  },
  quantityNumber: {
    margin: '0 3px',
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
  },
  quantityButton: {
    display: 'flex',
    justifyContent: 'right',
    marginLeft: 'auto',
  },
}));

export function Cart(props) {
  const { dispatch } = props;

  useInjectReducer({ key: 'cart', reducer });
  useInjectSaga({ key: 'cart', saga });

  const classes = useStyles();
  const [quantity, setQuantity] = useState([
    parseInt(props.cart.listOrder.quantity),
  ]);

  const [openAlert, setOpenAlert] = useState(false);
  const user = getUser();
  const history = useLocation();
  const [vertical, setVertical] = useState('top');
  const [horizontal, setHorizontal] = useState('right');
  const [checkedList, setCheckedList] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const listTest = [];
  const newList = [];

  useEffect(() => {
    const data = {
      uid: user.id,
    };
    dispatch(getOrderCart(data));
  }, []);


  useEffect(() => {
    if (props.cart.message != '') {
      if (props.cart.message == 'SUCCESS') {
        setOpenAlert(true);
        const data = {
          uid: user.id,
        };
        dispatch(getOrderCart(data));
        setTimeout(() => dispatch(reset()), 6000);
      }
      if (props.cart.message.includes("thành công")) {
        setOpenAlert(true);
        const data = {
          uid: user.id,
        };
        dispatch(getOrderCart(data));
        setTimeout(() => dispatch(reset()), 6000);
      }
      setTimeout(() => dispatch(reset()), 6000);
    }
  }, [props.cart.message]);

  const addQuantity = id => {
    const data = {
      uid: user.id,
      fid: id,
    };
    dispatch(addQuantityFood(data));
  };

  const subQuantity = id => {
    const data = {
      uid: user.id,
      fid: id,
    };
    dispatch(subQuantityFood(data));
  };

  const deleteFood = id => {
    const data = {
      uid: user.id,
      fid: id,
    };
    dispatch(deleteQuantityFood(data));
  };

  // const handleCheck = event => {
  //   var updatedList = [...checked];
  //   if (event.target.checked) {
  //     updatedList = [...checked, event.target.value];
  //   } else {
  //     updatedList.splice(checked.indexOf(event.target.value), 1);
  //   }
  //   setChecked(updatedList);
  // };



  props.cart.listOrder ? props.cart.listOrder.map(item => item.cartFoodResponses.map(nestItem =>
    listTest.push(nestItem)
  )) : null;


  const isAllSelected = props.cart.listOrder.length > 0 && checkedList.length === listTest.length;
  //const isAllSelected =  props.cart.listOrder.length > 0 && checkedList.length === props.cart.listOrder.length;

  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll);
    setCheckedList(
      props.cart.listOrder.map(item =>
        item.cartFoodResponses.map(item1 => item1.food),
      ),
    );
    if (isCheckAll) {
      setCheckedList([]);
    }
  };

  const handleClick = (e, item) => {
    const { checked } = e.target;
    setCheckedList([...checkedList, item]);
    if (!checked) {
      setCheckedList(checkedList.filter(food => food.food.id != item.food.id));
    }
  };

  const handlePayment = () => {
    if (checkedList.length != 0) {
      const location = {
        pathname: `/payment`,
        state: {
          item: checkedList
        },
      };
      props.history.push(location);
    }

  }


  const handleChange = (event) => {
    const value = event.target.value;
    if (value === "all") {
      if (checkedList.length === listTest.length) {
        setCheckedList([]);
      } else {
        setCheckedList([]);
        props.cart.listOrder ? props.cart.listOrder.map(item => item.cartFoodResponses.map(nestItem =>
          newList.push(nestItem)
        )) : null;
        setCheckedList(newList)
      }
      //checkedList.push(props.cart.listOrder[0].cartFoodResponses[0].food) : null;
      //setCheckedList(checkedList.length === listTest.length ? [] : props.cart.listOrder.map(item => Object.assign({}, item.cartFoodResponses)));
      //return;
    }
    // const list = [...checkedList];
    // const index = list.indexOf(value);
    // index === -1 ? list.push(value) : list.splice(index, 1);
    // setCheckedList(list);
  }

  const handleDeleteAll = () => {
    const data = {
      id: user.id
    }
    dispatch(deleteAllCart(data));
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseAlert = event => {
    setOpenAlert(false);
  };
  return (
    <div>
      <Headerr />
      <Container fixed>
        <Grid container spacing={0} className={classes.bigGrid}>
          <Grid item md={4} sm={3} xs={3} className={classes.smallGrid} style={{ justifyContent: 'left' }}>
            <Checkbox
              name="selectAll"
              type="checkbox"
              id="selectAll"
              value="all"
              //onClick={handleSelectAll}
              onChange={handleChange}
              checked={isAllSelected}
            //isChecked={isCheckAll}
            />
            <div className={classes.smallGrid}>
              <span className={classes.text} ><FormattedMessage {...messages.food} /></span>
            </div>
          </Grid>
          <Grid item md={2} sm={3} xs={3} className={classes.smallGrid}>
            <span className={classes.text}>Đơn Giá</span>
          </Grid>
          <Grid item md={2} sm={2} xs={2} className={classes.smallGrid}>
            <span className={classes.text}>Số lượng</span>
          </Grid>
          <Grid item md={2} sm={2} xs={2} className={classes.smallGrid}>
            <span className={classes.text}>Số Tiền</span>
          </Grid>
          <Grid item md={2} sm={2} xs={2} className={classes.smallGrid}>
            <span className={classes.text}>Thao Tác</span>
          </Grid>
        </Grid>

        {props.cart.listOrder
          ? props.cart.listOrder.map((item, index) => (
            <div key={index}>
              {/* Store */}
              <Grid container spacing={0} className={classes.bigGrid}>
                <Grid item md={12} sm={12} xs={12} className={classes.shopCard}>
                  <Checkbox />
                  <div className={classes.smallGrid}>
                    <span className={classes.text} >{item.store.name}</span>
                  </div>
                </Grid>

                {/* Item */}
                {item.cartFoodResponses.map((item1, index) => (
                  <div style={{ width: '100%' }} key={index}>
                    <Grid item md={12} sm={12} xs={12} className={classes.itemCard}>
                      <Grid item md={4} sm={4} xs={3} className={classes.smallGrid} style={{ justifyContent: 'left' }}>
                        <Checkbox
                          type="checkbox"
                          // value={item}
                          // onChange={handleChange}
                          // checked={checkedList.includes(item1)}
                          id={item1}
                          onClick={e => handleClick(e, item1)}
                          checked={checkedList.includes(item1)}
                        />

                        <div className={classes.smallGrid}>
                          <Avatar variant="square">{item1.food.image}</Avatar>
                          <span style={{
                            flexWrap: 'wrap', marginLeft: "5px", alignContent: 'center', display: 'flex', justifyContent: 'center'
                          }} className={classes.text}>{item1.food.name}</span>
                        </div>
                      </Grid>
                      <Grid item md={2} sm={2} xs={3} className={classes.smallGrid} style={{ paddingLeft: '5px' }} >
                        <span className={classes.text}>
                          {item1.food.price}
                        </span>
                      </Grid>
                      <Grid item md={2} sm={2} xs={2} className={classes.smallGrid} style={{ paddingLeft: '20px' }}>
                        <IconButton
                          style={{ color: '#FF9900' }}
                          onClick={() => subQuantity(item1.food.id)}
                        >
                          <IndeterminateCheckBoxIcon />
                        </IconButton>
                        <span className={classes.quantityNumber}>
                          {item1.quantity}
                        </span>
                        <IconButton
                          style={{ color: '#FF9900' }}
                          onClick={() => addQuantity(item1.food.id)}
                        >
                          <AddBoxIcon />
                        </IconButton>
                      </Grid>
                      <Grid item md={2} sm={2} xs={2} className={classes.smallGrid} style={{ paddingLeft: '48px' }}>
                        <span className={classes.text}>
                          {parseInt(item1.quantity) *
                            parseInt(item1.food.price)}
                        </span>
                      </Grid>
                      <Grid item md={2} sm={2} xs={2} className={classes.quantityButton} style={{ paddingRight: '20px' }}>
                        <Button
                          variant=""
                          onClick={() => deleteFood(item1.food.id)}
                        >
                          XÓA
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </Grid>
              {/* ---- */}
            </div>
          ))
          : null}

        <Grid container spacing={0} className={classes.bigGrid}>
          <Grid
            item
            md={3}
            sm={3}
            xs={3}
            className={classes.smallGrid}
            style={{ justifyContent: 'left' }}
          >
            <Checkbox />
            <div className={classes.smallGrid}>
              <span className={classes.text}>Chọn Tất Cả</span>
            </div>
          </Grid>
          <Grid item md={3} sm={3} xs={3} className={classes.smallGrid}>
            <span className={classes.text} onClick={handleDeleteAll}>Xoá Tất Cả</span>
          </Grid>
          <Grid item md={3} sm={2} xs={2} className={classes.smallGrid}>
            <span className={classes.text}>Tổng thanh toán ( Sản phẩm):</span>
          </Grid>
          <Grid item md={3} sm={3} xs={3} className={classes.smallGrid} fixed >
            <Button onClick={() => handlePayment()} variant="contained">Mua Hàng</Button>
          </Grid>
        </Grid>
      </Container>
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
          {props.cart.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

Cart.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cart: makeSelectCart(),
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
)(Cart);
