/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, StyleSheet , PermissionsAndroid  } from 'react-native';
import {Container, Header, Footer, FooterTab, Button, Body} from 'native-base';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import api from '../../services/api';
import { ScrollView } from 'react-native-gesture-handler';

export default class Pedido extends Component {
    constructor(props){
        super(props);
        this.state = {latitude: 0, longitude: 0, error: '', cuidadores: []}
    }

    async componentDidMount(){
        
    }

    render() {
        return (
            <Container style={styles.main}>
                <ScrollView>
                <Header style={styles.header}>
                    <Text style={styles.titulo}>PETTOP</Text>
                </Header>
                <Body style={styles.body}>
                </Body>
                </ScrollView>
            </Container>
        )       
    }
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:'#FFF',
    },
    header:{
        elevation: 10,
        backgroundColor:'#06469E',
        justifyContent:'center'
    },
    titulo:{
        fontFamily:'Intro',
        color:'#FFF',
        alignSelf:'center',
        fontSize:heightPercentageToDP(4),
    },
    body:{
        justifyContent:'center'
    },
    map:{
        width:widthPercentageToDP(90),
        height:heightPercentageToDP(80),
        alignSelf:'center',
    }
,});
