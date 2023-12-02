import React, { useState, useEffect } from 'react'; 
import { StyleSheet, Text, Image, View, TouchableOpacity, Alert } from 'react-native';
import Card from '../Reusables/card';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

export default function ResultadosBusquedaUsuario({ route, navigation }) { 
    const [misResultados, setMisResultados] = useState([]);
    const [token, setToken] = useState('');

    const { operacion, tipoPropiedad, provincia, localidad, cambio, desde, hasta, ambientes, dormitorios, baños, amenities } = route.params;

    const mostrarResultados = async () => {
        const url = `https://myhome-backend.vercel.app/api/v1/properties`;
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
                /*
                misResultados = misResultados.filter((property, index) => (
                    property.propertyType.toLowerCase() == tipoPropiedad.toLowerCase() &&
                    property.adress.province.toLowerCase() == provincia.toLowerCase() &&
                    property.currency == cambio
                    property.price > desde &&
                    property.price < hasta
                    property.rooms == ambientes &&
                    property.bedrooms == dormitorios &&
                    property.bathrooms == baños &&
                    property.amenities == amenities
                ))
                */
                setMisResultados(result.properties);
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

    const handleAddFavorite = async (property) => {
        var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("accept", "application/json");
            myHeaders.append("authorization", token);
            var raw = JSON.stringify({
                "user": null,
                "property": property,
            });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch("https://myhome-backend.vercel.app/api/v1/favorites", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        Alert.alert('Éxito', 'El favorito fue creado con éxito', [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                        console.log(result)
                    } else {
                        console.log('Error de backend:', result);
                        console.log(result.success);
                        console.log(result.message);
                        Alert.alert('Error', result.message, [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                    }
                })
                .catch(error => console.log('error', error));
    }

    /*
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userTokenKey = 'userToken';
                const storedTokenKey = await SecureStore.getItemAsync(userTokenKey);
                if (storedTokenKey) {
                    setToken(storedTokenKey);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    */

    useFocusEffect(
        React.useCallback(() => {
            const fetchResultados = async () => {
                if (token) {
                    await mostrarResultados();
                }
            };
            fetchResultados();
        }, [token])
    );

    return (
        <View style={styles.container}>
            {misResultados.length === 0 ? (
                <Text style={styles.noPropertiesText}>No hay propiedades para mostrar.</Text>
            ) : (
                misResultados.map((property, index) => (
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
                                <TouchableOpacity onPress={() => handleAddFavorite(property)}>
                                    <Image
                                        style={styles.clickableIcon}
                                        source={require('../../assets/favorite.png')}
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