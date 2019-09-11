import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Container, Header, Footer, FooterTab, Button} from 'native-base';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';

export default class MainDono extends Component {
    render() {
        return (
            <Container style={styles.main}>
                <Header style={styles.header}>
                    <Text style={styles.titulo}>PETTOP</Text>
                </Header>
                <Text>
                    Teste
                </Text>
            </Container>
        )       
    }
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:'#06469E',
    },
    header:{
        elevation: 10,
        backgroundColor:'#FF8A00',
        justifyContent:'center'
    },
    titulo:{
        fontFamily:'Intro',
        color:'#06469E',
        alignSelf:'center',
        fontSize:heightPercentageToDP(4),
    }
,});
