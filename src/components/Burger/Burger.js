import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

/**
 * @function burger
 * @param {*} props 
 * 
 * This component generates burger based on the user added or remove the ingredients
 */
const burger = (props) => {

    /**
     * transIngredients will save the ingredients from BurgerBuilder component,
     * and transfrom these ingredients into an Array of JSX.
     * 
     * Object.keys() extracts the keys of ingredients as a list, e.g. ['salad', 'cheese', 'beef']
     * then iterates each element and create a new empty Array, indicates the quantity of each ingredients,
     * e.g. if salad has 2, then the Array should be [ , ].
     * finally iterates each empty Array, and then create BurgerIngredient.
     * 
     * However, I don't think this is a good idea, simply create two loop to iterate each element.
     * 
     * reduce() take a function as argument, arr and el are previous value and the current value, [] is a initial value,
     * it will then loop through all the elements and executes the function (simply add them to the initial values) step by step.
     * 
     * The concat() method is used to merge two or more arrays. 
     * This method does not change the existing arrays, but instead returns a new array.
     */
    let transIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient type={igKey} key={igKey + i} />
        })
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    console.log(transIngredients);

    if (transIngredients.length === 0) {
        transIngredients = <p>Please add ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default burger;