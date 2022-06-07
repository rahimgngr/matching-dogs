import { useNavigation } from "@react-navigation/core";
import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import React, { useLayoutEffect } from "react";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";

const LoginScreen = () => {
  const { signInWithGoogle, loading } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={tw("flex-1")}>
      <ImageBackground
        resizeMode="cover"
        style={tw("flex-1")}
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      >
        <TouchableOpacity
          style={[
            tw("absolute bottom-20 w-52 bg-white p-3 rounded-2xl"),
            { marginHorizontal: "25%" },
          ]}
          onPress={signInWithGoogle}
        >
          <Text style={tw("font-semibold text-center")}>
            {loading ? (
              "Loading..."
            ) : (
              <Ionicons name="logo-google" size={30} color="#FF5864" />
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tw("absolute bottom-5 w-52 bg-white p-3 rounded-2xl"),
            { marginHorizontal: "25%" },
          ]}
          onPress={() => navigation.navigate("LoginEmail")}
        >
          <Text style={tw("font-semibold text-center")}>
            {loading ? (
              "Loading..."
            ) : (
              <Ionicons name="ios-mail" size={30} color="#FF5864" />
            )}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
