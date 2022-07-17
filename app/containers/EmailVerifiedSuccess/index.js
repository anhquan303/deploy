/**
 *
 * EmailVerifiedSuccess
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectEmailVerifiedSuccess from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Box, Grid, Container } from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { textAlign } from '@mui/system';

const useStyles = makeStyles((theme) => ({
  font: {
    fontFamily: "sans-serif",
    margin: "0"
  },
  center: {
    textAlign: "center",
    backgroundColor: "#005445",
    padding: "20px 60px",
    margin: "0 10px",
    borderRadius: "20px"
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
    fontSize: "36px",
    fontFamily: "sans-serif",
    margin: "0",
    color: "#fff"
  },
  text: {
    fontWeight: "700",
    fontSize: "20px",
    fontFamily: "sans-serif",
    margin: "0",
    color: "#fff"
  },
  body: {
    backgroundColor: "#014036",
    height: "100vh",
    flexWrap: "wrap",
    alignContent: "center",
    display: "flex",
    justifyContent: "center"
  },

}));

export function EmailVerifiedSuccess() {
  useInjectReducer({ key: 'emailVerifiedSuccess', reducer });
  useInjectSaga({ key: 'emailVerifiedSuccess', saga });

  const classes = useStyles();

  return (
    <div className={classes.body}>
      <div className={classes.center}>
        <p className={classes.title}>Email has been verified</p>
        <CheckCircleRoundedIcon sx={{ fontSize: 126, color: "#fff" }} />
        <p className={classes.text} style={{ margin: "15px 0" }}>You can now <a href="/login" className={classes.text} >login</a></p>
        <p className={classes.text}>@NoNe</p>
      </div>
    </div>
  );
}

EmailVerifiedSuccess.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  emailVerifiedSuccess: makeSelectEmailVerifiedSuccess(),
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
)(EmailVerifiedSuccess);
