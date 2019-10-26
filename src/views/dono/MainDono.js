import React, { Component } from 'react';
import { Text, View, StyleSheet , PermissionsAndroid  } from 'react-native';
import {Container, Header, Footer, FooterTab, Button, Body} from 'native-base';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

export default class MainDono extends Component {
    constructor(props){
        super(props);
        this.state = {latitude: 0, longitude: 0, error: ''}
        this.onChangeRegiao = this.onChangeRegiao.bind(this);
    }

    onChangeRegiao(regiao){
        this.setState({regiao: regiao});
    }

    async componentDidMount(){
        // Instead of navigator.geolocation, just use Geolocation.
        let permissao = PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        )

        if(permissao){
            await Geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        error: null,
                    });
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
    }

    render() {
        return (
            <Container style={styles.main}>
                <Header style={styles.header}>
                    <Text style={styles.titulo}>PETTOP</Text>
                </Header>
                <Body style={styles.body}>
                    <MapView style={styles.map}
                        region={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 1,
                            longitudeDelta: 1,
                        }}
                    />
                </Body>
            </Container>
        )       
    }
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:'#FFF',
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
    body:{
        justifyContent:'center'
    },
    map:{
        width:widthPercentageToDP(96),
        height:heightPercentageToDP(90),
        alignSelf:'center',
    }
,});
