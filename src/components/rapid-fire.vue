<script setup lang="ts">
// import MultiSelect from './multi-select.vue'
// import StandardQuestion from './standard-question.vue'
import StartScreen from './start-screen.vue'
import EndScreen from './end-screen.vue'
import EndScreenCustom from './end-screen-custom.vue'
import EmailPrompt from './email-prompt.vue'
import { useCounterStore } from '@/stores/counter'
import { useAnswersStore } from '@/stores/answers'
import { storeToRefs } from 'pinia'
import { onMounted, ref, defineAsyncComponent, computed } from 'vue'
import { useQuizDataStore } from '@/stores/quizdata'
const quizStarted = ref(false)
const quizCompleted = ref(false)
const userDataSubmitted = ref(false)
const { quizData, questionsCount } = storeToRefs(useQuizDataStore())
const counterStore = useCounterStore()
const answersStore = useAnswersStore()
const asyncComponents = {
  'standard-question': defineAsyncComponent(() => import('./standard-question.vue')),
  'multi-select': defineAsyncComponent(() => import('./multi-select.vue')),
}
const componentToRender = computed<keyof typeof asyncComponents>(() => {
  return quizData.value.questions[counterStore.count].type as keyof typeof asyncComponents
})
const currentComponent = computed(() => {
  return asyncComponents[componentToRender.value]
})
// methods
const submitHandler = (submission: any) => {
  answersStore.submitAnswer(submission)
  counterStore.increment()
  if (counterStore.count === questionsCount.value) {
    quizCompleted.value = true
  }
}
const userDataSubmitHandler = (submission: any) => {
  answersStore.submitAnswer(submission)
  userDataSubmitted.value = true
}
const startHandler = () => {
  quizStarted.value = true
}
onMounted(() => {
  quizStarted.value = false
})
</script>
<template>
  <div class="container">
    <StartScreen v-if="!quizStarted" @quizStarted="startHandler" />
    <KeepAlive>
      <component
        v-if="quizStarted && !quizCompleted"
        :key="quizData.questions[counterStore.count]"
        :is="currentComponent"
        :quizData="quizData.questions[counterStore.count]"
        @submit="submitHandler"
      />
    </KeepAlive>
    <EmailPrompt
      @userDataSubmit="userDataSubmitHandler"
      v-if="quizCompleted && !userDataSubmitted"
    />
    <EndScreenCustom
      v-if="userDataSubmitted && quizData.endscreen.custom"
      :quizData
      :userAnswers="answersStore.answer"
    >
    </EndScreenCustom>
    <EndScreen v-if="userDataSubmitted && !quizData.endscreen.custom" />
  </div>
</template>

<style scoped></style>
