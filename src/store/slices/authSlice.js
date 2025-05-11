import { createSlice } from '@reduxjs/toolkit';
import { login as apiLogin, register as apiRegister } from '../../utils/api.js';

const initialState = {
    user: null,
    isAuthenticated: false,
    token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
});

export const { login, logout } = authSlice.actions;

export const loginAsync = (email, password) => async (dispatch) => {
    try {
        const response = await apiLogin(email, password);
        dispatch(login(response.data));
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Login failed');
    }
};

export const registerAsync = (email, password) => async () => {
    try {
        const response = await apiRegister(email, password);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Registration failed');
    }
};

export default authSlice.reducer;