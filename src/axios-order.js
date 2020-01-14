import axios from 'axios';

/**
 * @constant instance
 * 
 * URL of Firebase
 */
const instance = axios.create({
    baseURL: 'https://react-my-burger-6732f.firebaseio.com/',
});

export default instance;