import axios from 'axios';

/**
 * @constant instance
 * 
 * URL of Firebase
 */
const instance = axios.create({
    baseURL: 'https://myburger-7c866.firebaseio.com/',
});

export default instance;