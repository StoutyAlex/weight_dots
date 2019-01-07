import React, { Component } from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import Config from '../config';

class Cell extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: (this.props.status ? true : false),
      status: this.props.status,
    };
  }

  render() {
    const getStyle = () => {
      if (!this.props.day) return style.emptyCell;
      if (Config.cell.shape === "SQUARE") return style.cellSquare;
      return style.cellSphere;
    };

    const isCurrentDay = () => {
      if (!this.props.currentDay && !this.state.selected) return null;
      return style.currentDay;
    };

    const getSelectedColor = () => {
      if (this.props.status === 1) return style.goodDay;
      if (this.props.status === 2) return style.okDay;
      if (this.props.status === 3) return style.badDay;
    };

    return (
      <View style={[getStyle(), isCurrentDay(), getSelectedColor()]}>
        <Text style={style.text}>{this.props.day}</Text>
      </View>
    )
  }
};

const style = StyleSheet.create({
  currentDay: {
    backgroundColor: Config.colors.current
  },
  goodDay: {
    backgroundColor: Config.colors.good
  },
  badDay: {
    backgroundColor: Config.colors.bad
  },
  okDay: {
    backgroundColor: Config.colors.ok
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