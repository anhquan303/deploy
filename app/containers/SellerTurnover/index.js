/**
 *
 * SellerTurnover
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
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import moment from 'moment';

import {
  Box,
  Grid,
  Container,
  Avatar,
  Typography,
  List,
  TextField,
  FormControl,
  Input,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

import { makeStyles, Button } from '@material-ui/core';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Line, Bar } from 'react-chartjs-2';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectSellerTurnover from './selectors';
import { getDataForChart } from './actions';
import { getStore } from '../../utils/common';

const useStyles = makeStyles(theme => ({
  btn: {
    position: 'relative',
    width: 'fit-content',
    borderRadius: '10px',
    backgroundColor: '#ff9900',
    margin: '10px 5px',
    '&:hover': {
      backgroundColor: '#FFA500',
      fontWeight: 'bold',
      color: '#000',
      boxShadow: '2rem 2rem 3rem rgba(132, 139, 200, 0.18)',
    },
  },
  center: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
  },
  font: {
    fontFamily: 'sans-serif',
    margin: '0',
  },
  title: {
    fontFamily: 'sans-serif',
    margin: '0',
    fontWeight: '700',
    fontSize: '20px',
  },
  compare: {
    fontFamily: 'sans-serif',
    margin: '0',
    fontWeight: '600',
    fontSize: '15px',
    color: '#949494',
  },
  information: {
    background: '#fff',
    padding: '20px',
    borderRadius: '20px',
    marginTop: '1rem',
    boxShadow: '0 2rem 3rem rgba(132, 139, 200, 0.18)',
    transition: '0.5s',
    height: '100%',
  },
}));

export function SellerTurnover(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'sellerTurnover', reducer });
  useInjectSaga({ key: 'sellerTurnover', saga });
  const classes = useStyles();
  let dollarUSLocale = Intl.NumberFormat('en-US');

  const [fromDay, setFromDay] = useState(new Date());
  const [toDay, setToDay] = useState(new Date());

  const [time, setTime] = useState(1);
  const store = getStore();

  const handleChangeTime = e => {
    setTime(e.target.value);
  };

  useEffect(() => {
    const data = {
      sid: store,
      days: time,
    };
    dispatch(getDataForChart(data));
  }, [time]);

  return (
    <div>
      <p className={classes.title} style={{ fontSize: '25px' }}>
        Chỉ số quan trọng
      </p>
      <Grid container spacing={0}>
        <Grid item md={3} sm={12} xs={12} style={{ padding: '10px' }}>
          <div className={classes.information}>
            <Grid container spacing={0}>
              <Grid item md={6} sm={12} xs={12}>
                <p className={classes.title}>Doanh số</p>
                <p className={classes.title}>
                  {props.sellerTurnover.saleData.length != 0
                    ? dollarUSLocale.format(props.sellerTurnover.saleData[
                      props.sellerTurnover.saleData.length - 1
                    ].totalAmount)

                    : null}{' '}
                  VND
                </p>
              </Grid>
              <Grid item md={6} sm={12} xs={12} style={{ textAlign: 'center' }}>
                <MonetizationOnRoundedIcon
                  sx={{ width: 50, height: 50, color: '#FFAC30' }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={0}>
              <Grid item md={6} sm={12} xs={12}>
                <p className={classes.compare}>So với hôm qua</p>
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <p className={classes.compare} style={{ textAlign: 'right' }}>
                  0.00%
                </p>
              </Grid>
            </Grid>
          </div>
        </Grid>

        <Grid item md={3} sm={12} xs={12} style={{ padding: '10px' }}>
          <div className={classes.information}>
            <Grid container spacing={0}>
              <Grid item md={6} sm={12} xs={12}>
                <p className={classes.title}>Đơn hàng</p>
                <p className={classes.title}>
                  {props.sellerTurnover.saleData.length != 0
                    ? props.sellerTurnover.saleData[
                      props.sellerTurnover.saleData.length - 1
                    ].totalOrder
                    : null}
                </p>
              </Grid>
              <Grid item md={6} sm={12} xs={12} style={{ textAlign: 'center' }}>
                <AssignmentRoundedIcon
                  sx={{ width: 50, height: 50, color: '#FFAC30' }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={0}>
              <Grid item md={6} sm={12} xs={12}>
                <p className={classes.compare}>So với hôm qua</p>
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <p className={classes.compare} style={{ textAlign: 'right' }}>
                  0.00%
                </p>
              </Grid>
            </Grid>
          </div>
        </Grid>

        <Grid item md={3} sm={12} xs={12} style={{ padding: '10px' }}>
          <div className={classes.information}>
            <Grid container spacing={0}>
              <Grid item md={6} sm={12} xs={12}>
                <p className={classes.title}>Lượt truy cập</p>
                <p className={classes.title}>0 VND</p>
              </Grid>
              <Grid item md={6} sm={12} xs={12} style={{ textAlign: 'center' }}>
                <PersonRoundedIcon
                  sx={{ width: 50, height: 50, color: '#FFAC30' }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={0}>
              <Grid item md={6} sm={12} xs={12}>
                <p className={classes.compare}>So với hôm qua</p>
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <p className={classes.compare} style={{ textAlign: 'right' }}>
                  0.00%
                </p>
              </Grid>
            </Grid>
          </div>
        </Grid>

        <Grid item md={3} sm={12} xs={12} style={{ padding: '10px' }}>
          <div className={classes.information}>
            <Grid container spacing={0}>
              <Grid item md={6} sm={12} xs={12}>
                <p className={classes.title}>Doanh số trên mỗi đơn hàng</p>
                <p className={classes.title}>
                  {props.sellerTurnover.saleData.length != 0
                    ? dollarUSLocale.format( props.sellerTurnover.saleData[
                      props.sellerTurnover.saleData.length - 1
                    ].salesPerOrder)
                    : null}{' '}
                  VND
                </p>
              </Grid>
              <Grid item md={6} sm={12} xs={12} style={{ textAlign: 'center' }}>
                <MonetizationOnRoundedIcon
                  sx={{ width: 50, height: 50, color: '#FFAC30' }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={0}>
              <Grid item md={6} sm={12} xs={12}>
                <p className={classes.compare}>So với hôm qua</p>
              </Grid>
              <Grid item md={4} sm={12} xs={12}>
                <p className={classes.compare} style={{ textAlign: 'right' }}>
                  0.00%
                </p>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={0} style={{ marginTop: '30px' }}>
        <Grid item md={2} sm={12} xs={12} className={classes.center}>
          <p className={classes.title}>Khung thời gian</p>
        </Grid>
        <Grid item md={2} sm={12} xs={12}>
          <div>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Khung thời gian
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  label="Khung thời gian"
                  onChange={handleChangeTime}
                >
                  <MenuItem value="1">Hôm qua</MenuItem>
                  <MenuItem value="7">Trong 7 ngày qua</MenuItem>
                  <MenuItem value="30">Trong 30 ngày qua</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </Grid>
      </Grid>

      <div style={{ padding: '30px' }}>
        <Line
          data={{
            // labels: props.sellerTurnover.saleData.map((data) => data.day),
            labels: props.sellerTurnover.saleData.map(data =>
              moment(data.day).format('DD/MM/YYYY'),
            ),

            datasets: [
              {
                data: props.sellerTurnover.saleData.map(
                  data => data.totalAmount,
                ),
                label: 'Doanh số',
                borderColor: '#FFAC30',
                fill: true,
              },
              {
                data: props.sellerTurnover.saleData.map(
                  data => data.totalOrder,
                ),
                label: 'Đơn hàng',
                borderColor: '#1168EB',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                fill: true,
              },
              {
                data: props.sellerTurnover.saleData.map(
                  data => data.salesPerOrder,
                ),
                label: 'Doanh số trên mỗi đơn hàng',
                borderColor: '#FE0000',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                fill: true,
              },
            ],
          }}
        />
        {/* <Line
          data={{
            labels: ["12/07/2022", "13/07/2022", "14/07/2022"],
            datasets: [
              {
                data: ["400000", "150000", "1000000"],
                label: "Doanh số",
                borderColor: "#FFAC30",
                fill: true
              },
              {
                data: ["17", "10", "40"],
                label: "Đơn hàng",
                borderColor: "#1168EB",
                backgroundColor: "rgba(255, 0, 0, 0.5)",
                fill: true
              },
              {
                data: ["15", "29", "72"],
                label: "Lượt truy cập",
                borderColor: "#20D167",
                backgroundColor: "rgba(255, 0, 0, 0.5)",
                fill: true
              },
              {
                data: ["50000", "30000", "100000"],
                label: "Doanh số trên mỗi đơn hàng",
                borderColor: "#FE0000",
                backgroundColor: "rgba(255, 0, 0, 0.5)",
                fill: true
              }
            ]
          }}
        /> */}
      </div>
    </div>
  );
}

SellerTurnover.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sellerTurnover: makeSelectSellerTurnover(),
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
)(SellerTurnover);
