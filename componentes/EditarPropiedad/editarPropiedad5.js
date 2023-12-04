import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';

export default function EditarPropiedad5({ route, navigation }) {
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [cambio, setCambio] = useState('');
    const [expensas, setExpensas] = useState('');
    const dataCambio = [
        { label: 'Pesos', value: 'ars' },
        { label: 'Dólares', value: 'usd' },
    ];

    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
    }

    const { selectedImages, propertyID, propiedad, calle, numero, piso, departamento, localidad, ciudad, provincia, pais, latitud, longitud, tipoPropiedad,
        m2cub, m2semi, m2desc, antiguedad, ambientes, habitaciones, banos,
        terraza, balcon, garage, baulera, ubicacion, orientacion, amenities } = route.params;
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('')

    async function getData() {
        const userTokenKey = 'userToken'
        const userEmailKey = 'userMail'
        const storedTokenKey = await SecureStore.getItemAsync(userTokenKey)
        const storedEmailKey = await SecureStore.getItemAsync(userEmailKey)
        if (storedTokenKey) {
            setToken(storedTokenKey)
        }
        if (storedEmailKey) {
            setEmail(storedEmailKey)
        }
    }
    useEffect(
        React.useCallback(() => {
            getData();
        }, [])
    );

    const handleSubmit = async () => {
        if (descripcion === '' || precio === '' || cambio === '' || expensas === '') {
            Alert.alert('Error al continuar', 'Faltan rellenar algunos datos, por favor complételos', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
        else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("accept", "application/json");
            myHeaders.append("authorization", token);

            const id = propertyID;

            var raw = JSON.stringify({
                "currency": cambio,
                "description": descripcion,
                "associatedRealEstate": email,
                "address": {
                    "street": calle,
                    "number": numero,
                    "floor": piso,
                    "department": departamento,
                    "district": localidad,
                    "town": ciudad,
                    "province": provincia,
                    "country": pais
                },
                "geolocation": {
                    "latitude": latitud,
                    "longitude": longitud
                },
                "rooms": ambientes,
                "bedrooms": habitaciones,
                "bathrooms": banos,
                "hasTerrace": terraza,
                "hasBalcony": balcon,
                "garage": garage,
                "hasStorageRoom": baulera,
                "age": antiguedad,
                "propertyType": propiedad.propiedad.propiedad.propiedad.propertyType,
                "squareMeters": {
                    "covered": m2cub,
                    "semiCovered": m2semi,
                    "uncovered": m2desc
                },
                "frontOrBack": ubicacion,
                "orientation": orientacion,
                "amenities": amenities,
                "photos": selectedImages,
                "price": precio,
                "expensesPrice": expensas,
            });
            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch(`https://myhome-backend.vercel.app/api/v1/properties/${id}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        Alert.alert('Éxito', 'La propiedad fue modificada con éxito', [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                        console.log(result)
                        navigation.navigate('Inicio');
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
    }

    const volverAtras = async () => {
        navigation.navigate('Editar propiedad: Paso 4', {
            selectedImages: selectedImages,
            calle: calle,
            numero: numero,
            piso: piso,
            departamento: departamento,
            localidad: localidad,
            ciudad: ciudad,
            provincia: provincia,
            pais: pais,
            latitud: latitud,
            longitud: longitud,
            tipoPropiedad: tipoPropiedad,
            m2cub: m2cub,
            m2semi: m2semi,
            m2desc: m2desc,
            ambientes: ambientes,
            habitaciones: habitaciones,
            banos: banos,
            terraza: terraza,
            balcon: balcon,
            garage: garage,
            baulera: baulera,
            ubicacion: ubicacion,
            orientacion: orientacion,
            amenities: amenities,
            propertyID: propertyID,
            propiedad: propiedad
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Último paso!</Text>
            <View style={styles.form2}>
                <Text style={styles.rawText}>Descripcion</Text>
                <TextInput
                    style={styles.input}
                    placeholder={propiedad.propiedad.propiedad.propiedad.description}
                    value={descripcion}
                    onChangeText={setDescripcion} />
                <Text style={styles.checkText}>Precio</Text>
                <View style={styles.fila}>
                    <TextInput
                        style={styles.inputPrecio}
                        placeholder={propiedad.propiedad.propiedad.propiedad.price}
                        value={precio}
                        onChangeText={setPrecio}
                        inputMode='numeric' />
                    <Dropdown
                        style={styles.dropdownPrecio}
                        placeholder={propiedad.propiedad.propiedad.propiedad.currency}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={dataCambio}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        value={cambio}
                        onChange={item => {
                            setCambio(item.value);
                        }}
                    />
                </View>
                <Text style={styles.checkText}>Expensas</Text>
                <View style={styles.fila}>
                    <TextInput
                        style={styles.inputPrecio}
                        placeholder={propiedad.propiedad.propiedad.propiedad.expensesPrice}
                        value={expensas}
                        onChangeText={setExpensas}
                        inputMode='numeric' />
                    <Dropdown
                        style={styles.dropdownPrecio}
                        placeholder={propiedad.propiedad.propiedad.propiedad.currency}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={dataCambio}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        value={cambio}
                        onChange={item => {
                            setCambio(item.value);
                        }}
                    />
                </View>
            </View>

            <View style={styles.fila}>
                <TouchableOpacity style={styles.boton} title="Press me" onPress={volverAtras} >
                    <Text style={styles.textoBoton}>Volver</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton} title="Press me" onPress={handleSubmit} >
                    <Text style={styles.textoBoton}>Editar propiedad</Text>
                </TouchableOpacity>
            </View>

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        borderRadius: 6,
        backgroundColor: 'rgba(256, 256, 256, 0.6)',
        marginHorizontal: 15,
        marginVertical: 50,
        padding: 15,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    fila: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 100,
        width: 300,
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
        elevation: 2,
    },
    inputPrecio: {
        height: 50,
        width: 200,
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
        elevation: 2,
    },
    rawText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginRight: 100,
        marginTop: 5
    },
    checkbox: {
        marginBottom: 5,
        marginTop: 5
    },
    form1: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: 10,
        borderRadius: 10,
        alignItems: 'flex-end',
    },
    form2: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: 10,
        borderRadius: 10,
    },
    boton: {
        alignItems: 'center',
        backgroundColor: '#284B63',
        padding: 15,
        marginTop: 20,
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
        width: 300,
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
        elevation: 2,
    },
    dropdownPrecio: {
        height: 50,
        width: 100,
        marginLeft: 5,
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
        elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
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
});