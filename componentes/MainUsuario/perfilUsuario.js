import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { contactBackend } from '../../API';
import * as SecureStore from 'expo-secure-store';

export default function RegisterInmobiliaria({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [userID, setUserID] = useState('');

    const modificarUsuario = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("accept", "application/json");
        myHeaders.append("Authorization", `${token}`);

        var raw = JSON.stringify({
            "firstName": nombre,
            "lastName": apellido,
            "email": email,
            "password": ""
        });

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://myhome-backend.vercel.app/api/v1/users/${userID}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        Alert.alert('Éxito', 'El usuario fue modificado con éxito', [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                        console.log(result)
                    } else {
                        console.log('Error de backend:', result);
                        Alert.alert('Error', result.message, [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                    }
                })
                .catch(error => console.log('error', error));

    }

    const handleDeleteUsuario = async () => {
        Alert.alert(
            'Confirmar',
            '¿Estás seguro que deseas borrar este usuario?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Borrar',
                    onPress: async () => {
                        try {
                            const response = await fetch(`https://myhome-backend.vercel.app/api/v1/users/${userID}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `${token}`,
                                },
                            });
                            if (!response.ok) {
                                const errorMessage = await response.text();
                                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
                            }
                            console.log('Usuario borrado correctamente');
                            navigation.navigate('bienvenida')
                        } catch (error) {
                            console.error('Error borrando usuario:', error.message);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userTokenKey = 'userToken';
                const userIDKey = 'userID';
                const storedTokenKey = await SecureStore.getItemAsync(userTokenKey);
                const storedUserIDKey = await SecureStore.getItemAsync(userIDKey);
                if (storedTokenKey) {
                    setToken(storedTokenKey);
                }
                if (storedUserIDKey) {
                    setUserID(storedUserIDKey);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    /*
    useFocusEffect(
        React.useCallback(() => {
            const fetchFavoritos = async () => {
                if (token && userID) {
                    await mostrarFavoritos();
                }
            };
            fetchFavoritos();
        }, [token, userID])
    );
    */
    
    return (
        <View style={styles.container}>
            <Text style={styles.textoh1}>Editar perfil</Text>
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
            </View>
            <TouchableOpacity style={styles.boton} title="Save" onPress={ modificarUsuario } >
                <Text style={styles.textoBoton}>Guardar cambios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boton2} title="DeleteUser" onPress={ handleDeleteUsuario } >
                <Text style={styles.textoBoton}>Dar de baja cuenta</Text>
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
    boton2: {
        alignItems: 'center',
        backgroundColor: '#800000',
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
