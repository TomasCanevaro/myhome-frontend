import React, { useState, useEffect } from 'react'; 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';


export default function LoginInmobiliaria({navigation}) {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({}); 
    const [isFormValid, setIsFormValid] = useState(false); 

    useEffect(() => { 
        validateForm(); 
    }, [email, password]); 

    const validateForm = () => { 
        let errors = {}; 
        
        if (!email) { 
            errors.email = 'Ingresar correo electrónico'; 
        } else if (!/\S+@\S+\.\S+/.test(email)) { 
            errors.email = 'Correo electrónico inválido'; 
        } 
  
        if (!password) { 
            errors.password = 'Ingresar contraseña'; 
        } 
  
        setErrors(errors); 
        setIsFormValid(Object.keys(errors).length === 0); 
    }; 

    const handleSubmit = () => { 
        if (isFormValid) { 
            console.log('Form submitted successfully!'); 
        } else { 
            console.log('Form has errors. Please correct them.'); 
        } 
    }; 

    return (
        <View style={styles.container}>
            <Text style={styles.textoh1}>Ingresá tus credenciales</Text>
            <Text style={styles.subtitulo}>Inmobiliarias</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput 
                style={styles.input} 
                placeholder='E-mail'
                value = {email}
                onChangeText={setEmail} />
                <Text style={styles.label}>Clave</Text>
                <TextInput style={styles.input} 
                placeholder='Contraseña' 
                secureTextEntry
                value = {password}
                onChangeText={setPassword}
                 />
            </View>
            <TouchableOpacity style={styles.boton} title="Login" onPress={() => navigation.navigate('mainPageInmobiliaria')}  >
                <Text style={styles.textoBoton}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonChico} title="olvideClave" onPress={() => navigation.navigate('recuperarClave')} >
                <Text style={styles.textoBoton}>Olvidé mi contraseña</Text>
            </TouchableOpacity>

            {Object.values(errors).map((error, index) => ( 
                <Text key={index} style={styles.error}> 
                    {error} 
                </Text> 
            ))} 
        </View>
    );
}

const styles = StyleSheet.create({
    boton: {
        alignItems: 'center',
        backgroundColor: '#284B63',
        padding: 25,
        marginTop: 30,
        borderRadius: 10,
        width: 260,
    },
    botonChico: {
        alignItems: 'center',
        backgroundColor: '#284B63',
        padding: 10,
        marginTop: 30,
        borderRadius: 10,
        width: 260,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 50,
        alignItems: 'center'
    },
    textoh1: {
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',
    },
    textoBoton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    subtitulo: {
        marginTop: 20,
        fontSize: 14,
        fontWeight: 'bold',
    },
    form: {
        backgroundColor: 'white',
        width: 300,
        padding: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
    },
    error: { 
        color: 'red', 
        fontSize: 20, 
        marginBottom: 12, 
    },

});
