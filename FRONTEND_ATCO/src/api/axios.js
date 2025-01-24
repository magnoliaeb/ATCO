// import { useLoadingStore } from '@/stores/loading';
import axios from 'axios';
import Swal from 'sweetalert2';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000,
  withCredentials: true
});



// Wrapper para solicitudes API
async function apiRequest({method, url, data = {}, showAlert = true}) {
  // const loadingStore = useLoadingStore();
  const headers = {
    'Content-Type': 'application/json',
  };

  const options = {
    method,
    url,
    headers,
  };

  if (method.toLowerCase() === 'get') {
    options.params = data;
  } else {
    options.data = data;
  }

  try {
    // loadingStore.startLoading();
    const resp = await apiClient(options);
    return resp.data;
  } catch (error) {
    const status = error.response.status;
    const message = error.response.data.message || 'Ocurrió un error en el servidor.';
    if (showAlert) {
      return Swal.fire({
        icon: 'error',
        title: `Error ${status}`,
        text: message,
      });
    }
    throw error; // Re-lanza el error si necesitas manejarlo en algún lugar

    // handleApiError(error); // Centraliza el manejo de errores
  } finally {
    // loadingStore.stopLoading();
  }
}



export { apiRequest };
