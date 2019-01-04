import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import CustomButton from './CustomButton';
import TimerCountdown from 'react-native-timer-countdown';
import moment from 'moment';

const mockStorage = {
  hasSelected: true,
  lastSelectedDate: {
    day: 2,
    month: 1,
    year: 2019,
  },
};

class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mockStorage : {
        hasSelected: true,
        lastSelectedDate: {
          day: 2,
          month: 1,
          year: 2019,
        },
    }};
  }

  renderButtons() {
    return (
      <View>
        <Text style={{width: '100%', textAlign: 'center', fontSize: 20, color: '#000', paddingBottom: 5}}>
            How is your day going?
        </Text>
        <View style={styles.container}>
          <CustomButton
            text="Good"
            onPress={() => this.handleSelection('good')}
            color='#baed91'
            style={styles.cellPadding}
          />
          <CustomButton
            text="Okay"
            onPress={() => this.handleSelection('okay')}
            color='#f8b88b'
            style={styles.cellPadding}
          />
          <CustomButton
            text="Bad"
            onPress={() => this.handleSelection('bad')}
            color='#fea3aa'
            style={styles.cellPadding}
          />
        </View>
      </View>
    );
  }

  handleSelection(selection) {
    this.setState({
      mockStorage: {
        hasSelected: true,
        lastSelectedDate: {
          day: moment().date(),
          month: moment().month() + 1,
          year: moment().year(),
        },
      }}
    );
  }

  timeTillNextSelect() {
    let currentTime = moment();
    const yesterday = moment().subtract(1, 'days');
    const prev = this.state.mockStorage.lastSelectedDate;
    let countTo = 0;

    if (currentTime.date() === prev.day && currentTime.month() + 1 === prev.month && currentTime.year() === prev.year){
      const tomorrow = moment().add({days: 1});
      countTo = tomorrow.hour(21).minute(0).second(0).unix()
    } else if (yesterday.date() == prev.day && yesterday.month() + 1 === prev.month && yesterday.year() === prev.year){
      countTo = moment().hour(21).minute(0).second(0).unix();
    }
    return countTo - currentTime.unix();
  }

  renderCountDown() {
    return (
      <View>
        <Text style={{width: '100%', textAlign: 'center', fontSize: 20, color: '#000', paddingBottom: 5}}>
            Please come back in:
        </Text>
        <View style={styles.timeContainer}>
          <TimerCountdown
            initialSecondsRemaining={this.timeTillNextSelect()*1000}
            style={{ fontSize: 70 }}
            interval={1000}
          />
        </View>
      </View>
    )
  }

  canSelect() {
    console.log("Can select: " + this.timeTillNextSelect());
    if (this.timeTillNextSelect() <= 0)
      return true;
    return false;
  }

  renderBody() {
    if (this.canSelect()) {
      return this.renderButtons();
    } else {
      return this.renderCountDown();
    }
  }

  render() {
    return (
      <View style={styles.bottomBorder}>
        {this.renderBody()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 90,
    paddingBottom: 10,
  },
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    paddingBottom: 10,
  },
  cellPadding: {
    flex: 1,
    marginTop: 4,
    marginRight: 10,
    borderRadius: Dimensions.get('window').width / 25,
  },
  cellNoPadding: {
    marginTop: 4,
    flex: 1,
    borderRadius: Dimensions.get('window').width / 25,
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderColor: '#000',
    marginLeft: 5,
    marginRight: 5,
  }
});

export default Selector;