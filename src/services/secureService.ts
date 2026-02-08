import * as Keychain from "react-native-keychain";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const SERVICE = "weather-app-api-key";
const STORAGE_KEY = "WEATHER_API_KEY";

export const saveApiKey = async (apiKey: string) => {
  if (Platform.OS === "web") {
    await AsyncStorage.setItem(STORAGE_KEY, apiKey);
    return;
  }

  await Keychain.setGenericPassword("weather", apiKey, {
    service: SERVICE,
  });
};

export const getApiKey = async (): Promise<string | null> => {
  if (Platform.OS === "web") {
    return AsyncStorage.getItem(STORAGE_KEY);
  }

  const credentials = await Keychain.getGenericPassword({
    service: SERVICE,
  });

  return credentials ? credentials.password : null;
};
