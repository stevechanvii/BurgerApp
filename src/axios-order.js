import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-6732f.firebaseio.com/',
});

export default instance;