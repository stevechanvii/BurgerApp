import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

/**
 * @class Orders
 * 
 * Orders summary after checkout
 */
class Orders extends Component {

    /**
     * get order managed by redux
     */
    componentDidMount() {
        // console.log(this.props.userId);
        this.props.onFetchOrder(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner />;
        // console.log(this.props.orders);
        if (!this.props.loading) {
            if (this.props.orders.length > 0){
                orders = this.props.orders.map(order => (
                    <Order key={order.id} ingredients={order.ingredients} price={+order.price} />
                ));
            } else {
                orders = <p>Make your first in Burger Builder!</p>
            }
        }
        return orders;
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token, 
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrder: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));