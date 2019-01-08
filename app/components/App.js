import { createStackNavigator, createAppContainer } from 'react-navigation';
import Homepage from '../pages/Homepage';
import Settings from '../pages/Settings';

const App = createStackNavigator({
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

export default createAppContainer(App);