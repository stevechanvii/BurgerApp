import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

/**
 * @function layout
 * @param {*} props 
 * 
 * Called by App.js, as a layout of burger App, including toolbar, sidedrawer and main content
 */
class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    /**
     * get the previous state showSideDrawer using safe method
     */
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar drawToggleClicked={this.sideDrawerToggleHandler} isAuth={this.props.isAuthenticate} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    isAuth={this.props.isAuthenticate} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        // if token is empty, then isAuthenticate is false
        isAuthenticate: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);