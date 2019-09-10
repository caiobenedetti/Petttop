import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {Form, Item, Container, Input, Button, Text} from 'native-base'

export default class LoginDono extends Component {
    render() {
        return (
            <Container style={styles.main}>
                <Form>
                    <Item>
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
    }
});
