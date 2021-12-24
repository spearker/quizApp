
import React from "react";
import { StyleSheet, View } from "react-native";
import RootNavigator from './src/Navigation/RootNavigator'
import {NavigationContainer} from '@react-navigation/native'

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <RootNavigator/>
      </NavigationContainer>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
