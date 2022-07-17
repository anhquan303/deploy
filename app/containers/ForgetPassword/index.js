/**
 *
 * ForgetPassword
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
import makeSelectForgetPassword from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


import BackGround from '../../images/dhfpt.png';
import Logo from '../../images/Happy_Delivery_Man_logo_cartoon_art_illustration.jpg';
import { Box, Container, Grid, TextField } from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha
} from "react-simple-captcha";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundImage: `url(${BackGround})`,
    backgroundSize: "cover",

  },
  container: {
    position: "relative",
    width: "fit-content",
    minHeight: "600px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "30px",
    margin: "20px",
    borderRadius: "30px"
  },
  logo: {
    width: "6rem",
    height: "5rem",
  },
  top: {
    display: "flex",
    margin: "0 auto",
    textAlign: "center"
  },
  registerTag: {
    fontWeight: "600",
    fontSize: "2em",
    width: "100%",
    textAlign: "center",
    textTransform: "uppercase",
    color: "#20d167",
  },
  btnSubmit: {
    position: "relative",
    width: "100%",
    borderRadius: "10px",
    backgroundColor: "#ff9900",
    marginTop: "10px",
    "&:hover": {
      backgroundColor: "orange",
      fontWeight: "bold",
      color: "#000",
    }
  },
  topLogo: {
    margin: "0 auto",
    display: "flex",
    marginBottom: "20px"
  }

}));

export function ForgetPassword() {
  useInjectReducer({ key: 'forgetPassword', reducer });
  useInjectSaga({ key: 'forgetPassword', saga });

  const classes = useStyles();

  useEffect(() => {
    loadCaptchaEnginge(8);
  }, []);


  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <form className="">
          <div className={classes.top}>
            <div className={classes.topLogo}>
              <img src={Logo} alt="logo" className={classes.logo} />
              <h2>No <span>Nê</span></h2>
            </div>
          </div>
          <h3 className={classes.registerTag}>Quên mật khẩu</h3>
          <div>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-textarea2"
                    label="Email"
                    placeholder="Email"
                    multiline
                    name="email"
                  // onChange={handleChange}
                  // helperText={formErrors.email && formValues.email.length == "" ? formErrors.email : formErrors.email1 ? formErrors.email1 : null}
                  // error={formErrors.email != null && formValues.email.length == "" ? true : formErrors.email1 != null ? true : false}
                  />
                </Box>
              </Grid>
            </Grid>





            <Grid container spacing={2}>
              <Grid item sm={6} xs={12} style={{ textAlign: "center" }}>
                <LoadCanvasTemplate />
              </Grid>
              <Grid item sm={6} xs={12}>

                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-textarea7"
                    label="Captcha"
                    placeholder="Captcha"
                    multiline
                    name="captcha"
                  // onChange={handleChange}
                  // helperText={formErrors.captcha && formValues.captcha.length == "" ? formErrors.captcha : formErrors.captcha1 ? formErrors.captcha1 : null}
                  // error={formErrors.captcha != null && formValues.captcha.length == "" ? true : formErrors.captcha1 != null ? true : false}
                  />
                </Box>
              </Grid>
            </Grid>
          </div>
          <Container fixed>
            <Button type="submit" className={classes.btnSubmit} variant="contained" component="span" >
              Tiếp Theo
            </Button>
          </Container>
        </form>
        {/* <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleCloseToast}
          message={props.userRegister.message}
          autoHideDuration={5000}
        /> */}
      </div>
    </div>
  );
}

ForgetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  forgetPassword: makeSelectForgetPassword(),
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
)(ForgetPassword);
