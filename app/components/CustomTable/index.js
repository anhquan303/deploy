/**
 *
 * CustomTable
 *
 */

import React, { memo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Link, Route, useHistory } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { DetailStore } from '../../containers/DetailStore';

const useStyles = makeStyles((theme) => ({
  all: {
    marginTop: "20px",
    background: "#ffffff",
    width: "100%",
    borderRadius: "40px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
    transition: "0.5s",
  },
  table: {
    width: "100%",
    padding: "20px",
    textAlign: "center",
    borderCollapse: "collapse"
  },
  tr: {
    //height: "2.8rem",
    borderBottom: "1px solid rgba(132, 139, 200, 0.18)",
    color: "#677483",
    "&:hover": {
      backgroundColor: "#ececec",
    },
    [theme.breakpoints.down("sm")]: {
      display: "block",
      width: "100%",
      //height: "fit-content",
    },
  },
  pagination: {
    marginTop: "10px",
    justifyContent: "center",
    display: "flex",
    listStyle: "none",
    borderRadius: "0.25rem"
  },
  th: {
    fontSize: "24px",
    fontWeight: "bolder",
    color: "#000000",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
      // position: "absolute",
      // left: 0,
      // width: "50%",
      // paddingLeft: "15px",
      // fontSize: "15px",

    },
  },
  td: {
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      textAlign: "right",
      display: "block",
      width: "100%",
      paddingLeft: "50%",
      position: "relative",
      '&::before': {
        content: 'attr(data-text)',
        position: 'absolute',
        left: '0',
        width: '50%',
        paddingLeft: "15px",
        fontSize: "15px",
        fontWeight: "bold",
        textAlign: "left"
      }
    },

  },
  tbody: {
    [theme.breakpoints.down("sm")]: {
      display: "block",
      width: "100%"
    },
  }

}));

function CustomTable({ data, itemPerPage, totalItem, detailPage, columns, action }) {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  var length = Math.ceil(totalItem / itemPerPage);
  const pageNumber = [];

  for (var i = 1; i <= length; i++) {
    pageNumber.push(i);
  }
  const history = useHistory();

  const handleClick = (item) => {
    const location = {
      pathname: `/${detailPage}/${item.id}`,
      state: {
        item: item
      }
    }
    history.push(location)
  }

  const handleChangPage = (event, page) => {
    setCurrentPage(page)
  }
  const TableHeadItem = ({ item }) => <th className={classes.th}>{item.title}</th>
  const TableRowItem = ({ item, columns }) =>
  (
    <tr className={classes.tr} onClick={() => handleClick(item)}>

      {columns.map((columnsItem, index) => {
        return <td key={index} className={classes.td} data-text={columnsItem.title}>{item[`${columnsItem.field}`]}</td>
      })}
      {action == true ? <td><button>Delete</button></td> : null}
    </tr>
  )

  return (
    <div className={classes.all}>
      <table className={classes.table}>
        <thead>
          <tr>
            {columns.map((item, index) => <TableHeadItem item={item} key={index} />)}
            {action == true ? <th>Action</th> : null}
          </tr>

        </thead>
        <tbody className={classes.tbody}>

          {currentItems.map((item, index) => <TableRowItem item={item} columns={columns} key={index} />)}
        </tbody>

      </table>
      <span>{currentItems.length == 0 ? <p style={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "30px", color: "#FF0000" }}>Không có dữ liệu</p> : null}</span>
      <nav className={classes.pagination}>
        <Stack spacing={2}>
          <Pagination count={length} onChange={handleChangPage} />
        </Stack>
      </nav>
    </div >
  );
}

CustomTable.propTypes = {};

export default memo(CustomTable);
