import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { contactBackend } from '../../API';

export default function RegisterInmobiliaria({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');

    
    return (
        <View style={styles.container}>
            <Text style={styles.textoh1}>Editar perfil</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Nombre de fantasía'
                    value={nombre}
                    onChangeText={setNombre} />
                <Text style={styles.label}>Apellido</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Apellido de fantasía'
                    value={apellido}
                    onChangeText={setApellido} />
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Correo electrónico'
                    value={email}
                    onChangeText={setEmail} />
            </View>
            <TouchableOpacity style={styles.boton} title="Save" onPress={ () => {} } >
                <Text style={styles.textoBoton}>Guardar cambios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boton} title="DeleteUser" onPress={ () => {} } >
                <Text style={styles.textoBoton}>Dar de baja cuenta</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    boton: {
        alignItems: 'center',
        backgroundColor: '#284B63',
        padding: 25,
        marginTop: 50,
        borderRadius: 10,
        width: 260,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 50,
        alignItems: 'center',
    },
    textoh1: {
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',
    },
    textoBoton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    subtitulo: {
        marginTop: 20,
        fontSize: 14,
        fontWeight: 'bold'
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
    }

});
