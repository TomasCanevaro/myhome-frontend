import { StyleSheet, Text, Image, View, TouchableOpacity, Alert } from 'react-native';
import Card from '../Reusables/card';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

export default function MisPropiedades({ navigation }) {
    const [misPropiedades, setMisPropiedades] = useState([]);
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('')

    const mostrarPropiedades = async () => {
        const endpoint = 'https://myhome-backend.vercel.app/api/v1/properties';
        const queryString = `associatedRealEstate=${encodeURIComponent(email)}`;
        const url = `${endpoint}?${queryString}`;
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
                setMisPropiedades(result.properties);
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
                            const response = await fetch(`https://myhome-backend.vercel.app/api/v1/properties/${propertyId}`, {
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
                            setMisPropiedades((prevProperties) => prevProperties.filter(property => property.id !== propertyId));
                            console.log('Propiedad borrada correctamente');

                            if (misPropiedades.length > 1) {
                                await mostrarPropiedades();
                            } else {
                                setMisPropiedades([]);
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


    return (
        <View style={styles.container}>
            {misPropiedades.length === 0 ? (
                <Text style={styles.noPropertiesText}>No hay propiedades para mostrar.</Text>
            ) : (
                misPropiedades.map((property, index) => (
                    <Card key={index}>
                        <View style={styles.columna}>
                            {property.propertyType === 'casa' ? (
                                <TouchableOpacity onPress={() => navigation.navigate('Ver propiedad', { propertyID: property._id })}>
                                    <Image
                                        style={styles.icono}
                                        source={require('../../assets/casa.png')}
                                    />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => navigation.navigate('Ver propiedad', { propertyID: property._id })}>
                                    <Image
                                        style={styles.iconoEdificio}
                                        source={require('../../assets/edificio.png')}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={styles.columna2}>
                            <TouchableOpacity onPress={() => navigation.navigate('Ver propiedad', { propertyID: property._id })}>
                                <Text style={styles.title}>{property.propertyType} {property.status}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.columna3}>
                            <Text style={styles.rawText}>{property.price} {property.currency}</Text>
                            <Text style={styles.rawText}>{property.rooms} amb.</Text>
                            <Text style={styles.rawText}>{property.address.district}</Text>


                            <View style={styles.columna4}>
                                <TouchableOpacity onPress={() => proximamente()}>
                                    <Image
                                        style={styles.clickableIcon}
                                        source={require('../../assets/edit.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteProperty(property._id)}>
                                    <Image
                                        style={styles.clickableIcon}
                                        source={require('../../assets/delete.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>
                ))
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
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
        flex: 5
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
        textTransform: 'capitalize'
    },
    rawText: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    icono: {
        width: 60,
        height: 60,
    },
    iconoEdificio: {
        width: 50,
        height: 60,
    },
    clickableIcon: {
        width: 35,
        height: 35,
        marginStart: 10
    },
    noPropertiesText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
    },

})