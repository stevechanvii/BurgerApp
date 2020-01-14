import React, { Component } from 'react';

import Order from '../../components/Order/Order';

/**
 * @class Orders
 * 
 * Orders summary after checkout
 */
class Orders extends Component {
    render() {
        return (
            <div>
                <Order />
                <Order />
            </div>
        );
    }
}

export default Orders;