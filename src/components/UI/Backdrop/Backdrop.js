import React from 'react';

import classes from './Backdrop.css';

/**
 * @function backdrop
 * @param {*} props 
 * 
 * Gray background for when using modal or drawer
 */
const backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;