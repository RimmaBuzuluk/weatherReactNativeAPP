import { Tabs } from "expo-router";
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
            tabBarIcon: () => "",
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: () => "",
          }}
        />
      </Tabs>
    </View>
  );
}
