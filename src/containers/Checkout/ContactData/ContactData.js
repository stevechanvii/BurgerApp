import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-order';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postCode: '',
            suburb: '',
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
            customer: {
                name: 'Steve',
                address: {
                    street: 'Monash',
                    postCode: '3168',
                    suburb: 'Clayton',
                },
                email: 'danyangvii@gmail.com',
            },
            deliveryMethod: 'fastest',
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

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="suburb" placeholder="Suburb" />
                <input className={classes.Input} type="text" name="postcode" placeholder="Post Code" />
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