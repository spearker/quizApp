import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from "react-native";
import MenuButton from '../Component/Button/MenuButton'
import {useNavigation} from '@react-navigation/native'
import moment, {Moment} from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface QuizResultType {
  correct: string,
  incorrect: string
  time: string
}

const Result: React.FunctionComponent = ({navigation}: any) => {
  const [quizResult, setQuizResult] = useState<QuizResultType>({
    correct: '',
    incorrect: '',
    time: ''
  })

  useEffect(() => {
    getAsyncStorage()
  }, [])

  const getAsyncStorage = async () => {
    let correct = await AsyncStorage.getItem('correct')
    let incorrect = await AsyncStorage.getItem('incorrect')
    let time = await AsyncStorage.getItem('times')
    setQuizResult({
      correct: correct ?? '',
      incorrect: incorrect ?? '',
      time: time ?? ''
    })
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>정답     : {`${quizResult.correct}`}</Text>
        <Text>오답     : {`${quizResult.incorrect}`}</Text>
        <Text>걸린 시간 : {`${quizResult.time}`}</Text>
      </View>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  textBox: {
    marginBottom: 15,
  },
});
