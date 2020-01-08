import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavagationItems from '../NavigationItems/NavigationItems';

/**
 * @function toolbar
 * @param {*} props 
 * 
 * Toolbar
 */
const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>Menu</div>
        <div className={classes.Logo}>
                <Logo />
            </div>
        <nav className={classes.DesktopOnly}>
            <NavagationItems />
        </nav>
    </header>
);

export default toolbar;