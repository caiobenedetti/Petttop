/* eslint-disable prettier/prettier */
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';

import Home from './views/Home';

import MainCuidador from './views/cuidador/MainCuidador';
import LoginDono from './views/dono/LoginDono';
import LoginCuidador from './views/cuidador/LoginCuidador';
import DonoFooterTabs from './config/DonoFooterTabs';
import CuidadorFooterTabs from './config/CuidadorFooterTabs';
import CadastroCuidador from './views/cuidador/CadastroCuidador';
import CadastroDono from './views/dono/CadatroDono';
import './config/StatusBarConfig';

const donoNavigation = DonoFooterTabs;

const cuidadorNavigation = CuidadorFooterTabs;

const mainNavigation = createStackNavigator({
    Home,
    LoginDono,
    LoginCuidador,
    CadastroCuidador,
    CadastroDono,
    donoNavigation,
    cuidadorNavigation,
}, {
    headerMode:'none',
});

export default createAppContainer(mainNavigation);


