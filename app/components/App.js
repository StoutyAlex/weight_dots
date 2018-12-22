import React, { Component } from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import Month from './Month';

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  
  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  return data;
};

const numColumns = 1;

export default class App extends Component {

  renderItem({ item, index }) {
    return <Month month={item.month}/>
  }

  render() {
    return (
      <FlatList
        data={formatData(FakeData, numColumns)}
        style={style.container}
        renderItem={this.renderItem}
        numColumns={numColumns}
      />
    );
  }
};

const FakeData = [
  {
    key: 1,
    month:12,
  },
  {
    key: 2,
    month:1,
  },
  {
    key: 3,
    month:2,
  }
]

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#f5fcff',
  },
});