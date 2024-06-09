import { Link, useRouter } from "expo-router";
import { View, Pressable, Text } from "react-native";

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = () => {
    // Add your login logic here
    router.replace("/home");
  };

  return (
    <View className="bg-[#f6f0fa] flex-1 justify-center items-center">
      <View className="gap-3 mr-14 ">
        <Text className="font-sans text-[70px] ">
          Do your{"\n"}tasks{"\n"}quickly{"\n"}and easy
        </Text>
        <Text className="font-sans font-extralight text-lg">
          Your tasks, your rules, our support.
        </Text>
      </View>
      <Pressable onPress={handleLogin}>
        <Text
          className="bg-white py-3 px-8 mt-[80px] shadow-xl text-2xl "
          style={{ borderRadius: 100 }}
        >
          Login
        </Text>
      </Pressable>

      <Link href="/register" asChild>
        <Pressable>
          <Text className="mt-2 underline font-extralight">Create account</Text>
        </Pressable>
      </Link>

      <View className="flex flex-row mt-5 text-center">
        <Text className="text-[#e5dfe9]">____________ OR ____________</Text>
      </View>

      <Link href="/test">Unmatched route</Link>
    </View>
  );
};

export default LoginPage;
