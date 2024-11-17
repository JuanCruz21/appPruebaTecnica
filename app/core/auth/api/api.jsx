import axios from 'axios';


// TODO: Conectar mediante envs, vars, android e IOS
const baseURL = 'http://192.168.1.100:3000/api';

const instance = axios.create({
    baseURL: baseURL
});

// TODO: Interceptores
// instance.interceptors.request.use( (config) => {
//     return config;
// });

export default instance;