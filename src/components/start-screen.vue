<template>
  <main
    v-if="startScreenData.layout === 'background-image'"
    class="startscreen h-full flex flex-col justify-center items-center bg-cover bg-center gap-y-6"
    :style="{ backgroundImage: `url(${backgroundImg})` }"
  >
    <div class="text-center">
      <h2 class="text-5xl font-bold text-muted-foreground mb-4">
        {{ startScreenData.introtext }}
      </h2>
    </div>
    <Button @click="startQuiz" class="mx-auto"> {{ startScreenData.cta_text }} &#8594; </Button>
  </main>

  <main
    v-else-if="startScreenData.layout === 'two-panel'"
    class="w-full startscreen h-screen flex flex-row items-center justify-center gap-x-8 p-8 bg-gray-100"
  >
    <div class="text-panel flex-1 text-left">
      <h2 class="text-5xl font-bold text-muted-foreground mb-6">
        {{ startScreenData.introtext }}
      </h2>
      <Button
        @click="startQuiz"
        class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
      >
        {{ startScreenData.cta_text }} &#8594;
      </Button>
    </div>
    <div class="image-panel flex-1">
      <img
        :src="backgroundImg"
        alt="Panel Image"
        class="w-full h-auto object-cover rounded-lg shadow-lg"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { Button } from './ui/button'
import backgroundImg from '@/assets/img/startscreen-bg.jpeg'
import { useQuizDataStore } from '@/stores/quizdata'

const quizDataStore = useQuizDataStore()
const startScreenData = quizDataStore.quizData.startscreen

const startQuiz = () => {
  emit('quizStarted')
}

const emit = defineEmits(['quizStarted'])
</script>

<style scoped>
/* Additional styles for custom tweaks */
/* main {
  background-position: 50% 45%;
  box-shadow: inset 0 0 0 2000px rgba(22, 21, 22, 0.3);
} */
</style>
