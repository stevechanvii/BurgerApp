import React, { Component } from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

/**
 * @function modal
 * @param {*} props 
 * 
 * Pop up window for order
 */
class Modal extends Component {
    /**
     * @function shouldComponentUpdate
     * @param {*} nextProps 
     * @param {*} nextState 
     * 
     * Check whether next props is same to current sate, if not then render,
     * othervise return false to stop render for better performence.
     */
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentDidUpdate() {
        // console.log('[Modal] didUpdate')
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalColsed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0',
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;