import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';

export default function CrearPropiedad2() {

    const [calle, setCalle] = useState('');
    const [numero, setNumero] = useState('');
    const [piso, setPiso] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [provincia, setProvincia] = useState('');
    const [pais, setPais] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Complete la dirección</Text>
            <View style={styles.form}>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>Calle</Text>
                    <TextInput
                        style={styles.input}
                        value={calle}
                        onChangeText={setCalle} />
                </View>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>Número</Text>
                    <TextInput
                        style={styles.input}
                        value={numero}
                        onChangeText={setNumero} />
                </View>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>Piso</Text>
                    <TextInput
                        style={styles.input}
                        value={piso}
                        onChangeText={setPiso} />
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
                        onChangeText={setLocalidad} />
                </View>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>Ciudad</Text>
                    <TextInput
                        style={styles.input}
                        value={ciudad}
                        onChangeText={setCiudad} />
                </View>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>Provincia</Text>
                    <TextInput
                        style={styles.input}
                        value={provincia}
                        onChangeText={setProvincia} />
                </View>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>País</Text>
                    <TextInput
                        style={styles.input}
                        value={pais}
                        onChangeText={setPais} />
                </View>
            </View>

        <View style={styles.fila}>
            <TouchableOpacity style={styles.boton} title="Press me" onPress={() => console.log('asd')} >
                <Text style={styles.textoBoton}>Volver</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boton} title="Press me" onPress={() => console.log('asd')} >
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
});