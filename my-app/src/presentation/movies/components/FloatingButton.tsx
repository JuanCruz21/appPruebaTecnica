import * as React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

interface FloatingButtonProps {
    onTap: () => void;
    icon?: string;
    backgroundColor?: string;
    size?: number;
    bottom?: number;
    right?: number;
    top?: number;
    left?: number;
}

export default function FloatingButton({
    onTap,
    icon = "+",
    backgroundColor = "#2e6ddf",
    size = 56,
    bottom = 20,
    right = 0,
    top= 600,
}: FloatingButtonProps) {
    const dynamicStyles = StyleSheet.create ({
        button: {
            height: size,
            width: size,
            borderRadius: size / 2,
            bottom: bottom,
            right:right,
            top: top,
            backgroundColor: backgroundColor,
            position: "absolute", // Esto posiciona el botón de forma flotante
            justifyContent: "center", // Centra el contenido dentro del botón
            alignItems: "center"     // Centra el contenido dentro del botón
        },
        icon: {
            color: "white",          // Color del ícono o texto
            fontSize: size / 2       // Tamaño relativo al tamaño del botón
        }
})

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{...dynamicStyles.button,elevation: 5}}
                onPress={onTap}
            >
                <Text style={dynamicStyles.icon}>{icon}</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});