import React, { Component } from "react";
import { Button, TablePagination, Table, TableBody, TableHead, TableRow, TableCell, Paper, Typography, Checkbox } from '@material-ui/core';
import checkmark from './checkmark.png';

class AssetsTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 5
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  renderRows = (assets) => {
    const { page, rowsPerPage } = this.state;
    const { redirectToAssetDetail, ASSET_STATE } = this.props;

    var json = '{"files":[{"ExternalStorageAddress":"654910fe5bec44d5d89146c534ab996a4f405e72","Category":"Study Demographics","Access":"Open","FileName": "Demographic Baseline.xls","DateTime": "8/1/2019 08:00","UploadedBy": "Paul Elisii","UploadedTo": "Corelabs","AcceptedBy": "Bill Barber","Verified": "X"}, ' +
      '{"ExternalStorageAddress":"654910fe5bec44d5d89146c534ab996a4f405e72","Category":"Demographics","Access":"Open","FileName": "Demographic Group 1.xls","DateTime": "8/1/2019 08:00","UploadedBy": "Paul Elisii","UploadedTo": "NY Hospital","AcceptedBy": "","Verified": ""}, ' +
      '{"ExternalStorageAddress":"654910fe5bec44d5d89146c534ab996a4f405e72","Category":"Study Results","Access":"Blinded","FileName": "Test 1 Results.xls","DateTime": "8/6/2019 08:45","UploadedBy": "Jim Smith","UploadedTo": "Clinlogix","AcceptedBy": "Paul Elisii","Verified": "X"},' +
      '{"ExternalStorageAddress":"654910fe5bec44d5d89146c534ab996a4f405e72","Category":"Study Results","Access":"Blinded","FileName": "Test 2 Results.xls","DateTime": "8/5/2019 13:31","UploadedBy": "Sam Templeton","UploadedTo": "Clinlogix","AcceptedBy": "Paul Elisii","Verified": "X"}]}';

    try {
        var tableEntries = JSON.parse(json);
    } catch (e) {
        console.log(e);
        return (<TableRow>
            <TableCell colSpan={9} align="center"> No Assets Found </TableCell>
        </TableRow>);
    }

    var tableContent = [];
    for (var x = 0; x < tableEntries.files.length; x++) {
        var row = (
                <TableRow>
                    <TableCell align="left">
                        <Checkbox
                            value=""
                            className="table-check-box"
                            inputProps={{ 'data-contractid': tableEntries.files[x].ExternalStorageAddress}}
                        />
                    </TableCell>
                    <TableCell align="left">{tableEntries.files[x].Category}</TableCell>
                    <TableCell align="left">{tableEntries.files[x].Access}</TableCell>
                    <TableCell align="left">{tableEntries.files[x].FileName}</TableCell>
                    <TableCell align="left">{tableEntries.files[x].DateTime}</TableCell>
                    <TableCell align="left">{tableEntries.files[x].UploadedBy}</TableCell>
                    <TableCell align="left">{tableEntries.files[x].UploadedTo}</TableCell>
                    <TableCell align="left">{tableEntries.files[x].AcceptedBy}</TableCell>
                    <TableCell align="left">
                        {(tableEntries.files[x].Verified === 'X') ? <img className="checkmark" src={checkmark} /> : ""}
                    </TableCell>
                </TableRow>
            );
        tableContent.push(row);
    }

    return (
        <TableBody className="assets-table-body">
            {tableContent}
        </TableBody>
    )

  }

  render() {
    const { assets, title } = this.props;

    return (
      <Paper className="assets-container">
        <div className="asset-table-title">
          <Typography variant="h6" id="tableTitle">
            {title}
          </Typography>
        </div>
        <Table className="assets-table">
          <TableHead>
            <TableRow>
              <TableCell className="selectColumn" align="left">Select</TableCell>
                <TableCell className="selectColumn" align="left">Category</TableCell>
                <TableCell className="selectColumn" align="left">Access</TableCell>
              <TableCell align="left">File Name</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Uploaded By</TableCell>
                <TableCell align="left">Uploaded To</TableCell>
                <TableCell align="left">Accepted By</TableCell>
                <TableCell align="left">Verified</TableCell>
            </TableRow>
          </TableHead>

            {this.renderRows(assets)}

        </Table>
        {/*<TablePagination*/}
          {/*rowsPerPageOptions={[2]}*/}
          {/*component="div"*/}
          {/*count={assets.length}*/}
          {/*rowsPerPage={this.state.rowsPerPage}*/}
          {/*page={this.state.page}*/}
          {/*backIconButtonProps={{*/}
            {/*'aria-label': 'Previous Page',*/}
          {/*}}*/}
          {/*nextIconButtonProps={{*/}
            {/*'aria-label': 'Next Page',*/}
          {/*}}*/}
          {/*onChangePage={this.handleChangePage}*/}
          {/*onChangeRowsPerPage={this.handleChangeRowsPerPage}*/}
        {/*/>*/}
      </Paper>
    )
  }
}

export default AssetsTable;
