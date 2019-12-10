/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Container, Header, Footer, FooterTab, Button, Body} from 'native-base';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';

export default class MainCuidador extends Component {
    constructor(props){
        super(props);
        this.state = {
            pedidos:[]
        }
    }
    render() {
        return (
            <Container style={styles.main}>
                <Header style={styles.header}>
                    <Text style={styles.titulo}>PETTOP</Text>

                </Header>
                <Body style={{justifyContent: 'center'}}>
                    {
                        this.state.pedidos.length === 0 ? 
                        <Text style={styles.frase}>Aguardando Solicitações...</Text>  :
                        <></>
                    }
                </Body>
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
        backgroundColor:'#FF8A00',
        justifyContent:'center'
    },
    titulo:{
        fontFamily:'Intro',
        color:'#06469E',
        alignSelf:'center',
        fontSize:heightPercentageToDP(4),
    },
    frase:{
        fontFamily:'Intro',
        color:'#06469E',
        alignSelf:'center',
        fontSize:heightPercentageToDP(6),
    }
,});
