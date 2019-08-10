import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Grid } from '@material-ui/core';
import AssetsTable from './table';

import { getAssets } from "../../../actions/asset.actions";
import { apiUrl, HTTP_METHODS } from "../../../constants";
import './list.css';
import backArrow from './back-arrow.png';

class AssetsList extends Component {

  componentDidMount() {
    this.props.getAssets();
    this.setState({json: 'test'});
  }

  redirectToAssetDetail = (event, sku) => {
    this.props.history.push(`/asset/${sku}`);
  };

  get isAdmin() {
      const { user, USER_ROLE } = this.props;
      return parseInt(this.props.user['role'], 10) === USER_ROLE.ADMIN;
  }

    setContent = event => {
        this.setState({content: event.target.files[0]});
    };

    setMetadata = event => {
        this.setState({metadata: event.target.value});
    };

    setContractAddress = event => {
        this.setState({contractAddress: event.target.value});
    };

    submitUpload = event => {
        if (this.state == null) {
            alert('ERROR: please select a file to upload.');
            return;
        }
        event.preventDefault();
        let form = new FormData();
        form.append('file', this.state.content);
        form.append('metadata', this.state.metadata);
        const content = this.state.content;
        const exstorageURL = `${apiUrl}/exstorage`;
        const type = this.state.fileType;
        const metadata = this.state.metadata;
        const file = {form, type, metadata};

        fetch(exstorageURL, {
            method: HTTP_METHODS.POST,
            body: form
        })
            .then(function (response) {
                return response.json()
            })
            .then(data => {
                const responseString = JSON.stringify(data.data, null, 2);
                this.setState({uploadResponse: responseString});
                return data;
            })
            .catch(function (error) {
                throw error;
            });
        alert('File uploaded successfully.');
    }

    submitDownload = event => {
        event.preventDefault();
        if (this.state == null) {
            alert('ERROR: please select a file to download.');
            return;
        }
        const contractAddress = this.state.contractAddress;
        const exstorageURL = `${apiUrl}/exstorage/${contractAddress}`;

        const downloadArgs = {contractAddress};
        fetch(exstorageURL, {
            method: HTTP_METHODS.GET,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                return response.json()
            })
            .then(data => {
                const responseString = JSON.stringify(data.data, null, 2);
                this.setState({downloadResponse: responseString});
                window.open(data.data.url);
                return data;
            })
            .catch(function (error) {
                throw error;
            });
    }

