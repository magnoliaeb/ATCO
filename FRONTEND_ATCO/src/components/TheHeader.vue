<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const drawer = ref(true);
import { useDisplay } from 'vuetify'
const authStore = useAuthStore();
const { mobile } = useDisplay();
</script>
<template>

  <v-app-bar color="white" prominent app elevation="0" :height="mobile ? 60 : 80">
    <VRow class="align-center justify-space-between mx-1 mx-sm-6">
      <VCol cols="auto" class="d-flex align-center">
        <v-app-bar-nav-icon :size="mobile ? 'small' : 'large'" v-if="mobile" class="mr-2" variant="text"
          @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <img width="auto" src="../assets/images/logo-atco.png" alt="logo" class="logo">
      </VCol>
      <VCol cols="auto" class="">
        <VBtn class="d-md-none" variant="text" :icon="mobile" color="#8d8d8d" size="small">
          <VIcon class="" size="30">mdi-account-circle</VIcon>
        </VBtn>
        <VBtn class="d-none d-md-block" variant="text" color="#8d8d8d">
          <VIcon class="mr-1 mr-sm-3" size="30">mdi-account-circle</VIcon>
          <div class=" d-sm-flex flex-column text-left">
            <span class="d-inline-block mb-1">Bienvenido</span>
            <span class=" d-sm-inline-block text-capitalize">{{ authStore.user?.name }}</span>
          </div>
        </VBtn>

      </VCol>
    </VRow>


  </v-app-bar>

  <v-navigation-drawer v-model="drawer" :location="'left'" temporary floating :permanent="!mobile" width="250"
    class="px-4" app>
    <v-list color="primary" rounded class="">
      <v-list-item :to="{ name: 'dashboard' }" class="my-4 d-flex" prepend-icon="mdi-view-dashboard" title="Dashboard"
        exact>
      </v-list-item>
      <v-list-item :to="{ name: 'users' }" v-if="authStore.user?.role === 'admin'" class="my-4 d-flex"
        prepend-icon="mdi-account-group" title="Usuarios">
      </v-list-item>
      <v-list-item :to="{ name: 'quotes' }" class="my-4" prepend-icon="mdi-currency-usd"
        title="Corizaciones"></v-list-item>
      <v-list-item :to="{ name: 'catalog' }" class="my-4" prepend-icon="mdi-format-list-bulleted"
        title="Catálogo"></v-list-item>
      <v-list-item :to="{ name: 'customers' }" v-if="authStore.user?.role === 'admin'" class="my-4"
        prepend-icon="mdi-account-multiple" title="Clientes"></v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="mb-6">
        <v-btn @click="authStore.logout" variant="flat" block color="primary" size="large"
          class="text-uppercase font-weight-bold">
          <VIcon class="mr-2">
            mdi-logout
          </VIcon>
          <span>Cerrar sesión</span>
        </v-btn>

      </div>
    </template>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
button {
  font-size: $fs-sm !important;
}

.logo {
  height: 20px !important;
}

@media screen and (min-width: $md) {
  .logo {
    height: 30px !important;
  }
}

@media screen and (min-width: $lg) {
  .logo {
    height: 40px !important;
  }
}
</style>
