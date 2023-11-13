import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';

export default function CrearPropiedad4({ route, navigation }) {
    const [checkTerraza, setCheckTerraza] = useState(false);
    const [checkBalcon, setCheckBalcon] = useState(false);
    const [checkBaulera, setCheckBaulera] = useState(false);
    const [garage, setGarage] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [orientacion, setOrientacion] = useState('');
    const [amenities, setAmenities] = useState('');
    const dataUbicacion = [
        { label: 'Frente', value: 'frente' },
        { label: 'Contrafrente', value: 'contrafrente' },
    ];
    const dataOrientacion = [
        { label: 'Norte', value: 'norte' },
        { label: 'Sur', value: 'sur' },
        { label: 'Este', value: 'este' },
        { label: 'Oeste', value: 'oeste' },
    ];
    const dataAmenities = [
        { label: 'Quincho', value: 'quincho' },
        { label: 'Pileta', value: 'pileta' },
        { label: 'Jacuzzi', value: 'jacuzzi' },
        { label: 'Sauna', value: 'sauna' },
        { label: 'SUM', value: 'SUM' },
        { label: 'Sala de juegos', value: 'sala de juegos' },
    ];

    const {selectedImages, calle, numero, piso, departamento, localidad, ciudad, provincia, pais, latitud, longitud, tipoPropiedad, m2cub, m2semi, m2desc, antiguedad, ambientes, habitaciones, banos } = route.params;

    const handleSubmit = async () => {
        if (ubicacion === '' || orientacion === '') {
            Alert.alert('Error al continuar', 'Faltan rellenar algunos datos, por favor complételos', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
        else {
            navigation.navigate('Crear propiedad: Paso 5', {
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
                antiguedad: antiguedad,
                ambientes: ambientes,
                habitaciones: habitaciones,
                banos: banos,
                terraza: checkTerraza,
                balcon: checkBalcon,
                baulera: checkBaulera,
                garage: garage,
                ubicacion: ubicacion,
                orientacion: orientacion,
                amenities: amenities
            })
            setCheckTerraza(false);
            setCheckBalcon(false);
            setCheckBaulera(false);
            setGarage('')
            setUbicacion('');
            setOrientacion('');
            setAmenities('');
        }
    }

    const volverAtras = async () => {
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
            m2cub: m2cub,
            m2semi: m2semi,
            m2desc: m2desc,
            ambientes: ambientes,
            habitaciones: habitaciones,
            banos: banos,
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Datos</Text>
            <View style={styles.form1}>
                <View style={styles.fila}>
                    <Text style={styles.checkText}>Terraza</Text>
                    <Checkbox
                        style={styles.checkbox}
                        value={checkTerraza}
                        onValueChange={setCheckTerraza} />
                </View>
                <View style={styles.fila}>
                    <Text style={styles.checkText}>Balcon</Text>
                    <Checkbox
                        style={styles.checkbox}
                        value={checkBalcon}
                        onValueChange={setCheckBalcon} />
                </View>
                <View style={styles.fila}>
                    <Text style={styles.checkText}>Baulera</Text>
                    <Checkbox
                        style={styles.checkbox}
                        value={checkBaulera}
                        onValueChange={setCheckBaulera} />
                </View>
                <View style={styles.fila}>
                    <Text style={styles.garageText}>Garage (cantidad)</Text>
                    <TextInput
                        style={styles.input}
                        value={garage}
                        onChangeText={setGarage}
                        inputMode='numeric'
                        required />
                </View>
            </View>
            

            <View style={styles.form2}>
                <Text style={styles.rawText}>Ubicacion</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholder=''
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataUbicacion}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    value={ubicacion}
                    onChange={item => {
                        setUbicacion(item.value);
                    }}
                />
                <Text style={styles.rawText}>Orientacion</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholder=''
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataOrientacion}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    value={orientacion}
                    onChange={item => {
                        setOrientacion(item.value);
                    }}
                />
                <Text style={styles.rawText}>Amenities</Text>
                <MultiSelect
                    style={styles.dropdown}
                    placeholder=''
                    iconStyle={styles.iconStyle}
                    data={dataAmenities}
                    labelField="label"
                    valueField="value"
                    value={amenities}
                    selectedStyle={styles.selectedStyle}
                    onChange={item => {
                        setAmenities(item);
                    }}
                />
            </View>

            <View style={styles.fila}>
                <TouchableOpacity style={styles.boton} title="Press me" onPress={volverAtras} >
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
        marginVertical: 45,
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
        width: 50,
        backgroundColor: 'rgba(256, 256, 256, 0.6)',
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
    },
    rawText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    garageText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 18,
        marginRight: 20,
    },
    checkText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginRight: 100,
        marginTop: 5
    },
    checkbox: {
        marginBottom: 10,
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
        marginTop: 40
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