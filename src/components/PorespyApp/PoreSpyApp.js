//
//  PoreSpyApp.js
//  porespy-frontend
//

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { startSetPorespyFuncs } from '../../actions/porespyfuncs';
import { startSetBackendEndpoint } from '../../actions/backend';
// import { startSetStyles } from '../../actions/styles';
// import { classes } from '../../utils/styles';
import LandingPage from '../LandingPage/LandingPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

let porespyFuncs = {};
let backendRootEndpoint = "http://localhost:8000/";
let backendInterval;
// let classesRedux = classes;

const PoreSpyApp = (props) => {
    // props.startSetStyles(classes);

    useEffect(() => {
        backendInterval = setInterval(() => {
            if (Object.keys(porespyFuncs).length === 0 && porespyFuncs.constructor === Object) {
                getPoreSpyFuncs();
            }            
        }, 1000) 
    });

    const getPoreSpyFuncs = () => {
        axios.get(`${backendRootEndpoint}porespyfuncs/1/`)
            .then(({ data: { porespy_funcs } }) => {
                porespyFuncs = porespy_funcs;
                props.startSetPorespyFuncs(porespy_funcs);
                props.startSetBackendEndpoint(backendRootEndpoint);
            }).catch(() => {
                getPoreSpyFuncs();
            });
    }

    return (
        <div>
            <Router basename="">
                <Switch>                
                    {/* Render LandingPage component with page prop passed in. */}
                    {/* page prop will depend on how the user reaches the site (ex: localhost:3000/about vs localhost:3000/contact vs localhost:3000/) */}
                    <Route path="/" exact render={() => (
                        <LandingPage page="" porespyFuncs={porespyFuncs} />
                    )}/>
                    <Route path="/about" render={() => (
                        <LandingPage page="about" porespyFuncs={porespyFuncs} />
                    )}/>
                    <Route path="/contact" render={() => (
                        <LandingPage page="contact" porespyFuncs={porespyFuncs} />
                    )}/>
                    <Route path="*" component={NotFoundPage} />
                </Switch>
            </Router>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startSetPorespyFuncs: () => dispatch(startSetPorespyFuncs(porespyFuncs)),
    startSetBackendEndpoint: () => dispatch(startSetBackendEndpoint(backendRootEndpoint))
    // startSetStyles: () => dispatch(startSetStyles(classes))
})

export default connect(undefined, mapDispatchToProps)(PoreSpyApp);
