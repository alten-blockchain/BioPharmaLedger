import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Grid } from '@material-ui/core';

import { getAssets } from "../../../actions/asset.actions";
import AssetsList from '../List';
import './landing.css';

class Clinlogix extends Component {

    get isAdmin() {
        const { user, USER_ROLE } = this.props;
        return parseInt(this.props.user['role'], 10) === USER_ROLE.ADMIN;
    }

    renderTiles = () => {
        // const { user, USER_ROLE } = this.props;

        var html;
        if (this.isAdmin){
            html = (
                <div className="landing-container">

                    <div id="main-tiles" className="">
                        <div className="data-tile-wrapper">
                            <a onClick={showHideOptions} className="data-tile tile-type1">
                                <h1>Study Files</h1>
                                <h2>Management and operation of study files</h2>
                            </a>
                        </div>
                        <div className="data-tile-wrapper">
                            <a className="data-tile tile-type2">
                                <h1>Management Dashboard</h1>
                                <h2>Management and operation of BioPharma Ledger System</h2>
                                {/*<h1>Option 2</h1>*/}
                                {/*<h2>Management and operation of study files</h2>*/}
                            </a>
                        </div>
                        <div className="data-tile-wrapper">
                            <a className="data-tile tile-type3">
                                <h1>Compliance Dashboard</h1>
                                <h2>Compliance and monitoring of Blockchain Ledger</h2>
                                {/*<h1>Option 3</h1>*/}
                                {/*<h2>Management and operation of study files</h2>*/}
                            </a>
                        </div>
                    </div>

                    <div id="adminStudyFiles" className="">
                        <Grid className="table-container" container>
                            <AssetsList />
                        </Grid>
                    </div>

                    {/*<div id="adminStudyFiles" className="">*/}
                        {/*<div className="data-tile-wrapper">*/}
                            {/*<a onClick={showHideOptions} className="back-arrow-tile">*/}
                                {/*<img src={backArrow} />*/}
                            {/*</a>*/}
                        {/*</div>*/}
                        {/*<div className="data-tile-wrapper">*/}
                            {/*<a  className="data-tile tile-type2">*/}
                                {/*<h1>Upload</h1>*/}
                                {/*/!*<h2>Upload files</h2>*!/*/}
                                {/*<h2>Management and operation of study files</h2>*/}
                            {/*</a>*/}
                        {/*</div>*/}
                        {/*<div className="data-tile-wrapper">*/}
                            {/*<a className="data-tile tile-type5">*/}
                                {/*<h1>Download</h1>*/}
                                {/*/!*<h2>Download files</h2>*!/*/}
                                {/*<h2>Management and operation of study files</h2>*/}
                            {/*</a>*/}
                        {/*</div>*/}
                    {/*</div>*/}

                </div>
            );
        } else {
            html =(
                <Grid container>
                    <AssetsList />
                </Grid>
            );
        }

        return (
            html
        );
    }

    componentDidMount() {
        var maxheight = 0;

        var tiles = document.querySelectorAll('.data-tile');
        Array.prototype.forEach.call(tiles, function(element) {
            if (element.clientHeight > maxheight) {
                maxheight = element.clientHeight;
            }
        });

        Array.prototype.forEach.call(tiles, function(element) {
            //element.style.height = maxheight + 'px';
        });

        console.log('---------- maxheight:' + maxheight + ' ----------');

    }

    render() {
        return (
            <Grid container>
                {this.renderTiles()}
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
        user: state.authentication.user,
        USER_ROLE: state.constants.TT.TtRole,
        BID_STATE: state.constants.Bid.BidState,
    };
};

const connected = connect(mapStateToProps, { getAssets })(Clinlogix);

export default withRouter(connected);
