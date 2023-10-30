import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

export default function UsuarioComunAcceder({ navigation }) {


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.boton} title="Press me" onPress={() => navigation.navigate('usuarioComunElegirCuenta')} >
        <Text style={styles.textoBoton}>LogIn with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  boton: {
    alignItems: 'center',
    backgroundColor: '#284B63',
    padding: 25,
    marginTop: 50,
    borderRadius: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  textoBoton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  }
});