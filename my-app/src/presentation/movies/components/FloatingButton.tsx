import * as React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

interface FloatingButtonProps {
    onTap: () => void;
    icon?: string;
    backgroundColor?: string;
    size?: number;
    style?: any;
}

export default function FloatingButton({
    onTap,
    icon = "+",
    backgroundColor = "#2e6ddf",
    size = 56,
    style = {}
}: FloatingButtonProps) {
    const dynamicStyles = StyleSheet.create ({
        button: {
            height: size,
            width: size,
            borderRadius: size / 2,
            backgroundColor: backgroundColor,
            ...style,
        },
        icon: {
            color: "white",
            fontSize: size / 2 * 1.2,
            fontWeight: "bold"
        }
})

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{...dynamicStyles.button, elevation: 5}}
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