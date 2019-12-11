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
        this.state = {duracao: 0, animais:[], preco:0, cuidador: 0, animal: 0, teste: 'A'}
        this.handleClick = this.handleClick.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
    }

    async componentDidMount(){
        const {navigation} = this.props;
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

        this.setState({cuidador: navigation.getParam('cuidador')})
        console.log(animais.data);

        this.setState({animais: animais.data});
    
    }

    onValueChange = (text) => {
        this.setState({animal: text})
    }

    handleClick = async () => {
        const { navigate } = this.props.navigation;

        const service = await api.post('/servicos', {
            cuidador_id: this.state.cuidador,
            animal_id: this.state.animal,
            duracao: this.state.duracao,
            preco: this.state.preco,
        });
        console.log(service);
        navigate('donoNavigation');
    }

    render() {
        
        return (
            <Container style={styles.main}>
                <ScrollView>
                <Header style={styles.header}>
                    <Text style={styles.titulo}>PETTOP</Text>
                </Header>
                <Text>{this.state.animal}</Text>
                <Text>{this.state.cuidador}</Text>
                <Text>{this.state.duracao}</Text>
                <Text>{this.state.preco}</Text>
                    <Form>
                        <Item style={styles.input}>
                        <Input
                            placeholder="Duração"
                            keyboardType="numeric"
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
                        style={({width: undefined}, {marginStart: 10}, styles.input)}
                        selectedValue={this.state.animal}
                        onValueChange={this.onValueChange}>
                        {
                            this.state.animais.map(element => {
                                return(
                                    <Picker.Item label={element.nome} value={element.id}></Picker.Item>
                                )
                            })
                        }
                        </Picker>
                        <Text style={styles.h3}>Preço Final</Text>
                        <Text style={styles.h3}>{this.state.preco}</Text>
                        
                        <Button rounded style={styles.botao} onPress={this.handleClick}>
                            <Text style={styles.texto}>Fazer Pedido</Text>
                        </Button>
                    </Form>
                </ScrollView>
            </Container>
        )       
    }
}

const styles = StyleSheet.create({
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
        marginBottom: heightPercentageToDP(2)
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
});
