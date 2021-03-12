import axios from '@/api/axios'

// eslint-disable-next-line no-unused-vars
const register = credentials => {
	return axios.post('/users', { user: credentials })
}

export default {
	register
}