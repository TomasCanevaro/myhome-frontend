import React, { useState, useEffect } from 'react'; 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';



export default function MainPageInmobiliaria() {

    const [fantasyName, setFantasyName] = useState(''); 

    async function getData() {
        const userTokenKey = 'userToken'
        const fantasyNameKey = 'fantasyName'
        const storedFantasyName = await SecureStore.getItemAsync(fantasyNameKey)
        if (storedFantasyName){
            setFantasyName(storedFantasyName)
        }
    }
    useEffect(
        React.useCallback(() => {
          getData();
        }, [])
      );

    return (
        <View style={styles.container} >
            <Text style={styles.title}>Bienvenido, {fantasyName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        padding: 15,
        alignContent: 'center',
        alignItems: 'center'
    },

    title: {
        fontSize: 46,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 150
    }
})