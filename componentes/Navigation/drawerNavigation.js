import React, { useState, useEffect } from 'react'; 
import { DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer";
import PreLogin from "../LogeoInmobiliaria/preLogin";
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import MenuButtonItem from '../Reusables/MenuButtonItem';
import MainPageInmobiliaria from '../MainInmobiliaria/mainPageInmobiliaria';
import MisPropiedades from '../MainInmobiliaria/misPropiedades';
import CrearPropiedad from '../CrearPropiedad/crearPropiedad';
import CrearPropiedad2 from '../CrearPropiedad/crearPropiedad2';
import CrearPropiedad3 from '../CrearPropiedad/crearPropiedad3';
import CrearPropiedad4 from '../CrearPropiedad/crearPropiedad4';
import CrearPropiedad5 from '../CrearPropiedad/crearPropiedad5';
import * as SecureStore from 'expo-secure-store';
import VerPropiedad from '../VerPropiedad/verPropiedad';

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
            <Drawer.Screen name="Crear propiedad: Paso 1" component={CrearPropiedad} />
            <Drawer.Screen name="Crear propiedad: Paso 2" component={CrearPropiedad2} />
            <Drawer.Screen name="Crear propiedad: Paso 3" component={CrearPropiedad3} />
            <Drawer.Screen name="Crear propiedad: Paso 4" component={CrearPropiedad4} />
            <Drawer.Screen name="Crear propiedad: Paso 5" component={CrearPropiedad5} />
            <Drawer.Screen name="Ver propiedad" component={VerPropiedad} />
            <Drawer.Screen name="Cerrar sesión" component={PreLogin} />
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
            <Image
                style={styles.icono}
                source={require('../../assets/iconInmobiliaria.png')}
            />
            <Text style={styles.title}>{fantasyName}</Text>
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
                onPress={() => navigation.navigate('Crear propiedad: Paso 1')}
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