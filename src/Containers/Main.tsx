import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MenuButton from '../Component/Button/MenuButton'
import {useNavigation} from '@react-navigation/native'

const Main: React.FunctionComponent = ({navigation}: any) => {

  return (
    <View style={styles.container}>
      <MenuButton title="퀴즈 풀기" onPress={() => navigation.navigate('Question')}/>
    </View>
  );
};

export default Main;

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
