/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import {Form, Item, Container, Input, Button, Text} from 'native-base'
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen'
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

export default class LoginDono extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', senha: '', error: '', success: ''}
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleCreatePress = this.handleCreatePress.bind(this);
    }

    handleCreatePress = () => {
        const { navigate } = this.props.navigation;       
        if(this.state.email != '' && this.state.senha != '' && this.state.user != ''){

            api.post('/sessions', {
                email: this.state.email,
                password: this.state.senha
            }).then( async (response) => {
                await AsyncStorage.setItem('@Pettop:token', response.data.token);
                console.log('ok');
                navigate('cuidadorNavigation');
            }).catch(err => {
                this.setState({error: 'Fudeu'})
                console.log(err)
            });
        }   
        else {
            this.setState({error: 'Os campos não podem estar vazios'});
        }
        
    }

    handleUserChange = (email) => {
        this.setState({ email: email });
    };
      
    handlePasswordChange = (password) => {
        this.setState({ senha: password });
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={styles.main}>
                
                <Text style={styles.titulo}>PETTOP</Text>
                <Form>
                    <Item style={styles.input} >
                        <Input placeholder='Usuário' textContentType='username' placeholderTextColor='#06469E' onChangeText={this.handleUserChange}></Input>
                    </Item>
                    <Item style={styles.input}>
                        <Input placeholder='Senha' secureTextEntry placeholderTextColor='#06469E' onChangeText={this.handlePasswordChange}></Input>
                    </Item>
                    <Button rounded style={styles.botao}><Text style={styles.texto} onPress={this.handleCreatePress}>Login</Text></Button>
                </Form>
                <Text  style={styles.cadastro} onPress={() => navigate('CadastroCuidador')}>Cadastre-se</Text>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:'#FF8A00',
        justifyContent: 'center',
    },
    input:{
        marginBottom: heightPercentageToDP(5),
        marginHorizontal: widthPercentageToDP(5),
        borderBottomColor: '#06469E'
    },
    titulo:{
        fontFamily:'Intro',
        color:'#06469E',
        alignSelf:'center',
        marginBottom:heightPercentageToDP(15),
        fontSize:heightPercentageToDP(10),
    },
    botao:{
        marginTop: heightPercentageToDP(5),
        marginHorizontal: widthPercentageToDP(5),
        justifyContent:'center',
        marginBottom: heightPercentageToDP(5),
        backgroundColor:'#06469E'
    },
    texto:{
        fontFamily:'Intro',
        fontSize:heightPercentageToDP(3),
        color:'#FF8A00'
    },
    cadastro:{
        fontFamily:'Intro',
        color:'#06469E',
        alignSelf:'center',
        textDecorationLine:'underline',
        marginTop:heightPercentageToDP(5),
    }
});
