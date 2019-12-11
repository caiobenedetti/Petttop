/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, StyleSheet , PermissionsAndroid  } from 'react-native';
import {Container, Header, Footer, FooterTab, Button, Body} from 'native-base';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import api from '../../services/api';
import { ScrollView } from 'react-native-gesture-handler';

export default class MainDono extends Component {
    constructor(props){
        super(props);
        this.state = {latitude: 0, longitude: 0, error: '', cuidadores: []}
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
            let cuidadores = await api.get('/cuidadors');
            cuidadores = cuidadores.data.data.data
            await this.setState({cuidadores: cuidadores});
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={styles.main}>
                <ScrollView>
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
                    >
                    {
                        this.state.cuidadores.map((cuidador) => {
                            const LatLong = {
                                latitude: cuidador.latitude,
                                longitude: cuidador.longitude,
                            }
                            
                            return (
                                <Marker
                                    coordinate={LatLong}
                                    title={cuidador.nome}
                                    description={cuidador.endereco}
                                    onCalloutPress={() => navigate('Pedido')}
                                />
                            );
                        }) 

                       
                    }  
                    </MapView>
                </Body>
                </ScrollView>
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
        width:widthPercentageToDP(90),
        height:heightPercentageToDP(80),
        alignSelf:'center',
    }
,});
