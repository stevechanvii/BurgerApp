import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavagationItems from '../NavigationItems/NavigationItems';
import DrawToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

/**
 * @function toolbar
 * @param {*} props 
 * 
 * Toolbar
 */
const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawToggle clicked={props.drawToggleClicked} />
        <div className={classes.Logo}>
                <Logo />
            </div>
        <nav className={classes.DesktopOnly}>
            <NavagationItems />
        </nav>
    </header>
);

export default toolbar;