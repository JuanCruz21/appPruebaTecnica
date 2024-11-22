import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="create" options={{ headerTitle:'Crear Contenido'}}/>
      <Stack.Screen name="[detail]" options={{ headerTitle:'Detalle'}}/>
    </Stack>
  );
}