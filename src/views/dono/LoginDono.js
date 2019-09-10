import React, { Component } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import {Form, Item, Container, Input, Button, Text} from 'native-base'

const {width, height} = Dimensions.get('window');

export default class LoginDono extends Component {
    render() {
        return (
            <Container style={styles.main}>
                <Form>
                    <Item style={styles.input}>
                        <Input placeholder='Usuário' textContentType='username' placeholderTextColor='#FFF'></Input>
                    </Item>
                    <Item>
                        <Input placeholder='Senha' secureTextEntry placeholderTextColor='#FFF'></Input>
                    </Item>
                    <Button><Text>Login</Text></Button>
                </Form>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:'#06469E',
        justifyContent: 'center',
    },
    input:{
        paddingBottom: 
    }
});
