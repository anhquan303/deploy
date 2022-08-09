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
import { Grid, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Backdrop } from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import moment from 'moment';
import SearchBar from "material-ui-search-bar";
import CustomTableResponsive from '../../components/CustomTableResponsive';
import { getStore, getUser } from '../../utils/common';
import { getReportByStoreId, reset, storeAddReport } from './actions';
import Loading from '../../components/Loading';

const useStyles = makeStyles((theme) => ({
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

export function SellerReport(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'sellerReport', reducer });
  useInjectSaga({ key: 'sellerReport', saga });

  const currentDate = moment().format('DD-MM-YYYY');
  const classes = useStyles();
  const [searched, setSearched] = useState("");
  const store = getStore();
  const [data, setData] = useState(props.sellerReport.listReport);
  const [open, setOpen] = useState(false);
  const initialValues = { title: '', content: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const user = getUser();
  const [evidence, setEvidence] = useState('');

  useEffect(() => {
    setData(props.sellerReport.listReport);
  }, [props.sellerReport.listReport])

  useEffect(() => {
    const data = {
      id: store
    }
    dispatch(getReportByStoreId(data));
  }, []);

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
    if (!evidence) {
      errors.evidence = 'evidence is required!';
    }
    return errors;
  };

  // check validate
  const handleAddReport = e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  // anh bang chung
  const handleUploadEvidence = async e => {
    const file = e.target.files;
    const data = new FormData();
    data.append(file, file[0]);
    setEvidence(file[0]);

  };

  const requestSearch = (searchedVal) => {
    // const filteredRows = props.dashboardStore.listStore.filter((row) => {
    //   return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    // });
    // setData(filteredRows);
  };

  // addReport
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const data = {
        userId: user.id,
        storeId: store,
        title: formValues.title,
        description: formValues.content,
        image: evidence,
        userToStore: false
      };
      dispatch(storeAddReport(data));
    }
  }, [formErrors]);

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const columns1 = [
    { id: 'stt', label: 'STT', minWidth: 10, align: 'center' },
    { id: 'title', label: 'Tiêu đề', minWidth: 100, align: 'center' },
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (props.sellerReport.message.includes("thành công")) {
      const data = {
        id: store
      }
      dispatch(getReportByStoreId(data));
      setOpen(false);
      dispatch(reset())
    }
  }, [props.sellerReport.message]);


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
        <Grid item xs={12} md={12} style={{ padding: "10px", }}>
          <div className={classes.center} style={{ justifyContent: "right" }}>
            <Button className={classes.btn} variant="outlined" onClick={handleClickOpen}>
              Tạo báo cáo
            </Button>
          </div>
        </Grid>
        <Grid item sm={12} xs={12}>
          {data ? <CustomTableResponsive columns={columns1} data={data} detailPage="my-store/report" rows={rows} /> : <span>Chưa có báo cáo</span>}
        </Grid>
      </Grid>

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
          <input type="file" name="myImage" onChange={handleUploadEvidence} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy Bỏ</Button>
          <Button onClick={handleAddReport}>Gửi</Button>
        </DialogActions>
      </Dialog>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.sellerReport.loading}
      >
        <Loading />
      </Backdrop>
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
