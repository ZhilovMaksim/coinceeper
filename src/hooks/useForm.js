import { useState } from 'react'

// Custom hook for form handling and validation
function useForm(initialValues) {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const validate = () => {
        const newErrors = {}
        Object.keys(values).forEach((key) => {
            if (!values[key]) {
                newErrors[key] = `${key} is required`
            }
        })
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const reset = () => {
        setValues(initialValues)
        setErrors({})
    }

    return { values, errors, handleChange, validate, reset }
}

export default useForm