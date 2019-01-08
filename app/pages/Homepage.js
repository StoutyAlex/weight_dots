import React from 'react';
import {Text, View, StyleSheet, FlatList, Dimensions, AsyncStorage} from 'react-native';
import Month from '../components/Month';
import Selector from '../components/Selector';
import CustomButton from '../components/CustomButton';
import { formatData } from '../util';
import { saveRecord, clear, getMonth, saveItem } from '../util/LocalStorage';
import moment from 'moment';
import Config from '../config';

class Homepage extends React.Component {
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
  };

  async loadMonth() {
    let value = await getMonth(this.state.currentMonth, this.state.currentYear);
    this.setState({
      selected: value,
      loaded: true,
    })
  }

  renderItem({ item, index }) {
    return <Month
        month={item.month}
        year={item.year}
        selected={item.selected}
        selectedDay={item.selectedDay}
    />
  };

  formatMonth() {
    return [{
      key: 1,
      month: this.state.currentMonth,
      year: this.state.currentYear,
      selected: this.state.selected,
      selectedDay: this.state.selectedDay,
    }];
  }

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
              data={formatData(this.formatMonth(), 1)}
              style={style.flatListContainer}
              renderItem={this.renderItem}
              numColumns={1}
              extraData={this.state}
              keyExtractor={item => `${item.month}-${item.year}`}
            />

          </View>
          <Selector 
            onSelected={this.onSelected.bind(this)}
          />
            <CustomButton
              text="nav"
              onPress={() => saveItem('last-selected-date', null)}
              color='#ffed91'
            />
            <CustomButton
              text="navigate"
              onPress={() => this.props.navigation.navigate('Settings')}
              color='#ffed91'
            />
          </View>
      }
      </View>
    );
  };
};

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

export default Homepage;