import React, { Component } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Cell from './Cell';
import Row from './Row';

export default class App extends Component {
  render() {
    return (
      <View style={style.container}>
        <Row />
      </View>
    );
  }
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});