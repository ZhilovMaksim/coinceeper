import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addCategoryAsync, deleteCategory, fetchCategories } from '../store/slices/categorySlice'

// Settings page with compact design
function Settings() {
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.categories.categories)
    const [name, setName] = useState('')
    const [color, setColor] = useState('#000000')

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    const handleAddCategory = async (e) => {
        e.preventDefault()
        if (name) {
            try {
                await dispatch(addCategoryAsync({ name, color }))
                setName('')
                setColor('#000000')
            } catch (error) {
                alert(error.message)
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
            <div className="flex">
                <main className="flex-1 content-with-sidebar p-4 sm:p-6 lg:p-8">
                    <div className="container mx-auto max-w-4xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Add Category Card */}
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
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    <span>Add New Category</span>
                                </h2>
                                <form onSubmit={handleAddCategory} className="space-y-3">
                                    <div className="flex items-center space-x-2">
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
                                                d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                                            />
                                        </svg>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Category Name"
                                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 transition"
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2">
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
                                                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                                            />
                                        </svg>
                                        <input
                                            type="color"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                            className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                                        />
                                    </div>
                                    <button type="submit" className="btn-primary w-full">
                                        Add Category
                                    </button>
                                </form>
                            </div>

                            {/* Existing Categories Card */}
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
                                            d="M19 11H5m14 0a8 8 0 01-8 8m8-8a8 8 0 00-8-8m8 8h.01M5 11a8 8 0 018-8m-8 8a8 8 0 008 8m-8-8H4.99"
                                        />
                                    </svg>
                                    <span>Existing Categories</span>
                                </h2>
                                {categories.length === 0 ? (
                                    <p className="text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span>No categories yet.</span>
                                    </p>
                                ) : (
                                    <div className="space-y-3">
                                        {categories.map((cat) => (
                                            <div
                                                key={cat.id}
                                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200"
                                            >
                                                <div className="flex items-center space-x-2">
                          <span
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: cat.color }}
                          ></span>
                                                    <span className="text-gray-800 dark:text-gray-200">{cat.name}</span>
                                                </div>
                                                <button
                                                    onClick={() => dispatch(deleteCategory(cat.id))}
                                                    className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors duration-200"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Settings