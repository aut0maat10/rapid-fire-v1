<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'

const props = defineProps({
  quizData: Object,
})
const emit = defineEmits(['submit'])

const answers = ref([]) // Array to store selected answers (true/false for each option)

// Computed property to enable/disable the submit button
const canSubmit = computed(() => answers.value.some((answer) => answer))

// Computed property to build the payload
const payload = computed(() => {
  const selectedAnswers = props.quizData?.options
    .map((option: string, index: number) => {
      if (answers.value[index]) {
        return { option, index } // Create an object with option and index
      }
      return null
    })
    .filter((item) => item !== null) // Remove null values
  return {
    question: props.quizData?.question,
    answers: selectedAnswers || [],
  }
})

// Function to handle form submission
const onSubmit = () => emit('submit', payload.value)
</script>

<template>
  <div class="base-component flex flex-col flex-wrap justify-center content-center gap-y-4">
    <h2 class="text-5xl font-bold text-center">
      {{ props.quizData?.question }}
    </h2>
    <p class="self-center">Select all that apply</p>
    <div class="options-wrapper flex flex-col flex-wrap justify-center content-center gap-y-4 my-8">
      <Label
        v-for="(option, index) in props.quizData?.options"
        :key="index"
        class="flex justify-start gap-x-4 sm:min-w-full lg:min-w-44"
      >
        <Checkbox v-model="answers[index]" :id="option" class="hidden" />
        <Button
          as="span"
          :class="{ 'bg-amber-500 text-white': answers[index], 'bg-primary': !answers[index] }"
          class="w-full text-left rounded hover:bg-amber-500"
        >
          {{ option }}
        </Button>
      </Label>
    </div>
    <Button :disabled="!canSubmit" @click="onSubmit" class="self-center"> Next Question </Button>
  </div>
</template>

<style lang="scss" scoped></style>
