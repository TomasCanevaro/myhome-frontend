import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from '../Navigation/drawerNavigation';


export default function MainPageInmobiliaria() {
    return (
      <NavigationContainer>
        <DrawerNavigation/>
      </NavigationContainer>
    );
  }