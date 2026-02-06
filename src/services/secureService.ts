import * as SecureStore from "expo-secure-store";

export const saveSecret = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (e) {
    console.error("Failed to save secret", e);
  }
};

export const getSecret = async (key: string): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (e) {
    console.error("Failed to get secret", e);
    return null;
  }
};
