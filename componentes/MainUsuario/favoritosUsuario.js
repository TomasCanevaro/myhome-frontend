import React, { useState, useEffect } from 'react'; 
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import Card from '../Reusables/card';

export default function FavoritosUsuario({navigation}) { 
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Card>
                    
                    <View style={styles.columna}>
                        <Image
                            style={styles.icono}
                            source={require('../../assets/casa.png')}
                        />
                    </View>
                    <View style={styles.columna2}>
                        <Text style={styles.title}>Depto. en alquiler</Text>
                    </View>
                    <View style={styles.columna3}>
                        <Text style={styles.rawText}>$100.000</Text>
                        <Text style={styles.rawText}>1 amb.</Text>
                        <Text style={styles.rawText}>Tigre</Text>
                        <View style={styles.columna4}>
                            <TouchableOpacity>
                                <Image
                                    style={styles.clickableIcon}
                                    source={require('../../assets/edit.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image
                                    style={styles.clickableIcon}
                                    source={require('../../assets/delete.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>
                <Card>
                    <View style={styles.columna}>
                        <Image
                            style={styles.icono}
                            source={require('../../assets/casa.png')}
                        />
                    </View>
                    <View style={styles.columna2}>
                        <Text style={styles.title}>Casa en alquiler</Text>
                    </View>
                    <View style={styles.columna3}>
                        <Text style={styles.rawText}>$150.000</Text>
                        <Text style={styles.rawText}>3 amb.</Text>
                        <Text style={styles.rawText}>Pilar</Text>
                        <View style={styles.columna4}>
                            <TouchableOpacity>
                                <Image
                                    style={styles.clickableIcon}
                                    source={require('../../assets/edit.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image
                                    style={styles.clickableIcon}
                                    source={require('../../assets/delete.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    textoh1: {
        textAlign: 'center',
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',
    },
    columna: {
        padding: 15,
        alignContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    columna2: {
        padding: 15,
        alignContent: 'center',
        alignItems: 'center',
        flex: 4
    },
    columna3: {
        alignContent: 'center',
        alignItems: 'center',
        flex: 2
    },
    columna4: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 2,
        marginTop: 15
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    rawText: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    icono: {
        width: 60,
        height: 60,
    },
    clickableIcon: {
        width: 35,
        height: 35,
        marginStart: 10
    }
});