/**
 *
 * UserVoucher
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
import makeSelectUserVoucher from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  Box, Grid, IconButton, Container, Avatar, Rating, Card, CardMedia, Typography, CardContent,
  List, ListItemButton, ListItemText, TextField, Tabs, Tab, Chip, Modal, Switch
} from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import { getUser } from '../../utils/common';
import { getListVoucherByUserId, reset, userDeleteVoucherById } from './actions';

const useStyles = makeStyles(theme => ({
  btn: {
    position: 'relative',
    width: 'fit-content',
    borderRadius: '10px',
    backgroundColor: '#fff',
    margin: '0 5px',
    color: "#7158fe",
    '&:hover': {
      backgroundColor: '#fff',
      fontWeight: 'bold',
      color: '#7158fe',
      boxShadow: '2rem 2rem 3rem rgba(132, 139, 200, 0.18)',
    },
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
    background: "#fff",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: "-25px"
  },
  circle2: {
    background: "#fff",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    right: "-25px"
  },
}));

export function UserVoucher(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'userVoucher', reducer });
  useInjectSaga({ key: 'userVoucher', saga });

  const classes = useStyles();
  const user = getUser();
  let dollarUSLocale = Intl.NumberFormat('en-US');

  useEffect(() => {
    const data = {
      id: user.id
    }
    dispatch(getListVoucherByUserId(data));
  }, []);

  const handleDeleteVoucher = (vid) => {
    const data = {
      vid: vid,
      uid: user.id
    }
    dispatch(userDeleteVoucherById(data));
  }

  useEffect(() => {
    if (props.userVoucher.message.includes("thành công")) {
      const data = {
        id: user.id
      }
      dispatch(getListVoucherByUserId(data));
      dispatch(reset());
    }
  }, [props.userVoucher.message]);

  return (
    <div>
      <div>
        <p className={classes.font} style={{ fontWeight: '500', fontSize: '25px' }} >
          Voucher của tôi
        </p>
        <p className={classes.font} style={{ fontWeight: 'lighter', fontSize: '15px' }}>
          Quản lý voucher
        </p>
      </div>
      <hr />

      <Grid container spacing={0}>
        {props.userVoucher.listVoucher.length != 0 ? props.userVoucher.listVoucher.map((item) => {
          return (
            <Grid key={item.id} item xs={12} md={4} sm={12}>
              <div className={classes.couponCard}>

                <div onClick={() => getVoucherByIdd(item.id)}>
                  <img className={classes.imgCoupon} src="https://www.mssdefence.com/wp-content/uploads/2016/11/Discount-Action-Mss-Defence.png" />
                  <h3 style={{ fontSize: "20px", fontWeight: "400" }}>{item.name}</h3>
                  <div className={classes.couponRow}>
                    <span className={classes.couponCode}>{item.code}</span>
                    {/* <CopyToClipboard text={item.code}
                      onCopy={() => setCopied(true)}> */}
                    <span className={classes.couponBtn}>LƯU MÃ</span>
                    {/* </CopyToClipboard> */}
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
                    style={{ width: '100%' }}
                    variant="contained"
                    component="span"
                    onClick={() => handleDeleteVoucher(item.id)}
                  >
                    Xóa voucher
                  </Button>
                </div>
              </div>
            </Grid>
          )
        }) : <span>Bạn chưa có voucher nào</span>}
      </Grid>



    </div>
  );
}

UserVoucher.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userVoucher: makeSelectUserVoucher(),
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
)(UserVoucher);
