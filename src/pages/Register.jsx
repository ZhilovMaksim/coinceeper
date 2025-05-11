import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useForm from '../hooks/useForm'
import mockApi from '../utils/mockApi'
import { login } from '../store/slices/authSlice'

// Register page with centered and rounded container
function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { values, errors, handleChange, validate } = useForm({
        email: '',
        password: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validate()) {
            try {
                const user = await mockApi.register(values.email, values.password)
                dispatch(login(user))
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
                    Register for CoinCeeper
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
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register