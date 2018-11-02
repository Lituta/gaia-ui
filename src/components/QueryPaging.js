import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TextField from '@material-ui/core/TextField';

import DialogDisplay from './DialogDisplay';
import SVG from './SVG';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 1,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const styles = theme => ({
  root: {
    width: '100%',
  },
  table: {
  },
  tableWrapper: {
    overflowX: 'scroll',
    padding: '0 5px'
  },
  tableCell: {
    maxWidth: 260,
    overflow: 'scroll',
    padding: '5px 0'
  },
  tableCellIdx: {
    fontSize: 10,
  },
  tableRow: {
    height: 'auto',
  }
});

class CustomPaginationActionsTable extends React.Component {
  state = {
    rows: this.props.queryList.map(ele => { return this.createData(ele); }),
    page: 0,
    rowsPerPage: 50,
  };

  createData(ele) {
    return {
      idx: ele.query_idx,
      id: ele.query_json['@id'],
      json: <DialogDisplay title="JSON"  header={`JSON ${ele.query_idx}`} child={
        <TextField
          disabled
          id="outlined-multiline-flexible"
          multiline
          value={JSON.stringify(ele.query_json, null, 2)}
          variant="outlined"
          fullWidth
        />} />,
      viz: <DialogDisplay title='VIZ' header={`VIZ ${ele.query_idx}`} child={
        <SVG graphQuery={ele.query_json} />
      } />,
      find: <button onClick={() => { console.log(ele.query_idx); this.props.findQuery(ele.query_idx, ele.query_json); }}>FIND</button>,
      query: <button onClick={() => { console.log(ele.query_idx); this.props.applyQuery(ele.query_idx, ele.query_json); }}>QUERY</button>
    };
  }

  // createData(ele) {
  //   return {
  //     idx: ele.query_idx,
  //     twoLines: (
  //       <div>
  //         <div>
  //           <span style={{paddingRight: '10px'}}>{ele.query_idx}</span>
  //           <span>{ele.query_json['@id'].replace("2018_P103_Q002_", "").replace("AIDA_", "")}</span>
  //         </div>
  //         <div style={{display: 'inline-flex'}}>
  //           <span><DialogDisplay title="JSON" child={
  //             <TextField
  //               disabled
  //               id="outlined-multiline-flexible"
  //               multiline
  //               value={JSON.stringify(ele.query_json, null, 2)}
  //               variant="outlined"
  //               fullWidth
  //             />} /></span>
  //           <span><DialogDisplay title="VIZ" child={
  //             <SVG graphQuery={ele.query_json} />
  //           } /></span>
  //           <span><button onClick={() => { console.log(ele.query_idx); this.props.findQuery(ele.query_idx, ele.query_json); }}>FIND</button></span>
  //           <span><button onClick={() => { console.log(ele.query_idx); this.props.applyQuery(ele.query_idx, ele.query_json); }}>QUERY</button></span>
  //         </div>
  //       </div>
  //     )
  //   }
  // }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <div className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} padding="none">
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow key={row.idx} className={classes.tableRow}>
                    <TableCell className={classes.tableCellIdx}>{row.idx}</TableCell>
                    <TableCell className={classes.tableCell}>{row.id.replace("2018_P103_Q002_", "").replace("AIDA_", "")}</TableCell>
                    <TableCell className={classes.tableCell}>{row.json}</TableCell>
                    <TableCell className={classes.tableCell}>{row.viz}</TableCell>
                    <TableCell className={classes.tableCell}>{row.find}</TableCell>
                    <TableCell className={classes.tableCell}>{row.query}</TableCell>
                    {/*<TableCell>{row.twoLines}</TableCell>*/}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 36 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={rows.length}
                  rowsPerPageOptions={[50, 100, 200, 500]}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    );
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);
