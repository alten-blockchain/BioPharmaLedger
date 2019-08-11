import React, { Component } from "react";
import ReactDOM from 'react-dom';
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

  componentDidMount() {
      document.getElementById('sponsor').onchange = function() { filterTable(); }
      document.getElementById('study').onchange = function() { filterTable(); }
      document.getElementById('organization').onchange = function() { filterTable(); }
      document.getElementById('category').onchange = function() { filterTable(); }
      document.getElementById('access').onchange = function() { filterTable(); }
      rowsRendered();
  }

  renderRows = (assets) => {
    const { page, rowsPerPage } = this.state;
    const { redirectToAssetDetail, ASSET_STATE } = this.props;

    return (
        <TableBody id="assets-table-body">
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

function filterTable() {
    var html = [];
    for (var x = 0; x < tableData.length; x++) {
        if ((tableData[x][0] === document.getElementById('sponsor').value || document.getElementById('sponsor').value === '-- select sponsor --') &&
            (tableData[x][1] === document.getElementById('study').value || document.getElementById('study').value === '-- select study --') &&
            (tableData[x][8] === document.getElementById('organization').value || document.getElementById('organization').value === '-- select organization --') &&
            (tableData[x][3] === document.getElementById('category').value || document.getElementById('category').value === '-- select category --') &&
            (tableData[x][4] === document.getElementById('access').value || document.getElementById('access').value === '-- select access type --')) {
            html.push(
                <TableRow>
                    <TableCell align="left">
                        <Checkbox
                            value=""
                            className="table-check-box"
                            inputProps={{ 'data-contractid': tableData[x][2]}}
                        />
                    </TableCell>
                    <TableCell align="left">{tableData[x][3]}</TableCell>
                    <TableCell align="left">{tableData[x][4]}</TableCell>
                    <TableCell align="left">{tableData[x][5]}</TableCell>
                    <TableCell align="left">{tableData[x][6]}</TableCell>
                    <TableCell align="left">{tableData[x][7]}</TableCell>
                    <TableCell align="left">{tableData[x][8]}</TableCell>
                    <TableCell align="left">{tableData[x][9]}</TableCell>
                    <TableCell align="left">
                        {(tableData[x][10] === 'X') ? <img className="checkmark" src={checkmark} /> : ""}
                    </TableCell>
                </TableRow>
            );
        }
    }
    if (html.length > 0){
        ReactDOM.render(html, document.getElementById('assets-table-body'));
    } else {
        ReactDOM.render(<TableRow>
            <TableCell colSpan={9} align="center"> No Matching Files Found </TableCell>
        </TableRow>, document.getElementById('assets-table-body'));
    }
    rowsRendered();
}

function rowsRendered() {
    var checkboxs = document.getElementsByClassName("table-check-box");
    for (var i=0; i < checkboxs.length; i++) {
        checkboxs[i].onclick = function(){
            this.parentNode.parentNode.classList.toggle('selected-row');
            document.getElementById("contract").value = this.getElementsByTagName("input")[0].getAttribute('data-contractid');
            document.getElementById("contract").click();
        }
    };
}

var json = '{"files":[{"Sponsor":"CSL Behring","Study":"Hemophilia B Clinical Trial","ExternalStorageAddress":"654910fe5bec44d5d89146c534ab996a4f405e72","Category":"Demographics","Access":"Open","FileName": "Demographic Baseline.xls","DateTime": "8/1/2019 08:00","UploadedBy": "Paul Elisii","UploadedTo": "University of Colorado","AcceptedBy": "Bill Barber","Verified": "X"}, ' +
    '{"Sponsor":"CSL Behring","Study":"Hemophilia A Clinical Trial","ExternalStorageAddress":"654910fe5bec44d5d89146c534ab996a4f405e72","Category":"Demographics","Access":"Open","FileName": "Demographic Group 1.xls","DateTime": "8/1/2019 08:00","UploadedBy": "Paul Elisii","UploadedTo": "NY Hospital","AcceptedBy": "","Verified": ""}, ' +
    '{"Sponsor":"Merck","Study":"Acute Coronary Syndrome Clinical Trial","ExternalStorageAddress":"654910fe5bec44d5d89146c534ab996a4f405e72","Category":"Results","Access":"Blinded","FileName": "Test 1 Results.xls","DateTime": "8/6/2019 08:45","UploadedBy": "Jim Smith","UploadedTo": "Clinlogix","AcceptedBy": "Paul Elisii","Verified": "X"},' +
    '{"Sponsor":"Merck","Study":"Acute Coronary Syndrome Clinical Trial 2","ExternalStorageAddress":"654910fe5bec44d5d89146c534ab996a4f405e72","Category":"Results","Access":"Blinded","FileName": "Test 2 Results.xls","DateTime": "8/5/2019 13:31","UploadedBy": "Sam Templeton","UploadedTo": "Clinlogix","AcceptedBy": "Paul Elisii","Verified": "X"},' +
    '{"Sponsor":"Merck","Study":"Acute Coronary Syndrome Clinical Trial","ExternalStorageAddress":"654910fe5bec44d5d89146c534ab996a4f405e72","Category":"Demographics","Access":"Blinded","FileName": "Test 3 Results.xls","DateTime": "8/7/2019 05:12","UploadedBy": "John Doe","UploadedTo": "CoreLab of PA","AcceptedBy": "","Verified": ""}]}';

var tableContent = [];
var tableData = [];  //to store the data associated with each file and used for filtering the table later
try {
    var json = JSON.parse(json);

    //loop through json data and build initial table
    for (var x = 0; x < json.files.length; x++) {
        var row = (
            <TableRow>
                <TableCell align="left">
                    <Checkbox
                        value=""
                        className="table-check-box"
                        inputProps={{ 'data-contractid': json.files[x].ExternalStorageAddress}}
                    />
                </TableCell>
                <TableCell align="left">{json.files[x].Category}</TableCell>
                <TableCell align="left">{json.files[x].Access}</TableCell>
                <TableCell align="left">{json.files[x].FileName}</TableCell>
                <TableCell align="left">{json.files[x].DateTime}</TableCell>
                <TableCell align="left">{json.files[x].UploadedBy}</TableCell>
                <TableCell align="left">{json.files[x].UploadedTo}</TableCell>
                <TableCell align="left">{json.files[x].AcceptedBy}</TableCell>
                <TableCell align="left">
                    {(json.files[x].Verified === 'X') ? <img className="checkmark" src={checkmark} /> : ""}
                </TableCell>
            </TableRow>
        );
        tableContent.push(row);
        tableData.push([json.files[x].Sponsor, json.files[x].Study, json.files[x].ExternalStorageAddress, json.files[x].Category, json.files[x].Access, json.files[x].FileName, json.files[x].DateTime,  json.files[x].UploadedBy, json.files[x].UploadedTo, json.files[x].AcceptedBy, json.files[x].Verified]);
    }
} catch (e) {
    console.log(e);
    tableContent.push(<TableRow>
        <TableCell colSpan={9} align="center"> No Assets Found </TableCell>
    </TableRow>);
}

export default AssetsTable;
