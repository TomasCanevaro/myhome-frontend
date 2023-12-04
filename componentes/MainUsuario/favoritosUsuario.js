import React, { useState, useEffect } from 'react'; 
import { StyleSheet, Text, Image, View, TouchableOpacity, Alert } from 'react-native';
import Card from '../Reusables/card';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

export default function FavoritosUsuario({navigation}) { 
    const [misFavoritos, setMisFavoritos] = useState([]);
    const [token, setToken] = useState('');
    const [userID, setUserID] = useState('');

    const mostrarFavoritos = async () => {
        const url = `https://myhome-backend.vercel.app/api/v1/users/${userID}/favorites`;
        console.log(url);
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
                setMisFavoritos(result.favorites.properties);
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

    const handleDeleteFavorite = async (favoriteId) => {
        Alert.alert(
            'Confirmar',
            '¿Estás seguro que deseas borrar este favorito?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Borrar',
                    onPress: async () => {
                        try {
                            const response = await fetch(`https://myhome-backend.vercel.app/api/v1/users/${userID}/favorites/${favoriteId}`, {
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
                            setMisFavoritos((prevFavoritos) => prevFavoritos.filter(favorite => favorite.id !== favoriteId));
                            console.log('Favorito borrado correctamente');

                            if (misFavoritos.length > 1) {
                                await mostrarFavoritos();
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

    return (
        <View style={styles.container}>
            {misFavoritos.length === 0 ? (
                <Text style={styles.noPropertiesText}>No hay propiedades para mostrar.</Text>
            ) : (
                misFavoritos.map((favorite, index) => (
                    <Card key={index}>
                        <View style={styles.columna}>
                            {favorite.property.propertyType === 'casa' ? (
                                <TouchableOpacity onPress={() => navigation.navigate('Ver propiedad', { favoriteId: favorite._id })}>
                                    <Image
                                        style={styles.icono}
                                        source={require('../../assets/casa.png')}
                                    />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => navigation.navigate('Ver propiedad', { favoriteId: favorite._id })}>
                                    <Image
                                        style={styles.iconoEdificio}
                                        source={require('../../assets/edificio.png')}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={styles.columna2}>
                            <TouchableOpacity onPress={() => navigation.navigate('Ver propiedad', { favoriteId: property._id })}>
                                <Text style={styles.title}>{favorite.property.propertyType} {favorite.property.status}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.columna3}>
                            <Text style={styles.rawText}>{favorite.property.price} {favorite.property.currency}</Text>
                            <Text style={styles.rawText}>{favorite.property.rooms} amb.</Text>
                            <Text style={styles.rawText}>{favorite.property.address.district}</Text>


                            <View style={styles.columna4}>
                                <TouchableOpacity onPress={() => handleDeleteFavorite(favorite._id)}>
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