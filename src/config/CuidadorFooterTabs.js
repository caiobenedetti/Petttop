/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import Icon from 'react-native-ionicons';
import MainCuidador from '../views/cuidador/MainCuidador';
import PerfilCuidador from '../views/cuidador/PerfilCuidador';
import {createBottomTabNavigator } from 'react-navigation';


export default cuidadorNavigation = createBottomTabNavigator({
    Home:{
        screen: MainCuidador,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => {
                return <Icon name="home" size={30} color={tintColor}/>
            }  
        },
    },
    Perfil:{
        screen: PerfilCuidador,
        navigationOptions:{
            tabBarIcon: ({ tintColor }) => {
                return <Icon name="person" size={30} color={tintColor}/>
            }
        },
    }, 
}, {
    order:['Perfil', 'Home'],
    tabBarOptions:{
        showIcon:true,
        activeTintColor:'#FFF',
        inactiveTintColor:'#FF8A00',
        activeBackgroundColor:'#FF8A00',
        inactiveBackgroundColor:'#FFF',
    }
});