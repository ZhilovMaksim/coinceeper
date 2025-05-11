import { useState } from 'react'
import { useSelector } from 'react-redux'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'

// Stats page with compact sections
function Stats() {
    const transactions = useSelector((state) => state.transactions.transactions)
    const categories = useSelector((state) => state.categories.categories)
    const [dateRange, setDateRange] = useState('all')

    // Aggregate data by category
    const data = categories
        .map((cat) => {
            const income = transactions
                .filter((t) => t.type === 'income' && t.category === cat.id)
                .reduce((sum, t) => sum + t.amount, 0)
            const expense = transactions
                .filter((t) => t.type === 'expense' && t.category === cat.id)
                .reduce((sum, t) => sum + t.amount, 0)
            return { name: cat.name, income, expense, color: cat.color }
        })
        .filter((d) => d.income > 0 || d.expense > 0)

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
            <div className="flex">
                <main className="flex-1 content-with-sidebar p-4 sm:p-6 lg:p-8">
                    <div className="container mx-auto max-w-4xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Analytics Section */}
                            <div className="card">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center space-x-2">
                                    <svg
                                        className="w-5 h-5 text-purple-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                    <span>Income vs Expense</span>
                                </h2>
                                <BarChart width={300} height={200} data={data} className="mx-auto">
                                    <XAxis dataKey="name" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1f2937',
                                            color: '#e5e7eb',
                                            borderRadius: '8px',
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </div>

                            {/* Expenses Section */}
                            <div className="card">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center space-x-2">
                                    <svg
                                        className="w-5 h-5 text-purple-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m-5 5a2 2 0 01-2 2H5a2 2 0 01-2-2v-3m5 5h6m-2-5h2a2 2 0 012 2v1m-5-5V9m2 9v1a2 2 0 01-2 2H9a2 2 0 01-2-2v-1"
                                        />
                                    </svg>
                                    <span>Expense Distribution</span>
                                </h2>
                                <PieChart width={300} height={200} className="mx-auto">
                                    <Pie
                                        data={data}
                                        dataKey="expense"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1f2937',
                                            color: '#e5e7eb',
                                            borderRadius: '8px',
                                        }}
                                    />
                                </PieChart>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Stats