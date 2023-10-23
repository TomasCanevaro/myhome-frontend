import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function PreLogin({navigation}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.boton} title="Press me" onPress={() => navigation.navigate('logearInmobiliaria')} >
        <Text style={styles.textoBoton}>Ya tengo usuario</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boton} title="Press me" onPress={() => navigation.navigate('registrarInmobiliaria')} >
        <Text style={styles.textoBoton}>Quiero registrar mi inmobiliaria</Text>
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
