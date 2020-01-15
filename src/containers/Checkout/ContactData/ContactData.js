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
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
            },
            suburb: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Suburb'
                },
                value: '',
            },
            state: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'vic', displayValue: 'VIC' },
                        { value: 'nsw', displayValue: 'NSW' },
                        { value: 'qld', displayValue: 'QLD' },
                        { value: 'wa', displayValue: 'WA' },
                        { value: 'sa', displayValue: 'SA' },
                        { value: 'act', displayValue: 'ACT' },
                        { value: 'tas', displayValue: 'TAS' },
                    ]
                },
                value: '',
            },
            postCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Post Code'
                },
                value: '',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: '',
            },
        },
        loading: false,
    }

    orderHandler = (event) => {
        // event.PreventDefault to prevent the default which is to send a request which I don't want
        event.preventDefault();

        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,

        }

        axios.post('/orders.json', order).then(response => {
            console.log(response);
            this.setState({ loading: false });
            this.props.history.push('/');
        }).catch(error => {
            console.log(error);
            this.setState({ loading: false });
        });

        console.log(this.props.ingredients);
    }

    /**
     * Two way binding, catch the input of the form
     * Since it's nested obj, we have to access it and then wrap it back
     */
    inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
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
        // save back in the orderForm
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        // set state
        this.setState({orderForm: updatedOrderForm});

    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form>
                {formElementsArray.map(formEle => (
                    <Input
                        key={formEle.id}
                        elementType={formEle.config.elementType}
                        changed={(event) => this.inputChangedHandler(event, formEle.key)}
                        elementConfig={formEle.config.elementConfig}
                        value={formEle.config.value} />
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
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