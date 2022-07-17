/**
 *
 * DetailCustomer
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
import makeSelectDetailCustomer from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import moment from 'moment';
import { Box, Grid, Container, Avatar, Typography, Tab, Tabs, Menu, MenuItem } from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import SearchBar from "material-ui-search-bar";
import Avatar1 from '../../images/quan.jpg';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import CustomTable from '../../components/CustomTable';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { approvedUser, declinedUser, getUserById, reset } from './actions';

const useStyles = makeStyles((theme) => ({
  font: {
    fontFamily: "sans-serif",
    margin: "0"
  },
  center: {
    flexWrap: "wrap",
    alignContent: "center",
    display: "flex",
    justifyContent: "center"
  },
  btn: {
    position: "relative",
    width: "fit-content",
    borderRadius: "10px",
    backgroundColor: "#ff9900",
    margin: "10px 5px",
    "&:hover": {
      backgroundColor: "#FFA500",
      fontWeight: "bold",
      color: "#000",
      boxShadow: "2rem 2rem 3rem rgba(132, 139, 200, 0.18)",
    }
  },
  title: {
    fontWeight: "700",
    fontSize: "30px",
    fontFamily: "sans-serif",
    margin: "0"
  },
  text: {
    fontWeight: "200",
    fontSize: "20px",
    fontFamily: "sans-serif",
    margin: "0"
  },
  contact: {
    border: "1px solid #000",
    borderRadius: "10px",
    margin: "10px 0"
  }
}));

export function DetailCustomer(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'detailCustomer', reducer });
  useInjectSaga({ key: 'detailCustomer', saga });

  const currentDate = moment().format('DD-MM-YYYY');
  const classes = useStyles();
  const [searched, setSearched] = useState("");
  const [value, setValue] = useState(0);
  const action = false;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleChangeTab = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const requestSearch = (searchedVal) => {
    // const filteredRows = props.dashboardStore.listStore.filter((row) => {
    //   return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    // });
    // setData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const columns = [
    { title: "Order ID", field: "id" },
    { title: "Order At", field: "name" },
    { title: "Food", field: "owner" },
    { title: "Quantity", field: "totalOrder" },
    { title: "Price", field: "status" },
    { title: "Status", field: "contact" },
  ]

  const order = [];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const declineStore = (e) => {
    e.preventDefault();
    const data = {
      id: props.location.state.id,
      status: "Declined"
    }
    dispatch(declinedUser(data));
    setAnchorEl(null);
  }

  const approveStore = (e) => {
    e.preventDefault();
    setAnchorEl(null);
    const data = {
      id: props.location.state.id,
      status: "Approved"
    }
    dispatch(approvedUser(data));
  }

  useEffect(() => {
    const data = {
      id: props.location.state.id
    }
    dispatch(getUserById(data));
  }, []);

  useEffect(() => {
    if (props.detailCustomer.message == "APPROVED SUCCESS" || props.detailCustomer.message == "DECLINED SUCCESS") {
      const data = {
        id: props.location.state.id
      }
      dispatch(getUserById(data));
      dispatch(reset());
    }
  }, [props.detailCustomer.message]);

  console.log(props.detailCustomer.user)
  return (
    <div style={{ padding: "15px" }}>
      {props.detailCustomer.user ?
        <>
          <Grid container spacing={0} >
            <Grid item xs={6} md={6} style={{ padding: "10px" }}>
              <p className={classes.font} style={{ fontWeight: "400", fontSize: "30px" }}>{currentDate}</p>
            </Grid>
            <Grid item xs={6} md={6} style={{ padding: "10px", }}>

            </Grid>
          </Grid>
          <p className={classes.title} >User</p>
          <Grid container spacing={0} >
            <Grid item xs={12} md={4} style={{ padding: "10px" }}>
              <div style={{ padding: "10px", border: "1px solid #000", textAlign: "center", borderRadius: "10px" }}>
                <Avatar sx={{ width: 150, height: 150, margin: "5px auto" }} component="span" src={Avatar1} />
                <p className={classes.font} style={{ fontWeight: "700", fontSize: "30px" }}>{props.detailCustomer.user.firstname} {props.detailCustomer.user.lastname}</p>
                <p className={classes.text} style={{ color: "#949494" }}>{props.detailCustomer.user.email}</p>
                <p className={classes.text} >{props.detailCustomer.user.phoneNumber}</p>
                <p className={classes.text}>{props.detailCustomer.user ? props.detailCustomer.user.status : null}</p>
                <hr />
                <Button className={classes.btn} variant="outlined" startIcon={<SendRoundedIcon />}>
                  Gửi email
                </Button>
                <Button className={classes.btn} variant="outlined" startIcon={<AutorenewIcon />} onClick={handleClick}>
                  Đổi trạng thái
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={approveStore}>Approve</MenuItem>
                  <MenuItem onClick={declineStore}>Decline</MenuItem>
                </Menu>
              </div>
            </Grid>

            <Grid item xs={12} md={4} style={{ padding: "10px" }}>
              <div style={{ padding: "10px", border: "1px solid #000", borderRadius: "10px" }}>
                <p className={classes.title}>Contact</p>
                <hr />
                <div className={classes.contact}>
                  <Grid container spacing={0} >
                    <Grid item xs={2} md={2} style={{ padding: "10px" }} className={classes.center}>
                      <Avatar style={{ backgroundColor: "#FF9900", color: "#000" }}>
                        <LocalPhoneRoundedIcon />
                      </Avatar>
                    </Grid>
                    <Grid item xs={8} md={10} style={{ padding: "10px" }}>
                      <p className={classes.text}>Số điện thoại</p>
                      <p className={classes.text}>{props.detailCustomer.user.phoneNumber}</p>

                    </Grid>
                  </Grid>
                </div>

                <div className={classes.contact}>
                  <Grid container spacing={0} >
                    <Grid item xs={2} md={2} style={{ padding: "10px" }} className={classes.center}>
                      <Avatar style={{ backgroundColor: "#FF9900", color: "#000" }}>
                        <HomeRoundedIcon />
                      </Avatar>
                    </Grid>
                    <Grid item xs={8} md={10} style={{ padding: "10px" }}>
                      <p className={classes.text}>Địa chỉ</p>
                      <p className={classes.text}>Tuấn Cường 1, Thạch Hòa, Thạch Thất</p>
                    </Grid>
                  </Grid>
                </div>

                <div className={classes.contact}>
                  <Grid container spacing={0} >
                    <Grid item xs={2} md={2} style={{ padding: "10px" }} className={classes.center}>
                      <Avatar style={{ backgroundColor: "#FF9900", color: "#000" }}>
                        <AssignmentRoundedIcon />
                      </Avatar>
                    </Grid>
                    <Grid item xs={8} md={10} style={{ padding: "10px" }}>
                      <p className={classes.text}>Order gần nhất</p>
                      <p className={classes.text}>07/05/2022</p>
                    </Grid>
                  </Grid>
                </div>

              </div>
            </Grid>

            <Grid item xs={12} md={4}>
              <Grid container spacing={0} >
                <Grid item xs={12} md={12} style={{ padding: "10px" }}>
                  <div style={{ padding: "10px", border: "1px solid #000", borderRadius: "10px" }}>
                    <p className={classes.title}>Order</p>
                    <hr />
                    <div>
                      <p className={classes.font} style={{ fontWeight: "200", fontSize: "30px" }}>50 &#40;total&#41;</p>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={12} style={{ padding: "10px" }}>
                  <div style={{ padding: "10px", border: "1px solid #000", borderRadius: "10px" }}>
                    <p className={classes.title}>Order Cost</p>
                    <hr />
                    <div>
                      <p className={classes.font} style={{ fontWeight: "200", fontSize: "30px" }}>2.500.000 VND</p>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div>
            <Tabs style={{ margin: "0 auto" }} value={value} onChange={handleChangeTab} textColor="primary" indicatorColor="primary" centered>
              <Tab label="Tất cả đơn" />
              <Tab label="Đơn đã nhận" />
              <Tab label="Đơn chờ xác nhận" />
              <Tab label="Đơn đã hủy" />
            </Tabs>
          </div>
          <div>
            <CustomTable data={order} itemPerPage={5} totalItem={order.length} detailPage="" columns={columns} action={action} />
          </div>
        </> : null}
      {/* <Helmet>
        <title>DetailCustomer</title>
        <meta name="description" content="Description of DetailCustomer" />
      </Helmet>
      <FormattedMessage {...messages.header} /> */}
    </div>
  );
}

DetailCustomer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  detailCustomer: makeSelectDetailCustomer(),
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
)(DetailCustomer);
