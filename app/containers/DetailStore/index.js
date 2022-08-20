/**
 *
 * DetailStore
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
import makeSelectDetailStore from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { useParams } from 'react-router-dom';
import DashboardHeader from '../../components/DashboardHeader';
import ShopImage from '../../images/kinh-nghiem-mo-quan-an-nho-2.jpg';

import { Box, TextField, Menu, MenuItem } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { makeStyles, Grid, Button } from '@material-ui/core';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { approvedStore, declinedStore, getOrderByStoreId, getStoreById, reset } from './actions';
import CustomTableResponsive from '../../components/CustomTableResponsive';


const useStyles = makeStyles((theme) => ({
  information_image: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "1rem",
    boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
    transition: "0.5s",
    height: "100%",
    // backgroundImage: `url(${ShopImage})`,
    backgroundSize: "cover",
    // [theme.breakpoints.down("sm")]: {
    //   height: "200px"
    // },
    // [theme.breakpoints.between("xl", "lg")]: {
    //   height: "650px"
    // },
    // [theme.breakpoints.down("lg")]: {
    //   height: "400px"
    // },
    [theme.breakpoints.down("md")]: {
      height: "300px"
    },
  },
  information_one: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "1rem",
    boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
    transition: "0.5s",
    //height: "100%",
    marginBottom: "1rem"
  },
  approved: {
    fontWeight: "600",
    fontSize: "1.5em",
    textAlign: "center",
    color: "#2AC267",
    textTransform: "uppercase"
  },
  btnChangeStatus: {
    position: 'relative',
    width: '100%',
    borderRadius: '10px',
    backgroundColor: '#FD4444',
    color: '#fff',
    marginTop: '10px',
    '&:hover': {
      backgroundColor: '#FF1C1C',
      fontWeight: 'bold',
      color: '#fff',
      boxShadow: '2rem 2rem 3rem rgba(132, 139, 200, 0.18)',
    },
  },
  btnSearch: {
    position: 'relative',
    width: '100%',
    borderRadius: '10px',
    backgroundColor: '#FD4444',
    color: '#fff',
    marginTop: '10px',
    '&:hover': {
      backgroundColor: '#FF1C1C',
      fontWeight: 'bold',
      color: '#fff',
      boxShadow: '2rem 2rem 3rem rgba(132, 139, 200, 0.18)',
    },
  },
  verify: {
    textAlign: "center",
    marginTop: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto"
    }

  },
  information_second: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "1rem",
    boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
    transition: "0.5s",
    height: "100%",
  },
  to: {
    width: "100%"
  },
  intro: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    },
    // [theme.breakpoints.down("xl", "lg")]: {
    //   fontSize: "800"
    // }
  },
  one: {
    [theme.breakpoints.down("sm")]: {
      order: "1"
    },
    [theme.breakpoints.down("md")]: {
      order: "0"
    },
    [theme.breakpoints.down("xs")]: {
      order: "1"
    }
  },
  two: {
    [theme.breakpoints.down("sm")]: {
      order: "2"
    },
  },
  three: {
    [theme.breakpoints.down("sm")]: {
      order: "3"
    }
  },
  zero: {
    [theme.breakpoints.down("sm")]: {
      order: "0"
    },
    [theme.breakpoints.down("sm")]: {
      order: "1"
    },
    [theme.breakpoints.down("xs")]: {
      order: "0"
    }
  },
  divCheckIcon: {
    width: "100px",
    height: "100px",
    margin: "0 auto"
    // marginTop: "2.8rem",
    // marginLeft: "3rem",
    // [theme.breakpoints.down("sm")]: {
    //   width: "100%",
    //   height: "100%",
    //   margin: "0 auto"
    // },
    // [theme.breakpoints.between("md", "lg")]: {
    //   width: "100%",
    //   height: "100%",
    //   margin: "0 auto"
    // },
    // [theme.breakpoints.between("xl", "lg")]: {
    //   width: "100px",
    //   height: "100px",
    //   margin: "0 auto"
    // },
  },
  // verifyIcon: {
  //   width: "100px",
  //   height: "100px"
  //   //color: "#5890FF",
  //   // justifyContent: "center",
  //   // [theme.breakpoints.down("sm")]: {
  //   //   margin: "0 auto"
  //   // },
  //   // [theme.breakpoints.between("md", "lg")]: {
  //   //   width: "100%",
  //   //   height: "100%",
  //   // },
  //   // [theme.breakpoints.between("lg", "xl")]: {

  //   // },
  // },
  text: {
    [theme.breakpoints.between("xl", "md")]: {
      fontSize: "40px",
      fontWeight: "700",
      fontFamily: "sans-serif",
      fontStyle: "normal"
    },
    [theme.breakpoints.between("lg", "xl")]: {
      fontSize: "60px",
      fontWeight: "700",
      fontFamily: "sans-serif",
      fontStyle: "normal"
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "30px",
      fontWeight: "700",
      fontFamily: "sans-serif",
      fontStyle: "normal"
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "30px",
      fontWeight: "700",
      fontFamily: "sans-serif",
      fontStyle: "normal"
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "20px",
      fontWeight: "700",
      fontFamily: "sans-serif",
      fontStyle: "normal"
    },
  },
  cover: {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    minHeight: "65vh",
    //background: "linear-gradient(#03a9f4, #03a9f4 50%, #fff 50%, #fff 100%)"
  },
  inforStore: {
    position: "relative",
    width: "300px",
    height: "400px",
    background: "#fff",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.1)",
    borderTop: "1px solid rgba(255,255,255,0.5)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 15px 25px rgba(0,0,0,0.1)",
    top: "150px"
  },
  avatarImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overFlow: "hidden",
    transform: "translateY(30px) scale(0.5)",
    transformOrigin: "top"
  },
  img: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  content: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: "30px"
  },
  detail: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center"
  }
}));

export function DetailStore(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'detailStore', reducer });
  useInjectSaga({ key: 'detailStore', saga });


  // let param = useParams();


  const [value, setValue] = useState(new Date());
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [data, setData] = useState(props.detailStore.listOrder);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const declineStore = (e) => {
    e.preventDefault();
    const data = {
      id: props.location.state.id
    }
    dispatch(declinedStore(data));
    setAnchorEl(null);
  }

  const approveStore = (e) => {
    e.preventDefault();
    setAnchorEl(null);
    const data = {
      id: props.location.state.id
    }
    dispatch(approvedStore(data));
  }

  useEffect(() => {
    const data = {
      id: props.location.state.id
    }
    dispatch(getStoreById(data));
    dispatch(getOrderByStoreId(data));
  }, []);


  useEffect(() => {
    if (props.detailStore.message == "APPROVED SUCCESS" || props.detailStore.message == "DECLINED SUCCESS") {
      const data = {
        id: props.location.state.id
      }

      dispatch(getStoreById(data));
      dispatch(reset());
    }
  }, [props.detailStore.message]);


  useEffect(() => {
    setData(props.detailStore.listOrder);
  }, [props.detailStore.listOrder])

  const columns1 = [
    { id: 'stt', label: 'STT', minWidth: 10, align: 'center' },
    { id: 'foodName', label: 'Tên món ăn', minWidth: 100, align: 'center' },
    { id: 'price', label: 'Giá', minWidth: 100, align: 'center' },
    { id: 'quantity', label: 'Số lượng', minWidth: 100, align: 'center' },
    { id: 'totalPrice', label: 'Tổng tiền', minWidth: 100, align: 'center' },
  ]

  function createData(id, stt, foodName, price, quantity, totalPrice) {
    //const density = population / size;
    return { id, stt, foodName, price, quantity, totalPrice };
  }

  const [rows, setRows] = useState([]);

  const list = []

  data.map(item => item.orderItem_foods.map((item1, index) => {
    list.push(
      {
        id: item.id,
        foodName: item1.food.name,
        price: item1.price,
        quantity: item1.quantity,
        totalPrice: parseInt(item1.price) * parseInt(item1.quantity)
      }
    )
  }
  ))


  useEffect(() => {
    if (data) {
      setRows(list.map((item, index) =>
        createData(item.id, index + 1, item.foodName, item.price, item.quantity, item.totalPrice)
      ))

    }
  }, [data])

  return (
    <div style={{ paddingRight: "15px" }}>
      {props.detailStore.store ?
        <>
          {/* <Box sx={{ flexGrow: 1 }}> */}
          <Grid container spacing={3}>
            <Grid item md={12} sm={12} xs={12} >
              <div className={classes.cover} style={{ backgroundImage: `url(${props.detailStore.store.storeImage.cover_image})`, backgroundSize: "cover", borderRadius: "10px" }}>
                <div className={classes.inforStore}>
                  <div className={classes.avatarImage}>
                    <img src={props.detailStore.store.storeImage.avatar} alt="avatar" className={classes.img} />
                  </div>
                  <div className={classes.content}>
                    <div className={classes.details}>
                      <p className={classes.text}>{props.detailStore.store.name}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className={classes.information_image} style={{ backgroundImage: `url(${props.detailStore.store.storeImage.avatar})` }}>

                </div> */}
            </Grid>
            <Grid item md={12} sm={12} xs={12} >
              <h1>Thông tin</h1>
              <div className={classes.information_one}>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item sm={8} xs={12} className={classes.one}>

                      <div className={classes.intro}>
                        <p className={classes.text}>{props.detailStore.store.name}</p>

                        <p className={classes.text}>{props.detailStore.store.inCampus != true ?
                          <>
                            <span>{props.detailStore.store.otherLocation.name}, </span>
                            <span>{props.detailStore.store.otherLocation.village}, </span>
                            <span>{props.detailStore.store.otherLocation.town}</span>
                          </>
                          :
                          <>
                            <span>{props.detailStore.store.dormLocation.dormName}</span>
                            <span>{props.detailStore.store.dormLocation.room_number}</span>
                          </>}
                        </p>
                        <p className={classes.text}>{props.detailStore.store.phone}</p>
                        <span><h2>Chủ sở hữu: {props.detailStore.store.owner_name}</h2></span>
                        <span><h2>Số điện thoại: {props.detailStore.store.user.phoneNumber}</h2></span>
                      </div>

                    </Grid>
                    <Grid item sm={4} xs={12} className={classes.zero}>
                      <div className={classes.divCheckIcon} >
                        <CheckCircleIcon style={{ width: "100%", height: "100%", color: "#5890FF" }} />
                      </div>

                    </Grid>
                    <Grid item md={5} sm={8} xs={12} className={classes.two}>

                      <div className={classes.approved}>
                        {props.detailStore.store.status.includes("APPROVED") ? <p style={{ color: "#20D167" }}>Đang hoạt động</p> : <p style={{ color: "#FE0000" }}>Ngừng hoạt động</p>}

                      </div>

                    </Grid>
                    <Grid item md={7} sm={4} xs={12} className={classes.three}>

                      <div className={classes.verify}>
                        {props.detailStore.store.status.includes("APPROVED") ?
                          <Button variant="contained" component="span" className={classes.btnChangeStatus} style={{ width: "fit-content" }} onClick={declineStore}>
                            Chuyển trạng thái thành dừng hoạt động
                          </Button>
                          :
                          <Button variant="contained" component="span" className={classes.btnChangeStatus} style={{ width: "fit-content" }} onClick={approveStore}>
                            Chuyển trạng thái thành hoạt động
                          </Button>
                        }
                      </div>
                      {/* <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        {props.detailStore.store.status.includes("approved") ?
                          <MenuItem onClick={approveStore}>Dừng hoạt động</MenuItem> :
                          <MenuItem onClick={declineStore}>Hoạt động</MenuItem>}
                      </Menu> */}
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </Grid>
          </Grid>

          {/* <Box sx={{ flexGrow: 1 }}>
            <h1>Thông tin</h1>
            <div className={classes.information_second}>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <div style={{ textAlign: "center" }}>
                    <span><h2>Chủ sở hữu: {props.detailStore.store.owner_name}</h2></span>
                  </div>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <div style={{ textAlign: "center" }}>
                    <span><h2>Số điện thoại: {props.detailStore.store.user.phoneNumber}</h2></span>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Box> */}

          <div style={{ marginTop: "30px" }}>
            <Grid container spacing={2}>
              <Grid item md={3} sm={12} xs={12}>
                <span><h2>Đơn hàng</h2></span>
              </Grid>
              {/* <Grid item md={9} sm={12} xs={12}  >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Grid container spacing={2}>
                    <Grid item md={4} sm={3} xs={12}>

                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 0, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <DatePicker
                          label="Từ ngày"
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Box>
                    </Grid>
                    <Grid item md={4} sm={3} xs={12}>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 0, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <DatePicker
                          label="đến ngày"
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Box>
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                      <Button className={classes.btnSearch} variant="contained" component="span" >
                        Tìm kiếm
                      </Button>
                    </Grid>
                  </Grid>
                </LocalizationProvider>

              </Grid> */}
              <Grid item md={12} sm={12} xs={12}>
                <CustomTableResponsive columns={columns1} data={data} detailPage="store" rows={rows} />
              </Grid>
            </Grid>
          </div>
        </> : null}
    </div >
  );
}

DetailStore.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  detailStore: makeSelectDetailStore(),
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
)(DetailStore);
