import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

// Mock initial categories
const initialCategories = [
    { id: uuidv4(), name: 'Salary', color: '#22c55e' },
    { id: uuidv4(), name: 'Food', color: '#ef4444' },
    { id: uuidv4(), name: 'Utilities', color: '#3b82f6' },
]

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: initialCategories,
    },
    reducers: {
        addCategory: (state, action) => {
            state.categories.push({ ...action.payload, id: uuidv4() })
        },
        deleteCategory: (state, action) => {
            state.categories = state.categories.filter(c => c.id !== action.payload)
        },
    },
})

export const { addCategory, deleteCategory } = categorySlice.actions
export default categorySlice.reducer