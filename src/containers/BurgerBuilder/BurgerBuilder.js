import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'; 

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

/**
 * @class BurgerBuilder
 * 
 * This class manges the ingredients of the burger, and controls the price as well as add remove button
 */
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
    }

    addIngredientHander = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredient = {...this.state.ingredients};
        updatedIngredient[type] = updatedCount;

        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredient,
            totalPrice: updatedPrice,
        });
    }

    removeIngredientHander = (type) => {
        const updatedCount = this.state.ingredients[type] - 1;

        if (updatedCount < 0) {
            return;
        }

        const updatedIngredient = {...this.state.ingredients};
        updatedIngredient[type] = updatedCount;

        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredient,
            totalPrice: updatedPrice,
        });
    }

    render() {
        // check whether the ingredient is 0, if 0 save fase and send to buildControl component to disable the button
        const disableInfo = {...this.state.ingredients};
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHander}
                    ingredientRemoved={this.removeIngredientHander}
                    disabled={disableInfo} />
            </Aux>
        );
    }
}

export default BurgerBuilder;