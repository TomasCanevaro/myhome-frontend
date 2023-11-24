import React, { useState, useEffect } from 'react'; 
import { StyleSheet, Text, Image, View, TouchableOpacity, Alert } from 'react-native';
import Card from '../Reusables/card';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

export default function FavoritosUsuario({navigation}) { 
    const [misFavoritos, setMisFavoritos] = useState([]);
    const [token, setToken] = useState('');

    const mostrarPropiedades = async () => {
        const endpoint = 'https://myhome-backend.vercel.app/api/v1/users/properties';
        const url = `${endpoint}`;
        const myHeaders = new Headers({
            'accept': 'application/json',
            'authorization': `${token}`,
        });

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: myHeaders,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            if (result.success) {
                console.log(result);
                console.log(url)
                setMisFavoritos(result.properties);
            } else {
                console.log('Error de backend:', result);
                console.log(result.success);
                console.log(result.message);
                Alert.alert('Error', 'Hubo un error al mostrar las propiedades, por favor intente nuevamente', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            }
        } catch (error) {
            console.log(token)
            console.error('Fetch error:', error);
        }
    }

    const proximamente = async => {
        Alert.alert('Próximamente', 'Todavía no es posible editar propiedades', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
    }

    const handleDeleteProperty = async (propertyId) => {
        Alert.alert(
            'Confirmar',
            '¿Estás seguro que deseas borrar esta propiedad?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Borrar',
                    onPress: async () => {
                        try {
                            const response = await fetch(`https://myhome-backend.vercel.app/api/v1/users/properties/${propertyId}`, {
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
                            setMisFavoritos((prevFavoritos) => prevFavoritos.filter(property => property.id !== propertyId));
                            console.log('Propiedad borrada correctamente');

                            if (misFavoritos.length > 1) {
                                await mostrarPropiedades();
                            } else {
                                setMisFavoritos([]);
                            }
                        } catch (error) {
                            console.error('Error borrando propiedad:', error.message);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    /*
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userTokenKey = 'userToken';
                const userEmailKey = 'userMail';
                const storedTokenKey = await SecureStore.getItemAsync(userTokenKey);
                const storedEmailKey = await SecureStore.getItemAsync(userEmailKey);
                if (storedTokenKey) {
                    setToken(storedTokenKey);
                }
                if (storedEmailKey) {
                    setEmail(storedEmailKey);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const fetchPropiedades = async () => {
                if (token && email) {
                    await mostrarPropiedades();
                }
            };
            fetchPropiedades();
        }, [token, email])
    );
    */

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Card>
                    
                    <View style={styles.columna}>
                        <Image
                            style={styles.icono}
                            source={require('../../assets/casa.png')}
                        />
                    </View>
                    <View style={styles.columna2}>
                        <Text style={styles.title}>Depto. en alquiler</Text>
                    </View>
                    <View style={styles.columna3}>
                        <Text style={styles.rawText}>$100.000</Text>
                        <Text style={styles.rawText}>1 amb.</Text>
                        <Text style={styles.rawText}>Tigre</Text>
                        <View style={styles.columna4}>
                            <TouchableOpacity>
                                <Image
                                    style={styles.clickableIcon}
                                    source={require('../../assets/edit.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image
                                    style={styles.clickableIcon}
                                    source={require('../../assets/delete.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>
                <Card>
                    <View style={styles.columna}>
                        <Image
                            style={styles.icono}
                            source={require('../../assets/casa.png')}
                        />
                    </View>
                    <View style={styles.columna2}>
                        <Text style={styles.title}>Casa en alquiler</Text>
                    </View>
                    <View style={styles.columna3}>
                        <Text style={styles.rawText}>$150.000</Text>
                        <Text style={styles.rawText}>3 amb.</Text>
                        <Text style={styles.rawText}>Pilar</Text>
                        <View style={styles.columna4}>
                            <TouchableOpacity>
                                <Image
                                    style={styles.clickableIcon}
                                    source={require('../../assets/edit.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image
                                    style={styles.clickableIcon}
                                    source={require('../../assets/delete.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    textoh1: {
        textAlign: 'center',
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',
    },
    columna: {
        padding: 15,
        alignContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    columna2: {
        padding: 15,
        alignContent: 'center',
        alignItems: 'center',
        flex: 4
    },
    columna3: {
        alignContent: 'center',
        alignItems: 'center',
        flex: 2
    },
    columna4: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 2,
        marginTop: 15
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    rawText: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    icono: {
        width: 60,
        height: 60,
    },
    clickableIcon: {
        width: 35,
        height: 35,
        marginStart: 10
    }
});