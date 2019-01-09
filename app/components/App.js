import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Homepage from '../pages/Homepage';
import Settings from '../pages/Settings';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Homepage,
    navigationOptions: {
      header: null,
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
        header: null,
    }
  },
});

export default class App extends React.Component {
  render() {
    return <AppNavigator />
  }
}
