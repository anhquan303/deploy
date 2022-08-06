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
import {
  Box, Grid, Container, Avatar, Typography, Tab, Tabs, Menu, TableCell, TableBody, IconButton,
  MenuItem, Backdrop, TableContainer, Paper, Table, TableHead, TableRow, Collapse
} from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import SearchBar from "material-ui-search-bar";
import Avatar1 from '../../images/quan.jpg';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import CustomTable from '../../components/CustomTable';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { approvedUser, declinedUser, getOrderByUserId, getUserById, reset } from './actions';
import Loading from '../../components/Loading';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


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
  let dollarUSLocale = Intl.NumberFormat('en-US');
  const [data, setData] = useState(props.detailCustomer.listOrder);


  useEffect(() => {
    setData(props.detailCustomer.listOrder);
  }, [props.detailCustomer.listOrder])

  useEffect(() => {
    const data = {
      id: props.location.state.id
    }
    dispatch(getUserById(data));
    dispatch(getOrderByUserId(data));
  }, []);

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

  const columns1 = [
    { id: 'stt', label: 'STT', minWidth: 10, align: 'center' },
    { id: 'code', label: 'Mã đơn hàng', minWidth: 100, align: 'center' },
    { id: 'createAt', label: 'Thời gian', minWidth: 100, align: 'center' },
    { id: 'slogan', label: 'Slogan', minWidth: 100, align: 'center' },
    { id: 'status', label: 'Trạng thái', minWidth: 100, align: 'center' },

  ];

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
    if (props.detailCustomer.message == "APPROVED SUCCESS" || props.detailCustomer.message == "DECLINED SUCCESS") {
      const data = {
        id: props.location.state.id
      }
      dispatch(getUserById(data));
      dispatch(reset());
    }
  }, [props.detailCustomer.message]);

  console.log(props.detailCustomer.listOrder);
  let result = 0;

  const singleVal = Array.from(props.detailCustomer.listOrder ? props.detailCustomer.listOrder.map(item => item.total_price) : null);

  console.log(singleVal)

  for (var i = 0; i < singleVal.length; i++) {
    result += parseInt(singleVal[i]);
  }

  function createData(stt, code, createdAt, totalPrice, voucher, food) {
    return {
      stt,
      code,
      createdAt,
      totalPrice,
      voucher,
      food,
    };
  }


  function Row({ row }) {
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.stt}
          </TableCell>
          <TableCell align="right">{row.code}</TableCell>
          <TableCell align="right">{row.createdAt}</TableCell>
          <TableCell align="right">{row.totalPrice}</TableCell>
          <TableCell align="right">{row.voucher}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell>Tên món ăn</TableCell>
                      <TableCell align="right">Đơn giá</TableCell>
                      <TableCell align="right">Số lượng</TableCell>
                      <TableCell align="right">Thành tiền ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.food.map((food, index) => (
                      <TableRow key={food.food.id}>
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell>{food.food.name}</TableCell>
                        <TableCell align="right">{dollarUSLocale.format(food.price)}</TableCell>
                        <TableCell align="right">{food.quantity}</TableCell>
                        <TableCell align="right">{dollarUSLocale.format(food.quantity * food.price)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }


  // const rows = [
  //   createData('1', '#32465465', 6.0, 24, 4.0, 3.99),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  //   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  //   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  // ];


  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (data) {
      setRows(data.map((item, index) =>
        createData(index + 1, item.code, moment(item.createdAt).format('DD/MM/YYYY'), dollarUSLocale.format(item.total_price), item.voucherId, item.orderItem_foods)
      ))
    }
  }, [data]);

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
                {/* <Button className={classes.btn} variant="outlined" startIcon={<SendRoundedIcon />}>
                  Gửi email
                </Button> */}
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
                      <p className={classes.font} style={{ fontWeight: "200", fontSize: "30px" }}>{props.detailCustomer.listOrder ? props.detailCustomer.listOrder.length : 0} &#40;total&#41;</p>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={12} style={{ padding: "10px" }}>
                  <div style={{ padding: "10px", border: "1px solid #000", borderRadius: "10px" }}>
                    <p className={classes.title}>Order Cost</p>
                    <hr />
                    <div>
                      <p className={classes.font} style={{ fontWeight: "200", fontSize: "30px" }}> {dollarUSLocale.format(result)} VND</p>
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
            {/* <CustomTable data={order} itemPerPage={5} totalItem={order.length} detailPage="" columns={columns} action={action} /> */}

            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>STT</TableCell>
                    <TableCell align="right">Mã đơn hàng</TableCell>
                    <TableCell align="right">Thời gian</TableCell>
                    <TableCell align="right">Tổng số tiền &nbsp;(VND)</TableCell>
                    <TableCell align="right">Voucher</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <Row key={row.name} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </> : null}
      {/* <Helmet>
        <title>DetailCustomer</title>
        <meta name="description" content="Description of DetailCustomer" />
      </Helmet>
      <FormattedMessage {...messages.header} /> */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.detailCustomer.loading}
      >
        <Loading />
      </Backdrop>
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
