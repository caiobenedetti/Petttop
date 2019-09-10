import {createAppContainer, createBottomTabNavigator} from 'react-navigation';
import App from './App';
import AppCopy from './App copy';

const bottomNavigator = createBottomTabNavigator({
  Home: App,
  Copy: AppCopy,
});

const AppContainer = createAppContainer(bottomNavigator);

module.exports = AppContainer;
