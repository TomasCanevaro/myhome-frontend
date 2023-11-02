import * as React from 'react';
import { DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer";
import PreLogin from "../LogeoInmobiliaria/preLogin";
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import MenuButtonItem from '../Reusables/MenuButtonItem';
import MainPageInmobiliaria from '../MainInmobiliaria/mainPageInmobiliaria';
import Card from '../Reusables/card';
import MisPropiedades from '../MainInmobiliaria/misPropiedades';

const Drawer = createDrawerNavigator()

export default function DrawerNavigation() {
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
            <Drawer.Screen name="Inicio" component={MainPageInmobiliaria} />
            <Drawer.Screen name="Mis propiedades" component={MisPropiedades} />
            <Drawer.Screen name="Crear propiedad" component={PreLogin} />
            <Drawer.Screen name="Cerrar sesión" component={PreLogin} />
        </Drawer.Navigator>
    )
}

const MenuItems = ({ navigation }) => {

    return (
        <DrawerContentScrollView
            style={styles.container}
        >
            <Image
                style={styles.icono}
                source={require('../../assets/iconInmobiliaria.png')}
            />
            <Text style={styles.title}>Remax 01</Text>
            <Text style={styles.subtitle}>Inmobiliaria</Text>
            <View style={styles.linea} />

            <MenuButtonItem
                text='Inicio'
                onPress={() => navigation.navigate('Inicio')}
            />
            <MenuButtonItem
                text='Mis propiedades'
                onPress={() => navigation.navigate('Mis propiedades')}
            />
            <MenuButtonItem
                text='Crear propiedad'
                onPress={() => navigation.navigate('Crear propiedad')}
            />
            <MenuButtonItem
                text='Cerrar sesion'
                onPress={() => navigation.navigate('prelogin')}
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