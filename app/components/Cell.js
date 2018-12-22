import React, { Component } from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';

class Cell extends Component {
  render() {
    const getStyle = () => {
      if (!this.props.day) return style.emptyCell;
      return style.cell
      // one line this
    };

    return (
      <View style={getStyle()}>
        <Text>{this.props.day}</Text>
      </View>
    )
  }
};

const style = StyleSheet.create({
  cell: {
    backgroundColor: '#f00', 
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 3,
    height: (Dimensions.get('window').width / 7 ) - 7
  },
  emptyCell: {
    backgroundColor: 'transparent', 
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 3,
    height: (Dimensions.get('window').width / 7 ) - 7
  },
});

export default Cell;