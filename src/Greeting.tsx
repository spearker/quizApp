import React from "react";
import { Button } from "react-native";

interface IProps{
  title: string
  onPress?: () => void
}

const Greeting: React.FunctionComponent<IProps> = ({ title, onPress }) => {
  return <Button title={title} onPress={onPress} />;
};

export default Greeting;
