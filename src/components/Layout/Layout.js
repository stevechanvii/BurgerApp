import React from 'react';

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
const layout = (props) => (
    <Aux>
        <Toolbar />
        <SideDrawer />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>

);

export default layout;