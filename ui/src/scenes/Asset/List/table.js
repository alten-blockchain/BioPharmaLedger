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
      document.getElementById('upload-button').onclick = function() {
          addUploadRow();
      }
      document.getElementById('download-button').onclick = function() {
          updateDownloadedRow();
      }
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

function addUploadRow() {
    var currentdate = new Date();
    var datetime = currentdate.getMonth()+1 + "/"
        + (currentdate.getDate())  + "/"
        + currentdate.getFullYear() + ' '
        + currentdate.getHours() + ":"
        + currentdate.getMinutes();
    if (document.getElementById('fileName').innerHTML == '-- choose a file to upload --') { return; }
    var sponser, study, category, access, datetime, organization = '';
    if (document.getElementById('sponsor').value != '-- select sponsor --') { sponser = document.getElementById('sponsor').value; }
    if (document.getElementById('study').value != '-- select study --') { study = document.getElementById('study').value; }
    if (document.getElementById('organization').value != '-- select organization --') { organization = document.getElementById('organization').value; }
    if (document.getElementById('category').value != '-- select category --') { category = document.getElementById('category').value; }
    if (document.getElementById('access').value != '-- select access type --') { access = document.getElementById('access').value; }

    tableData.push([sponser, study, '1484c87e5ab203edfdd1ece0f3bf15fdc35eb8dc', category, access, document.getElementById('fileName').innerHTML, datetime, 'Paul Elisii', organization, '', '']);
    setTimeout(function(){
        filterTable();
    }, 2000);
}

function updateDownloadedRow() {
    if (document.getElementById("contract").value.length < 1) { return; }
    for (var x = 0; x < tableData.length; x++) {
        if (tableData[x][2] === document.getElementById("contract").value) {
            if (tableData[x][9] === '') {
                tableData[x][9] = 'Paul Elisii';
            }
            if (tableData[x][10] === '') {
                tableData[x][10] = 'X';
            }
            setTimeout(function(){
                filterTable();
            }, 1000);
            return;
        }
    }
}

var json = '{"files":[ {"Sponsor":"CSL Behring","Study":"Hemophilia B Clinical Trial","ExternalStorageAddress":"654910fe5bec44d5d89146c534ab996a4f405e72","Category":"Demographics","Access":"Open","FileName": "Demographic Baseline.xls","DateTime": "8/1/2019 08:00","UploadedBy": "Paul Elisii","UploadedTo": "University of Colorado","AcceptedBy": "","Verified": ""}, ' +
    '{"Sponsor":"CSL Behring","Study":"Hemophilia A Clinical Trial","ExternalStorageAddress":"654910fe5bec44d5d89146c534ab996a4f405e72","Category":"Demographics","Access":"Open","FileName": "Demographic Group 44.xls","DateTime": "8/1/2019 08:00","UploadedBy": "Paul Elisii","UploadedTo": "NY Hospital","AcceptedBy": "Bill Barber","Verified": "X"}, ' +
    '{"Sponsor":"CSL Behring","Study":"Hemophilia A Clinical Trial","ExternalStorageAddress":"654910fe5bec44d5d89146c534ab996a4f405e72","Category":"Demographics","Access":"Open","FileName": "Demographic Group 133.xls","DateTime": "8/1/2019 08:00","UploadedBy": "Paul Elisii","UploadedTo": "NY Hospital","AcceptedBy": "Paul Elisii","Verified": "X"}, ' +
    '{"Sponsor":"CSL Behring","Study":"Hemophilia A Clinical Trial","ExternalStorageAddress":"654910fe5bec44d5d89146c534ab996a4f405e72","Category":"Demographics","Access":"Open","FileName": "Demographic Group 12.xls","DateTime": "8/1/2019 08:00","UploadedBy": "Paul Elisii","UploadedTo": "NY Hospital","AcceptedBy": "Jim Smith","Verified": "X"}, ' +
    '{"Sponsor":"CSL Behring","Study":"Hemophilia A Clinical Trial","ExternalStorageAddress":"654910fe5bec44d5d89146c534ab996a4f405e72","Category":"Demographics","Access":"Open","FileName": "Demographic Group 11.xls","DateTime": "8/1/2019 08:00","UploadedBy": "Paul Elisii","UploadedTo": "NY Hospital","AcceptedBy": "Bill Barber","Verified": "X"}, ' +
    '{"Sponsor":"Merck","Study":"Acute Diabetes Syndrome Clinical Trial","ExternalStorageAddress":"1484c87e5ab203edfdd1ece0f3bf15fdc35eb8dc","Category":"Results","Access":"Blinded","FileName": "Test 1 Results.xls","DateTime": "8/6/2019 08:45","UploadedBy": "Jim Smith","UploadedTo": "Clinlogix","AcceptedBy": "","Verified": ""},' +
    '{"Sponsor":"Merck","Study":"Acute Diabetes Syndrome Clinical Trial","ExternalStorageAddress":"654910fe5bec44d5d89146c534ab996a4f405e72","Category":"Results","Access":"Blinded","FileName": "Test 21 Results.xls","DateTime": "8/5/2019 13:31","UploadedBy": "Sam Templeton","UploadedTo": "Clinlogix","AcceptedBy": "Paul Elisii","Verified": "X"},' +
    '{"Sponsor":"Merck","Study":"Acute Oncology Clinical Trial","ExternalStorageAddress":"1484c87e5ab203edfdd1ece0f3bf15fdc35eb8dc","Category":"Demographics","Access":"Blinded","FileName": "Test 31 Results.xls","DateTime": "8/7/2019 05:12","UploadedBy": "John Doe","UploadedTo": "CoreLab of PA","AcceptedBy": "Bill Barber","Verified": "X"}, ' +
    '{"Sponsor":"Merck","Study":"Acute Coronary Syndrome Clinical Trial","ExternalStorageAddress":"1484c87e5ab203edfdd1ece0f3bf15fdc35eb8dc","Category":"Demographics","Access":"Blinded","FileName": "Test 322 Results.xls","DateTime": "8/7/2019 05:12","UploadedBy": "John Doe","UploadedTo": "CoreLab of PA","AcceptedBy": "Paul Elisii","Verified": "X"}, '  +
    '{"Sponsor":"Merck","Study":"Acute Glocuse Syndrome Clinical Trial","ExternalStorageAddress":"1484c87e5ab203edfdd1ece0f3bf15fdc35eb8dc","Category":"Demographics","Access":"Blinded","FileName": "Test 4 Results.xls","DateTime": "8/7/2019 05:12","UploadedBy": "John Doe","UploadedTo": "CoreLab of PA","AcceptedBy": "Jim Smith","Verified": "X"}, '  +
    '{"Sponsor":"Merck","Study":"Acute Glocuse Syndrome Clinical Trial","ExternalStorageAddress":"1484c87e5ab203edfdd1ece0f3bf15fdc35eb8dc","Category":"Demographics","Access":"Blinded","FileName": "Test 5 Results.xls","DateTime": "8/7/2019 05:12","UploadedBy": "John Doe","UploadedTo": "CoreLab of NY","AcceptedBy": "Bill Barber","Verified": "X"}]}';

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
