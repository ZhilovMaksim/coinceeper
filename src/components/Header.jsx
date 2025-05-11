import { useSelector, useDispatch } from 'react-redux'
import {NavLink, useNavigate} from 'react-router-dom'
import { logout } from '../store/slices/authSlice'
import { useState } from 'react'

// Header with sidebar navigation
function Header() {
    const { isAuthenticated, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <>
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 w-56 sidebar z-50 transform ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 transition-transform duration-300`}
            >
                <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            CoinCeeper
                        </h1>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-gray-600 dark:text-gray-300"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    {isAuthenticated ? (
                        <nav className="space-y-4 flex-1">
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    `block py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                        isActive
                                            ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-800'
                                    }`
                                }
                                onClick={() => setSidebarOpen(false)}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                to="/stats"
                                className={({ isActive }) =>
                                    `block py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                        isActive
                                            ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-800'
                                    }`
                                }
                                onClick={() => setSidebarOpen(false)}
                            >
                                Stats
                            </NavLink>
                            <NavLink
                                to="/settings"
                                className={({ isActive }) =>
                                    `block py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                        isActive
                                            ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-800'
                                    }`
                                }
                                onClick={() => setSidebarOpen(false)}
                            >
                                Settings
                            </NavLink>
                        </nav>
                    ) : (
                        <nav className="space-y-4 flex-1">
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `block py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                        isActive
                                            ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-800'
                                    }`
                                }
                                onClick={() => setSidebarOpen(false)}
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    `block py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                        isActive
                                            ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-800'
                                    }`
                                }
                                onClick={() => setSidebarOpen(false)}
                            >
                                Register
                            </NavLink>
                        </nav>
                    )}

                    {/* User email and logout icon at the bottom */}
                    {isAuthenticated && (
                        <div className="mt-auto flex items-center justify-between py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-800 transition-colors duration-200">
                            <span>{user?.email || 'user@example.com'}</span>
                            <button
                                onClick={() => {
                                    handleLogout()
                                    setSidebarOpen(false)
                                }}
                                className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                            >
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
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu Button */}
            {!sidebarOpen && (
                <div className="lg:hidden fixed top-4 left-4 z-50">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 bg-purple-600 text-white rounded-lg"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            )}

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </>
    )
}

export default Header