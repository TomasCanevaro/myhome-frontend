import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';

export default function CrearPropiedad2() {
    return (
        <View style={styles.container}>
            <Text>Completa la direccion</Text>
            <View style ={styles.container2}>
                <Text>asd</Text>
            </View>
            

            <TouchableOpacity style={styles.boton} title="Press me" onPress={() => console.log('asd')} >
                <Text style={styles.textoBoton}>Siguiente</Text>
            </TouchableOpacity>

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        borderRadius: 6,
        backgroundColor: 'rgba(256, 256, 256, 0.6)',
        marginHorizontal: 15,
        marginVertical: 15,
        padding: 15,
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container2: {
        borderRadius: 6,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        marginHorizontal: 15,
        marginVertical: 30,
        height: 200,
        width: 150,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }
});