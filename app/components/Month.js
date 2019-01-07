import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
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
      days: this.createMonth(this.props.selected),
    };
    this.daysInMonth = moment(this.props.month, 'M').daysInMonth();
  }

  createMonth(storageDays) {
    const days = [];
    for(var i = 0; i < this.daysInMonth; i++) {
      days.push({
        day: i + 1,
        month: this.props.month,
        year: this.props.year,
        status: storageDays[`${i + 1}`],
      });
    }
    return days;
  }

  componentDidMount() {
    console.log('CDM Month');
    console.log(this.props.selected);
    getMonth(this.props.month, this.props.year).then((value) => {
      this.setState({
        days: this.createMonth(value),
      });
    });
  }

  componentWillReceiveProps(props) {
    if (this.props.selected !== props.selected) {
      this.setState({ days: this.createMonth(props.selected)});
    };
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
      <View style={style.border}>
        <MonthHeader style={{flex: 1}}month={getMonthName(this.props.month)}/>
        <FlatList 
          data={formatData(this.state.days, numColumns)}
          style={style.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
          extraData={this.state}
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