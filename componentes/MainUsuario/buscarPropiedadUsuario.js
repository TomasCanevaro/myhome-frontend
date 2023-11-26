import React, { useState, useEffect } from 'react'; 
import { StyleSheet, Text, TextInput, Image, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';

export default function BuscarPropiedadUsuario({navigation}) {
    const [operacion, setOperacion] = useState('');
    const [tipoPropiedad, setTipoPropiedad] = useState('');
    const [provincia, setProvincia] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [barrio, setBarrio] = useState('');
    const [cambio, setCambio] = useState('');
    const [desde, setDesde] = useState('');
    const [hasta, setHasta] = useState('');
    const [ambientes, setAmbientes] = useState('');
    const [dormitorios, setDormitorios] = useState('');
    const [baños, setBaños] = useState('');
    const [antiguedad, setAntiguedad] = useState('');
    const [amenities, setAmenities] = useState('');
    const dataOperacion = [
        { label: 'Venta', value: 'Venta' },
        { label: 'Alquiler', value: 'Alquiler' },
        { label: 'Reserva', value: 'Reserva' }
    ];
    const dataTipoPropiedad = [
        { label: 'Casa', value: 'Casa' },
        { label: 'Departamento', value: 'Departamento' }
    ];
    const dataProvincia = [
        { label: 'Buenos Aires', value: 'Buenos Aires' },
        { label: 'CABA', value: 'CABA' },
        { label: 'Cordoba', value: 'Cordoba' }
    ];
    const dataLocalidad = [
        { label: 'La Plata', value: 'La Plata' },
        { label: 'Olavarria', value: 'Olavarria' },
        { label: 'Mar del Plata', value: 'Mar del Plata' }
    ];
    const dataBarrio = [
        { label: 'Palermo', value: 'Palermo' },
        { label: 'Villa Urquiza', value: 'Villa Urquiza' },
        { label: 'Liniers', value: 'Liniers' }
    ];
    const dataCambio = [
        { label: 'Pesos', value: 'ars' },
        { label: 'Dólares', value: 'usd' },
    ];
    const dataAmbientes = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' }
    ];
    const dataDormitorios = [
        { label: '0', value: '0' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' }
    ];
    const dataBaños = [
        { label: '1', value: '1' },
        { label: '2', value: '2' }
    ];
    const dataAntiguedad = [
        { label: 'menos de 10 años', value: '< 10' },
        { label: 'entre 10 y 30 años', value: '10 a 30' },
        { label: 'mayor a 30 años', value: '> 30' }
    ];
    const dataAmenities = [
        { label: 'Quincho', value: 'quincho' },
        { label: 'Pileta', value: 'pileta' },
        { label: 'Jacuzzi', value: 'jacuzzi' },
        { label: 'Sauna', value: 'sauna' },
        { label: 'SUM', value: 'SUM' },
        { label: 'Sala de juegos', value: 'sala de juegos' },
    ];

    const handleSubmit = async () => {
        navigation.navigate('Resultados Busqueda', {
            operacion: operacion,
            tipoPropiedad: tipoPropiedad,
            provincia: provincia,
            localidad: localidad,
            barrio: barrio,
            cambio: cambio,
            desde: desde,
            hasta: hasta,
            ambientes: ambientes,
            dormitorios: dormitorios,
            baños: baños,
            antiguedad: antiguedad,
            amenities: amenities
        });

        setOperacion('');
        setTipoPropiedad('');
        setProvincia('');
        setLocalidad('');
        setBarrio('');
        setCambio('');
        setDesde('');
        setHasta('');
        setAmbientes('');
        setDormitorios('');
        setBaños('');
        setAntiguedad('');
        setAmenities('');
    }

    return (
        <View style={styles.container}>
        <ScrollView>
            <Text style={styles.title}>Buscá tu propiedad</Text>
            <View style={styles.form}>
                <Text style={styles.rawText}>Operación</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholder=''
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataOperacion}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    value={operacion}
                    onChange={item => {
                        setOperacion(item.value);
                    }}
                />
                <Text style={styles.rawText}>Tipo de propiedad</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholder=''
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataTipoPropiedad}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    value={tipoPropiedad}
                    onChange={item => {
                        setTipoPropiedad(item.value);
                    }}
                />
                <Text style={styles.rawText}>Provincia</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholder=''
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataProvincia}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    value={provincia}
                    onChange={item => {
                        setProvincia(item.value);
                    }}
                />
                <Text style={styles.rawText}>Localidad</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholder=''
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataLocalidad}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    value={localidad}
                    onChange={item => {
                        setLocalidad(item.value);
                    }}
                />
                <Text style={styles.rawText}>Barrio</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholder=''
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataBarrio}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    value={barrio}
                    onChange={item => {
                        setBarrio(item.value);
                    }}
                />
                <Text style={styles.checkText}>Desde</Text>
                <View style={styles.fila}>
                    <TextInput
                        style={styles.inputPrecio}
                        value={desde}
                        onChangeText={setDesde}
                        inputMode='numeric' />
                    <Dropdown
                        style={styles.dropdownPrecio}
                        placeholder=''
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={dataCambio}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        value={cambio}
                        onChange={item => {
                            setCambio(item.value);
                        }}
                    />
                </View>
                <Text style={styles.checkText}>Hasta</Text>
                <View style={styles.fila}>
                    <TextInput
                        style={styles.inputPrecio}
                        value={hasta}
                        onChangeText={setHasta}
                        inputMode='numeric' />
                    <Dropdown
                        style={styles.dropdownPrecio}
                        placeholder=''
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={dataCambio}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        value={cambio}
                        onChange={item => {
                            setCambio(item.value);
                        }}
                    />
                </View>
                <Text style={styles.rawText}>Ambientes</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholder=''
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataAmbientes}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    value={ambientes}
                    onChange={item => {
                        setAmbientes(item.value);
                    }}
                />
                <Text style={styles.rawText}>Dormitorios</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholder=''
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataDormitorios}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    value={dormitorios}
                    onChange={item => {
                        setDormitorios(item.value);
                    }}
                />
                <Text style={styles.rawText}>Baños</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholder=''
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataBaños}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    value={baños}
                    onChange={item => {
                        setBaños(item.value);
                    }}
                />
                <Text style={styles.rawText}>Antiguedad</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholder=''
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataAntiguedad}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    value={antiguedad}
                    onChange={item => {
                        setAntiguedad(item.value);
                    }}
                />
                <Text style={styles.rawText}>Amenities</Text>
                <MultiSelect
                    style={styles.dropdown}
                    placeholder=''
                    iconStyle={styles.iconStyle}
                    data={dataAmenities}
                    labelField="label"
                    valueField="value"
                    value={amenities}
                    selectedStyle={styles.selectedStyle}
                    onChange={item => {
                        setAmenities(item);
                    }}
                />
            </View>

            <View style={styles.fila}>
                <TouchableOpacity style={styles.boton} title="Press me" onPress={handleSubmit} >
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
    inputPrecio: {
        height: 50,
        width: 200,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    rawText: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
        marginRight: 20,
        textAlign: 'left'
        
    },
    checkText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginRight: 100,
        marginTop: 5,
        textAlign: 'left'
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
    },
    dropdown: {
        height: 50,
        width: 300,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    dropdownPrecio: {
        height: 50,
        width: 100,
        marginLeft: 5,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
        width: 100,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        width: 50,
        fontSize: 16,
    },
    selectedStyle: {
        flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 14,
      backgroundColor: 'white',
      shadowColor: '#000',
      marginTop: 8,
      marginRight: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2
    },
})