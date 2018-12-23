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
    backgroundColor: Config.colors.current
  },
  text: {
    fontWeight: 'bold',
    fontSize: 22 + (Config.numColumns % Config.maxColumns),
  },
  cellSphere: {
    backgroundColor: Config.colors.unset,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 3,
    borderRadius: ((Dimensions.get('window').width / Config.numColumns ) - Config.numColumns ) / 2,
    height: (Dimensions.get('window').width / Config.numColumns ) - Config.numColumns,
    width: (Dimensions.get('window').width / Config.numColumns ) - Config.numColumns
  },
  cellSquare: {
    backgroundColor: Config.colors.unset, 
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 3,
    borderRadius: Dimensions.get('window').width / 25,
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