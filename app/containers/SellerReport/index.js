/**
 *
 * SellerReport
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
import makeSelectSellerReport from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Grid } from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import moment from 'moment';
import SearchBar from "material-ui-search-bar";
import CustomTableResponsive from '../../components/CustomTableResponsive';
import { getStore } from '../../utils/common';
import { getReportByStoreId } from './actions';

const useStyles = makeStyles((theme) => ({
  font: {
    fontFamily: "sans-serif",
    margin: "0"
  },
}));

export function SellerReport(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'sellerReport', reducer });
  useInjectSaga({ key: 'sellerReport', saga });

  const currentDate = moment().format('DD-MM-YYYY');
  const classes = useStyles();
  const [searched, setSearched] = useState("");
  const store = getStore();
  const [data, setData] = useState(props.sellerReport.listReport);

  useEffect(() => {
    setData(props.sellerReport.listReport);
  }, [props.sellerReport.listReport])

  useEffect(() => {
    const data = {
      id: store
    }
    dispatch(getReportByStoreId(data));
  }, []);

  const requestSearch = (searchedVal) => {
    // const filteredRows = props.dashboardStore.listStore.filter((row) => {
    //   return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    // });
    // setData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const columns1 = [
    { id: 'stt', label: 'STT', minWidth: 10, align: 'center' },
    { id: 'title', label: 'Nội dung', minWidth: 100, align: 'center' },
    { id: 'createAt', label: 'Thời gian', minWidth: 100, align: 'center' },
    { id: 'status', label: 'Trạng thái', minWidth: 100, align: 'center' },
  ];

  function createData(id, stt, title, createAt, status) {
    //const density = population / size;
    return { id, stt, title, createAt, status };
  }

  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (data) {
      setRows(data.map((item, index) =>
        createData(item.id, index + 1, item.title, moment(item.createdAt).format('DD/MM/YYYY,  h:mm:ss a'), item.status)
      ))
    }
  }, [data])

  return (
    <div>
      <Grid container spacing={0} >
        <Grid item xs={6} md={6} style={{ padding: "10px" }}>
          <p className={classes.font} style={{ fontWeight: "400", fontSize: "30px" }}>{currentDate}</p>
        </Grid>
        <Grid item xs={6} md={6} style={{ padding: "10px", }}>
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
            placeholder="Tìm kiếm báo cáo theo tên"
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          {data ? <CustomTableResponsive columns={columns1} data={data} detailPage="my-store/report" rows={rows} /> : <span>Chưa có báo cáo</span>}
        </Grid>
      </Grid>
    </div>
  );
}

SellerReport.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sellerReport: makeSelectSellerReport(),
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
)(SellerReport);
