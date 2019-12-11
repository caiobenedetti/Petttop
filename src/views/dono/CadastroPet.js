import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {
  Form,
  Item,
  Container,
  Input,
  Button,
  Text,
  Header,
  Picker,
  Icon,
  Textarea,
} from 'native-base';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

export default class CadastroPet extends Component {
  constructor(props) {
    super(props);
    this.state = {nome: '', especie: 1, raca: '', deficiencia: '', descricao: '', dono_id: 0};
    this.onValueChange = this.onValueChange.bind(this);
  }
  async componentDidMount(){

    const token = await AsyncStorage.getItem('@Pettop:token');
    const user = await api.get('/users', {
        headers: {'Authorization' : `Bearer ${token}`}
    });
    console.log(user);
    let dono = await api.post('/donosa', {
        id : user.data.id
    });
    this.setState({dono_id: dono.data.id});
    console.log(this.state.dono_id)
  }
  async onValueChange(value){
    await this.setState({especie: value}); 
    console.log(this.state.especie)
  }

  handleClick = async () => {
    const { navigate } = this.props.navigation;
    const animal = await api.post('/animals', {
        nome: this.state.nome,
        especie_id: this.state.especie,
        raca: this.state.raca,
        deficiencia: this.state.deficiencia,
        descricao: this.state.descricao,
        dono_id: this.state.dono_id
    })    
    console.log(animal);
    navigate('donoNavigation');

  }

  render() {
    return (
      <Container style={styles.main}>
          <ScrollView>
          <Header style={styles.header}>
            <Text style={styles.h2}>Cadastro Pet</Text>
          </Header>
        <Form>
            <Item style={styles.input}>
              <Input
                placeholder="Nome"
                textContentType="name"
                value={this.state.name}
                placeholderTextColor="#06469E"
                onChangeText={text => this.setState({nome: text})}
              />
            </Item>
            <Text style={styles.h3}>Selecione a espécie</Text>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Selecione a espécie"
              placeholderStyle={{color: '#bfc6ea'}}
              placeholderIconColor="##06469E"
              style={({width: undefined}, {marginStart: 10})}
              selectedValue={this.state.especie}
              onValueChange={this.onValueChange}>
              <Picker.Item label="Gato" value="2" />
              <Picker.Item label="Cachorro" value="1" />
              <Picker.Item label="Peixe" value="3" />
            </Picker>
            <Item style={styles.input}>
              <Input
                placeholder="Raça"
                textContentType="raca"
                value={this.state.raca}
                placeholderTextColor="#06469E"
                onChangeText={text => this.setState({raca: text})}
              />
            </Item>
            <Item style={styles.input}>
              <Input
                placeholder="Deficiência"
                textContentType="deficiencia"
                value={this.state.deficiencia}
                placeholderTextColor="#06469E"
                onChangeText={text => this.setState({deficiencia: text})}
              />
            </Item>
            <Text style={styles.h3}>Descreva seu pet</Text>
            <Textarea
              style={styles.textarea}
              bordered
              placeholder="Descrição"
              onChangeText={text => this.setState({descricao: text})}
            />
            <Button rounded style={styles.botao} onPress={this.handleClick}>
              <Text style={styles.texto}>Cadastrar</Text>
            </Button>
        </Form>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
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