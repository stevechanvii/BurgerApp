import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

/**
 * @function navigationItem
 * @param {*} props 
 * 
 * Items of the navigations on the toolbar
 */
const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink to={props.link} exact={props.exact} activeClassName={classes.active}>{props.children}</NavLink>
    </li>
);

export default navigationItem;