import React from 'react';

import classes from './Button.css';

/**
 * @function button
 * @param {btnType} props either danger or success, refer to the css
 * 
 * Custmized button
 */
const button = (props) => (
    <button
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}
        disabled={props.disabled}>{props.children}</button>
);

export default button;