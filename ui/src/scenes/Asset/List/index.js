import React, { Component } from "react";
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


  renderTable = () => {
    const { assets, user, USER_ROLE, ASSET_STATE } = this.props;

    // Filter assets
    const ownedAssets = assets.filter((asset) => asset.owner === user.account);
    const requestedAssets = assets.filter((asset) => parseInt(asset.assetState, 10) === ASSET_STATE.BIDS_REQUESTED);

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
                <select>
                    <option hidden disabled selected value> -- select an option -- </option>
                    <option value="">Merck</option>
                    <option value="">Merck</option>
                    <option value="">Merck</option>
                </select>
                <span>Study:</span>
                <select disabled>
                    <option hidden disabled selected value></option>
                    <option value="">FOLFOXIRI Plus Cetuximab vs. FOLFOXIRI Plus Bevacizumab</option>
                    <option value="">Merck</option>
                    <option value="">Merck</option>
                    <option value="">Merck</option>
                </select>
                <span>Organization:</span>
                <select disabled>
                    <option hidden disabled selected value></option>
                    <option value="">NY Hospital</option>
                    <option value="">Core Labs</option>
                    <option value="">ClinLogix</option>
                </select>
                <span>Category:</span>
                <select disabled>
                    <option hidden disabled selected value></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
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
        document.getElementById("metadata").value = filename;
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
