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
    // state = {
    //     orders: [],
    //     loading: true,
    // }

    /**
     * get order managed by redux
     */
    componentDidMount() {
        this.props.onFetchOrder();
        // axios.get('orders.json').then(response => {
        //     console.log(response.data);

        //     let fetchedOrders = [];
        //     for (let key in response.data) {
        //         fetchedOrders.push({
        //             ...response.data[key],
        //             id: key,
        //         });
        //     }
        //     console.log(fetchedOrders);
        //     this.setState({loading: false, orders: fetchedOrders});
        // }).catch(error => {
        //     this.setState({loading: false})
        //     console.log(error);
        // });
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order key={order.id} ingredients={order.ingredients} price={+order.price} />
            ));
            console.log(orders);
        }
        return orders;
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrder: () => dispatch(actions.fetchOrders()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));