import React from 'react';
import {View, StyleSheet, FlatList, Text, ListView} from 'react-native';
import Cell from './Cell';
import moment from 'moment';
import Config from '../config';
import {formatData, getMonthName} from '../util'; 
import MonthHeader from './MonthHeader';
import { getMonth } from '../util/LocalStorage';

const numColumns = Config.numColumns;

class Month extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      days: this.setData(this.props.selected, 99),
      update: 0,
      selectedDay: this.props.selectedDay,
    };
    this.daysInMonth = moment(this.props.month, 'M').daysInMonth();
  }

  setData(selectedDays, selectedDay){
    this.createdMonth = this.createMonth(selectedDays, selectedDay);
    return formatData(this.createdMonth, numColumns);
  }

  createMonth(storageDays, selectedDay) {
    const days = [];
    for(var i = 0; i < this.daysInMonth; i++) {
      if (i === selectedDay) {
        days.push([{
          day: i + 1,
          month: this.props.month,
          year: this.props.year,
          status: storageDays[`${i + 1}`], 
        }]);
      } else {
      days.push({
        day: i + 1,
        month: this.props.month,
        year: this.props.year,
        status: storageDays[`${i + 1}`],
      });
      }
    }
    return days;
  }

  findChangedDay(newSelected){

  }

  componentDidMount() {
    getMonth(this.props.month, this.props.year).then((value) => {
      const tempDays = this.setData(value, 99);
      this.setState({
        days: tempDays,
      });
    });
  }

  componentWillReceiveProps(props) {
    if (this.props.selected !== props.selected) {
      const tempDays = this.setData(props.selected, props.selectedDay);
      this.setState({
        days: tempDays,
        update: this.state.update + 1,
      });
    };
  }

  renderItem({ item, index }) {
    const date = moment().get('date');
    const month = moment().get('month') + 1;
    const year = moment().get('year');
    let currentDay = false; 
    
    if (item instanceof Array) {
      item = item[0];
    }

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
      <View style={style.border}>
        <MonthHeader
          style={{flex: 1}} 
          month={this.props.month}
          year={this.props.year}
        />
          <FlatList 
            data={this.state.days}
            style={style.container}
            renderItem={this.renderItem}
            numColumns={numColumns}
            extraData={this.state.days}
            keyExtractor={item => `${item.day}-${item.month}`}
          />
    </View>
    );
  }
};

const style = StyleSheet.create({
  container: {
    // flex: 1,
    margin: 'auto',
    paddingBottom: 10,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: '#000',
    marginLeft: 5,
    marginRight: 5,
  }
})

export default Month;