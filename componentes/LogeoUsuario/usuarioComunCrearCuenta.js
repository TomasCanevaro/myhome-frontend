import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { contactBackend } from '../../API';

export default function UsuarioComunCrearCuenta({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const registrarUsuario = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("accept", "application/json");

        var raw = JSON.stringify({
            "firstName": nombre,
            "lastName": apellido,
            "email": email,
            "password": password,
            "role": "client"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        if (password === rePassword){
        fetch("https://myhome-backend.vercel.app/api/v1/users", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        Alert.alert('Éxito', 'El usuario fue creado con éxito', [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                        console.log(result)
                        navigation.navigate('usuarioComunAcceder');
                    } else {
                        console.log('Error de backend:', result);
                        Alert.alert('Error', result.message, [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                    }
                })
                .catch(error => console.log('error', error));
            }else{
                Alert.alert('Error', 'Las contraseñas son diferentes, por favor reingréselas correctamente', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            }
        
        
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.textoh1}>Registrate</Text>
            <Text style={styles.subtitulo}>Usuarios</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Nombre'
                    value={nombre}
                    onChangeText={setNombre} />
                <Text style={styles.label}>Apellido</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Apellido'
                    value={apellido}
                    onChangeText={setApellido} />
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Correo electrónico'
                    value={email}
                    onChangeText={setEmail} />
                <Text style={styles.label}>Clave</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Contraseña'
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword} />
                <Text style={styles.aviso}>Debe poseer: entre 8 y 16 caracteres alfanuméricos, dos letras mayúsculas,un caracter especial, elegir entre: !@#$&*, tres letras minúsculas, dos números</Text>
                <Text style={styles.label}>Reingresá tu clave</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Volvé a ingresar tu contraseña'
                    secureTextEntry
                    value={rePassword}
                    onChangeText={setRePassword} />
            </View>
            <TouchableOpacity style={styles.boton} title="Register" onPress={registrarUsuario} >
                <Text style={styles.textoBoton}>Registrar Usuario</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    boton: {
        alignItems: 'center',
        backgroundColor: '#284B63',
        padding: 25,
        marginTop: 30,
        borderRadius: 10,
        width: 260,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 50,
        alignItems: 'center',
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
        fontWeight: 'bold'
    },
    form: {
        backgroundColor: 'white',
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
        marginBottom: 5,
        fontWeight: 'bold'
    },
    aviso:{
        fontSize: 12,
        marginBottom: 10,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center'
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
