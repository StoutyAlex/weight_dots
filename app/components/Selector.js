import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import CustomButton from './CustomButton';
import TimerCountdown from 'react-native-timer-countdown';
import moment from 'moment';

const mockStorage = {
  hasSelected: true,
  lastSelectedDate: {
    day: 30,
    month: 12,
    year: 2019,
  },
};

class Selector extends React.Component {

  renderButtons() {
    return (
      <View>
        <Text style={{width: '100%', textAlign: 'center', fontSize: 20, color: '#000', paddingBottom: 5}}>
            How is your day going?
        </Text>
        <View style={styles.container}>
          <CustomButton
            text="Good"
            onPress={() => {}}
            color='#baed91'
            style={styles.cellPadding}
          />
          <CustomButton
            text="Okay"
            onPress={() => {}}
            color='#f8b88b'
            style={styles.cellPadding}
          />
          <CustomButton
            text="Bad"
            onPress={() => {}}
            color='#fea3aa'
            style={styles.cellPadding}
          />
        </View>
      </View>
    );
  }

  timeTillNextSelect() {  // prep for counting to 21
    let currentTime = moment().hour(21);
  }

  renderCountDown() {
    return (
      <View>
        <Text style={{width: '100%', textAlign: 'center', fontSize: 20, color: '#000', paddingBottom: 5}}>
            Please come back in: {moment().hour(21).minute(0).second(0).unix()}
        </Text>
        <View style={styles.timeContainer}>
          <TimerCountdown
            initialSecondsRemaining={100000*60}
            style={{ fontSize: 70 }}
          />
        </View>
      </View>
    )
  }

  canSelect() {
    return true;
  }

  renderBody() {
    if (this.canSelect() === false) {
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