import { createSlice } from '@reduxjs/toolkit';
import { getTransactions, createTransaction } from '../../utils/api'; // Удален неиспользуемый deleteTransaction
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3001',
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const transactionSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: [],
        status: 'idle',
    },
    reducers: {
        setTransactions: (state, action) => {
            state.transactions = action.payload;
            state.status = 'succeeded';
        },
        addTransaction: (state, action) => {
            state.transactions.push(action.payload);
        },
        editTransaction: (state, action) => {
            const index = state.transactions.findIndex((t) => t.id === action.payload.id);
            if (index !== -1) {
                state.transactions[index] = action.payload;
            }
        },
        deleteTransaction: (state, action) => {
            state.transactions = state.transactions.filter((t) => t.id !== action.payload);
        },
    },
});

export const { setTransactions, addTransaction, deleteTransaction } = transactionSlice.actions;

export const fetchTransactions = () => async (dispatch) => {
    try {
        const response = await getTransactions();
        dispatch(setTransactions(response.data));
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to fetch transactions');
    }
};

export const addTransactionAsync = (transaction) => async (dispatch) => {
    try {
        const response = await createTransaction(transaction);
        dispatch(addTransaction(response.data));
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to add transaction');
    }
};

export const deleteTransactionAsync = (id) => async (dispatch) => {
    try {
        await deleteTransaction(id); // Вызов API
        dispatch(deleteTransaction({ payload: id })); // Обернут id в объект payload
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to delete transaction');
    }
};

export default transactionSlice.reducer;