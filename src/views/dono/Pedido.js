/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, StyleSheet , PermissionsAndroid, ScrollView  } from 'react-native';
import {Container, Header, Footer, FooterTab, Form, Button, Picker, Body, Input, Item, Textarea } from 'native-base';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

export default class Pedido extends Component {
    constructor(props){
        super(props);
        this.state = {duracao: 0, animais:[], preco:0}
    }

    async componentDidMount(){
        const token = await AsyncStorage.getItem('@Pettop:token');
        console.log(token);
        const user = await api.get('/users', {
            headers: {'Authorization' : `Bearer ${token}`}
        });
        this.setState({user: user.data});
        let dono = await api.post('/donosa', {
            id : this.state.user.id
        });
        this.setState({dono: dono.data});
        
        let animais = await api.post('/animais', {
            id: this.state.dono.id
        });


        console.log(animais.data);

        this.setState({animais: animais.data});
    }

    render() {
        return (
            <Container style={styles.main}>
                <ScrollView>
                <Header style={styles.header}>
                    <Text style={styles.titulo}>PETTOP</Text>
                </Header>
                    <Form>
                        <Item style={styles.input}>
                        <Input
                            placeholder="Duração"
                            textContentType="number"
                            value={this.state.duracao}
                            placeholderTextColor="#06469E"
                            onChangeText={text => this.setState({
                                duracao: text,
                                preco: text*10
                            })}
                        />
                        </Item>
                        <Text style={styles.h3}>Selecione o pet</Text>
                        <Picker
                        mode="dropdown"
                        placeholder="Selecione o pet"
                        placeholderStyle={{color: '#bfc6ea'}}
                        placeholderIconColor="##06469E"
                        style={({width: undefined}, {marginStart: 10})}
                        selectedValue={this.state.especie}
                        onValueChange={this.onValueChange}>
                        {
                            this.state.animais.map(element => {
                                return(
                                    <Picker.Item label={element.nome} value={element.id}></Picker.Item>
                                )
                            })
                        }
                        </Picker>
                        <Item style={styles.input}>
                        <Input
                            placeholder="Preço"
                            textContentType="preco"
                            value={this.state.preco}
                            placeholderTextColor="#06469E"
                            disabled
                        />
                        </Item>
                        <Button rounded style={styles.botao} onPress={this.handleClick}>
                        <Text style={styles.texto}>Cadastrar</Text>
                        </Button>
                    </Form>
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
    h2: {
        fontFamily: 'Intro',
        color: '#FFF',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: heightPercentageToDP(4),
      },
      textarea: {
        marginStart: 10,
        marginEnd: 10,
      },
      h3: {
        fontFamily: 'Intro',
        color: '#06469E',
        alignSelf: 'center',
        fontSize: 18,
      },
      main: {
        backgroundColor: '#FFF',
        justifyContent: 'center',
      },
      input: {
        marginBottom: heightPercentageToDP(5),
        marginHorizontal: widthPercentageToDP(5),
        borderBottomColor: '#06469E',
      },
      titulo: {
        fontFamily: 'Intro',
        color: '#06469E',
        alignSelf: 'center',
        marginBottom: heightPercentageToDP(15),
        fontSize: heightPercentageToDP(10),
      },
    
      botao: {
        marginTop: heightPercentageToDP(5),
        marginHorizontal: widthPercentageToDP(5),
        justifyContent: 'center',
        marginBottom: heightPercentageToDP(5),
        backgroundColor: '#06469E',
      },
      texto: {
        fontFamily: 'Intro',
        fontSize: heightPercentageToDP(3),
        color: '#FFF',
      },
      cadastro: {
        fontFamily: 'Intro',
        color: '#06469E',
        alignSelf: 'center',
        textDecorationLine: 'underline',
        marginTop: heightPercentageToDP(5),
      },
      header:{
        elevation: 10,
        backgroundColor:'#06469E',
        justifyContent:'center'
    },
});
