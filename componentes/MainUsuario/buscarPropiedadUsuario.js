import React, { useState, useEffect } from 'react'; 
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
    const [ambientes, setAmbientes] = useState('');
    const [dormitorios, setDormitorios] = useState('');
    const [baños, setBaños] = useState('');
    const [antiguedad, setAntiguedad] = useState('');
    const [amenities, setAmenities] = useState('');

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
                    <Dropdown
                        dropdownStyle={styles.input}
                        labelStyle={styles.rawText}
                        label="Desde"
                        placeholder="Elegir"
                        options={[
                            { label: '50.000', value: '50.000' },
                            { label: '60.000', value: '60.000' },
                            { label: '70.000', value: '70.000' }
                        ]}
                        selectedValue={desde}
                        onValueChange={(value) => setDesde(value)}
                        primaryColor={'green'}
                    />
                </View>
                <View style={styles.fila}>
                    <Dropdown
                        dropdownStyle={styles.input}
                        labelStyle={styles.rawText}
                        label="Hasta"
                        placeholder="Elegir"
                        options={[
                            { label: '100.000', value: '100.000' },
                            { label: '120.000', value: '120.000' },
                            { label: '150.000', value: '150.000' }
                        ]}
                        selectedValue={hasta}
                        onValueChange={(value) => setHasta(value)}
                        primaryColor={'green'}
                    />
                </View>
                <View style={styles.fila}>
                    <Dropdown
                        dropdownStyle={styles.input}
                        labelStyle={styles.rawText}
                        label="Ambientes"
                        placeholder="Elegir"
                        options={[
                            { label: '1', value: '1' },
                            { label: '2', value: '2' },
                            { label: '3', value: '3' }
                        ]}
                        selectedValue={ambientes}
                        onValueChange={(value) => setAmbientes(value)}
                        primaryColor={'green'}
                    />
                </View>
                <View style={styles.fila}>
                    <Dropdown
                        dropdownStyle={styles.input}
                        labelStyle={styles.rawText}
                        label="Dormitorios"
                        placeholder="Elegir"
                        options={[
                            { label: '0', value: '0' },
                            { label: '1', value: '1' },
                            { label: '2', value: '2' },
                            { label: '3', value: '3' }
                        ]}
                        selectedValue={dormitorios}
                        onValueChange={(value) => setDormitorios(value)}
                        primaryColor={'green'}
                    />
                </View>
                <View style={styles.fila}>
                    <Dropdown
                        dropdownStyle={styles.input}
                        labelStyle={styles.rawText}
                        label="Baños"
                        placeholder="Elegir"
                        options={[
                            { label: '1', value: '1' },
                            { label: '2', value: '2' }
                        ]}
                        selectedValue={baños}
                        onValueChange={(value) => setBaños(value)}
                        primaryColor={'green'}
                    />
                </View>
                <View style={styles.fila}>
                    <Dropdown
                        dropdownStyle={styles.input}
                        labelStyle={styles.rawText}
                        label="Antiguedad"
                        placeholder="Elegir"
                        options={[
                            { label: 'menos de 10 años', value: '< 10' },
                            { label: 'entre 10 y 30 años', value: '10 a 30' },
                            { label: 'mayor a 30 años', value: '> 30' }
                        ]}
                        selectedValue={antiguedad}
                        onValueChange={(value) => setAntiguedad(value)}
                        primaryColor={'green'}
                    />
                </View>
                <View style={styles.fila}>
                    <Dropdown
                        dropdownStyle={styles.input}
                        labelStyle={styles.rawText}
                        label="Amenities"
                        placeholder="Elegir"
                        options={[
                            { label: 'quincho', value: 'quincho' },
                            { label: 'pileta', value: 'pileta' },
                            { label: 'jacuzzi', value: 'jacuzzi' }
                        ]}
                        selectedValue={amenities}
                        onValueChange={(value) => setAmenities(value)}
                        primaryColor={'green'}
                    />
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