import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

import Bienvenida from './componentes/bienvenida';
import UsuarioComunAcceder from './componentes/LogeoUsuario/usuarioComunAcceder';
import UsuarioComunElegirCuenta from './componentes/LogeoUsuario/usuarioComunElegirCuenta';
import UsuarioInicio from './componentes/LogeoUsuario/usuarioInicio';

import PreLogin from './componentes/LogeoInmobiliaria/preLogin';
import RegisterInmobiliaria from './componentes/LogeoInmobiliaria/registerInmobiliaria';
import LoginInmobiliaria from './componentes/LogeoInmobiliaria/loginInmobiliaria';
import RecuperarClave from './componentes/LogeoInmobiliaria/recuperarClave';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPageInmobiliaria from './componentes/MainInmobiliaria/mainPageInmobiliaria';
import DrawerNavigation from './componentes/Navigation/drawerNavigation';


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
          <Stack.Navigator initialRouteName="bienvenida" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="bienvenida" component={Bienvenida} />

            <Stack.Screen name="usuarioComunAcceder" component={UsuarioComunAcceder} />
            <Stack.Screen name="usuarioComunElegirCuenta" component={UsuarioComunElegirCuenta} />
            <Stack.Screen name="usuarioInicio" component={UsuarioInicio} />
            
            <Stack.Screen name="registrarInmobiliaria" component={RegisterInmobiliaria} />
            <Stack.Screen name="prelogin" component={PreLogin} />
            <Stack.Screen name="logearInmobiliaria" component={LoginInmobiliaria} />
            <Stack.Screen name="recuperarClave" component={RecuperarClave} />
            <Stack.Screen name="mainPageInmobiliaria" component={DrawerNavigation} />
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
