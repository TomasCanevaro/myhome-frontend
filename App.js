import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { firebase } from '@react-native-firebase/app';

import Bienvenida from './componentes/bienvenida';
import UsuarioComunAcceder from './componentes/LogeoUsuario/UsuarioComunAcceder';
import UsuarioComunLogin from './componentes/LogeoUsuario/usuarioComunLogin';
import UsuarioComunCrearCuenta from './componentes/LogeoUsuario/usuarioComunCrearCuenta';
import RecuperarClaveUsuario from './componentes/LogeoUsuario/recuperarClaveUsuario';
import RecuperarClaveUsuario2 from './componentes/LogeoUsuario/recuperarClaveUsuario2';
import UsuarioInicio from './componentes/MainUsuario/mainPageUsuario';

import PreLogin from './componentes/LogeoInmobiliaria/preLogin';
import RegisterInmobiliaria from './componentes/LogeoInmobiliaria/registerInmobiliaria';
import LoginInmobiliaria from './componentes/LogeoInmobiliaria/loginInmobiliaria';
import RecuperarClave from './componentes/LogeoInmobiliaria/recuperarClave';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPageInmobiliaria from './componentes/MainInmobiliaria/mainPageInmobiliaria';
import MainPageUsuario from './componentes/MainUsuario/mainPageUsuario';
import DrawerNavigation from './componentes/Navigation/drawerNavigation';
import DrawerNavigationUsuario from './componentes/Navigation/drawerNavigationUsuario';
import Card from './componentes/Reusables/card';
import RecuperarClave2 from './componentes/LogeoInmobiliaria/recuperarClave2';



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
            <Stack.Screen name="usuarioComunLogin" component={UsuarioComunLogin} />
            <Stack.Screen name="usuarioComunCrearCuenta" component={UsuarioComunCrearCuenta} />
            <Stack.Screen name="recuperarClaveUsuario" component={RecuperarClaveUsuario} />
            <Stack.Screen name="recuperarClaveUsuario2" component={RecuperarClaveUsuario2} />
            <Stack.Screen name="mainPageUsuario" component={DrawerNavigationUsuario} />
            
            <Stack.Screen name="registrarInmobiliaria" component={RegisterInmobiliaria} />
            <Stack.Screen name="prelogin" component={PreLogin} />
            <Stack.Screen name="logearInmobiliaria" component={LoginInmobiliaria} />
            <Stack.Screen name="recuperarClave" component={RecuperarClave} />
            <Stack.Screen name="recuperarClave2" component={RecuperarClave2} />
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
