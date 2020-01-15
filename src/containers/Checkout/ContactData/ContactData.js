import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';

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
        loading: false,
    }

    /**
     * order submit handler
     */
    orderHandler = (event) => {
        // event.PreventDefault to prevent the default sending a request and reload the page
        event.preventDefault();

        this.setState({ loading: true });

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
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }

        axios.post('/orders.json', order).then(response => {
            console.log(response);
            this.setState({ loading: false });
            this.props.history.push('/');
        }).catch(error => {
            console.log(error);
            this.setState({ loading: false });
        });

        console.log(order);
    }

    /**
     * Two way binding, catch the input of the form
     * Since it's nested obj, we have to access it and then wrap it back
     */
    inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value, inputIdentifier);
        // copy the orderForm
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        // then access the form content in orderForm
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        // update the value
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        // save back in the orderForm
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        // set state
        this.setState({ orderForm: updatedOrderForm, formIsValid });
        console.log(updatedOrderForm)

    }

    // input validation
    checkValidity = (value, rules) => {
        let isValid = true;

        if(!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        console.log(formElementsArray)

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
        if (this.state.loading) {
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

export default ContactData;