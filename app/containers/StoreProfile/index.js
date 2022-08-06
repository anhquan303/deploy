/**
 *
 * StoreProfile
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
import makeSelectStoreProfile from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Headerr from '../Headerr';
import {
  Box, Grid, IconButton, Container, Avatar, Rating, Card, CardMedia, Typography, CardContent,
  List, ListItemButton, ListItemText, TextField, Tabs, Tab, Chip, Modal, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import VerifiedIcon from '@mui/icons-material/Verified';
import { CardItem } from '../CardItem';
import { addVoucherByUserId, getFoodByStoreId, getStoreById, getStoreRating, getVoucherByStoreId, reset, userAddReport } from './actions';
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getUser } from '../../utils/common';
import { Footerr } from '../Footerr';

let HEIGHT = window.screen.height;

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
  center: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  foodType: {
    background: '#fff',
    padding: '10px',
    borderRadius: '20px',
    boxShadow: '0 2rem 3rem rgba(132, 139, 200, 0.18)',
    transition: '0.5s',
    height: 'fit-content',
    width: '100%',
  },
  root: {
    height: "510px",
    // [theme.breakpoints.down("sm")]: {
    //   height: "525px",
    // },
    // [theme.breakpoints.between("xs", "sm")]: {
    //   height: "525px",
    // },
    // [theme.breakpoints.down("md")]: {
    //   height: "500px",
    // }
  },
  media: {
    height: HEIGHT / 3
  },
  profileImage: {
    position: "relative",
    top: "-125px",
    // left: "50px",
    justifyContent: "center",
    // width: "60px",
    height: "fit-content",
    border: "5px solid white",
    margin: "20px",
    [theme.breakpoints.down("xs")]: {
      top: "-181px",
    },
  },
  profileInfoContainer: {
    position: "relative",
    top: "-100px",
    margin: "auto"
  },
  userName: {
    fontWeight: "bold",
    marginBottom: 0
  },
  userTag: {
    marginTop: 0
  },
  contentContainer: {
    position: "relative",
    top: "-90px"
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
    background: "#f0fff3",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: "-25px"
  },
  circle2: {
    background: "#f0fff3",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    right: "-25px"
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    backgroundColor: '#fff',
    textAlign: 'center',
    borderRadius: '20px',
    padding: '10px',
    [theme.breakpoints.down("sm")]: {
      width: 250,
    },
    [theme.breakpoints.down("md")]: {
      width: 500,
    },
  },
}));


export function StoreProfile(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'storeProfile', reducer });
  useInjectSaga({ key: 'storeProfile', saga });

  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [value, setValue] = useState(0);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  let dollarUSLocale = Intl.NumberFormat('en-US');
  const user = getUser();
  const initialValues = { title: '', content: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  // set value for input
  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };


  const validate = values => {
    const errors = {};
    if (!values.title) {
      errors.title = 'title is required!';
    }
    if (!values.content) {
      errors.content = 'content is required!';
    }
    return errors;
  };

  // check validate
  const handleAddReport = e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  // sendReport
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const data = {
        userId: user.id,
        storeId: props.location.state.id,
        title: formValues.title,
        description: formValues.content,
        image: "abc",
        userToStore: true
      };
      dispatch(userAddReport(data));
    }
  }, [formErrors]);

  useEffect(() => {
    if (props.storeProfile.message != "") {
      if (props.storeProfile.message.includes("thành công")) {
        setOpen(false);
        dispatch(reset());
      }
    }
  }, [props.storeProfile.message])



  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    const data = {
      id: props.location.state.id
    }
    dispatch(getStoreById(data));
    dispatch(getFoodByStoreId(data));
    dispatch(getStoreRating(data));
    dispatch(getVoucherByStoreId(data));
  }, []);


  const handleSaveVoucher = (vid) => {
    const data = {
      uid: user.id,
      vid: vid
    }
    dispatch(addVoucherByUserId(data));
  }

  return (
    <div>
      <Headerr />

      <Container fixed>
        <Card className={classes.root}>
          <CardMedia className={classes.media} image={props.storeProfile.store ? props.storeProfile.store.storeImage.cover_image : null} title="Cover" />
          <div className={classes.profileImage} style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", backgroundColor: "#fff", borderRadius: "10px" }}>
            <Grid container spacing={0} >
              <Grid item lg={1} md={2} sm={3}>
                <div style={{ padding: "5px" }}>
                  <Box
                    component="img"
                    sx={{
                      height: 71,
                      width: 90,
                      maxHeight: { xs: 71, md: 71 },
                      maxWidth: { xs: 90, md: 90 },
                      borderRadius: "10px"
                    }}
                    alt="avatar store"
                    src={props.storeProfile.store ? props.storeProfile.store.storeImage.avatar : "https://www.blexar.com/avatar.png"}
                  />
                </div>

              </Grid>
              <Grid item lg={11} md={10} sm={9}>
                <p style={{ fontFamily: "circular std book,sans-serif", margin: "0", fontWeight: "700", fontSize: "30px" }}>{props.storeProfile.store ? props.storeProfile.store.name : null}</p>
                <Chip icon={<AccessTimeIcon />} label={`Thời gian mở cửa: ${props.storeProfile.store ? props.storeProfile.store.open_time : null} - ${props.storeProfile.store ? props.storeProfile.store.close_time : null}`} variant="outlined" />
                <p style={{ fontFamily: "circular std book,sans-serif", margin: "10px 0 ", fontWeight: "400", fontSize: "13px", color: "#858796", textAlign: "left" }}>{props.storeProfile.store ? props.storeProfile.store.description : null}</p>
                <div style={{ display: "flex", margin: "10px 0 " }}>
                  <div>
                    <Rating
                      name="half-rating-read"
                      value={props.storeProfile.storeRating == null ? 0 : props.storeProfile.storeRating}
                      precision={0.5}
                      readOnly
                      className={classes.center}
                    />
                  </div>
                  <div style={{ margin: "3px" }}> 5 - 243 Ratings</div>
                </div>
                <div>
                  <Button className={classes.btn} variant="outlined" onClick={() => history.goBack()}>
                    Yêu thích
                  </Button>
                  <Button className={classes.btn} variant="outlined" onClick={handleClickOpen}>
                    Báo cáo
                  </Button>
                </div>
              </Grid>

            </Grid>
          </div>
        </Card>

        <div style={{ display: 'flex', textAlign: 'center' }}>
          <Tabs value={value} onChange={handleChangeTab} aria-label="disabled tabs example" style={{ margin: '0 auto' }}>
            <Tab label="Tất cả sản phẩm" />
            <Tab label="Voucher của quán" />
          </Tabs>
        </div>

        {value == 0 ?
          <div>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={3} style={{ padding: '10px' }}>
                <List
                  component="nav"
                  aria-label="secondary mailbox folder"
                  className={classes.foodType}
                >
                  <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={event => handleListItemClick(event, 2)}
                  >
                    <ListItemText primary="Bán chạy" />
                  </ListItemButton>
                  <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={event => handleListItemClick(event, 2)}
                  >
                    <ListItemText primary="Món mới" />
                  </ListItemButton>
                  <ListItemButton
                    selected={selectedIndex === 4}
                    onClick={event => handleListItemClick(event, 3)}
                  >
                    <ListItemText primary="Cơm suất" />
                  </ListItemButton>
                  <ListItemButton
                    selected={selectedIndex === 5}
                    onClick={event => handleListItemClick(event, 4)}
                  >
                    <ListItemText primary="Phở" />
                  </ListItemButton>
                  <ListItemButton
                    selected={selectedIndex === 6}
                    onClick={event => handleListItemClick(event, 5)}
                  >
                    <ListItemText primary="Bún" />
                  </ListItemButton>
                  <ListItemButton
                    selected={selectedIndex === 7}
                    onClick={event => handleListItemClick(event, 6)}
                  >
                    <ListItemText primary="Đồ ăn vặt" />
                  </ListItemButton>
                </List>
              </Grid>
              <Grid item xs={12} sm={12} md={9} style={{ padding: '10px' }}>
                <Grid container spacing={0}>
                  {props.storeProfile.food.map((item) => {
                    return (
                      <Grid item xs={12} sm={12} md={3} key={item.id} style={{ padding: '0 10px' }}>
                        <Link
                          to={{ pathname: `/food/${item.id}`, state: { item } }}
                          style={{ textDecoration: 'none' }}
                        >
                          <CardItem
                            foodName={item.name}
                            storeName={item.foodStore.name}
                            address="address"
                            img={item.image}
                          />
                        </Link>
                      </Grid>
                    )
                  })}
                </Grid>

              </Grid>
            </Grid>
          </div>
          :
          <div>
            <Grid container spacing={0}>
              {props.storeProfile.listVoucher && props.storeProfile.listVoucher.length != 0 ? props.storeProfile.listVoucher.map((item) => {
                return (
                  <Grid key={item.id} item xs={12} sm={12} md={4} style={{ padding: '10px' }}>
                    <div className={classes.couponCard}>
                      <img className={classes.imgCoupon} src="https://www.mssdefence.com/wp-content/uploads/2016/11/Discount-Action-Mss-Defence.png" />
                      <h3 style={{ fontSize: "20px", fontWeight: "400" }}>{item.name}</h3>
                      <div className={classes.couponRow}>
                        <span className={classes.couponCode}>{item.code}</span>
                        {/* <span className={classes.couponBtn}><CopyToClipBoard text="STEALDEAL20"> LƯU MÃ</CopyToClipBoard></span> */}
                        <CopyToClipboard text={item.code}
                          onCopy={() => setCopied(true)}>
                          <span className={classes.couponBtn} onClick={() => handleSaveVoucher(item.id)}>LƯU MÃ</span>
                        </CopyToClipboard>
                      </div>
                      <p style={{ fontSize: "15px", fontFamily: "sans-serif" }}>Giảm {item.percent}% cho đơn hàng tối thiểu {dollarUSLocale.format(item.minPrice)}VND</p>
                      {item.startDate ? <p style={{ fontSize: "15px", fontFamily: "sans-serif" }}>Có giá trị sử dụng từ : {item.startDate}</p> : null}
                      {item.endDate ? <p style={{ fontSize: "15px", fontFamily: "sans-serif" }}>Có giá trị sử dụng đến : {item.endDate}</p> : null}
                      <div className={classes.circle1}></div>
                      <div className={classes.circle2}></div>
                    </div>
                  </Grid>
                )
              }) : <span style={{ margin: "0 auto" }}>Store chưa có voucher</span>}

            </Grid>
          </div>
        }

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Tạo báo cáo mới</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Chúng tôi sẽ tiếp nhận báo cáo và chỉnh sửa
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Tiêu đề"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              name="title"
              helperText={formErrors.title && formValues.title.length == '' ? formErrors.title : null}
              error={formErrors.title != null && formValues.title.length == ''}
            />
            <TextField
              autoFocus
              margin="dense"
              id="content"
              label="Nội dung"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              name="content"
              helperText={formErrors.content && formValues.content.length == '' ? formErrors.content : null}
              error={formErrors.content != null && formValues.content.length == ''}
            />
            <input type="file" name="myImage" accept="image/png, image/gif, image/jpeg" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy Bỏ</Button>
            <Button onClick={handleAddReport}>Gửi</Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Footerr />
    </div >
  );
}

StoreProfile.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  storeProfile: makeSelectStoreProfile(),
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
)(StoreProfile);
