import React from 'react';

import classes from './Order.css';

/**
 * @function order
 * @param {*} props
 * 
 * Show single order details
 */
const order = (props) => {
    const ingredients = [];

    // extract ingredients from props and save the obj in an array
    for (let ingredientName in props.ingredients) {
        ingredients.push({ name: ingredientName, quantity: props.ingredients[ingredientName] })
    }

    // iterate the array and transform each obj into JSX
    const ingredientOutput = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}>{ig.name}({ig.quantity})</span>;
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>$ {props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;