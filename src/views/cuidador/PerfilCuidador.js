/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {Container, Header, Footer, FooterTab, Button, Content} from 'native-base';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

export default class PerfilCuidador extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            cuidador: {},
            precos: {}
        }
    }

    async componentDidMount(){
        const token = await AsyncStorage.getItem('@Pettop:token');
        console.log(token);
        const user = await api.get('/users', {
            headers: {'Authorization' : `Bearer ${token}`}
        });
        this.setState({user: user.data});
        let cuidador = await api.post('/cuidadores', {
            id : this.state.user.id
        });
        this.setState({cuidador: cuidador.data});  
    }

    render() {
        return (
            <Container style={styles.main}>
                <Header style={styles.header}>
                    <Text style={styles.titulo}>PETTOP</Text>
                </Header>
                <Content padder>
                    <Image resizeMode='center' style={styles.foto} source={require('../../img/logo.jpg')}/> 
                    <Text style={styles.h1}>Nome</Text>
                    <Text style={styles.texto}>{this.state.cuidador.nome}</Text> 
                </Content>  
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
    foto:{
        height:heightPercentageToDP(30),
        width:widthPercentageToDP(80),
        borderRadius:300,
        alignSelf:'center',
        marginVertical:heightPercentageToDP(3),    
    },
    h1:{
        fontFamily:'Intro',
        color:'#06469E',
        fontSize:heightPercentageToDP(3),
        marginBottom:heightPercentageToDP(2),
        marginTop:heightPercentageToDP(4)
    },
    texto:{
        fontFamily:'Intro'
    },
});
