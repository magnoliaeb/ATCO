import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { apiRequest } from '@/api/axios'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const router = useRouter()
    // State
    const token = ref('')
    const user = ref(null)
    const isAuthenticated = ref(false)

    async function login(credentials) {
      const { data } = await apiRequest({
        method: 'POST',
        url: '/auth/login',
        data: credentials
      })
      token.value = data.token
      isAuthenticated.value = true
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido!',
        text: 'Has iniciado sesión correctamente.',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        router.push({ name: 'dashboard' })
      })
    }

    async function setUser(payload) {
      user.value = payload
      isAuthenticated.value = true
    }

    async function logout() {
      token.value = ''
      user.value = null
      isAuthenticated.value = false
      await apiRequest({
        method: 'POST',
        url: '/auth/logout'
      })
      router.push({ name: 'home' })
    }

    return {
      isAuthenticated,
      user,
      // actions
      login,
      logout,
      setUser
    }
  },
  {
    persist: true
  }
)
