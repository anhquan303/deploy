/**
 *
 * DetailReport
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
import makeSelectDetailReport from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Box, Grid, Container, Avatar, TextareaAutosize } from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { useHistory } from 'react-router-dom';
import { getReportById, sendReply } from './actions';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  btn: {
    position: "relative",
    width: "fit-content",
    borderRadius: "10px",
    backgroundColor: "#FD4444",
    color: "#fff",
    margin: "10px 5px",
    "&:hover": {
      backgroundColor: "#FF1C1C",
      fontWeight: "bold",
      color: "#fff",
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

export function DetailReport(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'detailReport', reducer });
  useInjectSaga({ key: 'detailReport', saga });

  const classes = useStyles();
  const [answer, setAnswer] = useState(false);
  const history = useHistory();
  const initialValues = { reply: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  // set value for input
  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = values => {
    const errors = {};
    if (!values.reply) {
      errors.reply = 'reply is required!';
    }
    return errors;
  };

  // check validate
  const handleSendReply = e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  // send reply
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const data = {
        id: props.location.state.id,
        body: {
          title: "",
          description: formValues.reply,
          status: "APPROVED"
        }
      };
      dispatch(sendReply(data));
    }
  }, [formErrors]);

  useEffect(() => {
    const data = {
      id: props.location.state.id
    }
    dispatch(getReportById(data));
  }, []);

  useEffect(() => {
    if (props.detailReport.message.includes("thành công")) {
      const data = {
        id: props.location.state.id
      }
      dispatch(getReportById(data));
      setAnswer(false);
    }
  }, [props.detailReport.message])


  return (
    <div>
      <Grid container spacing={0} >
        <Grid item xs={12} md={6} sm={12} style={{ padding: "10px" }}>
          <Button className={classes.btn} variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => history.goBack()}>
            Trở về
          </Button>
        </Grid>
        <Grid item xs={12} md={6} sm={12} style={{ padding: "10px", justifyContent: "right" }} className={classes.center}>
          <p className={classes.font} style={{ fontWeight: "400", fontSize: "24px" }}>{moment.utc(props.detailReport.report ? props.detailReport.report.createdAt : null).format('DD/MM/YYYY,  h:mm:ss a')}</p>
        </Grid>
      </Grid>

      <div style={{ display: "flex" }}>
        <div>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </div>
        <div style={{ margin: "0 10px" }}>
          <p className={classes.font} style={{ fontWeight: "700", fontSize: "24px" }}>{props.detailReport.report ? props.detailReport.report.createdBy : null} <span className={classes.font} style={{ fontWeight: "500", fontSize: "16px", color: "#949494" }}>&lt;{props.detailReport.report ? props.detailReport.report.user.email : null}&gt;</span></p>
        </div>
      </div>

      <Grid container spacing={0}>
        <Grid item xs={12} md={12} style={{ padding: "10px" }}>
          <p className={classes.font} style={{ fontWeight: "500", fontSize: "24px" }}>{props.detailReport.report ? props.detailReport.report.title : null}</p>
        </Grid>
        <Grid item xs={12} md={12} style={{ padding: "10px" }}>
          <p className={classes.font} style={{ fontWeight: "500", fontSize: "24px" }}>{props.detailReport.report ? props.detailReport.report.description : null}</p>
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
            src={props.detailReport.report ? props.detailReport.report.image : null}
          />
        </Grid>
      </Grid>
      <hr />

      {props.detailReport.report && props.detailReport.report.reportResult ?
        <Grid container spacing={0}>
          <Grid item xs={12} md={6} style={{ padding: "10px" }}>
            <div style={{ display: "flex" }}>
              <div>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </div>
              <div style={{ margin: "0 10px" }}>
                <p className={classes.font} style={{ fontWeight: "700", fontSize: "24px" }}>{props.detailReport.report.reportResult.createdBy} </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6} className={classes.center} style={{ padding: "10px", justifyContent: "right" }} >
            <span style={{ fontWeight: "400", fontSize: "24px" }}>{moment(props.detailReport.report.reportResult.createdAt).format('DD/MM/YYYY,  h:mm:ss a')}</span>
          </Grid>
          <Grid container spacing={0}>
            {/* <Grid item xs={12} md={12} style={{ padding: "10px" }}>
              <p className={classes.font} style={{ fontWeight: "500", fontSize: "24px" }}>{props.detailReport.report ? props.detailReport.report.title : null}</p>
            </Grid> */}
            <Grid item xs={12} md={12} style={{ padding: "10px" }}>
              <p className={classes.font} style={{ fontWeight: "500", fontSize: "24px" }}>{props.detailReport.report.reportResult.description}</p>
            </Grid>
            {/* <Grid item xs={12} md={12} style={{ padding: "10px" }}>
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
            </Grid> */}
          </Grid>
        </Grid>
        : null}

      <Grid container spacing={0}>
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
                onChange={handleChange}
                name="reply"
              // helperText={formErrors.reply && formValues.reply.length == '' ? formErrors.reply : null}
              // error={formErrors.reply != null && formValues.reply.length == ''}
              />
            </Grid>
            <Grid item xs={12} md={12} style={{ padding: "10px" }}>
              <Button className={classes.btn} variant="outlined" startIcon={<QuestionAnswerIcon />} onClick={handleSendReply}>
                Gửi
              </Button>
            </Grid>
          </>
          : null}
      </Grid>
    </div>
  );
}

DetailReport.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  detailReport: makeSelectDetailReport(),
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
)(DetailReport);
