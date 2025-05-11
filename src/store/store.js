import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice.js'
import transactionReducer from './slices/transactionSlice.js'
import categoryReducer from './slices/categorySlice.js'

// Configure Redux store with reducers
const store = configureStore({
    reducer: {
        auth: authReducer,
        transactions: transactionReducer,
        categories: categoryReducer,
    },
})

export default store