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
        let array= [];
    }

    _renderHeader(item, expanded) {
        return (
          <View style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center" ,
            backgroundColor: "#06469E" }}>
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
              color:'#06469E',
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
        
        await sleep(1000);

        
        for (let i = 0; i < pedidos.data.length; i++){
            api.post('/anima', {
                id: pedidos.data[i].animal_id
            }).then(e => {array.push(e)});
        }

        this.setState({a:array});
        
        

        
        
        

        
    }

    render() {
        return (
            <Container style={styles.main}>
                <Header style={styles.header}>
                    <Text style={styles.titulo}>PETTOP</Text>
                </Header>
                <Body style={{justifyContent: 'center'}}>
                    {/* {
                        <Accordion style={ {flex: 1}}dataArray={this.state.pedidos} expanded={0} renderHeader={this._renderHeader} renderContent={this._renderContent}/>
                    } */}
                    <Text>{JSON.stringify(this.state.pedidos[0])}</Text>
                    <Text>{JSON.stringify(this.state.a)}</Text>
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
