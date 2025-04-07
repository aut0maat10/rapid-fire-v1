import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAnswersStore = defineStore('answers', () => {
  const answer = ref([])

  function submitAnswer(data: string[] = []) {
    answer.value.push(data)
  }

  return { answer, submitAnswer }
})
