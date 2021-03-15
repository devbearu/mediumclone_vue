/* eslint-disable no-unused-vars */
import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

const state = {
	isSubmitting: false,
	currentUser: null,
	validationErrors: null,
	isLoggedIn: null
}

export const mutationsTypes = {
	registerStart: '[auth] registerStart',
	registerSuccess: '[auth] registerSuccess',
	registerFailure: '[auth] registerFailure',
	loginStart: '[auth] loginStart',
	loginSuccess: '[auth] loginSuccess',
	loginFailure: '[auth] loginFailure'
}

export const actionTypes = {
	register: '[auth] register',
	login: '[auth] login'
}

export const getterTypes = {
	currentUser: '[auth] currentUser',
	isLoggedIn: '[auth] isLoggedIn',
	isAnnonymous: '[auth] isAnnonymous'
}

const getters = {
	[getterTypes.currentUser]: state => {
		return state.currentUser
	},
	[getterTypes.isLoggedIn]: state => {
		return Boolean(state.isLoggedIn)
	},
	[getterTypes.isAnnonymous]: state => {
		return state.isLoggedIn === false
	}
}

const mutations = {
	[mutationsTypes.registerStart](state) {
		state.isSubmitting = true
		state.validationErrors = null
	},
	[mutationsTypes.registerSuccess](state, payload) {
		state.isSubmitting = false
		state.currentUser = payload
		state.isLoggedIn = true
	},
	[mutationsTypes.registerFailure](state, payload) {
		state.isSubmitting = false
		state.validationErrors = payload
	},
	[mutationsTypes.loginStart](state) {
		state.isSubmitting = true
		state.validationErrors = null
	},
	[mutationsTypes.loginSuccess](state, payload) {
		state.isSubmitting = false
		state.currentUser = payload
		state.isLoggedIn = true
	},
	[mutationsTypes.loginFailure](state, payload) {
		state.isSubmitting = false
		state.validationErrors = payload
	}
}

const actions = {
	[actionTypes.register](context, credentials) {
		return new Promise(resolve => {
			context.commit(mutationsTypes.registerStart)
			authApi
				.register(credentials)
				.then(response => {
					context.commit(
						mutationsTypes.registerSuccess,
						response.data.user
					)
					setItem('accessToken', response.data.user.token)
					resolve(response.data.user)
				})
				.catch(result => {
					context.commit(
						mutationsTypes.registerFailure,
						result.response.data.errors
					)
				})
		})
	},

	[actionTypes.login](context, credentials) {
		return new Promise(resolve => {
			context.commit(mutationsTypes.loginStart)
			authApi
				.login(credentials)
				.then(response => {
					context.commit(mutationsTypes.loginSuccess, response.data.user)
					setItem('accessToken', response.data.user.token)
					resolve(response.data.user)
				})
				.catch(result => {
					context.commit(
						mutationsTypes.loginFailure,
						result.response.data.errors
					)
				})
		})
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}
