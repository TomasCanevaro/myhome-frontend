import React from 'react';
import { View, Text } from 'react-native';

const Bienvenida = ({ navigation }) => {
  return (
    <View>
      <Text>Bienvenido a MyHome</Text>
      <Button
        title="Soy una inmobiliaria"
        onPress={() => navigation.navigate('UsuarioComunAcceder')}
      />
      <Button
        title="Estoy buscando una propiedad"
        onPress={() => navigation.navigate('UsuarioComunAcceder')}
      />
    </View>
  );
};

export default Bienvenida;