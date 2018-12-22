import React, { Component } from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import Config from '../config';

class Cell extends Component {
  render() {
    const getStyle = () => {
      if (!this.props.day) return style.emptyCell;
      if (Config.cell.shape === "SQUARE") return style.cellSquare;
      return style.cellSphere;
    };

    const isCurrentDay = () => {
      if (!this.props.currentDay) return null;
      return style.currentDay;
    };

    return (
      <View style={[getStyle(), isCurrentDay()]}>
        <Text style={style.text}>{this.props.day}</Text>
      </View>
    )
  }
};

const style = StyleSheet.create({
  currentDay: {
    backgroundColor: '#ffff00'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 24 + (Config.numColumns % 7),
  },
  cellSphere: {
    backgroundColor: '#f00', 
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 3,
    borderRadius: ((Dimensions.get('window').width / Config.numColumns ) - Config.numColumns ) / 2,
    backgroundColor: 'red',
    height: (Dimensions.get('window').width / Config.numColumns ) - Config.numColumns,
    width: (Dimensions.get('window').width / Config.numColumns ) - Config.numColumns
  },
  cellSquare: {
    backgroundColor: '#f00', 
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 3,
    borderRadius: Dimensions.get('window').width / 25,
    backgroundColor: 'red',
    height: (Dimensions.get('window').width / Config.numColumns ) - Config.numColumns
  },
  emptyCell: {
    backgroundColor: 'transparent', 
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 3,
    height: (Dimensions.get('window').width / Config.numColumns ) - Config.numColumns
  },
});

export default Cell;