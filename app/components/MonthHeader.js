import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Config from '../config';
import { getMonthName } from '../util';
import { getMonth } from '../util/LocalStorage';

//Possible not need class
class MonthHeader extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      monthData: [],
      good: 0,
      bad: 0,
      okay: 0,
    }
  }

  componentWillMount() {
    this.calculateTotals();
  };

  componentWillReceiveProps(props) {
    this.calculateTotals();
  }

  calculateTotals = () => {
    const { month, year } = this.props;
    getMonth(month, year).then(monthData => {
      let good = 0, bad = 0, okay = 0;
      for ( day in monthData ) {
        const status = monthData[day];
        if (status === 1) good++;
        if (status === 2) okay++;
        if (status === 3) bad++;
      };
      this.setState({
        good,
        bad,
        okay,
      });
    });
  };

  renderStatCells() {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{paddingRight: 10, flexDirection: 'row'}}>
          <Icon name='square' size={20} color={Config.colors.good} />
          <Text style={[{paddingLeft: 5}, styles.statText]}>{this.state.good}</Text>
        </View>
        <View style={{paddingRight: 10, flexDirection: 'row'}}>
          <Icon name='square' size={20} color={Config.colors.ok} />
          <Text style={[{paddingLeft: 5}, styles.statText]}>{this.state.okay}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Icon name='square' size={20} color={Config.colors.bad} />
          <Text style={[{paddingLeft: 5}, styles.statText]}>{this.state.bad}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.downTextContainer}>
        <View style={styles.downTextContainerInner}>
          <View style={styles.downText}>
            <View style={styles.priceText}>
              <Text style={styles.monthText}>
                {getMonthName(this.props.month)}
              </Text>
            </View>
            <View style={styles.label}>
              {this.renderStatCells()}
            </View>                    
          </View>
        </View>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#000'
  },
  monthText: {
    fontSize: 20,
    color: '#000',
  },
  statText: {
    fontSize: 15,
    color: '#000',
  },
  textContainer: {
    backgroundColor: 'whitesmoke',
    padding: 5,
    flex: 1,
  },
  downTextContainer: {
    flex: 1,
    position: 'relative',
  },
  downTextContainerInner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  downText: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceText: {
    flexDirection: 'row',
  },
  label: {
    textAlign: 'right',
    padding: 3
  },
});

export default MonthHeader;