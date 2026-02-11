import * as Keychain from "react-native-keychain";
import { Platform } from "react-native";

const SERVICE = "weather-app-api-key";
const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export const saveApiKey = async (apiKey: string) => {
  if (Platform.OS === "web") {
    return;
  }

  await Keychain.setGenericPassword("weather", apiKey, {
    service: SERVICE,
  });
};

export const getApiKey = async (): Promise<string | null> => {
  if (Platform.OS === "web") {
    return API_KEY;
  }

  const credentials = await Keychain.getGenericPassword({
    service: SERVICE,
  });

  return credentials ? credentials.password : null;
};
