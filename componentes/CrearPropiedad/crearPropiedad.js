import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';

export default function CrearPropiedad({navigation}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                alert('hola')
            }}>
                <Image
                    style={styles.agregarImagen}
                    source={require('../../assets/addPhoto.png')} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.boton} title="Press me" onPress={() => navigation.navigate('Crear propiedad: Paso 2')} >
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
    agregarImagen: {
        width: 100,
        height: 100,
        opacity: 1
    },
    boton: {
        alignItems: 'center',
        backgroundColor: '#284B63',
        padding: 25,
        marginTop: 50,
        borderRadius: 10,
        width: 260,
    },
    textoBoton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    }
    


});
