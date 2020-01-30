import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

/**
 *
 * @param {*} WrappedComponent 
 * @param {*} axios 
 * 
 * an anonymous class, a class factory. withErrorHandler creates these classes.
 * This class is a higher order component which handle errors
 */
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            /**
             * the interceptor basically catches any request made by the app and interrupts it to do some logic, 
             * and eventually, after it's done with the logic, it has to return the request result 
             * (whether a request config or a response) in order to allow the part where the request 
             * was initiated to continue running
             */
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });

            this.resIntercepter = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount(){
            // console.log('[componentWillUnmount]');
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resIntercepter);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalColsed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}


export default withErrorHandler;