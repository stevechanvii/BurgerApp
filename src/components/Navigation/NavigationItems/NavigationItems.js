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
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Sign/Login</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;