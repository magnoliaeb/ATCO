import { apiRequest } from './axios'

export default {
  getAllCustomers: async (filters) => {
    return apiRequest({
      method: 'GET',
      url: '/customers',
      data: filters
    })
  },
  getCustomerById: async (id) => {
    return apiRequest({
      method: 'GET',
      url: `/customers/${id}`,
      showAlert: false
    })
  },
  createCustomer: async (data) => {
    return apiRequest({
      method: 'POST',
      url: '/customers/create',
      data
    })
  },
  updateCustomer: async (id, data) => {
    return apiRequest({
      method: 'PUT',
      url: `/customers/edit/${id}`,
      data
    })
  },
  deleteCustomer: async (id) => {
    return apiRequest({
      method: 'DELETE',
      url: `/customers/delete/${id}`
    })
  }
}
