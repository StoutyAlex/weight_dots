import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import Cell from './Cell';
import moment from 'moment';
import Config from '../config';
import {formatData, getMonthName} from '../util'; 
import MonthHeader from './MonthHeader';

const numColumns = Config.numColumns;

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
        day: i + 1,
        month: this.props.month,
        year: this.props.year,
        status: 0
      });
    }
    return days;
  }

  renderItem({ item, index }) {
    const date = moment().get('date');
    const month = moment().get('month') + 1;
    const year = moment().get('year');
    let currentDay = false;

    if(date === item.day && item.month === month && item.year === year)
      currentDay = true;

    return <Cell 
      day={item.day}
      status={item.status}
      currentDay={currentDay}
    />
  }

  render() {
    return (
      <View>
        <MonthHeader style={{flex: 1}}month={getMonthName(this.props.month)}/>
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

export default Month;