import React, { useState, useEffect } from 'react'; 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

export default function UsuarioInicio({navigation}) { 

    return (
        <View style={styles.container}>
            <Text style={styles.textoh1}>Propiedades cercanas</Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 50,
        alignItems: 'center'
    },
    textoh1: {
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',
    },
});