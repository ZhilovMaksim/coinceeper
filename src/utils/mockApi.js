// Mock API to simulate server interactions
const mockApi = {
    login: async (email, password) => {
        // Simulate login validation
        if (email && password) {
            return { id: '1', email }
        }
        throw new Error('Invalid credentials')
    },
    register: async (email, password) => {
        // Simulate registration
        if (email && password) {
            return { id: '1', email }
        }
        throw new Error('Registration failed')
    },
}

export default mockApi