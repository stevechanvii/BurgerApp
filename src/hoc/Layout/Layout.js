import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

/**
 * @function layout
 * @param {*} props 
 * 
 * Called by App.js, as a layout of burger App
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
                <Toolbar drawToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}


export default Layout;