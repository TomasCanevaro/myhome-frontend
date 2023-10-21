import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import PreLogin from './componentes/LoginInmobiliaria/preLogin';
import RegisterInmobiliaria from './componentes/LoginInmobiliaria/registerInmobiliaria';

const fondo = require('./assets/fondo.jpeg');

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={fondo} resizeMode='cover' style={styles.estiloFondo}>
        <RegisterInmobiliaria></RegisterInmobiliaria>
      </ImageBackground>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  estiloFondo: {
    flex: 1,
    justifyContent: 'center',
  },
});
