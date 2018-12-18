import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Cell from './Cell';

class Row extends Component {
  render() {
    return (
      <View style={style.container}>
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </View>
    )
  } 
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default Row;