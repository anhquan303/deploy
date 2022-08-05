/**
 *
 * DashboardRegister
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
import makeSelectDashboardRegister from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { makeStyles } from '@material-ui/core';
import CustomTable from '../../components/CustomTable';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { fetchListRegister } from './actions';
import CustomTableResponsive from '../../components/CustomTableResponsive';
import { Backdrop } from '@mui/material';
import Loading from '../../components/Loading';

const useStyles = makeStyles((theme) => ({
  information_image: {
    background: "#fff",
    padding: "10px",
    borderRadius: "20px",
    margin: "10px auto",
    boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
    transition: "0.5s",
    height: "fit-content",
    backgroundSize: "cover",
    width: "fit-content",
  },


}));

export function DashboardRegister(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'dashboardRegister', reducer });
  useInjectSaga({ key: 'dashboardRegister', saga });

  const classes = useStyles();
  const action = false;
  const columns = [
    { title: "ID", field: "id" },
    { title: "Store Name", field: "name" },
    { title: "Owner", field: `[user.username]` },
    { title: "Phone", field: "phoneNumber" },
    { title: "Status", field: "status" },
  ];

  const columns1 = [
    { id: 'stt', label: 'STT', minWidth: 10, align: 'center' },
    { id: 'name', label: 'Tên quán ăn', minWidth: 100, align: 'center' },
    { id: 'owner_name', label: 'Chủ sở hữu', minWidth: 100, align: 'center' },
    { id: 'phone', label: 'Số điện thoại', minWidth: 100, align: 'center' },
    { id: 'status', label: 'Trạng thái', minWidth: 100, align: 'center' },
  ];

  function createData(id, stt, name, owner_name, phone, status) {
    //const density = population / size;
    return { id, stt, name, owner_name, phone, status };
  }

  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (props.dashboardRegister.registerList) {
      setRows(props.dashboardRegister.registerList.map((item, index) =>
        createData(item.id, index + 1, item.name, item.owner_name, item.phone, item.status)
      ))
    }
  }, [props.dashboardRegister.registerList])

  useEffect(() => {
    dispatch(fetchListRegister());
  }, []);


  return (
    <div style={{ paddingRight: "15px" }}>
      {/* <DashboardHeader text="Dashboard" /> */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item sm={12} xs={12}>
            <div className={classes.information_image}>
              <h2>Số quán ăn chờ xác nhận: {props.dashboardRegister.registerList.length}</h2>
            </div>
          </Grid>
          <Grid item sm={12} xs={12}>
            {/* <CustomTable data={props.dashboardRegister.registerList} itemPerPage={5} totalItem={props.dashboardRegister.registerList.length} detailPage="register" columns={columns} action={action} /> */}
            {props.dashboardRegister.registerList ? <CustomTableResponsive columns={columns1} data={props.dashboardRegister.registerList} detailPage="register" rows={rows} /> : null}
          </Grid>
        </Grid>

      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.dashboardRegister.loading}
      >
        <Loading />
      </Backdrop>
    </div>
  );
}

DashboardRegister.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboardRegister: makeSelectDashboardRegister(),
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
)(DashboardRegister);
