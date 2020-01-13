import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './checkoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well</h1>
            <div style={{width: '300%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button 
            btnType="Danger"
            clicked={}>Cancel</Button>
            <Button 
            btnType="Success"
            clicked={}>Continue</Button>
        </div>
    );
}

export default checkoutSummary;