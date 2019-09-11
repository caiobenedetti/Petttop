import React, { Component } from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Form, Item, Container, Input, Button, Text} from 'native-base';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';

export default class CadastroDono extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={styles.main}>
                <Text style={styles.titulo}>PETTOP</Text>
                <Text style={styles.h2}>Cadastro</Text>
                <Form>
                    <Item style={styles.input} >
                        <Input placeholder='Usuário' textContentType='username' placeholderTextColor='#FFF'></Input>
                    </Item>
                    <Item style={styles.input} >
                        <Input placeholder='E-mail' textContentType='emailAddress' placeholderTextColor='#FFF'></Input>
                    </Item>
                    <Item style={styles.input}>
                        <Input placeholder='Senha' secureTextEntry placeholderTextColor='#FFF'></Input>
                    </Item>
                    <Button rounded style={styles.botao} onPress={() => navigate('donoNavigation')}><Text style={styles.texto}>Cadastrar</Text></Button>
                </Form>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    h2: {
        fontFamily: 'Intro',
        color: '#FFF',
        alignSelf: 'center',
        marginBottom: heightPercentageToDP(15),
        fontSize: heightPercentageToDP(7),
    },
    main:{
        backgroundColor:'#06469E',
        justifyContent: 'center',
    },
    input:{
        marginBottom: heightPercentageToDP(5),
        marginHorizontal: widthPercentageToDP(5),
    },
    titulo:{
        fontFamily:'Intro',
        color:'#FFF',
        alignSelf:'center',
        marginBottom:heightPercentageToDP(15),
        fontSize:heightPercentageToDP(10),
    },
    botao:{
        marginTop: heightPercentageToDP(5),
        marginHorizontal: widthPercentageToDP(5),
        justifyContent:'center',
        marginBottom: heightPercentageToDP(5),
        backgroundColor: '#FFF'
    },
    texto:{
        fontFamily:'Intro',
        fontSize:heightPercentageToDP(3),
        color:'#06469E'
    },
    cadastro:{
        fontFamily:'Intro',
        color:'#FFF',
        alignSelf:'center',
        textDecorationLine:'underline',
        marginTop:heightPercentageToDP(5),
    }
});