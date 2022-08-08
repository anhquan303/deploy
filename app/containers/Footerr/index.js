/**
 *
 * Footerr
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
import makeSelectFooterr from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  Box, Grid, Container
} from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import Logo from '../../images/Happy_Delivery_Man_logo_cartoon_art_illustration.jpg'
import { useHistory } from 'react-router-dom';
import { getUser } from '../../utils/common';

const useStyles = makeStyles(theme => ({
  center: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
}));




export function Footerr(props) {
  useInjectReducer({ key: 'footerr', reducer });
  useInjectSaga({ key: 'footerr', saga });

  const classes = useStyles();
  const history = useHistory()
  const user = getUser();

  const handleSellerRegister = () => {
    console.log('here')
    if (user) {
      history.push('/sellerRegister');
    } else {
      history.push('/login');
    }
  };
  return (
    <div style={{ marginTop: "50px" }}>

      <Container fixed>
        <hr />
        <Grid container spacing={0} >
          <Grid item md={4} sm={4} xs={12}>
            <div>
              <h1>No Nê</h1>
              <h4>Team SWP_G20</h4>
              <h4><a onClick={handleSellerRegister} style={{ textDecoration: "none", color: "#369DFC" }}><span>Đăng ký quán</span></a></h4>
            </div>
          </Grid>
          <Grid item md={4} sm={4} xs={12} className={classes.center}>
            <div style={{ textAlign: "left" }}>
              <img src={Logo} style={{ width: "80%" }} />
              <h4>@2022 NoNe</h4>
            </div>
          </Grid>
          <Grid item md={4} sm={4} xs={12} className={classes.center} style={{ justifyContent: "left", alignContent: 'start' }}>
            <div style={{ textAlign: "left" }}>
              <h1>Địa chỉ</h1>
              <h4>Đại học FPT</h4>
              <h4>Km29 Đường Cao Tốc 08, Thạch Hoà, Thạch Thất, Hà Nội</h4>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.4854095316527!2d105.52487561531369!3d21.013254993682462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345b465a4e65fb%3A0xaae6040cfabe8fe!2sFPT%20University!5e0!3m2!1sen!2s!4v1659797902464!5m2!1sen!2s" style={{ width: "600", height: "450", border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              <h4>0161469298</h4>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

Footerr.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  footerr: makeSelectFooterr(),
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
)(Footerr);
