import React, { Component } from 'react';
import {Text, View, StyleSheet, FlatList, Dimensions, AsyncStorage} from 'react-native';
import Month from './Month';
import Selector from './Selector';
import CustomButton from './CustomButton';
import { saveRecord, clear, getMonth, saveItem } from '../util/LocalStorage';
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

const numColumns = 1;

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentMonth: moment().month() + 1,
      currentYear: moment().year(),
      updated: true,
      selected: {},
      loaded: false,
      selectedDay: 100,
    };
  }

  // SHOW LIST
  renderItem({ item, index }) {
    console.log('rendering month');
    return <Month
        month={item.month}
        year={item.year}
        selected={item.selected}
        selectedDay={item.selectedDay}
    />
  }

  async loadMonth(){
    let value = await getMonth(this.state.currentMonth, this.state.currentYear);
    console.log('Loaded month');
    this.setState({
      selected: value,
      loaded: true,
    })
  }

  // SHOW LIST
  formatMonth = () => [{
      key: 1,
      month: this.state.currentMonth,
      year: this.state.currentYear,
      selected: this.state.selected,
      selectedDay: this.state.selectedDay,
  }];

  async componentWillMount() {
    await this.loadMonth();
  };

  async onSelected(day, month, year, selected) {
    let value = await saveRecord(day, month, year, selected);
    this.setState({selected: value, selectedDay: day});
  };

  getStyle() {
    if (this.state.currentMonth === 2) {
      return style.febMonthContainer;
    };
    return style.monthContainer;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        { this.state.loaded &&
        <View style={{flex: 1}}>
          <View style={this.getStyle()}>
            <FlatList
              data={formatData(this.formatMonth(), numColumns)}
              style={style.flatListContainer}
              renderItem={this.renderItem}
              numColumns={numColumns}
              extraData={this.state}
              keyExtractor={item => `${item.month}-${item.year}`}
            />
            {/* <Month
              month={this.state.currentMonth}
              year={this.state.currentYear}
              style={this.getStyle()}
              selected={this.state.selected}
              /> */}
          </View>
          <Selector 
            onSelected={this.onSelected.bind(this)}
          />
          {/* {/* <CustomButton
            text="Save"
            onPress={() => saveRecord(1, 2019, 1, 3)}
            color='#baed91'
          /> */}
          <CustomButton
            text="clear"
            onPress={() => saveItem('last-selected-date', null)}
            color='#ffed91'
          />
        </View> 
      }
      </View>
    );
  }
};

// tobe home page
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 0,
  },
  febMonthContainer: {
    paddingTop: 30,
    height: Dimensions.get('window').height * 0.5,
    marginBottom: -85,
  },
  monthContainer: {
    // flex: 1,
    // paddingTop: 30,
    height: Dimensions.get('window').height * 0.5,
    marginBottom: -25,
  },
  flatListContainer: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: -55,
  }
});