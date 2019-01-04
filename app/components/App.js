import React, { Component } from 'react';
import {Text, View, StyleSheet, FlatList, Dimensions, AsyncStorage} from 'react-native';
import Month from './Month';
import Selector from './Selector';
import CustomButton from './CustomButton';
import { saveRecord, saveItem, getMonth } from '../util/LocalStorage';
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
    };
  }

  // SHOW LIST
  renderItem({ item, index }) {
    return <Month
        month={item.month}
        year={item.year}
        ref={this.monthChild}
    />
  }

  // SHOW LIST
  formatMonth = () => [{
      key: 1,
      month: this.state.currentMonth,
      year: this.state.currentYear,
  }];

  componentDidMount() {
    getMonth(this.state.currentMonth, this.state.currentYear).then( value => {
      this.setState({selected: value});
    });
  };

  onSelected(day, month, year, selected) {
    saveRecord(1, 2019, 21, 3).then((selected) => {
      this.setState({selected});
    })
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
        <View style={this.getStyle()}>
          <FlatList
            data={formatData(this.formatMonth(), numColumns)}
            style={style.flatListContainer}
            renderItem={this.renderItem}
            numColumns={numColumns}
            extraData={this.state}
          />
          {/* <Month
            month={this.state.currentMonth}
            year={this.state.currentYear}
            style={this.getStyle()}
            selected={this.state.selected}
            /> */}
        </View>
        <Selector 
          onSelected={this.onSelected}
        />
        {/* <CustomButton
          text="Save"
          onPress={() => saveRecord(1, 2019, 1, 3)}
          color='#baed91'
        />
        <CustomButton
          text="Load"
          onPress={() => saveItem('test', { 1: 'hi' })}
          color='#ffed91'
        /> */}
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