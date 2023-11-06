import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

export default function UsuarioComunElegirCuenta({ navigation }) {


  return (
    <View style={styles.container}>
      <View style={styles.form}>
            <Text style={styles.label}>Elige una cuenta</Text>
            <TextInput style={styles.input} placeholder='Ingrese correo electronico' />
            <TouchableOpacity style={styles.boton} title="ComfirmarMail" onPress={() => navigation.navigate('mainPageUsuario')}  >
                <Text style={styles.textoBoton}>confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boton} title="Cancelar" onPress={() => navigation.navigate('bienvenida')}  >
                <Text style={styles.textoBoton}>cancelar</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 50,
        alignItems: 'center',
    },
    form: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
    },
    boton: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        marginTop: 10,
        borderRadius: 10,
        width: 260,
    },
    textoBoton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
});