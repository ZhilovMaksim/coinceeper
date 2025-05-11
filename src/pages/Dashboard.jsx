import { useSelector } from 'react-redux'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'

// Dashboard with vertical layout
function Dashboard() {
    const transactions = useSelector((state) => state.transactions.transactions)

    // Calculate balance
    const balance = transactions.reduce((acc, t) => {
        return t.type === 'income' ? acc + t.amount : acc - t.amount
    }, 0)

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
            <div className="flex">
                {/* Main Content */}
                <main className="flex-1 content-with-sidebar p-4 sm:p-6 lg:p-8">
                    <div className="container mx-auto max-w-4xl">
                        <div className="grid grid-cols-1 gap-6">
                            {/* Balance Card */}
                            <div className="card">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                    Current Balance
                                </h2>
                                <p
                                    className={`text-2xl font-bold ${
                                        balance >= 0 ? 'text-green-500' : 'text-red-500'
                                    }`}
                                >
                                    ${balance.toFixed(2)}
                                </p>
                            </div>

                            {/* Transaction Form Card */}
                            <div className="card">
                                <TransactionForm />
                            </div>

                            {/* Recent Transactions Card */}
                            <div className="card">
                                <TransactionList />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard