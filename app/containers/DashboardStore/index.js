/**
 *
 * DashboardStore
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
import makeSelectDashboardStore from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import CustomTable from '../../components/CustomTable';
import { getAllStore } from './actions';
import SearchBar from "material-ui-search-bar";
import DashboardHeader from '../../components/DashboardHeader';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CustomTableResponsive from '../../components/CustomTableResponsive';
import Loading from '../../components/Loading';
import { Backdrop } from '@mui/material';

export function DashboardStore(props) {
  const { dispatch, listStore } = props;
  useInjectReducer({ key: 'dashboardStore', reducer });
  useInjectSaga({ key: 'dashboardStore', saga });

  const [searched, setSearched] = useState("");
  const [data, setData] = useState(props.dashboardStore.listStore);
  const action = false;


  useEffect(() => {
    dispatch(getAllStore());
  }, [])


  useEffect(() => {
    setData(props.dashboardStore.listStore);
  }, [props.dashboardStore.listStore])

  const requestSearch = (searchedVal) => {
    const filteredRows = props.dashboardStore.listStore.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const columns1 = [
    { id: 'stt', label: 'STT', minWidth: 10, align: 'center' },
    { id: 'name', label: 'Tên quán ăn', minWidth: 100, align: 'center' },
    { id: 'email', label: 'Email', minWidth: 100, align: 'center' },
    { id: 'phone', label: 'Số điện thoại', minWidth: 100, align: 'center' },
    { id: 'status', label: 'Trạng thái', minWidth: 100, align: 'center' },
    // {
    //   id: 'population',
    //   label: 'Population',
    //   minWidth: 170,
    //   align: 'right',
    //   format: (value) => value.toLocaleString('en-US'),
    // },
    // {
    //   id: 'size',
    //   label: 'Size\u00a0(km\u00b2)',
    //   minWidth: 170,
    //   align: 'right',
    //   format: (value) => value.toLocaleString('en-US'),
    // },
    // {
    //   id: 'density',
    //   label: 'Density',
    //   minWidth: 170,
    //   align: 'right',
    //   format: (value) => value.toFixed(2),
    // },
  ];

  function createData(id, stt, name, email, phone, status) {
    //const density = population / size;
    return { id, stt, name, email, phone, status };
  }

  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (data) {
      setRows(data.map((item, index) =>
        createData(item.id, index + 1, item.name, item.email, item.phone, item.status)
      ))
    }
  }, [data])

  return (
    <>
      {/* <div style={{ marginRight: "10px" }}>
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        {props.dashboardStore.listStore ? <CustomTable data={props.dashboardStore.listStore} itemPerPage={3} totalItem={props.dashboardStore.listStore.length} detailPage="store" columns={columns} /> : <></>}

      </div> */}

      <div style={{ paddingRight: "15px" }}>
        {/* <DashboardHeader text="Dashboard" /> */}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0}>
            <Grid item sm={12} xs={12}>
              <SearchBar
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
              />
            </Grid>
            {/* <Grid item sm={12} xs={12}>
              {data ? <CustomTable data={data} itemPerPage={10} totalItem={props.dashboardStore.listStore.length} detailPage="store" columns={columns} action={action} /> : <></>}
            </Grid> */}
            <Grid item sm={12} xs={12}>
              {data ? <CustomTableResponsive columns={columns1} data={data} detailPage="store" rows={rows} /> : null}
            </Grid>
          </Grid>

        </Box>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={props.dashboardStore.loading}
        >
          <Loading />
        </Backdrop>
      </div>
    </>
  );
}

DashboardStore.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboardStore: makeSelectDashboardStore(),
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
)(DashboardStore);
