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

    var checkboxs = document.getElementsByClassName("table-check-box");

    for (var i=0; i < checkboxs.length; i++) {
      checkboxs[i].onclick = function(){
          this.parentNode.parentNode.classList.toggle('selected-row');
      }
    };

    if (assets.length) {
      return (assets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((asset, key) => {
          return (
            <TableRow key={key} hover onClick={event => redirectToAssetDetail(event, asset.sku)}>
              <TableCell align="left"> {asset.name} </TableCell>
              <TableCell align="left">{asset.description}</TableCell>
              <TableCell align="left">{asset.price}</TableCell>
              <TableCell align="left">
                {ASSET_STATE[asset.assetState]}
              </TableCell>
            </TableRow>)
        }));
    } else {
        return (
            <TableBody className="assets-table-body">
                <TableRow>
                    <TableCell align="left">
                        <Checkbox
                            value=""
                            className="table-check-box"
                            inputProps={{ 'aria-label': 'Checkbox 1' }}
                        />
                    </TableCell>
                    <TableCell align="left">Demographics</TableCell>
                    <TableCell align="left">Open</TableCell>
                    <TableCell align="left">Demographics.xls</TableCell>
                    <TableCell align="left">June 20 2019</TableCell>
                    <TableCell align="left">ClinicalOps - Clinlogix</TableCell>
                    <TableCell align="left">NY Hospital</TableCell>
                    <TableCell align="left">Nick Spring</TableCell>
                    <TableCell align="left">
                        <img className="checkmark" src={checkmark} />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="left">
                        <Checkbox
                            value=""
                            className="table-check-box"
                            inputProps={{ 'aria-label': 'Checkbox 1' }}
                        />
                    </TableCell>
                    <TableCell align="left">Results</TableCell>
                    <TableCell align="left">Blinded</TableCell>
                    <TableCell align="left">StudyResults.doc</TableCell>
                    <TableCell align="left">June 20 2019</TableCell>
                    <TableCell align="left">ClinicalOps - Clinlogix</TableCell>
                    <TableCell align="left">Core Labs</TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left">

                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="left">
                        <Checkbox
                            value=""
                            className="table-check-box"
                            inputProps={{ 'aria-label': 'Checkbox 1' }}
                        />
                    </TableCell>
                    <TableCell align="left">Results</TableCell>
                    <TableCell align="left">Blinded</TableCell>
                    <TableCell align="left">StudyResults.doc</TableCell>
                    <TableCell align="left">June 20 2019</TableCell>
                    <TableCell align="left">ClinicalOps - Clinlogix</TableCell>
                    <TableCell align="left">Core Labs</TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left">

                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="left">
                        <Checkbox
                            value=""
                            className="table-check-box"
                            inputProps={{ 'aria-label': 'Checkbox 1' }}
                        />
                    </TableCell>
                    <TableCell align="left">Results</TableCell>
                    <TableCell align="left">Blinded</TableCell>
                    <TableCell align="left">StudyMetrics.doc</TableCell>
                    <TableCell align="left">June 30 2019</TableCell>
                    <TableCell align="left">ClinicalSite - NY Hospital</TableCell>
                    <TableCell align="left">ClinLogix</TableCell>
                    <TableCell align="left">Paul Elisii</TableCell>
                    <TableCell align="left">
                        <img className="checkmark" src={checkmark} />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="left">
                        <Checkbox
                            value=""
                            className="table-check-box"
                            inputProps={{ 'aria-label': 'Checkbox 1' }}
                        />
                    </TableCell>
                    <TableCell align="left">Demographics</TableCell>
                    <TableCell align="left">Open</TableCell>
                    <TableCell align="left">Demographics.xls</TableCell>
                    <TableCell align="left">June 20 2019</TableCell>
                    <TableCell align="left">ClinicalOps - Clinlogix</TableCell>
                    <TableCell align="left">NY Hospital</TableCell>
                    <TableCell align="left">Nick Spring</TableCell>
                    <TableCell align="left">
                        <img className="checkmark" src={checkmark} />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="left">
                        <Checkbox
                            value=""
                            className="table-check-box"
                            inputProps={{ 'aria-label': 'Checkbox 1' }}
                        />
                    </TableCell>
                    <TableCell align="left">Demographics</TableCell>
                    <TableCell align="left">Open</TableCell>
                    <TableCell align="left">StudyResults.doc</TableCell>
                    <TableCell align="left">June 20 2019</TableCell>
                    <TableCell align="left">ClinicalOps - Clinlogix</TableCell>
                    <TableCell align="left">Core Labs</TableCell>
                    <TableCell align="left">Paul Elisii</TableCell>
                    <TableCell align="left">
                        <img className="checkmark" src={checkmark} />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="left">
                        <Checkbox
                            value=""
                            className="table-check-box"
                            inputProps={{ 'aria-label': 'Checkbox 1' }}
                        />
                    </TableCell>
                    <TableCell align="left">Results</TableCell>
                    <TableCell align="left">Blinded</TableCell>
                    <TableCell align="left">StudyResults.doc</TableCell>
                    <TableCell align="left">June 20 2019</TableCell>
                    <TableCell align="left">ClinicalOps - Clinlogix</TableCell>
                    <TableCell align="left">Core Labs</TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left">

                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="left">
                        <Checkbox
                            value=""
                            className="table-check-box"
                            inputProps={{ 'aria-label': 'Checkbox 1' }}
                        />
                    </TableCell>
                    <TableCell align="left">Demographics</TableCell>
                    <TableCell align="left">Open</TableCell>
                    <TableCell align="left">StudyMetrics.doc</TableCell>
                    <TableCell align="left">June 30 2019</TableCell>
                    <TableCell align="left">ClinicalSite - NY Hospital</TableCell>
                    <TableCell align="left">ClinLogix</TableCell>
                    <TableCell align="left">Paul Elisii</TableCell>
                    <TableCell align="left">
                        <img className="checkmark" src={checkmark} />
                    </TableCell>
                </TableRow>
            </TableBody>
        )
    }

    return (
      <TableRow>
        <TableCell colSpan={9} align="center"> No Assets Found </TableCell>
      </TableRow>
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
