import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

/**
 * @function layout
 * @param {*} props 
 * 
 * Called by App.js, as a layout of burger App
 */
class Layout extends Component {
    state = {
        showSideDrawer: true,
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    render() {
        return (
            <Aux>
                <Toolbar />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}


export default Layout;