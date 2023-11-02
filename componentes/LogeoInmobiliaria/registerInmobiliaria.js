import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { contactBackend } from '../../API';



export default function RegisterInmobiliaria({ navigation }) {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const registrarInmo = async () => {
        console.log('entroooo')
        let data = {
            "fantasyName": nombre,
            "contactEmail": email,
            "password": password
        };
        try {
            if (password == rePassword) {
                let res = await contactBackend("/real-state-companies", false, "POST", null, data, false, 201)
                console.log(res)
                navigation.navigate('logearInmobiliaria')

            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.textoh1}>Registrate en nuestra plataforma</Text>
            <Text style={styles.subtitulo}>Inmobiliarias</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Nombre de fantasía'
                    value={nombre}
                    onChangeText={setNombre} />
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
                <Text style={styles.label}>Reingresá tu clave</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Volvé a ingresar tu contraseña'
                    secureTextEntry
                    value={rePassword}
                    onChangeText={setRePassword} />
            </View>
            <TouchableOpacity style={styles.boton} title="Register" onPress={ registrarInmo } >
                <Text style={styles.textoBoton}>Registrar Inmobiliaria</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    boton: {
        alignItems: 'center',
        backgroundColor: '#284B63',
        padding: 25,
        marginTop: 50,
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
