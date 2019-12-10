import React, { Component } from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Form, Item, Container, Input, Button, Text, Toast} from 'native-base';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import api from '../../services/api';

export default class CadastroDono extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '', 
            senha: '', 
            user: '', 
            error: '', 
            success: '', 
            nome:'',
            rg: '',
            cpf: '',
            rua: '',
            numero: '',
            cidade: '',
            estado: '',
            bairro: '',

    }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleCreatePress = this.handleCreatePress.bind(this);
    }

    handleCreatePress = async () => {
        const { navigate } = this.props.navigation;       
        
        try{
            if(this.state.email != '' && this.state.senha != '' && this.state.user != ''){    
                let user = await api.post('/users', {
                    username: this.state.user,
                    email: this.state.email,
                    password: this.state.senha
                })
                
                console.log(user);
                await api.post('/donos',{
                    nome:this.state.nome,
                    cpf: this.state.cpf,
                    rg: this.state.rg,
                    endereco: this.state.rua + ', ' + this.state.numero + ' - ' + this.state.bairro + ' ' + this.state.cidade,
                    user_id: user.data.id
                });
                
                console.log('sucesso1')
                await api.post('/cuidadors', {
                    nome:this.state.nome,
                    cpf: this.state.cpf,
                    rg: this.state.rg,
                    endereco: this.state.rua + ', ' + this.state.numero + ' - ' + this.state.bairro + ' ' + this.state.cidade,
                    user_id: user.data.id
                })
                
                console.log('sucesso2')
                this.setState({ success: 'Conta criada com sucesso! Redirecionando para o login', error: '' });
                console.log(this.state.success);
                navigate('LoginDono');
            }
                else {
                    this.setState({error: 'Os campos não podem estar vazios'});
                }
            }
            catch(err){
                this.setState({error: ''})
                console.log(err)
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
                <ScrollView style={styles.ScrollView}>
                <Form >
                <Item style={styles.input}>
                    <Input
                        placeholder="Nome"
                        placeholderTextColor='#FFF'
                        textContentType="name"
                        value={this.state.nome}
                        onChangeText={text => this.setState({nome: text})}
                    />
                    </Item>
                    <Item style={styles.input}>
                    <Input
                        placeholder="RG"
                        placeholderTextColor='#FFF'
                        textContentType="rg"
                        value={this.state.rg}
                        onChangeText={text => this.setState({rg: text})}
                    />
                    </Item>
                    <Item style={styles.input}>
                    <Input
                        placeholder="CPF"
                        placeholderTextColor='#FFF'
                        textContentType="cpf"
                        value={this.state.cpf}
                        onChangeText={text => this.setState({cpf: text})}
                    />
                    </Item>
                    <Item style={styles.input}>
                    <Input
                        placeholder="Rua"
                        placeholderTextColor='#FFF'
                        textContentType="streetAddressLine1"
                        value={this.state.rua}
                        onChangeText={text => this.setState({rua: text})}
                    />
                    </Item>
                    <Item style={styles.input}>
                    <Input
                        placeholder="Número"
                        placeholderTextColor='#FFF'
                        textContentType="number"
                        value={this.state.numero}
                        onChangeText={text => this.setState({numero: text})}
                    />
                    </Item>
                    <Item style={styles.input}>
                    <Input
                        placeholder="Bairro"
                        placeholderTextColor='#FFF'
                        textContentType="location"
                        value={this.state.bairro}
                        onChangeText={text => {
                            this.setState({bairro: text})
                            console.log(this.state.bairro);
                        }}
                    />
                    </Item>
                    <Item style={styles.input}>
                    <Input
                        placeholder="Cidade"
                        placeholderTextColor='#FFF'
                        textContentType="addressState"
                        value={this.state.cidade}
                        onChangeText={text => this.setState({cidade: text})}
                    />
                    </Item>
                    <Item style={styles.input}>
                    <Input
                        placeholder="Estado"
                        placeholderTextColor='#FFF'
                        textContentType="addressState"
                        value={this.state.estado}
                        onChangeText={text => this.setState({estado: text})}
                    />
                    </Item>
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
                </ScrollView>
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