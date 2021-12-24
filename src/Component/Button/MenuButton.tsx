import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'

interface IProps{
  title: string
  onPress?: () => void
}

const MenuButton: React.FunctionComponent<IProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  )


  // <Button
  //   title={title}
  //   onPress={onPress}
  //   color={'#00c896'}
  // />;
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 20,
    backgroundColor:'#00c896',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    color: 'white',
    fontSize: 16
  }
})

export default MenuButton;
