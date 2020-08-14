import axios from 'axios';

const api = axios.create ({
    baseURL: 'http://localhost:3333' // Se for colocar online basta trocar aqui  
});

export default api;