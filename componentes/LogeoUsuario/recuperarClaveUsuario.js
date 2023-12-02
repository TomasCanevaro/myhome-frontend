import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert} from 'react-native';

export default function RecuperarClaveUsuario({ navigation }) {
    const [email, setEmail] = useState('');

    const restaurarPassword = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("accept", "application/json");

        var raw = JSON.stringify({
            "email": email
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://myhome-backend.vercel.app/api/v1/users/forgot-password", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    Alert.alert('Código enviado', 'Se ha enviado un código de 6 dígitos a su mail. Por favor, ingréselo junto a la nueva contraseña para restaurarla', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                    console.log(result)
                    navigation.navigate('recuperarClaveUsuario2', { email: email });
                } else {
                    console.log('Error de backend:', result);
                    Alert.alert('Error', result.message, [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                }
            })
            .catch(error => console.log('error', error));
    }
    return (
        <View style={styles.container}>
            <Text style={styles.textoh1}>Ingresá tu correo para restaurar tu contraseña</Text>
            <Text style={styles.subtitulo}>Usuarios</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    value={email}
                    onChangeText={setEmail} />
            </View>
            <TouchableOpacity style={styles.boton} title="Register" onPress={restaurarPassword} >
                <Text style={styles.textoBoton}>Restaurar contraseña</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    boton: {
        alignItems: 'center',
        backgroundColor: '#284B63',
        padding: 25,
        marginTop: 150,
        borderRadius: 10,
        width: 260,
    },
    botonChico: {
        alignItems: 'center',
        backgroundColor: '#284B63',
        padding: 10,
        marginTop: 30,
        borderRadius: 10,
        width: 260,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 50,
        alignItems: 'center'
    },
    textoh1: {
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',
    },
    textoBoton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    subtitulo: {
        marginTop: 20,
        fontSize: 14,
        fontWeight: 'bold',
    },
    form: {
        backgroundColor: 'white',
        width: 300,
        padding: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
    }

});
