import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const MenuButtonItem = ({text, onPress}) => {
    return(
        <TouchableOpacity
        style = {styles.buttonContainer}
            onPress = {onPress}

        >
            <Text style = {styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 5,
        padding: 15,
    },
    buttonText: {
        color: '#6e6e6e',
        fontWeight: 'bold'
    }

})

export default MenuButtonItem