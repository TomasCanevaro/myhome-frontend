import React, { useState, useEffect } from 'react'; 
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { contactBackend } from '../../API';
import * as SecureStore from 'expo-secure-store';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';


export default function UsuarioComunLogin({navigation}) {
    
    GoogleSignin.configure();

    

    signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          setState({ userInfo });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      };

    return (
        <View style={styles.container}>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this._signIn}
                disabled={this.state.isSigninInProgress}
                />;
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
