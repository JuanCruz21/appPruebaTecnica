import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Estas configuraciones son opcionales si no necesitas personalización adicional */}
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="/auth/Login" />
      <Stack.Screen name="/auth/Register" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}