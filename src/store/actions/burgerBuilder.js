import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

/**
 * action creators for building a burger
 */
export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name,
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name,
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}
export const initIngredients = () => {
    return (dispatch) => {
        axios.get('/ingredients.json').then(response => {
                dispatch(setIngredients(response.data));
            }).catch(error => {
                console.log(error);
                dispatch(fetchIngredientsFailed())
            });
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}