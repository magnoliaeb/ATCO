import { apiRequest } from './axios'

export default {
  getAllUsers: async () => {
    return apiRequest({
      method: 'GET',
      url: '/users'
    })
  },

  getUserById: async (id) => {
    return apiRequest({
      method: 'GET',
      url: `/users/${id}`,
      showAlert: false
    })
  },

  updateUser: async (id, data) => {
    return apiRequest({
      method: 'PUT',
      url: `/users/edit/${id}`,
      data
    })
  },

  deleteUser: async (id) => {
    return apiRequest({
      method: 'DELETE',
      url: `/users/delete/${id}`
    })
  },

  createUser: async (data) => {
    return apiRequest({
      method: 'POST',
      url: '/users/create',
      data
    })
  },

  updateUserStatus: async (id) => {
    return apiRequest({
      method: 'PUT',
      url: `/users/update-status/${id}`
    })
  }
}
