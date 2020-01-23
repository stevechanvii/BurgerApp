import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import * as burgerBuilderActions from '../../store/actions/index';

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
        return sum > 0;
    }

    /**
    * Disabled
    * 
    * get ingredients from database manged by redux
    */
    componentDidMount() {
        console.log(this.props);
        // axios.get('/ingredients.json').then(response => {
        //     // console.log(response.data);
        //     this.setState({
        //         ingredients: response.data,
        //         totalPrice: Object.keys(response.data).map(igKey => {
        //             return response.data[igKey] * INGREDIENT_PRICES[igKey];
        //         }).reduce((sum, el) => {
        //             return sum + el;
        //         }, 4)
        //     });
        //     this.updatePurchaseState(response.data);
        // }).catch(error => {
        //     console.log(error);
        // });
    }

    /**
     * Disabled
     * 
     * add ingredient manged by redux
     */
    addIngredientHander = (type) => {
        const updatedCount = this.props.ings[type] + 1;
        const updatedIngredient = { ...this.props.ings };
        updatedIngredient[type] = updatedCount;

        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredient,
            totalPrice: updatedPrice,
        });

        this.updatePurchaseState(updatedIngredient);
    }

    /**
    * Disabled
    * 
    * remove ingredient manged by redux
    */
    removeIngredientHander = (type) => {
        const updatedCount = this.props.ings[type] - 1;

        if (updatedCount < 0) {
            return;
        }

        const updatedIngredient = { ...this.props.ings };
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

    /**
    * Disabled
    * 
    * purchase manged by redux
    */
    purchaseContinueHandlerDisabled = () => {
        // send parameters by using formate URL?...=...&...=... in history
        const queryParams = [];
        for (let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        }
        queryParams.push('price' + '=' + this.state.totalPrice);

        const queryString = queryParams.join('&');
        // switch the page and push a new page onto that stack of pages.
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        });
        console.log(this.props);
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        // check whether the ingredient is 0, if 0 save fase and send to buildControl component to disable the button
        const disableInfo = { ...this.props.ings };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;


        let burger = <Spinner />;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price} />;
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));