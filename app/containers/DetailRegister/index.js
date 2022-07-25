/**
 *
 * DetailRegister
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
import makeSelectDetailRegister from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Box, TextField } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Menu, MenuItem } from '@mui/material';
import { makeStyles, Grid, Button } from '@material-ui/core';
import ShopImage from '../../images/kinh-nghiem-mo-quan-an-nho-2.jpg';
import Menu1 from '../../images/menu.jpg';
import Certi from '../../images/mau-an-toan-thuc-pham.jpg';
import { approvedStore, declinedStore, getRegisterById, reset } from './actions';
import PendingIcon from '@mui/icons-material/Pending';

const useStyles = makeStyles((theme) => ({
  information_image: {
    background: "#fff",
    padding: "20px",
    borderRadius: "50px",
    marginTop: "1rem",
    boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
    transition: "0.5s",
    height: "100%",
    backgroundSize: "cover",
    [theme.breakpoints.down("sm")]: {
      height: "200px"
    },
    // [theme.breakpoints.between("xl", "lg")]: {
    //   height: "650px"
    // },
    // [theme.breakpoints.down("lg")]: {
    //   height: "400px"
    // },
    // [theme.breakpoints.down("md")]: {
    //   height: "300px"
    // },
  },
  information_one: {
    background: "#fff",
    padding: "20px",
    borderRadius: "50px",
    marginTop: "1rem",
    boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
    transition: "0.5s",
    height: "100%",
  },
  pending: {
    fontWeight: "600",
    fontSize: "1.5em",
    textAlign: "center",
    color: "#DAF33D",
    textTransform: "uppercase"
  },
  btnChangeStatus: {
    // "& .MuiButton-root": {
    //   borderRadius: "90px",
    //   color: "#000",
    // },
    position: "relative",
    width: "100%",
    borderRadius: "10px",
    backgroundColor: "#ff9900",
    color: "#fff",
    margin: "0 auto",
    "&:hover": {
      backgroundColor: "#FFA500",
      fontWeight: "bold",
      color: "#000",
      boxShadow: "2rem 2rem 3rem rgba(132, 139, 200, 0.18)",
    },
    [theme.breakpoints.up("xl")]: {
      height: "100px",
    },
  },
  verify: {
    textAlign: "center",
    marginTop: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto"
    }

  },
  divCheckIcon: {
    width: "100px",
    height: "100px",
    margin: "0 auto",
    [theme.breakpoints.up("xl")]: {
      width: "200px",
      height: "200px",
    },

  },
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
    [theme.breakpoints.down("md")]: {
      fontSize: "20px",
      fontWeight: "700",
      fontFamily: "sans-serif",
      fontStyle: "normal"
    },
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
  detailImg: {
    width: "70%",
    heigth: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      heigth: "90%",
    },
  },
  detailText: {
    fontSize: "20px",
    fontFamily: "san-serif",
    [theme.breakpoints.up("sm")]: {
      fontSize: "15px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "30px",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "40px",
    },
  },
  titleText: {
    fontSize: "20px",
    fontWeight: "bolder",
    fontFamily: "san-serif",
    [theme.breakpoints.down("md")]: {
      fontSize: "15px",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "35px",
    },
  }

}));

export function DetailRegister(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'detailRegister', reducer });
  useInjectSaga({ key: 'detailRegister', saga });


  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const approveStore = (e) => {
    e.preventDefault();
    setAnchorEl(null);
    const data = {
      id: props.location.state.id
    }
    dispatch(approvedStore(data));
  }

  const declineStore = (e) => {
    e.preventDefault();

    const data = {
      id: props.location.state.id
    }
    dispatch(declinedStore(data));
    setAnchorEl(null);
  }



  useEffect(() => {
    if (props.detailRegister.status == "Success") {
      props.history.push("/register");
      dispatch(reset());
    }
  }, [props.detailRegister.status]);

  useEffect(() => {
    const data = {
      id: props.location.state.id
    }
    dispatch(getRegisterById(data));
  }, []);

  return (
    <div style={{ paddingRight: "15px" }}>
      {props.detailRegister.register ? <>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item md={6} sm={12} xs={12} >
              <div className={classes.information_image} style={{ backgroundImage: `url(${props.detailRegister.register.storeImage.avatar})`, }}>

              </div>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <div className={classes.information_one} >
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item sm={8} xs={12} className={classes.one}>

                      <div className={classes.intro}>
                        <p className={classes.text}>{props.detailRegister.register.name}</p>
                        <p className={classes.text}>{props.detailRegister.register.otherLocation.name}, {props.detailRegister.register.otherLocation.village}, {props.detailRegister.register.otherLocation.town}</p>
                        <p className={classes.text}>{props.detailRegister.register.phone}</p>
                      </div>

                    </Grid>
                    <Grid item sm={4} xs={12} className={classes.zero}>
                      <div className={classes.divCheckIcon} >
                        <PendingIcon style={{ width: "100%", height: "100%", color: "#FFD04D" }} />
                      </div>

                    </Grid>
                    <Grid item md={5} sm={8} xs={12} className={classes.two}>

                      <div className={classes.pending}>
                        <p>{props.detailRegister.register.status}</p>
                      </div>

                    </Grid>
                    <Grid item md={7} sm={4} xs={12} className={classes.three}>

                      <div className={classes.verify}>
                        <Button variant="contained" component="span" className={classes.btnChangeStatus} onClick={handleClick}>
                          Đổi trạng thái
                        </Button>
                      </div>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <MenuItem onClick={approveStore}>Phê duyệt</MenuItem>
                        <MenuItem onClick={declineStore}>Từ chối</MenuItem>
                      </Menu>

                    </Grid>
                  </Grid>
                </Box>
              </div>
            </Grid>
          </Grid>

          <div style={{ backgroundColor: "#FFFFFF", marginTop: "30px", padding: "20px", borderRadius: "20px" }}>
            <Box sx={{ flexGrow: 1 }} >
              <Grid container spacing={3} >
                <Grid item md={4} sm={4} xs={12}>
                  <div style={{ textAlign: "center" }}>
                    <p className={classes.detailText}>Chủ sở hữu: {props.detailRegister.register.owner_name}</p>
                    <p className={classes.detailText}>Đăng kí ngày: 04/08/2022</p>
                    <p className={classes.detailText}>Số điện thoại: {props.detailRegister.register.user.phoneNumber}</p>
                    <p className={classes.detailText}>Email: {props.detailRegister.register.user.email}</p>
                    <p className={classes.detailText}>Thời gian mở cửa: {props.detailRegister.register.open_time}</p>
                    <p className={classes.detailText}>Thời gian đóng cửa: {props.detailRegister.register.close_time}</p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p className={classes.titleText}>Menu</p>
                    <img src={props.detailRegister.register.storeImage.menu} alt="menu" className={classes.detailImg} />
                  </div>
                </Grid>
                <Grid item md={4} sm={4} xs={12}>
                  <div style={{ textAlign: "center" }}>
                    <p className={classes.titleText}>Căn cước công dân mặt trước</p>
                    <img src={props.detailRegister.register.storeImage.identity_card_front} alt="menu" className={classes.detailImg} />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p className={classes.titleText}>Căn cước công dân mặt sau</p>
                    <img src={props.detailRegister.register.storeImage.identity_card_back} alt="menu" className={classes.detailImg} />
                  </div>
                </Grid>
                <Grid item md={4} sm={4} xs={12}>
                  <div style={{ textAlign: "center" }}>
                    <p className={classes.titleText}>Chứng nhận thực phẩm sạch</p>
                    <img src={props.detailRegister.register.storeImage.food_quality_certificate} alt="menu" className={classes.detailImg} />
                  </div>
                </Grid>
              </Grid>
            </Box>
          </div>
        </Box>
      </> : null}
    </div >
  );
}

DetailRegister.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  detailRegister: makeSelectDetailRegister(),
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
)(DetailRegister);
