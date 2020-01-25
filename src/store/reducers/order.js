import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

/**
 * holds code relevant to building the burger, use utility to siplify the expression,
 * the PURCHASE_BURGER_SUCCESS has been outsourced, so that the switch case is more clearn
 */

const initState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    }
    const updatedState = {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    }
    return updatedState;
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return updateObject(state, purchaseBurgerSuccess(state, action));
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, { loading: false });
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, { loading: true });
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, { purchased: false });
        case actionTypes.FETCH_ORDER_START:
            return updateObject(state, { loading: true });
        case actionTypes.FETCH_ORDER_SUCCESS:
            const updatedState = { loading: false, orders: action.orders };
            return updateObject(state, updatedState);
        case actionTypes.FETCH_ORDER_FAIL:
            return updateObject(state, { loading: false });
        default:
            return state;
    }
}

export default reducer;