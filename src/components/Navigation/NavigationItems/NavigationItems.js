import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

/**
 * @function navigationItems
 * @param {*} props 
 * 
 * Navigation on the toolbar
 */
const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        {/* for boolean props we can just pass name */}
        <NavigationItem link="/" exact>Burger builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/auth">Log in</NavigationItem>
    </ul>
);

export default navigationItems;