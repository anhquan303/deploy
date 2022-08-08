/**
 *
 * UserRatingComment
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
import {
  Box,
  Grid,
  TextField,
  Container,
  Avatar,
  Rating,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useHistory } from 'react-router-dom';
import makeSelectUserRatingComment from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getUser } from '../../utils/common';
import { getFoodById, reset, userAddCommentFood, userAddCommentStore, userRatingFood, userRatingStore } from './actions';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

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
  },
}));

export function UserRatingComment(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'userRatingComment', reducer });
  useInjectSaga({ key: 'userRatingComment', saga });

  const classes = useStyles();
  const [star, setStar] = useState(0);
  const [starStore, setStarStore] = useState(0);
  const [comment, setComment] = useState('');
  const [commentStore, setCommentStore] = useState('');
  const user = getUser();
  const history = useHistory();
  let dollarUSLocale = Intl.NumberFormat('en-US');
  const [openAlert, setOpenAlert] = useState(false);
  const [vertical, setVertical] = useState('top');
  const [horizontal, setHorizontal] = useState('right');
  const [openCommentStore, setOpenCommentStore] = useState(false);


  const handleSubmit = () => {
    const data = {
      food_id: props.location.state.fid,
      user_id: user.id,
      description: comment,
    };
    dispatch(userAddCommentFood(data));

    const data1 = {
      food_id: props.location.state.fid,
      user_id: user.id,
      star: star
    };
    dispatch(userRatingFood(data1));
  };

  const handleSubmitStore = () => {
    const data = {
      store_id: props.userRatingComment.food ? props.userRatingComment.food.foodStore.id : null,
      user_id: user.id,
      description: commentStore,
    };
    dispatch(userAddCommentStore(data));

    const data1 = {
      store_id: props.userRatingComment.food ? props.userRatingComment.food.foodStore.id : null,
      user_id: user.id,
      star: starStore
    };
    dispatch(userRatingStore(data1));
  };


  useEffect(() => {
    if (props.userRatingComment.message != "") {
      if (props.userRatingComment.message == "thành công") {
        setOpenAlert(true);
        setOpenCommentStore(false);
        setTimeout(() => dispatch(reset()), 2000);
        const location = {
          pathname: `/food/${props.location.state.fid}`,
          state: {
            item: props.userRatingComment.food
          },
        };

        setTimeout(() => history.push(location), 2000);
      } else {
        setOpenAlert(true);
        setTimeout(() => dispatch(reset()), 2000);
        setOpenCommentStore(true);
      }

    }
  }, [props.userRatingComment.message]);

  useEffect(() => {
    const data = {
      sid: props.location.state.sid,
      fid: props.location.state.fid,
    };
    dispatch(getFoodById(data));
    dispatch(reset());
  }, []);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseAlert = event => {
    setOpenAlert(false);
  };

  const closeModal = () => {
    setOpenCommentStore(false);
    const location = {
      pathname: `/food/${props.location.state.fid}`,
      state: {
        item: props.userRatingComment.food
      },
    };
    history.push(location);
  }

  console.log(props.userRatingComment.food)

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={4} md={4} sm={4}>
          <Button
            className={classes.btn}
            variant="outlined"
            onClick={() => history.goBack()}
          >
            Trở về
          </Button>
        </Grid>
        <Grid
          item
          xs={4}
          md={4}
          sm={4}
          className={classes.center}
          style={{ justifyContent: 'center' }}
        >
          <span style={{ fontWeight: '500', fontSize: '25px' }}>
            Đánh giá món ăn
          </span>
        </Grid>
      </Grid>
      <hr />

      <div
        style={{ border: '1px solid #000', padding: '10px', margin: '10px 0' }}
      >
        <Grid container spacing={0} style={{ padding: '10px' }}>
          <Grid item xs={12} md={12} sm={12} style={{ textAlign: 'center' }}>
            <span
              style={{
                marginRight: ' 10px',
                fontWeight: '400',
                fontSize: '20px',
              }}
            >
              {props.userRatingComment.food.foodStore
                ? props.userRatingComment.food.foodStore.name
                : null}
            </span>
          </Grid>
        </Grid>
        <hr />
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
                className={classes.center}
                style={{ justifyContent: 'left' }}
              >
                {props.userRatingComment.food
                  ? props.userRatingComment.food.name
                  : null}{' '}
                <br />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} sm={12} className={classes.center}>
            {props.userRatingComment.food
              ? dollarUSLocale.format(props.userRatingComment.food.price)
              : null}{' '}
            VND
          </Grid>
        </Grid>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Rating
          name="simple-controlled"
          value={star}
          onChange={(event, newValue) => {
            setStar(newValue);
          }}
        />
        {/* <DropzoneArea
          onChange={() => handleChange(file)}
        /> */}

        <div style={{ margin: '0 auto', width: 'fit-content' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            {/* {user ? <Avatar alt="avatar store" src={Avatar1} sx={{ width: 26, height: 26, marginRight: "3px" }} />
                : <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />} */}
            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Viết bình luận ..."
              variant="standard"
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <IconButton style={{ color: '#FF9900' }} onClick={handleSubmit}>
              <SendIcon />
            </IconButton>
          </Box>
        </div>
      </div>

      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        onClose={handleCloseAlert}
      >
        {/* {props.userAddress.message.includes("FAILED") == false || props.userAddress.message.includes("Failed") == false || props.userAddress.message != "Network Error" ? */}
        <Alert
          severity="success"
          onClose={handleCloseAlert}
          sx={{ width: '100%' }}
        >
          {props.userRatingComment.message}
        </Alert>
      </Snackbar>

      <Modal
        open={openCommentStore}
        //onClose={() => setOpenCommentStore(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginTop: '10px' }}
          >
            Đánh giá chất lượng và dịch vụ của quán ăn
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <Rating
                name="simple-controlled"
                value={starStore}
                onChange={(event, newValue) => {
                  setStarStore(newValue);
                }}
              />

              <div style={{ margin: '0 auto', width: 'fit-content' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  {/* {user ? <Avatar alt="avatar store" src={Avatar1} sx={{ width: 26, height: 26, marginRight: "3px" }} />
                : <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />} */}
                  <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    id="input-with-sx"
                    label="Viết bình luận ..."
                    variant="standard"
                    value={commentStore}
                    onChange={e => setCommentStore(e.target.value)}
                  />
                  <IconButton style={{ color: '#FF9900' }} onClick={handleSubmitStore}>
                    <SendIcon />
                  </IconButton>
                </Box>
              </div>
            </div>
          </Typography>
          <Button
            className={classes.btn}
            style={{ width: '50%' }}
            variant="contained"
            component="span"
            onClick={() => closeModal()}
          >
            Bỏ qua
          </Button>
        </Box>

      </Modal>
    </div>
  );
}

UserRatingComment.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userRatingComment: makeSelectUserRatingComment(),
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
)(UserRatingComment);
