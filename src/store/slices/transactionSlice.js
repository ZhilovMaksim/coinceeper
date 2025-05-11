import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

// Mock initial transactions
const initialTransactions = [
    { id: uuidv4(), type: 'income', amount: 1000, category: 'Salary', date: '2025-05-01', comment: 'Monthly salary' },
    { id: uuidv4(), type: 'expense', amount: 200, category: 'Food', date: '2025-05-02', comment: 'Groceries' },
]

const transactionSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: initialTransactions,
    },
    reducers: {
        addTransaction: (state, action) => {
            state.transactions.push({ ...action.payload, id: uuidv4() })
        },
        editTransaction: (state, action) => {
            const index = state.transactions.findIndex(t => t.id === action.payload.id)
            if (index !== -1) {
                state.transactions[index] = action.payload
            }
        },
        deleteTransaction: (state, action) => {
            state.transactions = state.transactions.filter(t => t.id !== action.payload)
        },
    },
})

export const { addTransaction, editTransaction, deleteTransaction } = transactionSlice.actions
export default transactionSlice.reducer