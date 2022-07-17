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

import { getData } from './actions';
import Avatar from '@mui/material/Avatar';
import { getUser } from '../../utils/common';


export function Dashboard(props) {
  const { dispatch, userList } = props;
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });

  const action = false;

  useEffect(() => {
    dispatch(getData());
  }, [])

  const actione = [
    {
      id: "1",
      name: "Quan ngon 24",
      owner: "Long le",
      totalOrder: "654",
      status: "Approved",
      contact: "132123132",
    },
    {
      id: "1",
      name: "Quan ",
      owner: "Longe",
      totalOrder: "64",
      status: "Approed",
      contact: "13213132",
    },
    {
      id: "1",
      name: "Quan non 24",
      owner: "Longle",
      totalOrder: "654",
      status: "Approved",
      contact: "132123132",
    },
    {
      id: "1",
      name: "Quan ngon 24",
      owner: "Long le",
      totalOrder: "654",
      status: "Approved",
      contact: "132123132",
    },
    {
      id: "1",
      name: "Quan ngon 24",
      owner: "Long le",
      totalOrder: "654",
      status: "Approved",
      contact: "132123132",
    },
    {
      id: "1",
      name: "Quan ngon 24",
      owner: "Long le",
      totalOrder: "654",
      status: "Approved",
      contact: "132123132",
    }
  ];

  // const header = ["Name", "Owner", "Total Orders", "Status", "Contact"];

  const newList = actione.map((item) => {
    return {
      name: item.name,
      owner: item.owner,
      totalOrder: item.totalOrder,
      status: item.status,
      contact: item.contact
    }
  })

  const columns = [
    { title: "ID", field: "id" },
    { title: "Name", field: "name" },
    { title: "Owner", field: "owner" },
    { title: "Total Orders", field: "totalOrder" },
    { title: "Status", field: "status" },
    { title: "Contact", field: "contact" },
  ]

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
            <div className="total">
              <span style={{ background: "#0D31F0" }}><StoreIcon /></span>
              <div className="middle">
                <div className="left">
                  <h3>Total Stores</h3>
                  <h1>230</h1>
                </div>
                {/* <div className="progress">
                  <svg>
                    <circle cx="38" cy="38" r="36"></circle>
                  </svg>
                  <div className="number"><p>81%</p></div>
                </div> */}
              </div>
              <small className="text-muted">Last 24 hours</small>
            </div>
          </Grid>
          <Grid item sm={4} xs={12}>
            <div className="total">
              <span style={{ background: "#ff9900" }}><PersonIcon /></span>
              <div className="middle">
                <div className="left">
                  <h3>Total Users</h3>
                  <h1>230</h1>
                </div>
                {/* <div className="progress">
                  <svg>
                    <circle cx="38" cy="38" r="36"></circle>
                  </svg>
                  <div className="number"><p>81%</p></div>
                </div> */}
              </div>
              <small className="text-muted">Last 24 hours</small>
            </div>
          </Grid>
          <Grid item sm={4} xs={12}>
            <div className="total">
              <span style={{ background: "#20D167" }}><FastfoodIcon /></span>
              <div className="middle">
                <div className="left">
                  <h3>Total Foods</h3>
                  <h1>230</h1>
                </div>
                {/* <div className="progress">
                  <svg>
                    <circle cx="38" cy="38" r="36"></circle>
                  </svg>
                  <div className="number"><p>81%</p></div>
                </div> */}
              </div>
              <small className="text-muted">Last 24 hours</small>
            </div>
          </Grid>
          <Grid item sm={12} xs={12}>
            <h3>Recent Action</h3>
            {/* <CustomTable data={actione} itemPerPage={5} totalItem={actione.length} detailPage="dashboard" columns={columns} action={action} /> */}
          </Grid>
        </Grid>

      </Box>
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
