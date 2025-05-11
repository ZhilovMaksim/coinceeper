import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import transactionReducer from './slices/transactionSlice'
import categoryReducer from './slices/categorySlice'

// Configure Redux store with reducers
const store = configureStore({
    reducer: {
        auth: authReducer,
        transactions: transactionReducer,
        categories: categoryReducer,
    },
})

export default store