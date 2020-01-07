import React from 'react';

import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

/**
 * @function sideDrawer
 * @param {*} props 
 * 
 * Side drawer of burger App
 */
const sideDrawer = (props) => {
    return (
        <div className={classes.SideDrawer}>
            <Logo />
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
};

export default sideDrawer;