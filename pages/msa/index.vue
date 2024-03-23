<script setup lang="ts">
import RegistrationForm from "./registrationForm.vue";
</script>

<template>
  <Head><Title> I Mistrzostwa Śląska Amatorów </Title></Head>
  <div
    class="bg-blue-100 min-h-screen bg-gradient-to-tr from-blue-100-0 to-black-200"
  >
    <main
      class="grid lg:grid-cols-2 grid-cols-1 content-center m-auto max-w-[80em]"
    >
      <div class="lg:col-span-2">
        <img class="w-[100vw] p-10" src="/img/ams-title.svg" />
      </div>
      <div class="col-span-2 lg:col-span-1 mb-4">
        <img class="z-0 object-contain" src="/img/ams-map.png" alt="#" />
      </div>
      <div class="col-span-2 lg:col-span-1">
        <registration-form class="mx-8" />
      </div>
    </main>
  </div>
</template>

<style scoped>
:host {
}
</style>
