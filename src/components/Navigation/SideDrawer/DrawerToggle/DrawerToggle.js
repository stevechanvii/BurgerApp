import React from 'react';

import classes from './DrawerToggle.css';

/**
 * @function drawerToggle
 * @param {*} props 
 * 
 * Open and close the drawer
 */
const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;