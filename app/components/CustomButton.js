import React from 'react';
import { TouchableHighlight, StyleSheet, Text } from 'react-native';

const CustomButton = (props) => (
  <TouchableHighlight onPress={props.onPress}
    style={[props.style, styles.button, {backgroundColor: props.color}]}
    underlayColor={props.color + 'AA'}
  >
    <Text style={styles.text}>
      {props.text}
    </Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // sort out fonts
    textAlign: 'center',
    fontSize: 24,
    fontStyle: 'normal',
    fontFamily: "Toon Around",
  }
});

export default CustomButton;