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
import { Headerr } from '../Headerr';
import {
  Box, Grid, IconButton, Container, Avatar, Rating,
  List, ListItemButton, ListItemText, TextField, Tabs, Tab
} from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import VerifiedIcon from '@mui/icons-material/Verified';
import { CardItem } from '../CardItem';
import { getFoodByStoreId, getStoreById } from './actions';
import { Link } from 'react-router-dom';

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
  }, []);

  console.log(props.storeProfile.food)

  return (
    <div>
      <Headerr />
      <Container fixed>
        {/* <Helmet>
          <title>StoreProfile</title>
          <meta name="description" content="Description of StoreProfile" />
        </Helmet>
        <FormattedMessage {...messages.header} /> */}
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={6} style={{ padding: "10px" }}>
            <div style={{ border: "1px solid #000", padding: "10px" }}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={4} className={classes.center}>
                  <Avatar
                    alt="store avatar"
                    src={props.storeProfile.store ? props.storeProfile.store.storeImage.avatar : null}
                    sx={{ width: 100, height: 100 }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <p style={{ fontFamily: "san-serif", margin: "0", fontWeight: "500", fontSize: "30px" }}>{props.storeProfile.store ? props.storeProfile.store.name : null}</p>
                  <Button
                    className={classes.btn}
                    variant="outlined"
                  // startIcon={<ThumbUpIcon />}
                  >
                    Yêu thích
                  </Button>
                </Grid>
              </Grid>

            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} style={{ padding: "10px" }} className={classes.center}>
            <div style={{ padding: "10px" }} >
              <Grid container spacing={0} style={{ height: "100%" }}>

                <Grid item xs={12} sm={12} md={6} style={{ margin: "5px 0" }}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} >
                      <Grid container direction="row" alignItems="center">
                        <RestaurantMenuIcon /> <span style={{ marginLeft: "10px" }}>Món ăn: 12</span>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} >

                      <Grid container direction="row" alignItems="center">
                        <EmojiEmotionsIcon />
                        <span style={{ marginLeft: "10px" }}> Đánh giá:</span>
                        <Rating
                          name="half-rating-read"
                          value={5}
                          precision={0.5}
                          readOnly
                          className={classes.center}
                        />
                        <span style={{ marginLeft: "10px" }}></span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={6} style={{ margin: "5px 0" }}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} >
                      <Grid container direction="row" alignItems="center">
                        <ThumbUpIcon /> <span style={{ marginLeft: "10px" }}>Lượt yêu thích: 12</span>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} >
                      <Grid container direction="row" alignItems="center">
                        <VerifiedIcon /> <span style={{ marginLeft: "10px" }}>Tham gia: 12/06/2021</span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>
            </div>
          </Grid>
        </Grid>
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
