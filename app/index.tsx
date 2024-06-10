import { Link, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { View, Pressable, Text } from "react-native";
import { useAssets } from "expo-asset";
import AuthBtn from "./components/buttons/AuthBtn";
import Or from "./components/or/Or";
import LoginBtn from "./components/buttons/LoginBtn";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeBg from "./components/backgrounds/HomeBg";

const LoginPage = () => {
  const router = useRouter();
  const [assets, error] = useAssets([
    require("../assets/images/apple.png"),
    require("../assets/images/facebook.png"),
    require("../assets/images/gmail.png"),
  ]);

  const [loaded, errors] = useFonts({
    PopRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PopBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PopLight: require("../assets/fonts/Poppins-Light.ttf"),
    PopExLight: require("../assets/fonts/Poppins-ExtraLight.ttf"),
    PopBlack: require("../assets/fonts/Poppins-Black.ttf"),
    PopMed: require("../assets/fonts/Poppins-Medium.ttf"),
  });

  const handleLogin = () => {
    // Add your login logic here
    router.replace("/home");
  };

  return (
    <SafeAreaView className="bg-mainWhite flex-1 justify-center items-center relative">
      <HomeBg />
      <View className="gap-3 mr-16 ml-2">
        <Text className="text-[64px] " style={{ fontFamily: "PopRegular" }}>
          Do your{"\n"}tasks{"\n"}quickly{"\n"}and easy
        </Text>
        <Text className="text-[18px]" style={{ fontFamily: "PopExLight" }}>
          Your tasks, your rules, our support.
        </Text>
      </View>

      <LoginBtn handleLogin={handleLogin} />
      <Link href="/register" asChild>
        <Pressable>
          <Text
            className="mt-2 underline text-[12px] text-black/50"
            style={{
              fontFamily: "PopLight",
            }}
          >
            Create an account
          </Text>
        </Pressable>
      </Link>
      <Or />
      <AuthBtn />

      {/* <Link href="/test">Unmatched route</Link> */}
    </SafeAreaView>
  );
};

export default LoginPage;
