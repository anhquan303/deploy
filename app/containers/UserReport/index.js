/**
 *
 * UserReport
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
import makeSelectUserReport from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  Box, Grid, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  List, ListItemButton, ListItemText, TextField, Tabs, Tab, Chip, Modal, Switch, Backdrop
} from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import CustomTableResponsive from '../../components/CustomTableResponsive';
import { getUser } from '../../utils/common';
import { getListReportByUserId, reset, userAddReport } from './actions';
import moment from 'moment';
import Loading from '../../components/Loading';

const useStyles = makeStyles(theme => ({
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
  center: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
  },
  font: {
    fontFamily: 'sans-serif',
    margin: '0',
  },
}));

export function UserReport(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'userReport', reducer });
  useInjectSaga({ key: 'userReport', saga });

  const classes = useStyles();
  const user = getUser();
  const [data, setData] = useState(props.userReport.listReport);
  const [open, setOpen] = useState(false);
  const initialValues = { title: '', content: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  // set value for input
  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = values => {
    const errors = {};
    if (!values.title) {
      errors.title = 'title is required!';
    }
    if (!values.content) {
      errors.content = 'content is required!';
    }
    return errors;
  };

  // check validate
  const handleAddReport = e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  // signup
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const data = {
        userId: user.id,
        storeId: 8,
        title: formValues.title,
        description: formValues.content,
        image: "abc",
        userToStore: true
      };
      dispatch(userAddReport(data));
    }
  }, [formErrors]);


  const columns1 = [
    { id: 'stt', label: 'STT', minWidth: 10, align: 'center' },
    { id: 'title', label: 'Tiêu đề', minWidth: 100, align: 'center' },
    { id: 'createdAt', label: 'Thời gian', minWidth: 100, align: 'center' },
    { id: 'status', label: 'Trạng thái', minWidth: 100, align: 'center' },
  ];


  function createData(id, stt, title, createdAt, status) {
    //const density = population / size;
    return { id, stt, title, createdAt, status };
  }

  useEffect(() => {
    setData(props.userReport.listReport);
  }, [props.userReport.listReport])

  useEffect(() => {
    const data = {
      id: user.id
    }
    dispatch(getListReportByUserId(data));
  }, [])


  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (data) {
      setRows(data.map((item, index) =>
        createData(item.id, index + 1, item.title, moment.utc(item.createdAt).format('DD/MM/YYYY,  h:mm:ss a'), item.status)
      ))
    }
  }, [data])

  useEffect(() => {
    if (props.userReport.message != "") {
      if (props.userReport.message.includes("thành công")) {
        setOpen(false);
        const data = {
          id: user.id
        }
        dispatch(getListReportByUserId(data));
        dispatch(reset());
      }
    }
  }, [props.userReport.message])



  return (
    <div>
      <div>
        <p className={classes.font} style={{ fontWeight: '500', fontSize: '25px' }} >
          Báo cáo của tôi
        </p>
        <p className={classes.font} style={{ fontWeight: 'lighter', fontSize: '15px' }}>
          Quản lý báo cáo
        </p>
      </div>
      <hr />

      {/* <div className={classes.center} style={{ justifyContent: "right" }}>
        <Button className={classes.btn} variant="outlined" onClick={handleClickOpen}>
          Tạo báo cáo
        </Button>
      </div> */}

      {data ? <CustomTableResponsive columns={columns1} data={data} detailPage="user/detail-report" rows={rows} /> : <span>Bạn chưa tạo báo cáo</span>}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tạo báo cáo mới</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Chúng tôi sẽ tiếp nhận báo cáo và chỉnh sửa
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Tiêu đề"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            name="title"
            helperText={formErrors.title && formValues.title.length == '' ? formErrors.title : null}
            error={formErrors.title != null && formValues.title.length == ''}
          />
          <TextField
            autoFocus
            margin="dense"
            id="content"
            label="Nội dung"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            name="content"
            helperText={formErrors.content && formValues.content.length == '' ? formErrors.content : null}
            error={formErrors.content != null && formValues.content.length == ''}
          />
          <input type="file" name="myImage" accept="image/png, image/gif, image/jpeg" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy Bỏ</Button>
          <Button onClick={handleAddReport}>Gửi</Button>
        </DialogActions>
      </Dialog>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.userReport.loading}
      >
        <Loading />
      </Backdrop>
    </div>
  );
}

UserReport.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userReport: makeSelectUserReport(),
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
)(UserReport);
