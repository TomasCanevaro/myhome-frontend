import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import PreLogin from './componentes/LogeoInmobiliaria/preLogin';
import RegisterInmobiliaria from './componentes/LogeoInmobiliaria/registerInmobiliaria';
import LoginInmobiliaria from './componentes/LogeoInmobiliaria/loginInmobiliaria';
import RecuperarClave from './componentes/LogeoInmobiliaria/recuperarClave';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const fondo = require('./assets/fondo.jpeg');
const Stack = createNativeStackNavigator();

export default function App() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };

  return (
    <ImageBackground source={fondo} resizeMode='cover' style={styles.estiloFondo}>
      <NavigationContainer theme={MyTheme}>
        <View style={styles.container}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="prelogin" component={PreLogin} />
            <Stack.Screen name="registrarInmobiliaria" component={RegisterInmobiliaria} />
            <Stack.Screen name="logearInmobiliaria" component={LoginInmobiliaria} />
            <Stack.Screen name="recuperarClave" component={RecuperarClave} />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </ImageBackground>
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
