import { useAssets } from "expo-asset";
import { Image, TouchableOpacity } from "react-native";
import { View } from "react-native";

export default function AuthBtn() {
  const [assets] = useAssets([
    require("../../../assets/images/apple.png"),
    require("../../../assets/images/facebook.png"),
    require("../../../assets/images/gmail.png"),
  ]);

  if (!assets) return null;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        gap: 40,
        marginVertical: 20,
      }}
    >
      {assets.map((asset, index) => (
        <TouchableOpacity key={index}>
          <Image source={{ uri: asset?.uri }} className="w-[24px] h-[24px]" />
        </TouchableOpacity>
      ))}
    </View>
  );
}
