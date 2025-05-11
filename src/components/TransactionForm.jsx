import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTransaction } from '../store/slices/transactionSlice'
import useForm from '../hooks/useForm'

// Transaction form with modern, playful design
function TransactionForm() {
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.categories.categories)
    const initialValues = {
        type: 'income',
        amount: '',
        category: categories[0]?.id || '',
        date: new Date().toISOString().split('T')[0],
        comment: '',
    }
    const { values, errors, handleChange, validate, reset } = useForm(initialValues)
    const [newCategory, setNewCategory] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            dispatch(addTransaction({
                ...values,
                amount: parseFloat(values.amount),
            }))
            reset()
        }
    }

    return (
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Add Transaction
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Type
                    </label>
                    <select
                        name="type"
                        value={values.type}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 transition"
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Amount
                    </label>
                    <input
                        type="number"
                        name="amount"
                        value={values.amount}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 transition"
                    />
                    {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Category
                    </label>
                    <select
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 transition"
                    >
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={values.date}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 transition"
                    />
                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Comment (Optional)
                    </label>
                    <input
                        type="text"
                        name="comment"
                        value={values.comment}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 transition"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
                >
                    Add Transaction
                </button>
            </form>
        </div>
    )
}

export default TransactionForm