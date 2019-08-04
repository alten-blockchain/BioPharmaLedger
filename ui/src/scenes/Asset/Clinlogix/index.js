import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Grid } from '@material-ui/core';

import { getAssets } from "../../../actions/asset.actions";
import './landing.css';
import backArrow from './back-arrow.png';

class Clinlogix extends Component {


    renderTiles = () => {
        const { user, USER_ROLE } = this.props;

        return (
            <div className="landing-container">

                <div id="main-tiles" className="">
                    <div className="data-tile-wrapper">
                        <a onClick={showHideOptions} className="data-tile tile-type1">
                            <h1>Data Management</h1>
                            <h2>Management and operation of study files</h2>
                        </a>
                    </div>
                    <div className="data-tile-wrapper">
                        <a className="data-tile tile-type2">
                            {/*<h1>Management Dashboard</h1>*/}
                            {/*<h2>Setup and Configuration of Studies, Orgs, and Users</h2>*/}
                            <h1>Data Management</h1>
                            <h2>Management and operation of study files</h2>
                        </a>
                    </div>
                    <div className="data-tile-wrapper">
                        <a className="data-tile tile-type3">
                            {/*<h1>Compliance Dashboard</h1>*/}
                            {/*<h2>Blockchain Ledger dashboard for compliance</h2>*/}
                            <h1>Data Management</h1>
                            <h2>Management and operation of study files</h2>
                        </a>
                    </div>
                </div>

                <div id="secondary-tiles" className="">
                    <div className="data-tile-wrapper">
                        <a onClick={showHideOptions} className="back-arrow-tile">
                            <img src={backArrow} />
                        </a>
                    </div>
                    <div className="data-tile-wrapper">
                        <a  className="data-tile tile-type2">
                            {/*<h1>Upload</h1>*/}
                            {/*<h2>Upload files</h2>*/}
                            <h1>Data Management</h1>
                            <h2>Management and operation of study files</h2>
                        </a>
                    </div>
                    <div className="data-tile-wrapper">
                        <a className="data-tile tile-type5">
                            {/*<h1>Download</h1>*/}
                            {/*<h2>Download files</h2>*/}
                            <h1>Data Management</h1>
                            <h2>Management and operation of study files</h2>
                        </a>
                    </div>
                </div>

            </div>
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
    const secondaryTiles = document.getElementById('secondary-tiles');
    if (!mainTiles.classList.contains('show') && !mainTiles.classList.contains('hide')){
        mainTiles.classList.toggle('hide');
        setTimeout(function(){
            secondaryTiles.classList.toggle('hide');
        }, 250);
    } else {
        if (mainTiles.classList.contains('show')){
            mainTiles.classList.toggle('hide');
            mainTiles.classList.toggle('show');
            setTimeout(function(){
                secondaryTiles.classList.toggle('hide');
                secondaryTiles.classList.toggle('show');
            }, 250);
        } else {
            secondaryTiles.classList.toggle('hide');
            secondaryTiles.classList.toggle('show');
            setTimeout(function(){
                mainTiles.classList.toggle('hide');
                mainTiles.classList.toggle('show');
            }, 250);
        }
    }

    // if (!mainTiles.classList.contains('show') && !mainTiles.classList.contains('hide')){
    //     mainTiles.classList.toggle('hide');
    //     secondaryTiles.classList.toggle('show');
    // } else {
    //     mainTiles.classList.toggle('hide');
    //     mainTiles.classList.toggle('show');
    // }
    // secondaryTiles.classList.toggle('hide');
    // secondaryTiles.classList.toggle('show');
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
