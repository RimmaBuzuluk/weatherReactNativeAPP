import { View, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

type Props = {
  onSearch: (city: string) => void;
};

export const CitySearchInput = ({ onSearch }: Props) => {
  const [value, setValue] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter city..."
        placeholderTextColor="#888"
        value={value}
        onChangeText={setValue}
        onSubmitEditing={() => onSearch(value)}
        style={styles.input}
        returnKeyType="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 16,
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    color: "white",
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
