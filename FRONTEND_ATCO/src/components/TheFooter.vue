  <script setup>

</script>
<template>
  <v-footer color="" class="py-4" name="footer" app>
    <v-row class="align-center justify-space-between">
      <v-col cols="auto">
        <p class=" text-center text-md-start">
          Hecho con ❤️ por <a class="font-weight-bold" href="https://github.com/magnoliaeb" target="_blank">Lava
            Studio</a>
          <small class="d-inline-block ml-2">
            &copy; {{ new Date().getFullYear() }}
          </small>
        </p>
      </v-col>
    </v-row>
  </v-footer>
</template>
<style lang="scss" scoped>
a {
  color: $secondary !important;

  &:hover {
    text-decoration: underline !important;
  }
}
</style>
