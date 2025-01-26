// import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import './assets/scss/main.scss'

// import "sweetalert2/dist/sweetalert2.min.css"; // Estilos base
// import "sweetalert2-theme-dark/dark.css"; // Tema que deseas usar

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { createApp } from 'vue'

import pinia from './stores/pinia'


import App from './App.vue'
import router from './router'

const app = createApp(App)

// Vuetify
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  },
  display: {
    mobileBreakpoint: 'lg'
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#f2a900',
          secondary: '#231f1f',
          tertiary: '#8d8d8d',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      }
    }
  }
})

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
