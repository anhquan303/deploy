/**
 *
 * Dashboard
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
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import './dashboard.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles, Container, Typography } from '@material-ui/core';

import { getAllFood, getAllStore, getAllUser, getData } from './actions';
import Avatar from '@mui/material/Avatar';
import { getUser } from '../../utils/common';
import { Pie } from 'react-chartjs-2';
import { Backdrop } from '@mui/material';
import Loading from '../../components/Loading';


const useStyles = makeStyles(theme => ({
  chart: {

    [theme.breakpoints.up("md")]: {
      width: "30%", margin: "0 auto",
    },
    [theme.breakpoints.down("sm")]: {
      width: "60%", margin: "0 auto",
    }
  }

}));

export function Dashboard(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });

  const classes = useStyles();

  useEffect(() => {
    dispatch(getAllStore());
    dispatch(getAllUser());
    dispatch(getAllFood());
  }, [])

  const user = getUser();
  if (user) {
    if (user.authorities[0].authority == 'USER') {
      props.history.push('/')
    }
  }

  return (
    <div style={{ paddingRight: "15px" }}>
      {/* <DashboardHeader text="Dashboard" /> */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item sm={4} xs={12}>
            <div style={{ padding: "20px" }}>
              <div className="total">
                <span style={{ background: "#0D31F0" }}><StoreIcon /></span>
                <div className="middle">
                  <div className="left">
                    <h3>Tổng số quán ăn</h3>
                    <h1>{props.dashboard.storeList.length}</h1>
                  </div>
                  {/* <div className="progress">
                  <svg>
                    <circle cx="38" cy="38" r="36"></circle>
                  </svg>
                  <div className="number"><p>81%</p></div>
                </div> */}
                </div>

              </div>
            </div>
          </Grid>
          <Grid item sm={4} xs={12}>
            <div style={{ padding: "20px" }}>
              <div className="total">
                <span style={{ background: "#ff9900" }}><PersonIcon /></span>
                <div className="middle">
                  <div className="left">
                    <h3>Tổng số người dùng</h3>
                    <h1>{props.dashboard.userList.length}</h1>
                  </div>
                  {/* <div className="progress">
                  <svg>
                    <circle cx="38" cy="38" r="36"></circle>
                  </svg>
                  <div className="number"><p>81%</p></div>
                </div> */}
                </div>

              </div>
            </div>
          </Grid>
          <Grid item sm={4} xs={12}>
            <div style={{ padding: "20px" }}>
              <div className="total">
                <span style={{ background: "#20D167" }}><FastfoodIcon /></span>
                <div className="middle">
                  <div className="left">
                    <h3>Tổng số món ăn</h3>
                    <h1>{props.dashboard.foodList.length}</h1>
                  </div>
                  {/* <div className="progress">
                  <svg>
                    <circle cx="38" cy="38" r="36"></circle>
                  </svg>
                  <div className="number"><p>81%</p></div>
                </div> */}
                </div>

              </div>
            </div>
          </Grid>
          <Grid item sm={12} xs={12}>
            <div className={classes.chart}>
              <h3>Đồ thị</h3>
              <Pie
                data={{
                  // labels: ["12/07/2022", "13/07/2022", "14/07/2022"],
                  // datasets: [
                  //   {
                  //     data: ["400000", "150000", "1000000"],
                  //     label: "Quán ăn",
                  //     borderColor: "#FFAC30",
                  //     fill: true
                  //   },
                  //   {
                  //     data: ["17", "10", "40"],
                  //     label: "Người dùng",
                  //     borderColor: "#1168EB",
                  //     backgroundColor: "rgba(255, 0, 0, 0.5)",
                  //     fill: true
                  //   },
                  //   {
                  //     data: ["50000", "30000", "100000"],
                  //     label: "Món ăn",
                  //     borderColor: "#FE0000",
                  //     backgroundColor: "rgba(255, 0, 0, 0.5)",
                  //     fill: true
                  //   }
                  // ]
                  labels: [
                    'Tổng số quán ăn',
                    'Tổng số người dùng',
                    'Tổng số món ăn'
                  ],
                  datasets: [{
                    label: 'My First Dataset',
                    data: [props.dashboard.storeList.length, props.dashboard.userList.length, props.dashboard.foodList.length],
                    backgroundColor: [
                      'rgb(255, 99, 132)',
                      'rgb(54, 162, 235)',
                      'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 4
                  }]
                }}
              />
            </div>
          </Grid>
        </Grid>

      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.dashboard.loading}
      >
        <Loading />
      </Backdrop>
    </div>
  );
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
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
)(Dashboard);
