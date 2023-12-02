import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';

export default function RecuperarClaveUsuario2({ navigation, route }) {
    const { email } = route.params;
    const [codigo, setCodigo] = useState('');
    const [nuevaClave, setNuevaClave] = useState('');

    const restaurarPassword2 = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("accept", "application/json");

        var raw = JSON.stringify({
            "email": email,
            "otp": codigo,
            "newPassword": nuevaClave
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://myhome-backend.vercel.app/api/v1/users/reset-password", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    Alert.alert('Contraseña restaurada', 'Se ha cambiado su contraseña, por favor, reingrese usando su nueva clave', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                    console.log(result)
                    navigation.navigate('usuarioComunLogin');
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
            <Text style={styles.textoh1}>Restaurar contraseña</Text>
            <Text style={styles.subtitulo}>Usuario</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Código de 6 dígitos</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Código'
                    value={codigo}
                    onChangeText={setCodigo} />
                <Text style={styles.label}>Nueva contraseña</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    placeholder='Contraseña nueva'
                    value={nuevaClave}
                    onChangeText={setNuevaClave} />
            </View>
            <TouchableOpacity style={styles.boton} title="Register" onPress={restaurarPassword2} >
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