  renderTable = () => {
    const { assets, user, USER_ROLE, ASSET_STATE } = this.props;

    // Filter assets
    const ownedAssets = assets.filter((asset) => asset.owner === user.account);
    const requestedAssets = assets.filter((asset) => parseInt(asset.assetState, 10) === ASSET_STATE.BIDS_REQUESTED);

    var json = '{"filter":[{"Sponsor":"CSL Behring","Study":"Hemophilia B Clinical Trial","Organization":"University of Colorado"},' +
        '{"Sponsor":"CSL Behring","Study":"Hemophilia A Clinical Trial","Organization":"Hospital Vall Hebron"},' +
        '{"Sponsor":"Merck","Study":"Acute Coronary Syndrome Clinical Trial","Organization":"Royal Adelaide Hospital"},' +
        '{"Sponsor":"Merck","Study":"Acute Coronary Syndrome Clinical Trial 2","Organization":"Hospital Cardiológica Aguascal"},' +
        '{"Sponsor":"Merck","Study":"Acute Coronary Syndrome Clinical Trial 3","Organization":"Emek Medical Center"},' +
        '{"Sponsor":"Merck","Study":"Acute Coronary Syndrome Clinical Trial","Organization":"CoreLab of PA"}]}';
    try {
      var filters = JSON.parse(json);
    } catch (e) {
      console.log(e);
      return;
    }

    //populate sponsers
    var sponsers = [], sponsersHTML = [];
    for (var x = 0; x < filters.filter.length; x++) {
        var sponser = filters.filter[x].Sponsor;
        var study =  filters.filter[x].Study;
        var html = (<option value={sponser}>{sponser}</option>);
        if (!inArray(sponser, sponsers)){
            sponsers.push([sponser, []]);
            sponsersHTML.push(html);
        }
        for (var i = 0; i < sponsers.length; i++) {
            if (sponsers[i][0] === sponser) {
                if (!inSubArray(study, sponsers[i][1])) sponsers[i][1].push(study);
            }
        }
    }

    //populate studies
    var studies = [];
    for (var x = 0; x < filters.filter.length; x++) {
      var study = filters.filter[x].Study;
      var organization = filters.filter[x].Organization;
      var html = (<option value={study}>{study}</option>);
      if (!inArray(study, studies)){
          studies.push([study, []]);
      }
      for (var i = 0; i < studies.length; i++) {
          if (studies[i][0] === study) {
              if (!inSubArray(organization, studies[i][1])) studies[i][1].push(organization);
          }
      }
    }

    //populate organizations
    var organizations = [];
    for (var x = 0; x < filters.filter.length; x++) {
      var organization = filters.filter[x].Organization;
      var html = (<option value={organization}>{organization}</option>);
      if (!inArray(organization, organizations)){
          organizations.push([organization, []]);
      }
    }

    var checkboxs = document.getElementsByClassName("table-check-box");
    for (var i=0; i < checkboxs.length; i++) {
      checkboxs[i].onclick = function(){
          this.parentNode.parentNode.classList.toggle('selected-row');
          document.getElementById("contract").value = this.getElementsByTagName("input")[0].getAttribute('data-contractid');
          document.getElementById("contract").click();
      }
    };

    var backButton = (
        <a onClick={showHideOptions} className="back-arrow">
            <img src={backArrow} />
        </a>
    );

    return (
      <div className="dashboard-container">

        <div className="table-top-info">
            {this.isAdmin && backButton}
            <div className="drop-downs">
                <span>Sponser:</span>
                <select id="sponser" data-dropdown="sponser" onChange={() => selectSponser(sponsers, document.getElementById('sponser').value)}>
                    <option hidden disabled selected> -- select a sponser -- </option>
                    {sponsersHTML}
                </select>
                <span>Study:</span>
                <select id="study" data-dropdown="study" onChange={() => selectStudy(studies, document.getElementById('study').value)} disabled>
                    <option hidden disabled selected> -- select a study -- </option>
                </select>
                <span>Organization:</span>
                <select id="organization" data-dropdown="organization" disabled>
                    <option hidden disabled selected> -- select an organization -- </option>
                </select>
                <span>Category:</span>
                <select id="category" data-dropdown="category">
                    <option hidden disabled selected>-- select category --</option>
                    <option value="Demographics">Demographics</option>
                    <option value="Results">Results</option>
                </select>
                <span>Access:</span>
                <select id="access" data-dropdown="access">
                    <option hidden disabled selected>-- select access type --</option>
                    <option value="Open">Open</option>
                    <option value="Blinded">Blinded</option>
                </select>
                <span>File(s):</span>
                <div className="table-buttons">
                    <label className="choose-files">
                        <input id="upload" type="file" onChange={this.setContent} />
                        <input id="metadata" type="text" onClick={this.setMetadata} />
                        <input id="contract" type="text" onClick={this.setContractAddress} />
                        <Button className='select-button' onClick={selectFile}>
                            Select File
                        </Button>
                        <div className="files-to-upload">
                            <span id="fileName">-- choose a file to upload --</span>
                        </div>
                    </label>
                    <Button className='upload-button' onClick={this.submitUpload}>
                        Upload
                    </Button>
                    <Button className='download-button' onClick={this.submitDownload}>
                        Download Selected Files
                    </Button>
                </div>

            </div>
        </div>

        <AssetsTable assets={ownedAssets} redirectToAssetDetail={this.redirectToAssetDetail} ASSET_STATE={ASSET_STATE} />
      </div>
    );
  }

