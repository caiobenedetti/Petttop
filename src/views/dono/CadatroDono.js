import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {Form, Item, Container, Input, Button, Text, Toast} from 'native-base';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import api from '../../services/api';

export default class CadastroDono extends Component {

    constructor(props) {
        super(props);
        this.state = {email: '', senha: '', user: '', error: '', success: ''}
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleCreatePress = this.handleCreatePress.bind(this);
    }

    handleCreatePress = () => {
        const { navigate } = this.props.navigation;       
        if(this.state.email != '' && this.state.senha != '' && this.state.user != ''){

            api.post('/users', {
                username: this.state.user,
                email: this.state.email,
                password: this.state.senha
            }).then( () => {
                this.setState({ success: 'Conta criada com sucesso! Redirecionando para o login', error: '' });
                console.log(this.state.success);
                navigate('LoginDono');
            }).catch(err => {
                this.setState({error: 'Fudeu'})
                console.log(err)
            });
               
            
        }   
        else {
            this.setState({error: 'Os campos não podem estar vazios'});
        }
    }
        
    handleEmailChange = (email) => {
        this.setState({ email: email });
    };
    
    handleUserChange = (user) => {
        this.setState({ user: user });
    };
      
      handlePasswordChange = (password) => {
        this.setState({ senha: password });
    };

    render() {
        
        return (
            <Container style={styles.main}>
                {/* <Text style={styles.titulo}>PETTOP</Text> */}
                <Text style={styles.h2}>Cadastro</Text>
                <Form >
                    <Item style={styles.input}>
                        <Input placeholder='Usuário' textContentType='username' placeholderTextColor='#FFF' onChangeText={this.handleUserChange}></Input>
                    </Item>
                    <Item style={styles.input}>
                        <Input placeholder='E-mail' textContentType='emailAddress' placeholderTextColor='#FFF' onChangeText={this.handleEmailChange}></Input>
                    </Item>
                    <Item style={styles.input}>
                        <Input placeholder='Senha' secureTextEntry placeholderTextColor='#FFF' onChangeText={this.handlePasswordChange}></Input>
                    </Item>
                    <Button style={styles.botao} onPress={this.handleCreatePress}><Text style={styles.texto}>Cadastrar</Text></Button>
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