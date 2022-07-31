/**
 *
 * UserDetailReport
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
import makeSelectUserDetailReport from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Box, Grid, Container, Avatar, TextareaAutosize } from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { useHistory } from 'react-router-dom';
import { getDetailReportById } from './actions';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  btn: {
    position: "relative",
    width: "fit-content",
    borderRadius: "10px",
    backgroundColor: "#ff9900",
    margin: "10px 5px",
    "&:hover": {
      backgroundColor: "#FFA500",
      fontWeight: "bold",
      color: "#000",
      boxShadow: "2rem 2rem 3rem rgba(132, 139, 200, 0.18)",
    }
  },
  font: {
    fontFamily: "sans-serif",
    margin: "0"
  },
  center: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
  },
}));

export function UserDetailReport(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'userDetailReport', reducer });
  useInjectSaga({ key: 'userDetailReport', saga });

  const classes = useStyles();
  const [answer, setAnswer] = useState(false);
  const history = useHistory();

  console.log(props.userDetailReport.report)
  useEffect(() => {
    const data = {
      id: props.location.state.id
    }
    dispatch(getDetailReportById(data));
  }, [])

  return (
    <div>
      <Grid container spacing={0} >
        <Grid item xs={6} md={6} style={{ padding: "10px" }}>
          <Button className={classes.btn} variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => history.goBack()}>
            Trở về
          </Button>
        </Grid>
        <Grid item xs={6} md={6} style={{ padding: "10px", justifyContent: "right" }} className={classes.center}>
          <p className={classes.font} style={{ fontWeight: "400", fontSize: "30px" }}>26/07/2022</p>
        </Grid>
      </Grid>

      <div style={{ display: "flex" }}>
        <div>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </div>
        <div style={{ margin: "0 10px" }}>
          <p className={classes.font} style={{ fontWeight: "700", fontSize: "24px" }}>{props.userDetailReport.report ? props.userDetailReport.report.user.username : null} <span className={classes.font} style={{ fontWeight: "500", fontSize: "16px", color: "#949494" }}>&lt;{props.userDetailReport.report ? props.userDetailReport.report.user.email : null}&gt;</span></p>
        </div>
      </div>

      <Grid container spacing={0}>
        <Grid item xs={12} md={12} style={{ padding: "10px" }}>
          <p className={classes.font} style={{ fontWeight: "500", fontSize: "24px" }}>{props.userDetailReport.report ? props.userDetailReport.report.title : null}</p>
        </Grid>
        <Grid item xs={12} md={12} style={{ padding: "10px" }}>
          <p className={classes.font} style={{ fontWeight: "500", fontSize: "24px" }}>{props.userDetailReport.report ? props.userDetailReport.report.description : null}</p>
        </Grid>
        <Grid item xs={12} md={12} style={{ padding: "10px" }}>
          <p className={classes.font} style={{ fontWeight: "500", fontSize: "24px" }}>Bằng chứng: </p>
        </Grid>
        <Grid item xs={12} md={12} style={{ padding: "10px" }}>
          <Box
            component="img"
            sx={{
              height: 300,
              width: 300,
              maxHeight: { xs: 400, md: 600 },
              maxWidth: { xs: 400, md: 600 },
              borderRadius: "10px"
            }}
            alt="evidence"
            src="https://cdn.luatminhkhue.vn/lmk/articles/71/356492/bang-chung-la-gi---khai-niem-ve-bang-chung---356492.jpeg"
          />
        </Grid>
      </Grid>

      {props.userDetailReport.report && props.userDetailReport.report.reportResult ?
        <Grid container spacing={0}>
          <Grid item xs={12} md={6} style={{ padding: "10px" }}>
            <div style={{ display: "flex" }}>
              <div>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </div>
              <div style={{ margin: "0 10px" }}>
                <p className={classes.font} style={{ fontWeight: "700", fontSize: "24px" }}>{props.userDetailReport.report.reportResult.createdBy} </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6} className={classes.center} style={{ padding: "10px", justifyContent: "right" }} >
            <span style={{ fontWeight: "400", fontSize: "24px" }}>{moment(props.userDetailReport.report.reportResult.createdAt).format('DD/MM/YYYY,  h:mm:ss a')}</span>
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs={12} md={12} style={{ padding: "10px" }}>
              <p className={classes.font} style={{ fontWeight: "500", fontSize: "24px" }}>{props.userDetailReport.report.reportResult.description}</p>
            </Grid>
          </Grid>
        </Grid>
        : null}

      {/* <Grid container spacing={0}>
        {!answer ?
          <Grid item xs={12} md={12} style={{ padding: "10px" }}>
            <Button className={classes.btn} variant="outlined" startIcon={<QuestionAnswerIcon />} onClick={() => { setAnswer(!answer) }}>
              Trả lời
            </Button>
          </Grid>
          : null}
        {answer ?
          <>
            <hr />
            <Grid item xs={12} md={12} style={{ padding: "10px" }}>
              <TextareaAutosize
                maxRows={8}
                aria-label="maximum height"
                placeholder="Câu trả lời"
                style={{ width: "100%", minWidth: "200px", borderRadius: "5px" }}
              />
            </Grid>
            <Grid item xs={12} md={12} style={{ padding: "10px" }}>
              <Button className={classes.btn} variant="outlined" startIcon={<QuestionAnswerIcon />} onClick={() => { setAnswer(!answer) }}>
                Gửi
              </Button>
            </Grid>
          </>
          : null}
      </Grid> */}
    </div>
  );
}

UserDetailReport.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userDetailReport: makeSelectUserDetailReport(),
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
)(UserDetailReport);
