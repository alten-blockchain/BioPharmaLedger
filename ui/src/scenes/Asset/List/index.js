import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Grid } from '@material-ui/core';
import AssetsTable from './table';

import { getAssets } from "../../../actions/asset.actions";
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
                    <Button className='upload-button' onClick={() => {}}>
                        Upload
                    </Button>
                    <Button className='download-button' onClick={() => {}}>
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
