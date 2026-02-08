import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { useNetworkStatus } from "../../src/hooks/useNetworkStatus";
import { NetworkIndicator } from "../../src/components/NetworkIndicator";

export default function TabsLayout() {
  const isOnline = useNetworkStatus();

  return (
    <View style={{ flex: 1 }}>
      {!isOnline && <NetworkIndicator />}

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#1e90ff",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
