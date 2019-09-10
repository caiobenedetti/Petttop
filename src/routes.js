/* eslint-disable prettier/prettier */
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';

import Home from './views/Home';
import MainDono from './views/dono/MainDono';
import MainCuidador from './views/cuidador/MainCuidador';
import LoginDono from './views/dono/LoginDono';
import './config/StatusBarConfig';

const donoNavigation = createBottomTabNavigator({
    MainDono,
});

const cuidadorNavigation = createBottomTabNavigator({
    MainCuidador,
});

const mainNavigation = createStackNavigator({
    Home,
    LoginDono,
    donoNavigation,
    cuidadorNavigation,
}, {
    headerMode:'none',
});

export default createAppContainer(mainNavigation);


