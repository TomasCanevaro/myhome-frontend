import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as Location from 'expo-location';

export default function CrearPropiedad2({ route, navigation }) {
    const [calle, setCalle] = useState('');
    const [numero, setNumero] = useState('');
    const [piso, setPiso] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [provincia, setProvincia] = useState('');
    const [pais, setPais] = useState('');
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [tipoPropiedad, setTipoPropiedad] = useState('');
    const dataTipo = [
        { label: 'Casa', value: 'casa' },
        { label: 'Departamento', value: 'departamento' },
        { label: 'PH', value: 'ph' },
        { label: 'Local', value: 'local' },
        { label: 'Oficina', value: 'oficina' },
        { label: 'Galpon', value: 'galpon' },
        { label: 'Terreno', value: 'terreno' },
    ];

    const { selectedImages } = route.params;

    useEffect(() => {
        console.log('Location updated:');
        console.log('Latitud:', latitud)
        console.log('Longitud:', longitud)
        console.log(selectedImages)
        Location.requestForegroundPermissionsAsync();
    }, [latitud, longitud]);

    const geocode = async () => {
        try {
            
            const address = `${calle} ${numero}, ${localidad}`;
            const geocodedLocation = await Location.geocodeAsync(address);
            const firstResult = geocodedLocation[0];
            
            if (firstResult) {
                console.log('Geocoding result:', firstResult);
                setLatitud(firstResult.latitude);
                setLongitud(firstResult.longitude);
                
                return {
                    latitud: firstResult.latitude,
                    longitud: firstResult.longitude,
                };
            } else {
                console.log('Geocoding result is empty');
                return {};
            }
        } catch (error) {
            console.error('Error en geocode:', error);
            throw error; 
        }
    };

    const handleSubmit = async () => {
        if (calle === '' || numero === '' || localidad === '' || ciudad === '' || provincia === '' || pais === '') {
            Alert.alert('Error al continuar', 'Faltan rellenar algunos datos, por favor complételos', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
        else {
            geocode()
                .then(({ latitud, longitud }) => {
                    console.log("aaaaaaaaaaaaaaaa");
                    console.log(latitud);
                    console.log(longitud);
                    navigation.navigate('Crear propiedad: Paso 3', {
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
                    });

                    setCalle('');
                    setNumero('');
                    setPiso('');
                    setDepartamento('');
                    setLocalidad('');
                    setCiudad('');
                    setProvincia('');
                    setPais('');
                    setTipoPropiedad('');
                })
                .catch(error => {
                    console.error('Error en geocode:', error);
                });
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Complete la dirección</Text>
            <View style={styles.form}>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>Tipo</Text>
                    <Dropdown
                        style={styles.input}
                        placeholder=''
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={dataTipo}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        value={tipoPropiedad}
                        onChange={item => {
                            setTipoPropiedad(item.value);
                        }}
                    />
                </View>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>Calle</Text>
                    <TextInput
                        style={styles.input}
                        value={calle}
                        onChangeText={setCalle}
                        required />
                </View>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>Número</Text>
                    <TextInput
                        style={styles.input}
                        value={numero}
                        onChangeText={setNumero}
                        inputMode='numeric'
                        required />
                </View>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>Piso</Text>
                    <TextInput
                        style={styles.input}
                        value={piso}
                        onChangeText={setPiso}
                        inputMode='numeric' />
                </View>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>Departamento</Text>
                    <TextInput
                        style={styles.input}
                        value={departamento}
                        onChangeText={setDepartamento} />
                </View>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>Localidad</Text>
                    <TextInput
                        style={styles.input}
                        value={localidad}
                        onChangeText={setLocalidad}
                        required />
                </View>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>Ciudad</Text>
                    <TextInput
                        style={styles.input}
                        value={ciudad}
                        onChangeText={setCiudad}
                        required />
                </View>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>Provincia</Text>
                    <TextInput
                        style={styles.input}
                        value={provincia}
                        onChangeText={setProvincia}
                        required />
                </View>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>País</Text>
                    <TextInput
                        style={styles.input}
                        value={pais}
                        onChangeText={setPais}
                        required />
                </View>
            </View>

            <View style={styles.fila}>
                <TouchableOpacity style={styles.boton} title="Press me" onPress={() => navigation.navigate('Crear propiedad: Paso 1')} >
                    <Text style={styles.textoBoton}>Volver</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton} title="Press me" onPress={handleSubmit} >
                    <Text style={styles.textoBoton}>Siguiente</Text>
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
        marginRight: 20,
    },
    form: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: 10,
        borderRadius: 10,
        alignItems: 'flex-end'
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
    placeholderStyle: {
        fontSize: 16,
        width: 100,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
});