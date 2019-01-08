import React from 'react';
import { View, Text, Button, StyleSheet, TimePickerAndroid, Picker } from 'react-native';
import SettingsList from 'react-native-settings-list';
import Icon from 'react-native-vector-icons/FontAwesome';
import { loadItem, saveItem } from '../util/LocalStorage';
import Config from '../config';
import { min } from 'moment';

class Settings extends React.Component {
  constructor(){
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      switchValue: false,
      dailyLogTime: {
        hour: Config.defaultLogTime.hour,
        minute: Config.defaultLogTime.minute,
      },
    };
  }

  componentWillMount() {
    loadItem('daily-log-time').then(time => {
      if (time) {
        this.setState({
          dailyLogTime: {
            hour: time.hour,
            minute: (time.minute >= 10 ? time.minute : `0${time.minute}`),
          }
        })
      }
    })
  };

  saveTime = (hour, minute) => {
    saveItem('daily-log-time', {hour, minute}).then(time => this.setState({
      dailyLogTime: {
        hour: time.hour,
        minute: (time.minute >= 10 ? time.minute : `0${time.minute}`),
      },
    }));
  } 

  createIcon = (iconName, color) => (
    <View style={styles.iconView}>
      <Icon name={iconName} size={40} color={color} />
    </View>
  )

  openTimePicker = async () => {
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        console.log(`${hour} ${minute}`)
        this.saveTime(hour, minute);
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
  };

  getDailyLogElement = () => (
    <SettingsList.Item
      icon={this.createIcon('clock-o', 'black')}
      itemWidth={50}
      title='Daily Log Time'
      titleInfo={`${this.state.dailyLogTime.hour}:${this.state.dailyLogTime.minute}`}
      titleStyle={{color: 'black', fontSize: 18}}
      titleInfoStyle={{color: 'black', fontSize: 20}}
      onPress={() => this.openTimePicker()}
    />
  )

  // Implement mobx stores

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <SettingsList>
            <SettingsList.Header headerText='General Settings' headerStyle={styles.headerStyle}/>
            {this.getDailyLogElement()}
            {/* <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.switchValue}
              switchOnValueChange={this.onValueChange}
              hasSwitch={true}
              title='Switch Example'/>


            <SettingsList.Header headerText='Different Grouping' headerStyle={{color:'white', marginTop:50}}/>
            <SettingsList.Item titleInfo='Some Information' hasNavArrow={false} title='Information Example'/>
            <SettingsList.Item title='Settings 1'/> */}
          </SettingsList>
        </View>
      </View>
    );
  }

  onValueChange(value){
    this.setState({switchValue: value});
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    marginTop:0,
  },
  iconView: {
    alignSelf: 'center',
    marginLeft: 10
  },
  headerStyle: {
    color: '#444',
    fontWeight: 'bold',
    fontSize: 20,
  }
});

export default Settings;