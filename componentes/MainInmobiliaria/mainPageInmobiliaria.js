import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';



export default function MainPageInmobiliaria() {
    return (
        <View style = {styles.container} >
            <Text style = {styles.title}>Bienvenido, Remax 01</Text>
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
        fontSize: 46,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 150
    }
})