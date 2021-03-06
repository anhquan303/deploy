/**
 *
 * UserDetailOrder
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
import { Box, Grid, Container, Avatar } from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import makeSelectUserDetailOrder from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { cancelOrder, getOrderDetailById } from './actions';

const useStyles = makeStyles(theme => ({
  btn: {
    position: 'relative',
    width: 'fit-content',
    borderRadius: '10px',
    backgroundColor: '#ff9900',
    margin: '0 10px',
    '&:hover': {
      backgroundColor: '#FFA500',
      fontWeight: 'bold',
      color: '#000',
      boxShadow: '2rem 2rem 3rem rgba(132, 139, 200, 0.18)',
    },
  },
  center: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'right',
  },
  font: {
    fontFamily: 'sans-serif',
    margin: '0',
  },
}));

export function UserDetailOrder(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'userDetailOrder', reducer });
  useInjectSaga({ key: 'userDetailOrder', saga });

  const classes = useStyles();
  const [data, setData] = useState();
  const history = useHistory();

  useEffect(() => {
    const data = {
      id: props.location.state.id,
    };
    dispatch(getOrderDetailById(data));
  }, []);

  useEffect(() => {
    setData(props.userDetailOrder.order.orderItem_foods);
  }, [props.userDetailOrder.order]);

  const handleComment = item => {
    const location = {
      pathname: `/user/rating-comment/${item.food.id}`,
      state: {
        fid: item.food.id,
        sid: props.userDetailOrder.order.store.id,
      },
    };
    history.push(location);
  };

  const cancelOrderr = () => {
    const data = {
      id: props.location.state.id,
    };
    dispatch(cancelOrder(data));
  };

  return (
    <div>
      <Grid container spacing={0} style={{ padding: '10px' }}>
        <Grid item xs={6} md={6} sm={6}>
          <Button
            href="/user/order-history"
            className={classes.btn}
            variant="outlined"
          >
            Tr???? la??i
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
          md={6}
          sm={6}
          className={classes.center}
          style={{ justifyContent: 'right' }}
        >
          <span style={{ fontWeight: '700', fontSize: '20px' }}>
            ID ????n ha??ng:
          </span>
          <span
            style={{
              fontWeight: '700',
              fontSize: '20px',
              color: '#1168EB',
              margin: '0 10px',
            }}
          >
            #13213123
          </span>
          <span
            style={{ fontWeight: '700', fontSize: '20px', color: '#20D167' }}
          >
            {props.userDetailOrder.order != undefined
              ? props.userDetailOrder.order.status
              : null}
          </span>
        </Grid>
      </Grid>
      <hr />
      <Grid container spacing={0} style={{ padding: '10px' }}>
        <Grid item xs={12} md={4} sm={12} style={{ padding: '10px' }}>
          <div style={{ border: '1px solid #000', padding: '10px' }}>
            <p
              className={classes.font}
              style={{ fontWeight: '700', fontSize: '20px' }}
            >
              ??i??a chi?? nh????n ha??ng
            </p>
            <p
              className={classes.font}
              style={{ fontWeight: '700', fontSize: '16px', margin: '10px 0' }}
            >
              {props.userDetailOrder.order.user
                ? props.userDetailOrder.order.user.firstname
                : null}{' '}
              {props.userDetailOrder.order.user
                ? props.userDetailOrder.order.user.lastname
                : null}
            </p>
            <p
              className={classes.font}
              style={{ fontWeight: '700', fontSize: '16px', margin: '10px 0' }}
            >
              {props.userDetailOrder.order.user
                ? props.userDetailOrder.order.user.phoneNumber
                : null}
            </p>
            <p
              className={classes.font}
              style={{ fontWeight: '700', fontSize: '16px', margin: '10px 0' }}
            >
              Tro?? Tu????n C??????ng 1, Th??n 3, Tha??ch Ho??a, Tha??ch Th????t
            </p>
          </div>
        </Grid>

        <Grid item xs={12} md={8} sm={12} style={{ padding: '10px' }}>
          <div style={{ border: '1px solid #000', padding: '10px' }}>
            <div>
              <span>
                {props.userDetailOrder.order.store
                  ? props.userDetailOrder.order.store.name
                  : null}
              </span>
              <Button className={classes.btn} variant="outlined">
                Xem qua??n
              </Button>
            </div>
            <hr />

            {data
              ? data.map((item, index) => (
                <div key={index}>
                    <Grid container spacing={0} style={{ padding: '10px' }}>
                    <Grid item xs={12} md={6} sm={12}>
                      <Grid container spacing={0} style={{ padding: '10px' }}>
                          <Grid item xs={12} md={4} sm={12}>
                            <Avatar
                              variant="square"
                              src="https://i.ytimg.com/vi/A_o2qfaTgKs/maxresdefault.jpg"
                            />
                          </Grid>
                          <Grid item xs={12} md={8} sm={12}>
                            {item.food.name} <br />x{item.quantity}
                        </Grid>
                          <Grid item xs={12} md={12} sm={12}>
                          <Button
                              className={classes.btn}
                              variant="outlined"
                            onClick={() => handleComment(item)}
                          >
                              ??a??nh gia??
                          </Button>
                        </Grid>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                      md={6}
                        sm={12}
                        className={classes.center}
                    >
                        {item.price} VND
                      </Grid>
                  </Grid>
                    <hr />
                  </div>
                ))
              : null}

            <Grid container spacing={0} style={{ padding: '10px' }}>
              <Grid
                item
                xs={12}
                md={12}
                sm={12}
                className={classes.center}
                style={{ justifyContent: 'right' }}
              >
                T????ng s???? ti????n:{' '}
                {props.userDetailOrder.order
                  ? props.userDetailOrder.order.total_price
                  : null}{' '}
                VND
              </Grid>
            </Grid>

            {/* <Grid container spacing={0} style={{ padding: "10px" }}>
              <Grid item xs={12} md={6} sm={12}>
                <Grid container spacing={0} style={{ padding: "10px" }}>
                  <Grid item xs={12} md={4} sm={12}>
                    <Avatar variant="square" src="https://i.ytimg.com/vi/A_o2qfaTgKs/maxresdefault.jpg" />
                  </Grid>
                  <Grid item xs={12} md={8} sm={12}>
                    Bu??n Bo?? Hu???? <br />
                    x2
                  </Grid>
                  <Grid item xs={12} md={12} sm={12}>
                    <Button className={classes.btn} variant="outlined">
                      ??a??nh gia??
                    </Button>
                  </Grid>

                </Grid>
              </Grid>

              <Grid item xs={12} md={6} sm={12} className={classes.center}>
                40.000 VND
              </Grid>
            </Grid> */}

            {/* <hr />

            <Grid container spacing={0} style={{ padding: "10px" }}>
              <Grid item xs={12} md={12} sm={12} className={classes.center} style={{ justifyContent: "right" }}>
                T????ng s???? ti????n: 80.000 VND
              </Grid>
            </Grid> */}
          </div>
        </Grid>
      </Grid>
      <hr />
      <div>
        <Grid container spacing={0} style={{ padding: '10px' }}>
          <Grid item xs={6} md={6} sm={6}>
            <span style={{ fontSize: '20px', fontWeight: '700' }}>
              T????ng ti????n ha??ng
            </span>
          </Grid>
          <Grid item xs={6} md={6} sm={6} className={classes.center}>
            <span style={{ fontSize: '20px', fontWeight: '700' }}>
              {props.userDetailOrder.order
                ? props.userDetailOrder.order.total_price
                : null}{' '}
              VND
            </span>
          </Grid>
        </Grid>
      </div>
      <hr />
      <div>
        <Grid container spacing={0} style={{ padding: '10px' }}>
          <Grid item xs={6} md={6} sm={6}>
            <span style={{ fontSize: '20px', fontWeight: '700' }}>
              Phi?? v????n chuy????n
            </span>
          </Grid>
          <Grid item xs={6} md={6} sm={6} className={classes.center}>
            <span style={{ fontSize: '20px', fontWeight: '700' }}>0 VND</span>
          </Grid>
        </Grid>
      </div>
      <hr />
      <div>
        <Grid container spacing={0} style={{ padding: '10px' }}>
          <Grid item xs={6} md={6} sm={6}>
            <span style={{ fontSize: '20px', fontWeight: '700' }}>
              Voucher t???? qua??n
            </span>
          </Grid>
          <Grid item xs={6} md={6} sm={6} className={classes.center}>
            <span style={{ fontSize: '20px', fontWeight: '700' }}>- 0 VND</span>
          </Grid>
        </Grid>
      </div>
      <hr />
      <div>
        <Grid container spacing={0} style={{ padding: '10px' }}>
          <Grid item xs={6} md={6} sm={6}>
            <span style={{ fontSize: '20px', fontWeight: '700' }}>
              T????ng thanh toa??n
            </span>
          </Grid>
          <Grid item xs={6} md={6} sm={6} className={classes.center}>
            <span style={{ fontSize: '20px', fontWeight: '700' }}>
              {props.userDetailOrder.order
                ? props.userDetailOrder.order.total_price
                : null}{' '}
              VND
            </span>
          </Grid>
        </Grid>
      </div>
      <hr />
      <div>
        <Grid container spacing={0} style={{ padding: '10px' }}>
          <Grid item xs={6} md={6} sm={6}>
            <span style={{ fontSize: '20px', fontWeight: '700' }}>
              Ph????ng th????c thanh toa??n
            </span>
          </Grid>
          <Grid item xs={6} md={6} sm={12} className={classes.center}>
            <span style={{ fontSize: '20px', fontWeight: '700' }}>
              Thanh toa??n khi nh????n ha??ng
            </span>
          </Grid>
        </Grid>
      </div>

      <div
        className={classes.center}
        style={{ justifyContent: 'right', marginTop: '10px' }}
      >
        <Button
          className={classes.btn}
          variant="outlined"
          onClick={cancelOrderr}
        >
          Hu??y ????n ha??ng
        </Button>
      </div>
    </div>
  );
}

UserDetailOrder.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userDetailOrder: makeSelectUserDetailOrder(),
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
)(UserDetailOrder);
