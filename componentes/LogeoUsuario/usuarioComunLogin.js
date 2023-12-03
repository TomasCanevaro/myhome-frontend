import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default function UsuarioComunLogin({ navigation }) {
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '62431394071-erqrqvaei5isuno42du1hr1fcovgltn6.apps.googleusercontent.com'
    });
  }, []);

  const signIn = async () => {
    try {
      setIsSigninInProgress(true);
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      setIsSigninInProgress(false);
    } catch (error) {
      setIsSigninInProgress(false);
      let message;
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          message = 'Inicio de sesión cancelado por el usuario.';
          break;
        case statusCodes.IN_PROGRESS:
          message = 'El inicio de sesión ya está en proceso.';
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          message = 'Play Services no está disponible o está desactualizado.';
          break;
        default:
          message = `Ocurrió un error durante el inicio de sesión: ${error.message}`;
      }
      Alert.alert('Error', message);
    }
  };

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        disabled={isSigninInProgress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  boton: {
    alignItems: 'center',
    backgroundColor: '#284B63',
    padding: 25,
    marginTop: 30,
    borderRadius: 10,
    width: 260,
  },
  botonChico: {
    alignItems: 'center',
    backgroundColor: '#284B63',
    padding: 10,
    marginTop: 30,
    borderRadius: 10,
    width: 260,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 50,
    alignItems: 'center'
  },
  textoh1: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
  },
  textoBoton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  subtitulo: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: 'white',
    width: 300,
    padding: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    fontSize: 20,
    marginBottom: 12,
  },
});
