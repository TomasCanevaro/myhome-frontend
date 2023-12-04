import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';

export default function EditarPropiedad({ navigation, route }) {
    const [images, setImages] = useState([]);
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const { propertyID } = route.params;

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
            // Actualizar el estado con la URI de la imagen
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

                // Función para enviar una imagen al servidor
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

                        // Verificar si la respuesta indica éxito (código 2xx)
                        if (!response.ok) {
                            throw new Error(`Error al procesar imagen ${index}. Código de estado: ${response.status}`);
                        }

                        return response;
                    } catch (error) {
                        console.error(`Error al procesar imagen ${index}:`, error.message);
                        throw error; // Puedes manejar el error según tus necesidades
                    }
                };

                // Función para enviar imágenes secuencialmente
                const sendImagesSequentially = async () => {
                    const processedImages = [];
                    for (let index = 0; index < images.length; index++) {
                        try {
                            const response = await sendImage(images[index], index);
                            const result = await response.json(); // Supongo que el servidor devuelve JSON
                            const imageUrl = result.urlImage; // Ajusta esto según la estructura real de la respuesta del servidor
                            processedImages.push(imageUrl);
                        } catch (error) {
                            console.error('Error al procesar imágenes:', error.message);
                            // Puedes manejar el error según tus necesidades
                        }
                    }
                    return processedImages;
                };

                // Llamar a la función para enviar imágenes secuencialmente
                const processedImages = await sendImagesSequentially();

                console.log('Todas las imágenes fueron procesadas con éxito');
                console.log('Imágenes procesadas:', processedImages);

                // Navegar a la siguiente pantalla solo después de procesar todas las imágenes
                navigation.navigate('Editar propiedad: Paso 2', {
                    selectedImages: processedImages,
                    propertyID: propertyID
                });
                setImages([]);
            } catch (error) {
                console.error('Error al procesar imágenes:', error.message);
                // Maneja el error según tus necesidades
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