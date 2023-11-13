import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CrearPropiedad({ navigation }) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access media library is required!');
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImages([...images, result.assets[0].uri]);
        }
    };

    const deleteImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    const handleSubmit = () => {
        if (images.length === 0) {
            Alert.alert('Error al continuar', 'Por favor, suba por lo menos una imagen', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        } else {
            navigation.navigate('Crear propiedad: Paso 2', { selectedImages: images });
            console.log(images)
            setImages([])
            
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView vertical>
                {images.map((image, index) => (
                    <View key={index} style={styles.imageContainer}>
                        <Image style={styles.agregarImagen} source={{ uri: image }} />
                        <TouchableOpacity onPress={() => deleteImage(index)}>
                            <Text style={styles.deleteButton}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity onPress={pickImage}>
                <Image
                    style={styles.agregarImagen}
                    source={require('../../assets/addPhoto.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.boton}
                title="Press me"
                onPress={handleSubmit}
            >
                <Text style={styles.textoBoton}>Siguiente</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 6,
        backgroundColor: 'rgba(256, 256, 256, 0.6)',
        marginHorizontal: 15,
        marginVertical: 15,
        padding: 15,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        marginBottom: 15,
    },
    agregarImagen: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    deleteButton: {
        color: 'red',
        textAlign: 'center',
        marginTop: 5,
    },
    boton: {
        alignItems: 'center',
        backgroundColor: '#284B63',
        padding: 25,
        marginTop: 50,
        borderRadius: 10,
        width: 260,
    },
    textoBoton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});