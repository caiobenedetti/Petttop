import React, { Component } from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Form, Item, Container, Input, Button, Text} from 'native-base';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';;

export default class CadastroDono extends Component {
    
    constructor(props){
        
        super(props);
        this.state = {usuario: '', email: '', senha: ''};
        this.handleClick = this.handleClick.bind(this);
    
    }

    handleClick(e){
        const { navigate } = this.props.navigation;
        e.preventDefault();
        alert(this.state.usuario);
        navigate('cuidadorNavigation');
    }
    

    render() {
        return (
            <Container style={styles.main}>
                <Text >{this.state.usuario}</Text>
                <Text style={styles.h2}>Cadastro</Text>
                <Form>
                    <Item style={styles.input} >
                        <Input placeholder='Usuário' textContentType='username' value={this.state.usuario} placeholderTextColor='#06469E' onChangeText={(text) => this.setState({usuario: text})} ></Input>
                    </Item>
                    <Item style={styles.input} >
                        <Input placeholder='E-mail' textContentType='emailAddress' value={this.state.email} placeholderTextColor='#06469E' onChangeText={(text) => this.setState({email: text})}></Input>
                    </Item>
                    <Item style={styles.input}>
                        <Input placeholder='Senha' secureTextEntry value={this.state.senha} placeholderTextColor='#06469E' onChangeText={(text) => this.setState({senha: text})}></Input>
                    </Item>
                    <Button rounded style={styles.botao} onPress={this.handleClick}><Text style={styles.texto}>Cadastrar</Text></Button>
                </Form>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    h2: {
        fontFamily: 'Intro',
        color: '#06469E',
        alignSelf: 'center',
        marginBottom: heightPercentageToDP(15),
        fontSize: heightPercentageToDP(7),
    },
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