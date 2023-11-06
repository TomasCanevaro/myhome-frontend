import React, { useState, useEffect } from 'react'; 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Image, View, TouchableOpacity } from 'react-native';
import Dropdown from 'react-native-input-select';
import { RadioButton } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

export default function BuscarPropiedadUsuario({navigation}) {

    const [operacion, setOperacion] = useState('');
    const [tipoPropiedad, setTipoPropiedad] = useState('');
    const [provincia, setProvincia] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [barrio, setBarrio] = useState('');
    const [tipoCambio, setTipoCambio] = useState('');
    const [desde, setDesde] = useState('');
    const [hasta, setHasta] = useState('');

    return (
        <View style={styles.container}>
        <ScrollView>
            <Text style={styles.title}>Buscá tu propiedad</Text>
            <View style={styles.form}>
                <View style={styles.fila}>
                    <Dropdown
                        dropdownStyle={styles.input}
                        labelStyle={styles.rawText}
                        label="Operación"
                        placeholder="Elegir"
                        options={[
                            { label: 'Venta', value: 'Venta' },
                            { label: 'Alquiler', value: 'Alquiler' },
                            { label: 'Reserva', value: 'Reserva' }
                        ]}
                        selectedValue={operacion}
                        onValueChange={(value) => setOperacion(value)}
                        primaryColor={'green'}
                    />
                </View>
                <View style={styles.fila}>
                    <Dropdown
                        dropdownStyle={styles.input}
                        labelStyle={styles.rawText}
                        label="Tipo de propiedad"
                        placeholder="Elegir"
                        options={[
                            { label: 'Casa', value: 'Casa' },
                            { label: 'Departamento', value: 'Departamento' }
                        ]}
                        selectedValue={tipoPropiedad}
                        onValueChange={(value) => setTipoPropiedad(value)}
                        primaryColor={'green'}
                    />
                </View>
                <View style={styles.fila}>
                    <Dropdown
                        dropdownStyle={styles.input}
                        labelStyle={styles.rawText}
                        label="Provincia"
                        placeholder="Elegir"
                        options={[
                            { label: 'Buenos Aires', value: 'Buenos Aires' },
                            { label: 'CABA', value: 'CABA' },
                            { label: 'Cordoba', value: 'Cordoba' }
                        ]}
                        selectedValue={provincia}
                        onValueChange={(value) => setProvincia(value)}
                        primaryColor={'green'}
                    />
                </View>
                <View style={styles.fila}>
                    <Dropdown
                        dropdownStyle={styles.input}
                        labelStyle={styles.rawText}
                        label="Localidad"
                        placeholder="Elegir"
                        options={[
                            { label: 'La Plata', value: 'La Plata' },
                            { label: 'Olavarria', value: 'Olavarria' },
                            { label: 'Mar del Plata', value: 'Mar del Plata' }
                        ]}
                        selectedValue={localidad}
                        onValueChange={(value) => setLocalidad(value)}
                        primaryColor={'green'}
                    />
                </View>
                <View style={styles.fila}>
                    <Dropdown
                        dropdownStyle={styles.input}
                        labelStyle={styles.rawText}
                        label="Barrio"
                        placeholder="Elegir"
                        options={[
                            { label: 'Palermo', value: 'Palermo' },
                            { label: 'Villa Urquiza', value: 'Villa Urquiza' },
                            { label: 'Liniers', value: 'Liniers' }
                        ]}
                        selectedValue={barrio}
                        onValueChange={(value) => setBarrio(value)}
                        primaryColor={'green'}
                    />
                </View>
                <View style={styles.fila}>
                    <RadioButton.Group onValueChange={value => setTipoCambio(value)} value={tipoCambio}>
                        <RadioButton.Item label="Pesos" value="pesos" />
                        <RadioButton.Item label="Dólares" value="dolares" />
                    </RadioButton.Group>
                </View>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>Desde</Text>
                    <TextInput
                        style={styles.input}
                        value={desde}
                        onChangeText={setDesde} />
                </View>
                <View style={styles.fila}>
                    <Text style={styles.rawText}>Hasta</Text>
                    <TextInput
                        style={styles.input}
                        value={hasta}
                        onChangeText={setHasta} />
                </View>
            </View>

            <View style={styles.fila}>
                <TouchableOpacity style={styles.boton} title="Press me" onPress={() => console.log('buscar')} >
                    <Text style={styles.textoBoton}>Buscar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        borderRadius: 6,
        backgroundColor: 'rgba(256, 256, 256, 0.6)',
        marginHorizontal: 15,
        marginVertical: 50,
        padding: 15,
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    fila: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 35,
        width: 200,
        backgroundColor: 'rgba(256, 256, 256, 0.6)',
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
    },
    rawText: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
        marginRight: 20,
        
    },
    form: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: 10,
        borderRadius: 10,
        alignItems: 'flex-end'
    },
    boton: {
        alignItems: 'center',
        backgroundColor: '#284B63',
        padding: 15,
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 10,
        width: 150,
    },
    textoBoton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    }
})