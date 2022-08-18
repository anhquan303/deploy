/**
 *
 * DashboardHeader
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Grid, Avatar } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import Avatar1 from '../../images/quan.jpg';
import { useLocation } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  hello: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
  },
  firstText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: "18px",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
  },
  secondText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: "18px",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
  },
  secondLine: {
    color: "#1168EB",
    fontWeight: "700",
    fontSize: "18px",
    // float: "right",
    [theme.breakpoints.between("lg", "xl")]: {
      float: "right",
      //marginTop: "23px"
    },
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
  },
  avatar: {
    [theme.breakpoints.down("xs")]: {
      marginTop: "23px",
      display: "flex",
      float: "right",
    },
    [theme.breakpoints.between("sm", "md")]: {
      float: "right",
      marginTop: "23px",
      display: "flex",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      float: "right",
      marginTop: "23px",
      display: "flex",

    },
  },
  text: {
    color: "#fff",
    [theme.breakpoints.up("xs")]: {
      fontWeight: "bold",
      fontSize: "1.3rem",
      marginTop: "2rem",

    }
  }

}));

function DashboardHeader({ text, user }) {
  const classes = useStyles();
  // const location = useLocation();

  return (
    <Grid container spacing={3}>
      <Grid item sm={7} xs={7}>
        <p className={classes.text}>{text}</p>
      </Grid>
      <Grid item sm={5} xs={5}>
        {/* <Grid container spacing={3}>
          <Grid item sm={6} xs={12} className={classes.hello}>
            <div style={{ marginTop: "5px" }}>
              <div style={{ margin: "0" }} >
                <span className={classes.firstText}>Hello,</span> <span className={classes.secondText}>Quan</span>
              </div>
              <div style={{ margin: "0" }}>
                <span className={classes.secondLine}>Admin</span>
              </div>
            </div>
          </Grid>
          <Grid item sm={6} xs={12} >
            <div className={classes.avatar}>
              <div style={{ marginRight: "14px" }} >
                <div><span className={classes.firstText}>Hello,</span> <span className={classes.secondText}>Quan</span></div>
                <div><span className={classes.secondLine}>Admin</span></div>
              </div>
              <div><Avatar alt="Quan Nguyen" src={Avatar1} /></div>
            </div>
          </Grid>
        </Grid> */}
        <div className={classes.avatar}>
          <div style={{ marginRight: "14px" }} >
            <div><span className={classes.firstText}>Hello,</span> <span className={classes.secondText}>{user.username}</span></div>
            <div><span className={classes.secondLine}>{user.authorities[0].authority}</span></div>
          </div>
          <div><Avatar alt="Quan Nguyen" src={user.avatar} /></div>
        </div>
      </Grid>
    </Grid>
  );
}

DashboardHeader.propTypes = {};

export default memo(DashboardHeader);
