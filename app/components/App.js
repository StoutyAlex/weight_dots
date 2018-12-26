import React, { Component } from 'react';
import {Text, View, StyleSheet, FlatList, Dimensions} from 'react-native';
import Month from './Month';
import Selector from './Selector';

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
      <View style={style.container}>
        <View style={style.monthContainer}>
          <FlatList
            data={formatData(FakeData, numColumns)}
            style={style.monthContainer}
            renderItem={this.renderItem}
            numColumns={numColumns}
          />
        </View>
        <Selector />
      </View>
    );
  }
};

const FakeData = [
  {
    key: 1,
    month:12,
    year:2018
  }, // Working on the home page
  // {
  //   key: 2,
  //   month:1,
  //   year:2019,
  // }
]
// tobe home page
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
  },
  monthContainer: {
    // flex: 1,
    height: Dimensions.get('window').height * 0.5,
    marginBottom: -25,
  },
});