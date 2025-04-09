<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
const props = defineProps({
  quizData: Object,
})
const emit = defineEmits(['submit'])

const answer: Ref<Answer> = ref({})
// methods
const canSubmit = computed(() => {
  return Object.keys(answer.value).length !== 0
})
const onSubmit = () => {
  emit('submit', answer.value)
}
const isSelected = (index: number) => {
  return index === answer.value['index']
}

interface Answer {
  index?: number
  option?: string
  question?: string
}
</script>

<template>
  <div class="base-component flex flex-col flex-wrap justify-center content-center gap-y-4">
    <h2 class="text-5xl font-bold text-center">
      {{ props.quizData?.question }}
    </h2>
    <div class="options-wrapper flex flex-col flex-wrap justify-center content-center gap-y-4 my-8">
      <RadioGroup :modelValue="answer" @update:modelValue="(val) => (answer = val)">
        <Label
          v-for="(option, index) in props.quizData?.options"
          :key="index"
          :for="option"
          class="flex justify-start gap-x-4 sm:min-w-full bg-primary text-secondary lg:min-w-44 px-4 py-3 rounded hover:bg-amber-500 cursor-pointer"
          :class="{ [`bg-amber-500`]: isSelected(index) }"
        >
          <RadioGroupItem
            class=""
            :id="option"
            :value="{
              option: option,
              index: index,
              question: props.quizData?.question,
            }"
          />
          <span>{{ option }}</span>
        </Label>
      </RadioGroup>
    </div>
    <Button :disabled="!canSubmit" @click="onSubmit" class="btn btn-secondary self-center">
      Next Question
    </Button>
  </div>
</template>

<style scoped></style>
