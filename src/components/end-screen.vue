<script setup lang="ts">
import { useQuizDataStore } from '../stores/quizdata'
import nyc from '../assets/img/startscreen-bg.jpeg'
const quizDataStore = useQuizDataStore()
const { quizData } = quizDataStore
const backgroundImg = nyc

const redirect = () => {
  window.location.href = quizData.endscreen.ctaurl
}
</script>

<template>
  <div
    class="endscreen h-screen flex flex-col basis-full flex-wrap bg-cover bg-bottom justify-center content-center gap-y-4"
    :style="{ backgroundImage: `url(${backgroundImg})` }"
  >
    <div
      class="wrapper rounded max-w-3xl bg-black bg-opacity-40 flex flex-col flex-wrap justify-center content-center px-8 py-12 gap-y-4 text-center"
    >
      <h2 class="text-5xl font-bold text-slate-100">
        {{ quizData.endscreen.header }}
      </h2>

      <p class="text-2xl text-slate-100 py-4">
        {{ quizData.endscreen.text }}
      </p>
      <Button @click="redirect" class="btn btn-secondary max-w-xs mx-auto">
        {{ quizData.endscreen.cta_text }} &#8594;
      </Button>
    </div>
  </div>
</template>

<style scoped>
.endscreen {
  box-shadow: inset 0 0 0 2000px rgba(22, 21, 22, 0.3);
}
</style>
