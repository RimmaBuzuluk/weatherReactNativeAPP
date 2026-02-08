import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import {
  Montserrat_400Regular,
  Montserrat_700Bold,
  useFonts,
} from "@expo-google-fonts/montserrat";

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): any;
};

export function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) return null;
  return <ExpoRoot context={require.context("./app")} />;
}

registerRootComponent(App);
