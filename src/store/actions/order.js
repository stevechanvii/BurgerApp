import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

/**
 *  hold the action creators for submitting an order
 */
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error: error,
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseBurger = (orderData, token) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData).then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        }).catch(error => {
            dispatch(purchaseBurgerFail(error));
        });

    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return{
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrderStart = () => {
    return{
        type: actionTypes.FETCH_ORDER_START,
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());

        // search a valid user (with token) with userId on server (firebase)
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId+ '"';

        axios.get('orders.json' + queryParams).then(response => {
            let fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key,
                });
            }
            // console.log(fetchedOrders);
            dispatch(fetchOrderSuccess(fetchedOrders));
        }).catch(error => {
            dispatch(fetchOrderFail(error));
            // console.log(error);
        });
    }
}