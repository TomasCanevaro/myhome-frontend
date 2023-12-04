import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';

export default function CrearPropiedad({ navigation }) {
    const [images, setImages] = useState([]);
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access media library is required!');
            }
        })();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userTokenKey = 'userToken';
                const userEmailKey = 'userMail';
                const storedTokenKey = await SecureStore.getItemAsync(userTokenKey);
                const storedEmailKey = await SecureStore.getItemAsync(userEmailKey);
                if (storedTokenKey) {
                    setToken(storedTokenKey);
                }
                if (storedEmailKey) {
                    setEmail(storedEmailKey);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
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

    const handleSubmit = async () => {
    if (images.length === 0) {
        Alert.alert('Error al continuar', 'Por favor, suba por lo menos una imagen', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
    } else {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "multipart/form-data");
            myHeaders.append("accept", "application/json");
            myHeaders.append("authorization", token);

            const sendImage = async (image, index) => {
                try {
                    const formData = new FormData();
                    formData.append('photo', {
                        uri: image,
                        name: `photo${index}.png`,
                        type: 'image/png',
                    });
            
                    const requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: formData,
                        redirect: 'follow',
                    };
            
                    const response = await fetch("https://myhome-backend.vercel.app/api/v1/properties/photo", requestOptions);
                    if (!response.ok) {
                        throw new Error(`Error al procesar imagen ${index}. Código de estado: ${response.status}`);
                    }
                    return response;
                } catch (error) {
                    console.error(`Error al procesar imagen ${index}:`, error.message);
                    throw error;
                }
            };

            const sendImagesSequentially = async () => {
                const processedImages = [];
                for (let index = 0; index < images.length; index++) {
                    try {
                        const response = await sendImage(images[index], index);
                        const result = await response.json();
                        const imageUrl = result.urlImage;
                        processedImages.push(imageUrl);
                    } catch (error) {
                        console.error('Error al procesar imágenes:', error.message);
                    }
                }
                return processedImages;
            };

            const processedImages = await sendImagesSequentially();
            
            console.log('Todas las imágenes fueron procesadas con éxito');
            console.log('Imágenes procesadas:', processedImages);

            navigation.navigate('Crear propiedad: Paso 2', { selectedImages: processedImages });
            setImages([]);
        } catch (error) {
            console.error('Error al procesar imágenes:', error.message);
        }
    }
};

    return (
        <View style={styles.container}>
            <ScrollView vertical>
                {images.map((image, index) => (
                    <View key={index} style={styles.imageContainer}>
                        <Image style={styles.agregarImagen} source={{ uri: image }} />
                        <TouchableOpacity onPress={() => deleteImage(index)}>
                            <Text style={styles.deleteButton}>Borrar</Text>
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