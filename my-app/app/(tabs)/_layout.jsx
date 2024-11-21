import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="content/Home"
        options={{
          headerTitle:"Multimedia",
          tabBarLabel: "Multimedia",
          tabBarIcon: () => <Ionicons name="videocam" size={20} color={"blue"} />,
        }}
      />
      <Tabs.Screen
        name="user/Perfil"
        options={{
          headerTitle:"Usuario",
          tabBarLabel:"Usuario",
          tabBarIcon: () => <Ionicons name="person" size={20} color={"blue"} />,
        }}
      />
    </Tabs>
  );
}