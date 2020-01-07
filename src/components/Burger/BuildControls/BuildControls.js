import React from 'react';

import classes from './buildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

/**
 * @function buildControls
 * @param {*} props 
 * 
 * This function iterates the ingredients, and render BuildControl component
 */
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Total price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        ))}
        <button 
            className={classes.OrderButton} 
            disabled={!props.purchaseable}
            onClick={props.ordered}>Order Now</button>
    </div>
);

export default buildControls;