import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

/**
 * @class Checkout
 * 
 * Checkout container which define continue and cancel handler, and pass ingredients to checkoutSummary
 */
class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
    }

    /**
    * Disabled
    * 
    * get ingredients from query manged by redux
    */
    // componentWillMount() {
    //     console.log(this.props);
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     /**
    //      * The for...of statement creates a loop iterating over iterable objects, 
    //      * including: built-in String, Array, array-like objects, 
    //      * An object implementing URLSearchParams can directly be used in a for...of structure
    //      * 
    //      * The for...in statement iterates over all enumerable properties of an object 
    //      * that are keyed by strings (ignoring ones keyed by Symbols), including inherited 
    //      * enumerable properties.
    //      */
    //     for (let param of query) {
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             // + can convert string to number
    //             ingredients[param[0]] = +param[1];
    //         }

    //     }
    //     this.setState({ ingredients: ingredients, totalPrice: price });

    // }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCanceled={this.checkoutCanceledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    {/* render takes a function */}
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            );
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
    }
}

export default connect(mapStateToProps)(Checkout);