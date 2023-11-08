import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import * as SecureStore from 'expo-secure-store';
import { contactBackend } from '../../API';


export default function CrearPropiedad5({ route, navigation }) {

    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('');
    const [precio, setPrecio] = useState('');
    const [cambio, setCambio] = useState('');
    const [expensas, setExpensas] = useState('');
    const dataEstado = [
        { label: 'En alquiler', value: 'en alquiler' },
        { label: 'En venta', value: 'en venta' },
    ];
    const dataCambio = [
        { label: 'Pesos', value: 'pesos' },
        { label: 'Dólares', value: 'dolares' },
    ];

    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
    }

    const { calle, numero, piso, departamento, localidad, ciudad, provincia, pais,
        m2cub, m2semi, m2desc, ambientes, habitaciones, banos,
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
        if (descripcion === '' || estado === '' || precio === '' || cambio === '' || expensas === '') {
            Alert.alert('Error al continuar', 'Faltan rellenar algunos datos, por favor complételos', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
        else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("accept", "application/json");
            myHeaders.append("authorization", token);

            var raw = JSON.stringify({
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
                "rooms": ambientes,
                "bedrooms": habitaciones,
                "bathrooms": banos,
                "hasTerrace": terraza,
                "hasBalcony": balcon,
                "garage": "1",
                "hasStorageRoom": baulera,
                "age": "20",
                "propertyType": "casa",
                "squareMeters": {
                    "covered": m2cub,
                    "semiCovered": m2semi,
                    "uncovered": m2desc
                },
                "frontOrBack": ubicacion,
                "orientation": orientacion,
                "amenities": "pileta",
                "price": precio,
                "expensesPrice": expensas,
                "status": estado
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://myhome-backend.vercel.app/api/v1/properties", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Último paso!</Text>

            <View style={styles.form2}>
                <Text style={styles.rawText}>Descripcion</Text>
                <TextInput
                    style={styles.input}
                    value={descripcion}
                    onChangeText={setDescripcion} />
                <Text style={styles.rawText}>Estado</Text>
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
                    value={estado}
                    onChange={item => {
                        setEstado(item.value);
                    }}
                />
                <Text style={styles.checkText}>Precio</Text>
                <View style={styles.fila}>
                    <TextInput
                        style={styles.inputPrecio}
                        value={precio}
                        onChangeText={setPrecio}
                        inputMode='numeric' />
                    <Dropdown
                        style={styles.dropdownPrecio}
                        placeholder=''
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
                        value={expensas}
                        onChangeText={setExpensas}
                        inputMode='numeric' />
                    <Dropdown
                        style={styles.dropdownPrecio}
                        placeholder=''
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
                <TouchableOpacity style={styles.boton} title="Press me" onPress={() => navigation.navigate('Crear propiedad: Paso 4')} >
                    <Text style={styles.textoBoton}>Volver</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton} title="Press me" onPress={handleSubmit} >
                    <Text style={styles.textoBoton}>Crear propiedad</Text>
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