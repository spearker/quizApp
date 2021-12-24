import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'

interface IProps{
  testid: string
  value: string,
  answer: string,
  isChecked?: boolean
  onPress?: (result: boolean) => void
}

const AnswerButton: React.FunctionComponent<IProps> = ({testid, value, answer, isChecked, onPress }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('white')

  useEffect(() => {
    if(isChecked){
      if(value === answer){
        setBackgroundColor('green')
      }
    }else{
      setBackgroundColor('white')
    }
  }, [isChecked])

  return (
    <TouchableOpacity
      testID={testid}
      disabled={isChecked}
      onPress={() => {
        const result = value === answer
        setBackgroundColor(result ? 'green' : 'red')
        return onPress && onPress(result)
      }}
    >
      <View style={{
        ...styles.container,
        backgroundColor: backgroundColor
      }}>
        <Text style={styles.title}>{value}</Text>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 40,
    borderRadius: 20,
    backgroundColor:'white',
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    margin:8
  },
  title: {
    color: 'black',
    fontSize: 16
  }
})

export default AnswerButton;
