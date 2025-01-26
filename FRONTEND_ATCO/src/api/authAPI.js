import { apiRequest } from './axios'

export default {
    checkAuth: async () => {
    return apiRequest({
      method: 'GET',
      url: '/auth/me'
    })
  },

}
