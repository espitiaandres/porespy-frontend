//
//  LandingPage.js
//  porespy-frontend
//

import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ImagePanel from '../ImagePanel/ImagePanel';

import AboutPage from '../AboutPage/AboutPage';
import ContactPage from '../ContactPage/ContactPage';
import RenderGenerator from '../RenderGenerator/RenderGenerator';
import RenderFilter from '../RenderFilter/RenderFilter';
import RenderMetric from '../RenderMetric/RenderMetric';
import { parseName } from '../../utils/moduleNames';
import './LandingPage.css';

const LandingPage = (props) => {
    const [openGenerators, setOpenGenerators] = useState(false);
    const [openFilters, setOpenFilters] = useState(false);
    const [openMetrics, setOpenMetrics] = useState(false);

    const [chosenModule, setChosenModule] = useState("Generators");
    const [chosenGenerator, setChosenGenerator] = useState("");
    const [chosenFilter, setChosenFilter] = useState("Apply Chords");
    const [chosenMetric, setChosenMetric] = useState("Chord Counts");
    // const [chosenNetwork, setChosenNetwork] = useState(""); // should a default to the chosenNetwork state variable.
    const [renderPage, setRenderPage] = useState(props.page);
    
    // porespyModules contains the menu names that are then called with .map() to create on the UI.
    const porespyModules = ['Generators', 'Filters', 'Metrics', 'About', 'Contact'];
    const funcs = useSelector((state) => (state));
    const generatorsNamesStore = funcs.porespyFuncs.hasOwnProperty('generators') ? Object.keys(funcs.porespyFuncs.generators) : [];
    const filtersNamesStore = funcs.porespyFuncs.hasOwnProperty('filters') ? Object.keys(funcs.porespyFuncs.filters) : [];
    const metricsNamesStore = funcs.porespyFuncs.hasOwnProperty('metrics') ? Object.keys(funcs.porespyFuncs.metrics) : [];

    const generatorsNamesParsed = generatorsNamesStore.map((name) => parseName(name)).sort();
    const filtersNamesParsed = filtersNamesStore.map((name) => parseName(name)).sort();
    const metricsNamesParsed = metricsNamesStore.map((name) => parseName(name)).sort();
    generatorsNamesParsed.unshift("Upload Image");

    const handleClick = (text) => {        
        // Switch/Case block checks to see which module is chosen and opens the <Collapse /> component by calling setOpenGenerators(), setOpenFilters(), and setOpenMetrics()
        // This block also calls setRenderPage() to render the correct page from the router ("/", "/about", "/contact")
        switch (text) {
            case "Generators":
                setOpenGenerators(!openGenerators);
                setRenderPage("");
                break;
            case "Filters":
                setOpenFilters(!openFilters);
                setRenderPage("");
                break; 
            case "Metrics":
                setOpenMetrics(!openMetrics);
                setRenderPage("");
                break;
            case "About":
                setRenderPage("about");
                break;
            case "Contact":
                setRenderPage("contact");
                break;
            default:
                break;
        }
        
        if (text) {
            setChosenModule(text);
        }
    };

    const handleFunctionClick = (text, chosenFunc) => {
        switch (text) {
            case "Generators":
                setChosenGenerator(chosenFunc);
                setRenderPage("");
                break;
            case "Filters":
                setChosenFilter(chosenFunc);
                setRenderPage("");
                break;
            case "Metrics":
                setChosenMetric(chosenFunc);
                setRenderPage("");
                break;
            default:
                break;
        }

        if (text) {
            setChosenModule(text);
        }
    }

    const renderSubMenus = (text, modules) => (
        modules.map((g) => (
            <ListItem 
                button
                className={classes.nested} 
                onClick={() => handleFunctionClick(text, g)} 
                component={Link}
                to={`/`}
            >
                <ListItemText primary={g} />
            </ListItem>
        ))
    )

    // // TODO: add this object to redux to clean this file up?
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: 240,
            flexShrink: 0,
        },
        drawerPaper: {
            width: 240
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            width: '100%',
        },
        contentOuter: {
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            padding: theme.spacing(3),
            paddingLeft: 240,
            width: '100%',
        },
        root: {
            width: '100%',
        },
        nested: {
            paddingLeft: theme.spacing(4)
        },
        collapseMenu: {
            display: 'flex',
            flexDirection: 'column'
        }, 
        gridList: {
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 175,
            minHeight: '95%',
            position: 'absolute',
            right: 3,
            top: 64
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
        imageBarButtons: {
            display: 'flex',
            flexDirection: 'row'
        },
    }));
    
    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            PoreSpy
                        </Typography>
                    </Toolbar>
                </AppBar>

                <BrowserRouter>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true
                        }}
                    >
                        <Toolbar />
                        <div className={classes.drawerContainer}>
                            <List
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                className={classes.root}
                            >
                                {
                                    porespyModules.map((text) => (                                        
                                        <div>
                                            <ListItem 
                                                button 
                                                key={text} 
                                                component={Link} 
                                                to={text === "About" || text === "Contact" ? `/${text.toLowerCase()}` : `/`} 
                                                onClick={() => handleClick(text)}
                                            >
                                                <ListItemText primary={text} />
                                                {(text !== "About" && text !== "Contact") && <KeyboardArrowDownIcon />}
                                            </ListItem>
                                            <Collapse 
                                                in={((text === "Generators" && openGenerators) || (text === "Filters" && openFilters) || (text === "Metrics" && openMetrics))} 
                                                timeout="auto" 
                                                unmountOnExit
                                            >
                                                <List component="div" disablePadding>
                                                    {(text === "Generators") && renderSubMenus(text, generatorsNamesParsed)}
                                                    {(text === "Filters") && renderSubMenus(text, filtersNamesParsed)}
                                                    {(text === "Metrics") && renderSubMenus(text, metricsNamesParsed)}
                                                </List>
                                            </Collapse>
                                        </div>
                                    ))
                                }
                            </List>
                            <Divider />
                        </div>
                    </Drawer>

                    <main className={classes.contentOuter}>
                        <div className={classes.content}>
                            <Toolbar />
                            <div className="title">
                                PoreSpy
                            </div>
                            <div className="description">
                                Porous Media Image Analysis in Python
                            </div>
                            { chosenModule === "Generators" && renderPage === "" && <RenderGenerator chosenFunction={chosenGenerator} />}
                            { chosenModule === "Filters" && renderPage === "" && <RenderFilter chosenFunction={chosenFilter} /> }
                            { chosenModule === "Metrics" && renderPage === "" && <RenderMetric chosenFunction={chosenMetric} /> }                        
                            <Switch>
                                <Route path="/about" render={() => <AboutPage />} />
                                <Route path="/contact" render={() => <ContactPage />} />
                            </Switch>    
                        </div>
                        <ImagePanel classes={classes}/>
                    </main>
                </BrowserRouter>
            </div>
        </div>
    )
}

export default connect(undefined, undefined)(LandingPage);
