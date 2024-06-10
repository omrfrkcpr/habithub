import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const LoginBtn = ({ handleLogin }: { handleLogin: () => void }) => {
  return (
    <Pressable onPress={handleLogin}>
      <View style={styles.view}>
        <Text style={styles.text}>Login</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#F6F6F6",
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 80,
    width: 215,
    height: 60,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    // Box shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5, // For Android
  },
  text: {
    fontSize: 24,
    textAlign: "center",
    color: "black",
    fontFamily: "PopMed",
  },
});

export default LoginBtn;
