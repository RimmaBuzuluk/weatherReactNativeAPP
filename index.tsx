import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): any;
};

export function App() {
  return <ExpoRoot context={require.context("./app")} />;
}

registerRootComponent(App);
