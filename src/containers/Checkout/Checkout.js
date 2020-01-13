import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1,
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        /**
         * The for...of statement creates a loop iterating over iterable objects, 
         * including: built-in String, Array, array-like objects, 
         * An object implementing URLSearchParams can directly be used in a for...of structure
         * 
         * The for...in statement iterates over all enumerable properties of an object 
         * that are keyed by strings (ignoring ones keyed by Symbols), including inherited 
         * enumerable properties.
         */
        for(let param of query){
            // + can convert string to number
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
        
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler =() => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
            </div>
        );
    }
}

export default Checkout;