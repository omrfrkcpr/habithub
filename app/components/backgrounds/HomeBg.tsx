import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function HomeBg() {
  return (
    <View>
      <View className="bg-mainPink w-[800px] h-[480px] absolute rounded-full rotate-[50deg] -left-12 z-1 top-[100px]"></View>
      <View className="bg-mainPinkTwo w-[400px] h-[120px] absolute rounded-full -right-[360px] -top-10 rotate-45"></View>
      <View className="bg-mainBlue w-[400px] h-[550px] absolute rounded-full -right-[70px] -top-[120px]"></View>
      <BlurView
        intensity={100}
        experimentalBlurMethod="dimezisBlurView"
        tint="light"
        style={styles.blurView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  blurView: {
    position: "absolute",
    width: 1000,
    height: 2200,
    top: -150,
    left: -200,
  },
});
