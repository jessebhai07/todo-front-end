// src/api.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'https://todo-backend-uta5.vercel.app/api', // Change if your backend port is different
});

export default API;
