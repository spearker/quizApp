import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Main from '../Containers/Main'
import Question from '../Containers/Question'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Result from '../Containers/Result'
import {Text, TouchableOpacity, View} from 'react-native'

const Stack = createStackNavigator();

const RootNavigator: React.FunctionComponent = () => {

  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={Main} options={{title: 'QuizApp'}}/>
      <Stack.Screen name="Question" component={Question} options={({ navigation }) => ({
        title: 'Quiz',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={{margin: 8}}>
              <Text>{`< 홈으로`}</Text>
            </View>
          </TouchableOpacity>
        ),
      })}/>
      <Stack.Screen name="Result" component={Result} options={({ navigation }) => ({
        title: 'Result',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.reset({
            index: 0,
            routes: [{name: 'Main'}],
          })}>
            <View style={{margin: 8}}>
              <Text>{`< 홈으로`}</Text>
            </View>
          </TouchableOpacity>
        ),
      })}/>
    </Stack.Navigator>
  )
}

export default RootNavigator
