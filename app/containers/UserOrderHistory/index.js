/**
 *
 * UserOrderHistory
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
import { Box, Grid, TextField, Container, Avatar, Backdrop } from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import { NavLink, useHistory } from 'react-router-dom';
import moment from 'moment';
import makeSelectUserOrderHistory from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getUser } from '../../utils/common';
import { getOrderById } from './actions';
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
  font: {
    fontFamily: 'sans-serif',
    margin: '0',
  },
  center: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'right',
  },
  link: {
    textDecoration: 'none',
  },
}));
export function UserOrderHistory(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'userOrderHistory', reducer });
  useInjectSaga({ key: 'userOrderHistory', saga });

  const classes = useStyles();
  const [searched, setSearched] = useState('');
  const user = getUser();
  const history = useHistory();
  let dollarUSLocale = Intl.NumberFormat('en-US');

  const requestSearch = searchedVal => {
    // const filteredRows = props.dashboardStore.listStore.filter((row) => {
    //   return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    // });
    // setData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };

  useEffect(() => {
    const data = {
      id: user.id,
    };
    dispatch(getOrderById(data));
  }, []);

  const handleComment = (item, store) => {
    const location = {
      pathname: `/user/rating-comment/${item.food.id}`,
      state: {
        fid: item.food.id,
        sid: store.store.id,
      },
    };
    history.push(location);
  };

  const orderDetail = id => {
    const location = {
      pathname: `/user/order-history/${id}`,
      state: {
        id,
      },
    };
    history.push(location);
  };

  const toStoreProfile = (id) => {
    const location = {
      pathname: `/store-profile`,
      state: {
        id: id
      },
    };
    history.push(location);
  }
  

  return (
    <>
      <div>
        <div>
          <p
            className={classes.font}
            style={{ fontWeight: '500', fontSize: '25px' }}
          >
            Lịch sử mua hàng
          </p>
          <p
            className={classes.font}
            style={{ fontWeight: 'lighter', fontSize: '15px' }}
          >
            Quản lý thông tin để bảo mật tài khoản
          </p>
        </div>
        <hr />
        <Grid item xs={12} md={12} sm={12} style={{ margin: '20px 0' }}>
          <SearchBar
            value={searched}
            onChange={searchVal => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
            placeholder="Tìm kiếm theo tên shop hoặc tên sản phẩm"
          />
        </Grid>

        <div>
          <Grid container spacing={0}>
            <Grid item xs={12} md={3} sm={12} className={classes.center} style={{justifyContent: "center"}}>
              <Button
                // onClick={() => handleComment(item1, item)}
                className={classes.btn}
                variant="outlined"
              >
                mới
              </Button>
            </Grid>
            <Grid item xs={12} md={3} sm={12} className={classes.center} style={{justifyContent: "center"}}>
              <Button
                // onClick={() => handleComment(item1, item)}
                className={classes.btn}
                variant="outlined"
              >
                đang chờ
              </Button>
            </Grid>
            <Grid item xs={12} md={3} sm={12} className={classes.center} style={{justifyContent: "center"}}>
              <Button
                // onClick={() => handleComment(item1, item)}
                className={classes.btn}
                variant="outlined"
              >
                đã thanh toán
              </Button>
            </Grid>
            <Grid item xs={12} md={3} sm={12} className={classes.center} style={{justifyContent: "center"}}>
              <Button
                // onClick={() => handleComment(item1, item)}
                className={classes.btn}
                variant="outlined"
              >
                đã hủy
              </Button>
            </Grid>
          </Grid>
        </div>

        {props.userOrderHistory.orderList.slice(0).reverse().map((item, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #000',
              padding: '10px',
              margin: '10px 0',
            }}
          >
            <Grid container spacing={0} style={{ padding: '10px' }}>
              <Grid item xs={12} md={6} sm={12}>
                <span
                  style={{
                    marginRight: ' 10px',
                    fontWeight: '400',
                    fontSize: '20px',
                  }}
                >
                  <span style={{ cursor: "pointer", color: "#000" }} onClick={() => toStoreProfile(item.store.id)}>{item.store.name}</span>

                </span>
                {/* <Button className={classes.btn} variant="outlined">
                  Xem Store
                </Button> */}
              </Grid>
              <Grid
                item
                xs={12}
                md={2}
                sm={12}
                className={classes.center}
                style={{ justifyContent: 'center' }}
              >
                {moment(item.createdAt).subtract(1, "days").format('DD/MM/YYYY')}
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                sm={12}
                className={classes.center}
                style={{
                  color: '#20D167',
                  fontWeight: '400',
                  fontSize: '20px',
                }}
              >
                {item.status}
              </Grid>
            </Grid>
            <hr />
            {item.orderItem_foods.map((item1, index1) => (
              <div key={index1}>
                <Grid container spacing={0} style={{ padding: '10px' }}>
                  <Grid item xs={12} md={6} sm={12}>
                    <Grid container spacing={0} style={{ padding: '10px' }}>
                      <Grid item xs={12} md={2} sm={12}>
                        <Avatar
                          variant="square"
                          src="https://i.ytimg.com/vi/A_o2qfaTgKs/maxresdefault.jpg"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={10}
                        sm={12}
                        onClick={() => orderDetail(item.id)}
                      >
                        {item1.food.name} <br />x{item1.quantity}
                      </Grid>
                      <Grid item xs={12} md={12} sm={12}>
                        <Button
                          onClick={() => handleComment(item1, item)}
                          className={classes.btn}
                          variant="outlined"
                        >
                          Đánh giá
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} sm={12} className={classes.center}>
                    {dollarUSLocale.format(item1.food.price)} VND
                  </Grid>
                </Grid>
                <hr />
              </div>
            ))}
            <Grid container spacing={0} style={{ padding: '10px' }}>
              <Grid item xs={12} md={6} sm={12}>
                {/* <Button onClick={() => handleComment()} className={classes.btn} variant="outlined">
                  Đánh giá
                </Button> */}
              </Grid>
              <Grid item xs={12} md={6} sm={12} className={classes.center}>
                Tổng số tiền: {dollarUSLocale.format(item.total_price)} VND
              </Grid>
            </Grid>
            <hr />
          </div>
        ))}

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={props.userOrderHistory.loading}
        //open={true}
        // onClick={handleClose}
        >
          {/* <CircularProgress color="inherit" /> */}
          <Loading />
        </Backdrop>
      </div>
      {/* <FormattedMessage {...messages.header} /> */}
    </>
  );
}

UserOrderHistory.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userOrderHistory: makeSelectUserOrderHistory(),
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
)(UserOrderHistory);
