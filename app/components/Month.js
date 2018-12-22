import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import Cell from './Cell';
import moment from 'moment';

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  
  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  return data;
};

const numColumns = 7;

class Month extends React.Component {
  constructor(props){
    super(props)
    this.daysInMonth = moment(this.props.month, 'M').daysInMonth();
    this.days = this.createMonth();
  }

  createMonth() {
    const days = [];
    for(var i = 0; i < this.daysInMonth; i++) {
      days.push({
        day: i+1,
        status: 0
      });
    }
    return days;
  }

  renderItem({ item, index }) {
    return <Cell 
      day={item.day}
      status={item.status}
    />
  };

  render() {
    return (
      <View>
        <Text>{this.props.month}  {this.daysInMonth}</Text>
        <FlatList 
          data={formatData(this.days, numColumns)}
          style={style.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
      />
    </View>
    );
  }
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    margin: 'auto'
  }
})

const FakeData = [
  {
    key: 1,
    day: 1,
    status: 1,
  },
  {
    key: 2,
    day: 2,
    status: 2,
  },
  {
    key: 3,
    day: 3,
    status: 1,
  }
];

export default Month;