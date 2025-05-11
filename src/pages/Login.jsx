import { useDispatch } from 'react-redux'
import { loginAsync } from '../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import useForm from '../hooks/useForm'

// Login page with centered and rounded container
function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const initialValues = {
        email: '',
        password: '',
    }
    const { values, errors, handleChange, validate } = useForm(initialValues)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validate()) {
            try {
                await dispatch(loginAsync(values.email, values.password))
                navigate('/dashboard')
            } catch (error) {
                alert(error.message)
            }
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                    Login to CoinCeeper
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                    <button type="submit" className="btn-primary w-full">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login