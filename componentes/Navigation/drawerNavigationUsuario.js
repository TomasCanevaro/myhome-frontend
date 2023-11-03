import * as React from 'react';
import { DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import MenuButtonItem from '../Reusables/MenuButtonItem';
import MainPageUsuario from '../MainUsuario/mainPageUsuario';
import FavoritosUsuario from '../MainUsuario/favoritosUsuario';
import BuscarPropiedadUsuario from '../MainUsuario/buscarPropiedadUsuario';
import UsuarioComunAcceder from '../LogeoUsuario/usuarioComunAcceder';


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
            <Drawer.Screen name="Cerrar sesión" component={UsuarioComunAcceder} />
        </Drawer.Navigator>
    )
}

const MenuItems = ({ navigation }) => {

    return (
        <DrawerContentScrollView
            style={styles.container}
        >
            <Text style={styles.title}>Juan Gomez</Text>
            <View style={styles.linea} />

            <MenuButtonItem
                text='Inicio'
                onPress={() => navigation.navigate('Inicio')}
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