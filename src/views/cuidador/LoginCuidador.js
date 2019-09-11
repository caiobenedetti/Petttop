import React, { Component } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import {Form, Item, Container, Input, Button, Text} from 'native-base'
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen'

const {width, height} = Dimensions.get('window');

export default class LoginDono extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={styles.main}>
                
                <Text style={styles.titulo}>PETTOP</Text>
                <Form>
                    <Item style={styles.input} >
                        <Input placeholder='Usuário' textContentType='username' placeholderTextColor='#06469E'></Input>
                    </Item>
                    <Item style={styles.input}>
                        <Input placeholder='Senha' secureTextEntry placeholderTextColor='#06469E'></Input>
                    </Item>
                    <Button rounded style={styles.botao}><Text style={styles.texto} onPress={() => navigate('cuidadorNavigation')}>Login</Text></Button>
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
