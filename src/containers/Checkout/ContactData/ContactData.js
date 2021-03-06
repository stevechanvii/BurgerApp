import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';
import * as orderActions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from '../../../shared/utility';

/**
 * @class ContactData
 * 
 * Contact form, receive customer details and save in database
 */
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Full Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            suburb: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Suburb'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            state: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'VIC', displayValue: 'VIC' },
                        { value: 'NSW', displayValue: 'NSW' },
                        { value: 'QLD', displayValue: 'QLD' },
                        { value: 'WA', displayValue: 'WA' },
                        { value: 'SA', displayValue: 'SA' },
                        { value: 'ACT', displayValue: 'ACT' },
                        { value: 'TAS', displayValue: 'TAS' },
                    ]
                },
                value: 'VIC',
                validation: {},
                valid: true,
            },
            postCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Post Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 4,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
            },
        },
        formIsValid: false,
        // loading: false,
    }

    /**
     * order submit handler
     */
    orderHandler = (event) => {
        // event.PreventDefault to prevent the default sending a request and reload the page
        event.preventDefault();

        // get the name and value from the state
        const formData = {};
        /**
         * for/in - loops through the properties of an object (key of the obj)
         * for/of - loops through the values of an iterable object, such as Arrays, Strings, Maps, NodeLists, and more.
         */
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onPurchaseBurger(order, this.props.token);

        // console.log(order);
    }

    /**
     * Two way binding, catch the input of the form
     * Since it's nested obj, we have to access it and then wrap it back
     */
    inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value, inputIdentifier);

        // update the nested values in orderForm
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            touched: true,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation)
        });

        // update the orderForm
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        // set state
        this.setState({ orderForm: updatedOrderForm, formIsValid });
        // console.log(updatedOrderForm)

    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        // console.log(formElementsArray)

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formEle => (
                    <Input
                        key={formEle.id}
                        elementType={formEle.config.elementType}
                        changed={(event) => this.inputChangedHandler(event, formEle.id)}
                        elementConfig={formEle.config.elementConfig}
                        value={formEle.config.value}
                        invalid={!formEle.config.valid}
                        touched={formEle.config.touched}
                        shouldValidate={formEle.config.validation} />
                ))}
                <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));