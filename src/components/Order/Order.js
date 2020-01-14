import React from 'react';

import classes from './Order.css';

/**
 * @function order
 * @param {*} props
 * 
 * user can make multipul orders 
 */
const order = (props) => (
    <div className={classes.Order}>
        <p>Ingredients: Salad (2)</p> 
        <p>Price: <strong>$ 5</strong></p>
    </div>
);

export default order;