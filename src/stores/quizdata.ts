import { defineStore } from 'pinia'
import quizJson from '@/data/quizdata.json'

type Question = {
  options: Array<string>
  question: string
  type: string
}
type StartScreen = {
  cta_text: string
  introtext: string
  background_img: string
}

type EndScreen = {
  custom: boolean
  header: string
  text: string
  ctaurl: string
  cta_text: string
}
interface QuizData {
  questions: Question[]
  startscreen: StartScreen
  endscreen: EndScreen
  type: string
}

const quizData: QuizData = quizJson
const questionsCount = quizData.questions.length

export const useQuizDataStore = defineStore('quizData', {
  state: () => ({
    quizData,
    questionsCount,
  }),
})
