import React, { Component } from 'react';
import Icon from 'react-native-ionicons';
import MainDono from '../views/dono/MainDono';
import PerfilDono from '../views/dono/PerfilDono';
import {createBottomTabNavigator } from 'react-navigation'

export default donoNavigation = createBottomTabNavigator({
    Home:{
        screen: MainDono,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => {
                return <Icon name="home" size={30} color={tintColor}/>
            }  
        },
    },
    Perfil:{
        screen: PerfilDono,
        navigationOptions:{
            tabBarIcon: ({ tintColor }) => {
                return <Icon name="person" size={30} color={tintColor}/>
            }
        },
    }, 
}, {
    tabBarOptions:{
        showIcon:true,
        order:['Perfil', 'Home'],
        activeTintColor:'#FFF',
        inactiveTintColor:'#06469E',
        activeBackgroundColor:'#06469E',
        inactiveBackgroundColor:'#FFF',
    }
});