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
    return <Month
        month={item.month}
        year={item.year}
      />
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
    year:2018
  },
  {
    key: 2,
    month:1,
    year:2019,
  },
  {
    key: 3,
    month:2,
    year:2019,
  },
  {
    key: 4,
    month:3,
    year:2019,
  },
  {
    key: 5,
    month:4,
    year:2019,
  },
  {
    key: 6,
    month:5,
    year:2019,
  },
  {
    key: 7,
    month:6,
    year:2019,
  }
]

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
  },
});