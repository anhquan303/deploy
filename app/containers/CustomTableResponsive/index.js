/**
 *
 * CustomTableResponsive
 *
 */

import React, { memo, useEffect, useState, detailPage, rows } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow
} from '@mui/material';


import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { useHistory } from 'react-router-dom';

function CustomTableResponsive({ columns, data, detailPage, rows }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const history = useHistory();

  const handleClick = (id) => {
    const location = {
      pathname: `/${detailPage}/${id}`,
      state: {
        id: id
      }
    }
    history.push(location)
  }


  // function createData(id, stt, name, email, slogan, status) {
  //   //const density = population / size;
  //   return { id, stt, name, email, slogan, status };
  // }

  // const [rows, setRows] = useState([]);
  // useEffect(() => {
  //   if (data) {
  //     setRows(data.map((item, index) =>
  //       createData(item.id, index + 1, item.name, item.email, item.slogan, item.status)
  //     ))
  //   }
  // }, [data])




  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <span style={{fontWeight: "700", fontSize: "20px"}}>{column.label}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{ width: column.minWidth }} onClick={() => handleClick(row.id)}>
                          {column.format
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          {/* <TableBody>
            {data ? data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell key={index}>
                      1
                    </TableCell>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              }) : null}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody> */}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

CustomTableResponsive.propTypes = {};

export default memo(CustomTableResponsive);
