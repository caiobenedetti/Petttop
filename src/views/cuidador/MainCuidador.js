/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Container, Header, Footer, FooterTab, Button, Body,  Accordion} from 'native-base';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-ionicons';
import api from '../../services/api';

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
let array = [];
export default class MainCuidador extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            pedidos: [],
            user: {},
            cuidador: {},
            a: []
        }
    }


    _renderHeader(item, expanded) {
        return (
          <View style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center" ,
            backgroundColor: "#FF8A00" }}>
            <Text style={{ color:'#FFF', fontFamily:'Intro', fontSize:heightPercentageToDP(3) }}>
              {" "}{item.title}
            </Text>
            {expanded
              ? <Icon style={{ fontSize:heightPercentageToDP(3), color:'#FFF' }} name="remove-circle" />
              : <Icon style={{ fontSize:heightPercentageToDP(3), color:'#FFF' }} name="add-circle" />}
          </View>
        );
    }
    _renderContent(item) {
        return (
          <Text
            style={{
              backgroundColor: "#FFF",
              padding: 10,
              color:'#FF8A00',
              fontFamily:'Intro'
            }}
          >
            {item.content}
          </Text>
        );
    }

    async componentDidMount(){
        const token = await AsyncStorage.getItem('@Pettop:token');
        const user = await api.get('/users', {
            headers: {'Authorization' : `Bearer ${token}`}
        });
        await this.setState({user: user.data});
        let cuidador = await api.post('/cuidadores', {
            id : this.state.user.id
        });
        await this.setState({cuidador: cuidador.data});
        
        let pedidos = await api.post('/servico', {
            id: this.state.cuidador.id,
        });

        await this.setState({pedidos: pedidos.data});

        
        let array = [] 
        for (let i = 0; i < pedidos.data.length; i++){
            await api.post('/anima', {
                id: pedidos.data[i].animal_id
            }).then(e => {array.push(e.data)});
        }

        let data = [];
        for(let i = 0; i < pedidos.data.length; i++){
            data.push({
                title: array[i].nome,
                content: "Duração de " + pedidos.data[i].duracao + " dias - Preço : R$" + pedidos.data[i].preco
            })
        }
        
        this.setState({a:data});

    }

    render() {
        return (
            <Container style={styles.main}>
                <Header style={styles.header}>
                    <Text style={styles.titulo}>PETTOP</Text>
                </Header>
                <Body style={styles.centro}>
                    <Accordion style={{flex: 1, marginTop: heightPercentageToDP(30)}} dataArray={this.state.a} expanded={0} renderHeader={this._renderHeader} renderContent={this._renderContent}/>
                </Body>
            </Container>
        )       
    }
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:'#FFF',
    },
    centro:{
        alignItems:'center'
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
