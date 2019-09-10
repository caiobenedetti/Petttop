/* eslint-disable prettier/prettier */
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';

import Home from './views/Home';
import MainDono from './views/dono/MainDono';
import MainCuidador from './views/cuidador/MainCuidador';
import LoginDono from './views/dono/LoginDono';
import LoginCuidador from './views/cuidador/LoginCuidador';
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
    LoginCuidador,
    donoNavigation,
    cuidadorNavigation,
}, {
    headerMode:'none',
});

export default createAppContainer(mainNavigation);


