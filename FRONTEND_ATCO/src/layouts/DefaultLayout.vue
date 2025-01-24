<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <VLayout ref="app" style="position: relative">
    <VMain class="bg-grey-lighten-3 d-flex align-center justify-center ">
      <VRow class="fill-height">
        <VCol cols="12" md="7" lg="8" class="bg-grey-darken-4 order-1 order-md-0">
          <img src="" alt="">
        </VCol>
        <VCol cols="12" md="5" lg="4" class="d-flex align-center justify-center order-0 order-md-1">
          <div class="flex-grow-1">
            <VContainer>
              <RouterView></RouterView>
            </VContainer>

          </div>

        </VCol>
      </VRow>
    </VMain>

  </VLayout>
</template>

<style lang="scss" scoped>
@media screen and (min-width: $md) {
  main {
    height: 100vh;
  }
}
</style>
