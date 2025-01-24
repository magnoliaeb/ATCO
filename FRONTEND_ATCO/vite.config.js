import { fileURLToPath, URL } from 'node:url'
import sitemap from 'vite-plugin-sitemap';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    sitemap({
      hostname: 'https://tu-dominio.com', // Cambia por tu dominio
      routes: [
        { path: '/', priority: 1.0 },
        { path: '/acerca-de', priority: 0.8 },
        { path: '/contacto', priority: 0.7 },
        { path: '/politicas-de-envios', priority: 0.6 },
        { path: '/politicas-de-privacidad', priority: 0.5 },
        { path: '/terminos-y-condiciones', priority: 0.4 },
        { path: '/devoluciones-y-excambios', priority: 0.3 },
        { path: '/preguntas-frecuentes', priority: 0.2 },
        { path: '/blog', priority: 0.1 },
        { path: '/blog/:slug', priority: 0.1 },
        { path: '/colecciones', priority: 0.1 },
        { path: '/colecciones/:slug', priority: 0.1 },
        { path: '/productos', priority: 0.1 },
        { path: '/productos/:slug', priority: 0.1 },
        { path: '/carrito', priority: 0.1 },
        { path: '/pedidos', priority: 0.1 },
        { path: '/favoritos', priority: 0.1 },
        { path: '/direcciones', priority: 0.1 },
        { path: '/olvidaste-tu-contrasena', priority: 0.1 },
        { path: '/confirmar-cuenta/:token', priority: 0.1 },
        { path: '/mi-cuenta', priority: 0.1 },
        { path: '/iniciar-sesion', priority: 0.1 },
        { path: '/registro', priority: 0.1 },
        
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/partials/_my-variabls.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  optimizeDeps: {
    include: ['v-slick-carousel'], // Fuerza la optimización de este módulo
  },
})
