import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Bienvenida({ navigation }){
  return (
    <View style={styles.container}>
      <Text style={styles.textoh1}>Bienvenido a MyHome</Text>
      <TouchableOpacity style={styles.boton} title="Press me" onPress={() => navigation.navigate('prelogin')} >
        <Text style={styles.textoBoton}>Soy una inmobiliaria</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boton} title="Press me" onPress={() => navigation.navigate('usuarioComunAcceder')} >
        <Text style={styles.textoBoton}>Estoy buscando una propiedad</Text>
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
  textoh1: {
      textAlign: 'center',
      color: 'black',
      fontSize: 40,
      fontWeight: 'bold',
  },
  textoBoton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  }

});