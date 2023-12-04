import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Linking, View, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';

export default function VerPropiedad({ route, navigation }) {
    const [propiedad, setPropiedad] = useState({});
    const { propertyID } = route.params;
    const [token, setToken] = useState('');
    const [estado, setEstado] = useState('');
    const [selectedImage, setSelectedImage] = useState(0);
    const dataEstado = [
        { label: 'En alquiler', value: 'en alquiler' },
        { label: 'En venta', value: 'en venta' },
        { label: 'Reservada', value: 'reservada' },
        { label: 'Alquilada', value: 'alquilada' },
        { label: 'Vendida', value: 'vendida' }
    ];

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

    useFocusEffect(
        React.useCallback(() => {
        if (token && propertyID) {
            mostrarPropiedad(token, propertyID);
            console.log(propiedad)
        }
    }, [token, propertyID]));

    useEffect(() => {
        console.log(propiedad);
        console.log(propiedad.photos)
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
                    <View styles={styles.fila}>
                        <Dropdown
                            style={styles.dropdown}
                            placeholder=''
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={dataEstado}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={propiedad.status}
                            onChange={async (item) => {
                                const newStatus = item.value;
                                setEstado(newStatus);

                                try {
                                    const myHeaders = new Headers();
                                    myHeaders.append("Content-Type", "application/json");
                                    myHeaders.append("accept", "application/json");
                                    myHeaders.append("authorization", token);

                                    const id = propertyID;

                                    const raw = JSON.stringify({
                                        status: estado
                                    });

                                    const requestOptions = {
                                        method: 'PATCH',
                                        headers: myHeaders,
                                        body: raw,
                                        redirect: 'follow'
                                    };

                                    const response = await fetch(`https://myhome-backend.vercel.app/api/v1/properties/${id}`, requestOptions);

                                    if (!response.ok) {
                                        throw new Error(`HTTP error! Status: ${response.status}`);
                                    }

                                    const result = await response.json();
                                    console.log(result);
                                    Alert.alert('Éxito', 'El estado fue actualizado con éxito', [
                                        { text: 'OK', onPress: () => navigation.navigate("Mis propiedades") },
                                    ]);
                                } catch (error) {
                                    console.error('Error updating status:', error);
                                    Alert.alert('Error', 'Hubo un error al actualizar el estado, intente nuevamente', [
                                        { text: 'OK', onPress: () => console.log("ok") },
                                    ]);
                                }
                            }}
                        />
                    </View>

                    {selectedImage !== null && (
                        <TouchableOpacity
                            style={[styles.image, styles.selectedImage]}
                            onPress={() => setSelectedImage(null)}
                        >
                            <Image source={{ uri: propiedad.photos[selectedImage] }} style={styles.selectedImage} />
                        </TouchableOpacity>
                    )}

                    <View style={styles.imageContainer}>
                        {propiedad.photos.map((photo, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedImage(index)}
                                style={[
                                    styles.image,
                                    {
                                        borderColor: selectedImage === index ? 'blue' : 'transparent',
                                        borderWidth: selectedImage === index ? 2 : 0,
                                    },
                                ]}
                            >
                                <Image source={{ uri: photo }} style={styles.image} />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.form}>
                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Descripción: </Text>
                            <View style={styles.descripcionContainer}>
                                <Text style={styles.contacto}>{propiedad.description} </Text>
                            </View>
                        </View>
                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Antiguedad: </Text>
                            <Text style={styles.rawText2}>{propiedad.age} años</Text>
                        </View>
                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Dirección: </Text>
                            <View style={styles.descripcionContainer}>
                                <Text style={styles.rawText2}>{propiedad.address.street} {propiedad.address.number}, {propiedad.address.district}, {propiedad.address.province} </Text>
                            </View>
                        </View>
                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Precio:</Text>
                            <Text style={styles.precio}>{propiedad.price} {propiedad.currency}</Text>
                        </View>
                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Expensas:</Text>
                            <Text style={styles.precio}>{propiedad.expensesPrice} {propiedad.currency}</Text>
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
                            <Text style={styles.rawText}>Ambientes: </Text>
                            <Text style={styles.rawText2}>{propiedad.rooms}</Text>
                        </View>
                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Habitaciones: </Text>
                            <Text style={styles.rawText2}>{propiedad.bedrooms}</Text>
                        </View>
                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Baños: </Text>
                            <Text style={styles.rawText2}>{propiedad.bathrooms}</Text>
                        </View>
                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Terraza:</Text>
                            <Text style={styles.rawText2}>{propiedad.hasTerrace === "true" ? 'Si' : 'No'}</Text>
                        </View>
                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Balcón:</Text>
                            <Text style={styles.rawText2}>{propiedad.hasBalcony === "true" ? 'Si' : 'No'}</Text>
                        </View>
                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Baulera:</Text>
                            <Text style={styles.rawText2}>{propiedad.hasStorageRoom === "true" ? 'Si' : 'No'}</Text>
                        </View>
                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Garage:</Text>
                            <Text style={styles.rawText2}>{propiedad.garage}</Text>
                        </View>
                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Amenities:</Text>
                            <View style={[styles.fila]}>
                                {propiedad.amenities.map((amenity, index) => (
                                    <Text key={index} style={styles.rawText2}>
                                        {amenity}ㅤ
                                    </Text>
                                ))}
                            </View>
                        </View>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.fila}>
                            <Text style={styles.rawText}>Contacto:</Text>
                            <Text style={styles.contacto}>{propiedad.associatedRealEstate}</Text>
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
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 6,
    },
    selectedImage: {
        width: 300,
        height: 300, 
        resizeMode: 'cover',
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
        textTransform: "capitalize",
    },
    contacto: {
        fontSize: 16,
        marginBottom: 18,

    },
    precio: {
        fontSize: 16,
        marginBottom: 18,
        textTransform: "uppercase",
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
    dropdown: {
        height: 50,
        width: 150,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        marginBottom: 10,
        elevation: 2,
    },
    placeholderStyle: {
        fontSize: 16,
        width: 100,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        width: 50,
        fontSize: 16,
    },
    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2
    },
});