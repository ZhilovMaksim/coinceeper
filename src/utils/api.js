import axios from 'axios';

// Create an Axios instance with a base URL
const API = axios.create({
    baseURL: 'http://localhost:3001',
});

// Interceptor to add token to requests
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (email, password) => API.post('/auth/login', { email, password });

export const register = (email, password) => API.post('/auth/register', { email, password });

// Transactions
export const getTransactions = () => API.get('/transactions');
export const createTransaction = (transaction) => API.post('/transactions', transaction);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);

// Categories
export const getCategories = () => API.get('/categories');
export const createCategory = (category) => API.post('/categories', category);