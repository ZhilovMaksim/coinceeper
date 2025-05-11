import { useSelector, useDispatch } from 'react-redux'
import { deleteTransaction } from '../store/slices/transactionSlice'

// Transaction list with modern card design
function TransactionList() {
    const transactions = useSelector((state) => state.transactions.transactions)
    const categories = useSelector((state) => state.categories.categories)
    const dispatch = useDispatch()

    return (
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Recent Transactions
            </h2>
            {transactions.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No transactions yet.</p>
            ) : (
                <div className="space-y-4">
                    {transactions.map((transaction) => {
                        const category = categories.find((cat) => cat.id === transaction.category)
                        return (
                            <div
                                key={transaction.id}
                                className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                            >
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800 dark:text-gray-200">
                                        {category?.name || 'Unknown'} -{' '}
                                        <span
                                            className={
                                                transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                                            }
                                        >
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                    </span>
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</p>
                                    {transaction.comment && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {transaction.comment}
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={() => dispatch(deleteTransaction(transaction.id))}
                                    className="text-red-500 hover:text-red-600 font-medium transition-colors duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default TransactionList