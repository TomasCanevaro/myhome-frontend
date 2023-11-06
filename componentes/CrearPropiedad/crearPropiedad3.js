import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';

export default function CrearPropiedad3({navigation}) {

    const [m2cub, setM2cub] = useState('');
    const [m2semi, setM2semi] = useState('');
    const [m2desc, setM2desc] = useState('');
    const [ambientes, setAmbientes] = useState('');
    const [habitaciones, setHabitaciones] = useState('');
    const [banos, setBanos] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dimensiones</Text>
            <View style={styles.form}>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>m2 cubiertos </Text>
                    <TextInput
                        style={styles.input}
                        value={m2cub}
                        onChangeText={setM2cub}
                        inputMode='numeric' />
                </View>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>m2 semi-cubiertos</Text>
                    <TextInput
                        style={styles.input}
                        value={m2semi}
                        onChangeText={setM2semi}
                        inputMode='numeric' />
                </View>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>m2 descubiertos</Text>
                    <TextInput
                        style={styles.input}
                        value={m2desc}
                        onChangeText={setM2desc}
                        inputMode='numeric' />
                </View>
            </View>

            <Text style={styles.title}>Datos de la propiedad</Text>
            <View style={styles.form}>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>Ambientes</Text>
                    <TextInput
                        style={styles.input}
                        value={ambientes}
                        onChangeText={setAmbientes}
                        inputMode='numeric' />
                </View>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>Habitaciones</Text>
                    <TextInput
                        style={styles.input}
                        value={habitaciones}
                        onChangeText={setHabitaciones}
                        inputMode='numeric' />
                </View>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>Baños</Text>
                    <TextInput
                        style={styles.input}
                        value={banos}
                        onChangeText={setBanos}
                        inputMode='numeric' />
                </View>
            </View>

        <View style={styles.fila}>
            <TouchableOpacity style={styles.boton} title="Press me" onPress={() => navigation.navigate('Crear propiedad: Paso 2')} >
                <Text style={styles.textoBoton}>Volver</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boton} title="Press me" onPress={() => navigation.navigate('Crear propiedad: Paso 4')} >
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
        flex: 1,
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
        marginTop: 20
    },
    input: {
        height: 35,
        width: 150,
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
        alignItems: 'flex-end',

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
});