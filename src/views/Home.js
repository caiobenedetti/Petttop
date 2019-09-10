/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Grid, Row, Text} from 'native-base';
import Icon from 'react-native-ionicons';

export default class Home extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
          <Grid>
            <Row style={styles.dono} onTouchEnd={() => navigate('LoginDono')}>
              <Icon name='paw' style={styles.donoIcon}/>
              <Text style={styles.donoTexto}>Dono</Text>
            </Row>
            <Row style={styles.cuidador} onTouchEnd={() => navigate('cuidadorNavigation')}>
              <Icon name='home' style={styles.cuidadorIcon} />
              <Text style={styles.cuidadorTexto}>Cuidador</Text>
            </Row>
          </Grid>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  cuidador:{
    backgroundColor: '#FF8A00',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  dono:{
    backgroundColor: '#06469E',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#595757',
    flexDirection: 'column',
  },
  donoTexto:{
    fontFamily:'Intro',
    color:'#FFF',
    fontSize:30
  },
  cuidadorTexto:{
    fontFamily:'Intro',
    color:'#06469E',
    fontSize:30
  },
  cuidadorIcon:{
    color:'#06469E',
    fontSize:60
  },
  donoIcon:{
    color:'#FFF',
    fontSize:60
  },
  
});
