import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ActivityIndicator, Linking, View, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';

export default function VerPropiedad({ route, navigation }) {

    const [propiedad, setPropiedad] = useState({});
    const { propertyID } = route.params;
    const [token, setToken] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userTokenKey = 'userToken';
                const storedTokenKey = await SecureStore.getItemAsync(userTokenKey);
                if (storedTokenKey && propertyID) {
                    setToken(storedTokenKey);
                }
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        fetchData();
    }, [propertyID]);

    const mostrarPropiedad = async (token, propertyID) => {
        try {
            const endpoint = 'https://myhome-backend.vercel.app/api/v1/properties';
            const queryString = `id=${encodeURIComponent(propertyID)}`;
            const url = `${endpoint}?${queryString}`;
            const myHeaders = new Headers({
                'accept': 'application/json',
                'authorization': `${token}`,
            });

            const response = await fetch(url, {
                method: 'GET',
                headers: myHeaders,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success && result.properties.length > 0) {
                console.log(result);
                setPropiedad(result.properties[0] || {});
            } else {
                console.log('Error de backend:', result);
                console.log(result.success);
                console.log(result.message);
                Alert.alert('Error', 'Hubo un error al mostrar la propiedad, por favor intente nuevamente', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        if (token && propertyID) {
            mostrarPropiedad(token, propertyID);
            console.log(propiedad)
        }
    }, [token, propertyID]);

    useEffect(() => {
        console.log(propiedad);
    }, [propiedad]);



    if (!propiedad || !propiedad.address) {
        return null;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {propiedad && (
                <React.Fragment>
                    <Text style={styles.title}>
                        {propiedad.propertyType} {propiedad.status} - {propiedad.address.district}
                    </Text>
                    <View style={styles.imageContainer}>
                        {propiedad.photos.map((photo, index) => (
                            <Image key={index} source={{ uri: photo }} style={styles.image} />
                        ))}
                    </View>
                    <View style={styles.form}>
                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Descripción: </Text>
                            <View style={styles.descripcionContainer}>
                                <Text style={styles.rawText2}>{propiedad.description} </Text>
                            </View>
                        </View>

                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Dirección: </Text>
                            <View style={styles.descripcionContainer}>
                                <Text style={styles.rawText2}>{propiedad.address.street}{propiedad.address.number}, {propiedad.address.district}, {propiedad.address.province} </Text>
                            </View>
                        </View>
                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Precio:</Text>
                            <Text style={styles.rawText2}>{propiedad.price} {propiedad.currency}</Text>
                        </View>
                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Expensas:</Text>
                            <Text style={styles.rawText2}>{propiedad.expensesPrice} {propiedad.currency}</Text>
                        </View>
                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Metros cuadrados cubiertos: </Text>
                            <Text style={styles.rawText2}>{propiedad.squareMeters.covered}</Text>
                        </View>
                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Metros cuadrados semicubiertos: </Text>
                            <Text style={styles.rawText2}>{propiedad.squareMeters.semiCovered}</Text>
                        </View>
                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Metros cuadrados descubiertos: </Text>
                            <Text style={styles.rawText2}>{propiedad.squareMeters.uncovered}</Text>
                        </View>
                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Habitaciones: </Text>
                            <Text style={styles.rawText2}>{propiedad.bedrooms}</Text>
                        </View>
                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Baños </Text>
                            <Text style={styles.rawText2}>{propiedad.bathrooms}</Text>
                        </View>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Contacto:</Text>
                            <Text style={styles.rawText2}>{propiedad.associatedRealEstate}</Text>
                        </View>
                    </View>

                    <View style={styles.fila}>
                        <TouchableOpacity
                            style={styles.boton}
                            title="Press me"
                            onPress={() => navigation.navigate('Mis propiedades')}
                        >
                            <Text style={styles.textoBoton}>Volver</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.boton}
                            title="Press me"
                            onPress={() => {
                                const { latitude, longitude } = propiedad.geolocation;

                                const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

                                Linking.openURL(mapsUrl).catch((err) => console.error('Error al abrir Google Maps', err));
                            }}
                        >
                            <Text style={styles.textoBoton}>Abrir en Maps</Text>
                        </TouchableOpacity>
                    </View>
                </React.Fragment>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 6,
        backgroundColor: 'rgba(256, 256, 256, 0.6)',
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 15,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    descripcionContainer: {
        flex: 1,
        flexShrink: 1
    },
    fila: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    linea: {
        borderBottomColor: 'black',
        borderBottomWidth: 10,
        marginBottom: 15,
        marginTop: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textTransform: 'capitalize'
    },
    input: {
        height: 35,
        width: 200,
        backgroundColor: 'rgba(256, 256, 256, 0.6)',
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
    },
    rawText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 18,
        marginRight: 5,
    },
    rawText2: {
        fontSize: 16,
        marginBottom: 18,
    },
    form: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: 10,
        borderRadius: 10,
        alignItems: 'flex-start',
        marginBottom: 10
    },
    boton: {
        alignItems: 'center',
        backgroundColor: '#284B63',
        padding: 15,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 10,
        width: 150,
    },
    textoBoton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    placeholderStyle: {
        fontSize: 16,
        width: 100,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
});