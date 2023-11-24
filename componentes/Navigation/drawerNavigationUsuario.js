import React, { useState, useEffect } from 'react';
import { DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import MenuButtonItem from '../Reusables/MenuButtonItem';
import MainPageUsuario from '../MainUsuario/mainPageUsuario';
import FavoritosUsuario from '../MainUsuario/favoritosUsuario';
import BuscarPropiedadUsuario from '../MainUsuario/buscarPropiedadUsuario';
import UsuarioComunAcceder from '../LogeoUsuario/UsuarioComunAcceder';
import VerPropiedad from '../VerPropiedad/verPropiedadUsuario';
import Perfil from '../MainUsuario/perfilUsuario'
import * as SecureStore from 'expo-secure-store';

const Drawer = createDrawerNavigator()

export default function DrawerNavigationUsuario() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <MenuItems {...props} />}
            screenOptions={{
                drawerStyle: {
                    width: 240,
                    borderRadius: 10
                },
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#284B63'
                }
            }}
        >
            <Drawer.Screen name="Inicio" component={MainPageUsuario} />
            <Drawer.Screen name="Buscar propiedad" component={BuscarPropiedadUsuario} />
            <Drawer.Screen name="Mis Favoritos" component={FavoritosUsuario} />
            <Drawer.Screen name="Ver propiedad" component={VerPropiedad} />
            <Drawer.Screen name="Perfil" component={Perfil} />
            <Drawer.Screen name="Cerrar sesión" component={UsuarioComunAcceder} />
        </Drawer.Navigator>
    )
}

const MenuItems = ({ navigation }) => {
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
        <DrawerContentScrollView
            style={styles.container}
        >
            <Text style={styles.title}>{fantasyName}</Text>
            <Text style={styles.subtitle}>Usuario</Text>
            <View style={styles.linea} />
            <MenuButtonItem
                text='Inicio'
                onPress={() => navigation.navigate('Inicio')}
            />
            <MenuButtonItem
                text='Perfil'
                onPress={() => navigation.navigate('Perfil')}
            />
            <MenuButtonItem
                text='Buscar propiedad'
                onPress={() => navigation.navigate('Buscar propiedad')}
            />
            <MenuButtonItem
                text='Favoritos'
                onPress={() => navigation.navigate('Mis Favoritos')}
            />
            <MenuButtonItem
                text='Cerrar sesion'
                onPress={() => navigation.navigate('usuarioComunAcceder')}
            />
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        color: '#6e6e6e'
    },
    linea: {
        borderBottomColor: '#d9dbdb',
        borderBottomWidth: 1,
        marginBottom: 15,
        marginTop: 10,
    },
    icono: {
        width: 75,
        height: 75,
        marginBottom: 15
    }
})