import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

export default function UsuarioComunAcceder({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.boton} title="Press me" onPress={() => navigation.navigate('usuarioComunLogin')} >
        <Text style={styles.textoBoton}>Iniciar Sesion</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boton} title="Press me" onPress={() => navigation.navigate('usuarioComunCrearCuenta')} >
        <Text style={styles.textoBoton}>Crear Cuenta Nueva</Text>
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