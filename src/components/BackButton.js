import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BackButton() {

    const navigation = useNavigation();

    const tela = () => {
        navigation.navigate('Home')
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backContainer} onPress={tela}>
                <Text style={styles.backButton}>{"<"}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10,
      },
      backContainer: {
        width: 40,
        height: 40,
        backgroundColor: "#FFA832",
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      backButton: {
        color: "#fff",
        fontSize: 50,
        textAlign: "center",
        lineHeight: 48,
      },              
})