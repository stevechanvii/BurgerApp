import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

/**
 * @class BurgerBuilder
 * 
 * This class manges the ingredients of the burger, and controls the price as well as add & remove button,
 * also provide order function.
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
        purchaseable: false,
        purchasing: false,
        loading: false,
    }

    /**
     * @function updatePurchaseState
     * @param ingredients updated ingredients after added or removed
     * 
     * Sum the total ingredients and decide weather the burger is purchaseable
     */
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({ purchaseable: sum > 0 });
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('/ingredients.json').then(response => {
            // console.log(response.data);
            this.setState({
                ingredients: response.data,
                totalPrice: Object.keys(response.data).map(igKey => {
                    return response.data[igKey] * INGREDIENT_PRICES[igKey];
                }).reduce((sum, el) => {
                    return sum + el;
                }, 4)
            });
            this.updatePurchaseState(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    addIngredientHander = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredient = { ...this.state.ingredients };
        updatedIngredient[type] = updatedCount;

        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredient,
            totalPrice: updatedPrice,
        });

        this.updatePurchaseState(updatedIngredient);
    }

    removeIngredientHander = (type) => {
        const updatedCount = this.state.ingredients[type] - 1;

        if (updatedCount < 0) {
            return;
        }

        const updatedIngredient = { ...this.state.ingredients };
        updatedIngredient[type] = updatedCount;

        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredient,
            totalPrice: updatedPrice,
        });

        this.updatePurchaseState(updatedIngredient);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // alert('You continue');
        // this.setState({ loading: true });
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Steve',
        //         address: {
        //             street: 'Monash',
        //             postCode: '3168',
        //             suburb: 'Clayton',
        //         },
        //         email: 'danyangvii@gmail.com',
        //     },
        //     deliveryMethod: 'fastest',
        // }

        // axios.post('/orders.json', order).then(response => {
        //     console.log(response);
        //     this.setState({ loading: false, purchasing: false });
        // }).catch(error => {
        //     console.log(error);
        //     this.setState({ loading: false, purchasing: false });
        // });

        const queryParams = [];
        for (let i in this.state.ingredients ){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        const queryString = queryParams.join('&'); 
        // switch the page and push a new page onto that stack of pages.
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        });
    }

    render() {
        // check whether the ingredient is 0, if 0 save fase and send to buildControl component to disable the button
        const disableInfo = { ...this.state.ingredients };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;


        let burger = <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHander}
                        ingredientRemoved={this.removeIngredientHander}
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice} />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalColsed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);