import React, { Component } from 'react';
import {Text, View, StyleSheet} from 'react-native';

class Cell extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Cell 1</Text>
      </View>
    )
  }
};

export default Cell;