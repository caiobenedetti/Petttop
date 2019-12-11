/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import {Container, Header, Content, Fab, Button, Accordion} from 'native-base';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import Icon from 'react-native-ionicons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faFish, faDog, faCat} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

const dataArray = [
    { title: "Animal 1", content: "Descrição animal 1" },
    { title: "Animal 2", content: "Descrição do cat" },
    { title: "Animal 3", content: "Descrição do pexe" }
];

export default class PerfilDono extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
          active: false,
          user: {},
          dono: {},
          animais: [],
        };
    }

    async componentDidMount() {
        const { navigation } = this.props;
        //Adding an event listner om focus
        //So whenever the screen will have focus it will set the state to zero
            this.focusListener = navigation.addListener('didFocus', async () => {
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

                let array = []
                await animais.data.map(async (animal) => {
                    await array.push({
                        title: animal.nome,
                        content: animal.descricao
                    })
                })

                this.setState({animais: array});
        });
        

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
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={styles.main}>
                <Header style={styles.header}>
                    <Text style={styles.titulo}>PETTOP</Text>
                </Header>
                <Content padder>
                    <Image resizeMode='center' style={styles.foto} source={require('../../img/logo.jpg')}/>
                    <Text style={styles.h1}>Nome</Text>
                    <Text style={styles.texto}>{this.state.dono.nome}</Text>
                    <Text style={styles.h1}>Animais</Text>
                    <Accordion dataArray={this.state.animais} expanded={0} renderHeader={this._renderHeader} renderContent={this._renderContent}/>
                    <Button rounded style={styles.botao} onPress={()=> navigate('CadastroPet')}>
                        <Text style={styles.text}>Adicione um pet</Text>
                    </Button>    
                </Content>
               
            </Container>
        )       
    }
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:'#FFF',
        justifyContent:'center',
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
    foto:{
        height:heightPercentageToDP(30),
        width:widthPercentageToDP(80),
        borderRadius:300,
        alignSelf:'center',
        marginVertical:heightPercentageToDP(3),    
    },
    h1:{
        fontFamily:'Intro',
        color:'#06469E',
        fontSize:heightPercentageToDP(3),
        marginBottom:heightPercentageToDP(2),
        marginTop:heightPercentageToDP(4)
    },
    texto:{
        fontFamily:'Intro'
    },
    text:{
        fontFamily:'Intro',
        fontSize:heightPercentageToDP(3),
        color:'#FFF'
    },
    botao:{
        marginTop: heightPercentageToDP(5),
        marginHorizontal: widthPercentageToDP(5),
        justifyContent:'center',
        marginBottom: heightPercentageToDP(5),
        backgroundColor: '#06469E'
    },
    accordionHeader:{
        backgroundColor:'#06469E',
        color:'#FFF',
        fontFamily:'Intro'
    }    
});
