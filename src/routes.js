/* eslint-disable prettier/prettier */
import {createStackNavigator, createAppContainer} from 'react-navigation';

import Home from './views/Home';

import LoginDono from './views/dono/LoginDono';
import LoginCuidador from './views/cuidador/LoginCuidador';
import DonoFooterTabs from './config/DonoFooterTabs';
import CuidadorFooterTabs from './config/CuidadorFooterTabs';
import CadastroCuidador from './views/cuidador/CadastroCuidador';
import CadastroDono from './views/dono/CadatroDono';
import CadastroPet from './views/dono/CadastroPet';
import Pedido from './views/dono/Pedido';
import './config/StatusBarConfig';

const donoNavigation = DonoFooterTabs;

const cuidadorNavigation = CuidadorFooterTabs;

const mainNavigation = createStackNavigator({
    Home,
    LoginDono,
    LoginCuidador,
    CadastroCuidador,
    CadastroPet,
    CadastroDono,
    donoNavigation,
    cuidadorNavigation,
    Pedido
}, {
    headerMode:'none',
});

export default createAppContainer(mainNavigation);


