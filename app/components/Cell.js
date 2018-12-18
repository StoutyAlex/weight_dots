import React, { Component } from 'react';
import {Text, View, StyleSheet} from 'react-native';

class Cell extends Component {
  render() {
    return (
      <View>
        <Text>Cell 1</Text>
      </View>
    )
  }
};

const styleInline = StyleSheet.create({});

export default Cell;