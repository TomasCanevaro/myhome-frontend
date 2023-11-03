import React, { useState, useEffect } from 'react'; 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';

export default function BuscarPropiedadUsuario({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Buscá tu propiedad</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        padding: 15,
        alignContent: 'center',
        alignItems: 'center'
    },

    title: {
        fontSize: 38,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 30
    }
})