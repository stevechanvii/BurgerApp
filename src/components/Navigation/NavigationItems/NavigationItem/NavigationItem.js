import React from 'react';

import classes from './NavigationItem.css';

/**
 * @function navigationItem
 * @param {*} props 
 * 
 * Items of the navigations on the toolbar
 */
const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <a href={props.link} className={props.active ? classes.active : null}>{props.children}</a>
    </li>
);

export default navigationItem;