import { apiRequest } from './axios'

export default {
  confirmAccount: async (token) => {
    return apiRequest({
      method: 'GET',
      url: `/auth/confirm-account/${token}`,
      showAlert: false
    })
  },

  checkAuth: async () => {
    return apiRequest({
      method: 'GET',
      url: '/auth/me'
    })
  },

  forgotPassword: async (data) => {
    return apiRequest({
      method: 'POST',
      url: '/auth/forgot-password',
      data
    })
  },

  verifyResetPasswordToken: async (token) => {
    return apiRequest({
      method: 'GET',
      url: `/auth/reset-password/${token}`,
      showAlert: false
    })
  },

  resetPassword: async (data) => {
    return apiRequest({
      method: 'POST',
      url: '/auth/reset-password',
      data
    })
  }
}
