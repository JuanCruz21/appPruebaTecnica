import { Redirect,Stack } from 'expo-router';
import { useAuthStore } from '../src/presentation/auth/store/useAuthStore';
import { useEffect } from 'react';
import { View, Image, ActivityIndicator, Text } from 'react-native';

export default function Index() {
    const { status, checkStatus } = useAuthStore();

    useEffect(() => {
        checkStatus();
    }, [checkStatus]);

    if (status === 'checking') {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image 
                    source={require("../assets/icon.png")}
                    style={{ width: 300, height: 300, marginBottom: 20 }} 
                />
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }
    if (status === 'authenticated') {
        return <Redirect href="/(tabs)/content/Home" />;
        }

    if (status === 'not-authenticated') {
        return <Redirect href="/auth/Login" />;
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" />
        </Stack>
    );
}