  render() {
    return (
      <Grid container>
        {this.renderTable()}
      </Grid>
    )
  }
}

function selectSponser(array, sponser){
    var html = [];
    html.push(<option hidden disabled selected> -- select a study -- </option>);
    for (var i = 0; i < array.length; i++) {
        if (array[i][0] === sponser) {
            for (var x = 0; x < array[i][1].length; x++) {
                html.push(<option value={array[i][1][x]}>{array[i][1][x]}</option>);
            }
        }
    }
    document.getElementById('study').disabled = false;
    document.getElementById('organization').disabled = true;
    ReactDOM.render(html, document.getElementById('study'));
    document.getElementById('study').childNodes[0].selected = true;
    try {
        document.getElementById('organization').childNodes[0].selected = true;
    } catch {

    }
}

function selectStudy(array, study){
    var html = [];
    html.push(<option hidden disabled selected> -- select an organization -- </option>);
    for (var i = 0; i < array.length; i++) {
        if (array[i][0] === study) {
            for (var x = 0; x < array[i][1].length; x++) {
                html.push(<option value={array[i][1][x]}>{array[i][1][x]}</option>);
            }
        }
    }
    document.getElementById('organization').disabled = false;
    ReactDOM.render(html, document.getElementById('organization'));
    document.getElementById('organization').childNodes[0].selected = true;
}

function inArray(option, array) {
    for(var i=0; i < array.length; i++) {
        if(array[i][0] === option) return true;
    }
    return false;
}

function inSubArray(value, array) {
    for(var i=0; i < array.length; i++) {
        if(array[i] === value) return true;
    }
    return false;
}

function selectFile() {
    var input = document.getElementById('upload');
    input.click();
    input.onchange = function() {
        var filePath = input.value;
        var startIndex = (filePath.indexOf('\\') >= 0 ? filePath.lastIndexOf('\\') : filePath.lastIndexOf('/'));
        var filename = filePath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
        if (filename.length < 1) {
            return
        }
        if (filename.length > 35) {
            filename = filename.substring(0, 35) + "...";
        }
        document.getElementById("fileName").innerHTML = filename;

        var metadata = '{"sponser":"' + document.getElementById('sponser').value + '",'
            + '"study":"' + document.getElementById('study').value + '",'
            + '"organization":"' + document.getElementById('organization').value + '",'
            + '"category":"' + document.getElementById('category').value + '",'
            + '"access":"' + document.getElementById('access').value + '"}';

        document.getElementById("metadata").value = metadata;
        document.getElementById("metadata").click();
    };
}

function showHideOptions() {
    const mainTiles = document.getElementById('main-tiles');
    const adminStudyFiles = document.getElementById('adminStudyFiles');
    if (!mainTiles.classList.contains('show') && !mainTiles.classList.contains('hide')){
        mainTiles.classList.toggle('hide');
        setTimeout(function(){
            adminStudyFiles.classList.toggle('hide');
        }, 200);
    } else {
        if (mainTiles.classList.contains('show')){
            mainTiles.classList.toggle('hide');
            mainTiles.classList.toggle('show');
            setTimeout(function(){
                adminStudyFiles.classList.toggle('hide');
                adminStudyFiles.classList.toggle('show');
            }, 250);
        } else {
            adminStudyFiles.classList.toggle('hide');
            adminStudyFiles.classList.toggle('show');
            setTimeout(function(){
                mainTiles.classList.toggle('hide');
                mainTiles.classList.toggle('show');
            }, 250);
        }
    }
}

const mapStateToProps = (state) => {
  return {
    assets: state.asset.assets,
    user: state.authentication.user,
    USER_ROLE: state.constants.TT.TtRole,
    BID_STATE: state.constants.Bid.BidState,
    ASSET_STATE: state.constants.Asset.AssetState
  };
};

const connected = connect(mapStateToProps, { getAssets })(AssetsList);

export default withRouter(connected);
