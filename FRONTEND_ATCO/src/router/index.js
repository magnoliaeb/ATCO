import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          redirect: { name: 'login' }
        },
        {
          path: 'iniciar-sesion',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue')
        }
      ]
    },
    {
      path: '/dashboard',
      component: () => import('../layouts/DashboardLayout.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/dashboard/DashboardView.vue')
        },
        {
          path: '/usuarios',
          children: [
            {
              path: '',
              name: 'users',
              component: () => import('../views/users/UsersView.vue')
            },
            {
              path: 'crear',
              name: 'create-user',
              component: () => import('../views/users/UserForm.vue')
            },
            {
              path: 'editar/:id',
              name: 'edit-user',
              component: () => import('../views/users/UserForm.vue')
            }
          ]
        },
        {
          path: '/cotizaciones',
          // component: () => import('../views/quotes/QuotesView.vue')
          children: [
            {
              path: '',
              name: 'quotes',
              component: () => import('../views/quotes/QuotesView.vue')
            },
            {
              path: ':id',
              name: 'quote-details',
              component: () => import('../views/quotes/QuoteDetails.vue')
            },
            {
              path: 'crear',
              name: 'create-quote',
              component: () => import('../views/quotes/QuoteForm.vue')
            },
            {
              path: 'editar/:id',
              name: 'edit-quote',
              component: () => import('../views/quotes/QuoteForm.vue')
            }
          ]
        },
        {
          path: '/catalogo',
          children: [
            {
              path: '',
              name: 'catalog',
              component: () => import('../views/catalog/CatalogView.vue')
            },
            {
              path: 'crear',
              name: 'create-item',
              component: () => import('../views/catalog/ItemForm.vue')
            },
            {
              path: 'editar/:id',
              name: 'edit-item',
              component: () => import('../views/catalog/ItemForm.vue')
            }
          ]
        }
      ]
    },
    // {
    //   path: '/mi-cuenta',
    //   name: 'account',
    //   component: () => import('../views/account/AccountView.vue'),
    //   meta: {
    //     requiresAuth: true
    //   }
    // }
    {
      path: '/:catchAll(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

// router.beforeEach(async (to, from, next) => {
//   const authStore = useAuthStore();
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   console.log(authStore.isAuthenticated);
//   console.log(authStore.user);

//   if (requiresAuth) {
//     if (!authStore.isAuthenticated) {
//       console.log(1);
//       return next({ name: 'login' });
//     }

//     console.log(2);
//     try {
//       const resp = await authAPI.checkAuth()
//       await authStore.setUser(resp.data);
//       console.log(resp);
//       return next();

//     } catch (error) {
//       console.log(error);
//       return next({ name: 'login' });

//     }
//   }

//   console.log(3);
//   next();
// });

export default router
