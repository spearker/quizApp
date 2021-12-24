import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from "react-native";
import MenuButton from '../Component/Button/MenuButton'
import {fetchQuiz, responseType} from '../../utils/fetchQuiz'
import {AxiosResponse} from 'axios'
import AnswerButton from '../Component/Button/AnswerButton'
import {shuffleArray} from '../../utils/shuffleArray'
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment, {Moment} from 'moment'

interface QuizType {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: Array<string>
}

interface QuizResultType {
  correct: number,
  incorrect: number
  startTime: Moment
}

const Question: React.FunctionComponent = ({navigation}: any) => {
  const [quiz, setQuiz] = useState<Array<QuizType>>([{
    category: '',
    type: '',
    difficulty: '',
    question: '',
    correct_answer: '',
    incorrect_answers: ['','','']
  }])
  const [answers, setAnswers] = useState<string[]>(['','','',''])
  const [index, setIndex] = useState<number>(0)
  const [result, setResult] = useState<string>('')

  const [quizResult, setQuizResult] = useState<QuizResultType>({
    correct: 0,
    incorrect: 0,
    startTime: moment()
  })

  useEffect(() => {
    getQuizzes()
    return () => setIndex(-1)
  }, [])

  useEffect(() => {
    if(quiz){
      let tmpAnswers = []
      tmpAnswers.push(...quiz[index].incorrect_answers)
      tmpAnswers.push(quiz[index].correct_answer)

      setAnswers([...shuffleArray(tmpAnswers)])
    }
  }, [index, quiz])

  const getQuizzes = async () => {
    const quizzes: responseType = await fetchQuiz()

    if(quizzes){
      setQuiz([...quizzes.results])
    }
  }

  const onPressAnswerButton = (result: boolean) => {
    if(result) {
      setQuizResult({
        ...quizResult,
        correct: quizResult.correct+1,
      })
    }else{
      setQuizResult({
        ...quizResult,
        incorrect: quizResult.incorrect+1,
      })
    }
    setResult(result ? '정답!' : '오답...')
  }

  return (
    <View style={styles.container}>
      {
        index !== -1 && (
          <View style={styles.questionContainer}>
            <View testID="results">
              <Text>{result}</Text>
            </View>
            <Text testID="quizTitle" style={styles.textBox}>Q{index+1}. {quiz[index].question}</Text>
            {
              answers.map((v, i) =>{
                return <AnswerButton
                  key={`answer_button_${i}`}
                  testid={`answer_button_${i}`}
                  value={answers[i]}
                  answer={quiz[index].correct_answer}
                  onPress={onPressAnswerButton}
                  isChecked={!!result}
                />
              })
            }
          </View>
        )
      }
      <View>
        {
          result ? <MenuButton title={index !== 9 ? "다음 문항" : "종료"} onPress={() => {
            if(index !== 9){
              setResult('')
              setIndex(index+1)
            }else{
              let time = moment.duration(moment().diff(quizResult.startTime)).asSeconds()

              let pad = (num: number, size: number) => { return ('000' + num).slice(size * -1); }

              let hours = Math.floor(time / 60 / 60)
              let minutes = Math.floor(time / 60) % 60
              let seconds = Math.floor(time - minutes * 60)

              AsyncStorage.setItem('correct', quizResult.correct.toString())
              AsyncStorage.setItem('incorrect', quizResult.incorrect.toString())
              AsyncStorage.setItem('times',  pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2))
              navigation.navigate('Result')
            }
          }}/> : undefined
        }
      </View>
    </View>
  );
}

export default Question;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
  },
  textBox: {
    marginBottom: 15,
  },
  questionContainer: {
    width: 320,
    height: 320,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextContainer: {
    width: '100%',
    justifyContent: 'flex-end'
  }
});
