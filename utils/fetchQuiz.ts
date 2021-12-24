import axios, {AxiosResponse} from 'axios'

export interface quizType {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: Array<string>
}

export interface responseType {
  response_code?: number
  results:Array<quizType>
}

export const QUIZ_URL = 'https://opentdb.com/api.php?amount=10&type=multiple'

export const fetchQuiz: () => Promise<responseType> = async () => {
  try{
    return await axios.get(QUIZ_URL).then(v=>v.data)
  } catch (e) {
    return {
      results: []
    }
  }

}
