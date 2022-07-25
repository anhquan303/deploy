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
  List, ListItemButton, ListItemText, TextField, Tabs, Tab, Chip
} from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import VerifiedIcon from '@mui/icons-material/Verified';
import { CardItem } from '../CardItem';
import { getFoodByStoreId, getStoreById, getStoreRating } from './actions';
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

let HEIGHT = window.screen.height;

const useStyles = makeStyles(theme => ({
  btn: {
    position: 'relative',
    width: 'fit-content',
    borderRadius: '10px',
    backgroundColor: '#ff9900',
    margin: '10px 5px',
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
    height: 450,
    [theme.breakpoints.down("sm")]: {
      height: 450,
    }
  },
  media: {
    height: HEIGHT / 3
  },
  profileImage: {
    position: "relative",
    top: "-120px",
    // left: "50px",
    justifyContent: "center",
    // width: "60px",
    height: "fit-content",
    border: "5px solid white",
    margin: "20px"
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
  }
}));


export function StoreProfile(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'storeProfile', reducer });
  useInjectSaga({ key: 'storeProfile', saga });

  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [value, setValue] = useState(0);

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
  }, []);

  return (
    <div>
      <Headerr />

      <Container fixed>
        <Card className={classes.root}>
          <CardMedia className={classes.media} image="https://www.wikihow.com/images/thumb/a/a8/Cover-Food-in-the-Microwave-Step-1.jpg/v4-460px-Cover-Food-in-the-Microwave-Step-1.jpg.webp" title="Cover" />
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
              <Grid item lg={11} md={10} sm={11}>
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
              </Grid>
            </Grid>
          </div>
        </Card>
        <hr />
        <div style={{ display: 'flex', textAlign: 'center' }}>
          <Tabs value={value} onChange={handleChangeTab} aria-label="disabled tabs example" style={{ margin: '0 auto' }}>
            <Tab label="Tất cả sản phẩm" />
            <Tab label="Voucher của quán" />
          </Tabs>
        </div>

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
      </Container>



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
