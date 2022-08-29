/**
 *
 * DashboardCustomer
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
import makeSelectDashboardCustomer from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { makeStyles } from '@material-ui/core';
import CustomTable from '../../components/CustomTable';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { fetchListUser } from './actions';
import SearchBar from "material-ui-search-bar";
import CustomTableResponsive from '../../components/CustomTableResponsive';
import Loading from '../../components/Loading';
import { Backdrop } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  information_image: {
    background: "#FD4444",
    color: "#fff",
    padding: "10px",
    borderRadius: "20px",
    margin: "0 auto",
    boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
    transition: "0.5s",
    height: "fit-content",
    backgroundSize: "cover",
    width: "fit-content",
  },


}));

export function DashboardCustomer(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'dashboardCustomer', reducer });
  useInjectSaga({ key: 'dashboardCustomer', saga });


  const classes = useStyles();
  const action = false;
  const [searched, setSearched] = useState("");
  const [data, setData] = useState(props.dashboardCustomer.userList.filter(user => user.username != "admin"));

  // const columns = [
  //   { title: "STT", field: "id" },
  //   { title: "User Name", field: "username" },
  //   { title: "Phone", field: "phoneNumber" },
  //   { title: "Status", field: "status" },
  // ];

  const columns1 = [
    { id: 'stt', label: 'STT', minWidth: 10, align: 'center' },
    { id: 'username', label: 'Tên', minWidth: 100, align: 'center' },
    { id: 'email', label: 'Email', minWidth: 100, align: 'center' },
    { id: 'phoneNumber', label: 'Số điện thoại', minWidth: 100, align: 'center' },
    { id: 'status', label: 'Trạng thái', minWidth: 100, align: 'center' },
  ];

  useEffect(() => {
    dispatch(fetchListUser());
  }, []);

  const requestSearch = (searchedVal) => {
    const filteredRows = props.dashboardCustomer.userList.filter((row) => {
      return row.username.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setData(filteredRows);
  };

  useEffect(() => {
    setData(props.dashboardCustomer.userList.filter(user => user.username != "admin"));
  }, [props.dashboardCustomer.userList])

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  function createData(id, stt, username, email, phoneNumber, status) {
    //const density = population / size;
    return { id, stt, username, email, phoneNumber, status };
  }

  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (data) {
      setRows(data.map((item, index) =>
        createData(item.id, index + 1, item.username, item.email, item.phoneNumber, item.status)
      ))
    }
  }, [data])

  return (
    <div style={{ paddingRight: "15px" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item sm={12} xs={12}>
            <SearchBar
              value={searched}
              onChange={(searchVal) => requestSearch(searchVal)}
              onCancelSearch={() => cancelSearch()}
              placeholder="Tìm kiếm người dùng theo tến"
            />
          </Grid>
          <Grid item sm={12} xs={12} style={{ margin: " 10px 0" }}>
            <div className={classes.information_image}>
              <h2>Tổng số người dùng: {props.dashboardCustomer.userList.length}</h2>
            </div>
          </Grid>
          <Grid item sm={12} xs={12}>

            {/* {data ? <CustomTable data={data} itemPerPage={10} totalItem={props.dashboardCustomer.userList.length} detailPage="customer" columns={columns} action={action} /> : <></>} */}
            {props.dashboardCustomer.userList ? <CustomTableResponsive columns={columns1} data={data} detailPage="customer" rows={rows} /> : null}
          </Grid>
        </Grid>

      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.dashboardCustomer.loading}
      >
        <Loading />
      </Backdrop>
    </div>
  );
}

DashboardCustomer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboardCustomer: makeSelectDashboardCustomer(),
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
)(DashboardCustomer);
