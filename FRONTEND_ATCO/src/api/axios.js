// import { useLoadingStore } from '@/stores/loading';
import axios from 'axios'
import Swal from 'sweetalert2'

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000,
  withCredentials: true
})

// Wrapper para solicitudes API
// async function apiRequest({ method, url, data = {}, showAlert = true }) {
//   // const loadingStore = useLoadingStore();
//   const headers = {
//     'Content-Type': 'application/json'
//   }

//   const options = {
//     method,
//     url,
//     headers
//   }

//   if (method.toLowerCase() === 'get') {
//     options.params = data
//   } else {
//     options.data = data
//   }

//   try {
//     // loadingStore.startLoading();
//     const resp = await apiClient(options)
//     return resp.data
//   } catch (error) {
//     const status = error.response.status
//     const message = error.response.data.message || 'Ocurrió un error en el servidor.'
//     if (showAlert) {
//       return Swal.fire({
//         icon: 'error',
//         title: `Error ${status}`,
//         text: message
//       })
//     }
//     console.error(`Error ${status}:`, message) // Log para depuración

//     throw error // Re-lanza el error si necesitas manejarlo en algún lugar

//     // handleApiError(error); // Centraliza el manejo de errores
//   } finally {
//     // loadingStore.stopLoading();
//   }
// }

export function apiRequest({ method, url, data = {} }) {
  const headers = {
    'Content-Type': 'application/json'
  }

  const options = {
    method,
    url,
    headers,
    data
  }
  return apiClient(url, options)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error)
      // console.log(error.status)
      const status = error.response.status
      const message = error.response.data.message || 'Ocurrió un error en el servidor.'
      console.log(status, message)
      if (status === 401 || status === 403 || status === 500 || status === 400) {
        return Swal.fire({
          icon: 'error',
          title: `Error ${status}`,
          text: message
        })
      } else {
        return error.response.data
      }
    })
}
