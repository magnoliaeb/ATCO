<script setup>
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";
</script>

<template>
  <VLayout ref="app" style="position: relative">
    <TheHeader />

    <VMain class="bg-grey-lighten-5">
      <VContainer class="pb-8 mt-4 pt-sm-8">
        <RouterView></RouterView>
      </VContainer>
    </VMain>

    <TheFooter />
  </VLayout>
</template>

<style scoped>
footer {
  position: absolute !important;
  bottom: 0px !important;
  width: 100% !important;
}
</style>
