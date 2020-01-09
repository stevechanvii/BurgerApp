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
        <NavigationItem link={"/"} active>Burger builder</NavigationItem>
        <NavigationItem>Checkout</NavigationItem>
    </ul>
);

export default navigationItems;