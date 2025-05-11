import { createSlice } from '@reduxjs/toolkit';
import { getCategories, createCategory } from '../../utils/api';

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        status: 'idle',
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
            state.status = 'succeeded';
        },
        addCategory: (state, action) => {
            state.categories.push(action.payload);
        },
        deleteCategory: (state, action) => {
            state.categories = state.categories.filter((c) => c.id !== action.payload);
        },
    },
});

export const { setCategories, addCategory, deleteCategory } = categorySlice.actions;

export const fetchCategories = () => async (dispatch) => {
    try {
        const response = await getCategories();
        dispatch(setCategories(response.data));
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to fetch categories');
    }
};

export const addCategoryAsync = (category) => async (dispatch) => {
    try {
        const response = await createCategory(category);
        dispatch(addCategory(response.data));
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to add category');
    }
};

export default categorySlice.reducer;