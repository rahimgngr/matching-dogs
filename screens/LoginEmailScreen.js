import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Button,
} from "react-native";
import { TextInput } from "react-native-paper";
import tw from "tailwind-rn";
import useAuth from "./../hooks/useAuth";
import { useState } from "react";

const LoginEmailScreen = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const { signIn } = useAuth();

  return (
    <View style={tw("flex-1 ")}>
      <ImageBackground
        resizeMode="cover"
        style={tw("flex-1")}
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      >
        <View style={tw("flex-1 my-5")}>
          <TextInput
            label="E-mail"
            // style={{
            //   position: "absolute",
            //   marginStart: "15%",
            //   marginTop: 410,
            //   width: 255,
            //   height: 50,
            // }}
            style={[
              tw("absolute bottom-20 w-52 bg-white rounded-2xl mb-10"),
              { marginHorizontal: "25%" },
            ]}
            value={userEmail}
            onChangeText={(text) => setUserEmail(text)}
          />
          <TextInput
            label="Password"
            // style={
            //   // position: "absolute",
            //   // marginStart: "15%",
            //   // marginHorizontal: "25%",
            //   // marginTop: 465,
            //   // width: 350,
            //   // height: 50,
            //   // tw("absolute bottom-11 w-52 bg-white rounded-2xl")
            // }
            style={[
              tw("absolute bottom-10 w-52 bg-white rounded-2xl my-4"),
              { marginHorizontal: "25%" },
            ]}
            value={userPassword}
            onChangeText={(text) => setUserPassword(text)}
            secureTextEntry
          />

          <TouchableOpacity
            style={[
              tw("absolute bottom-1 w-52 bg-white p-4 rounded-2xl"),
              { marginHorizontal: "25%" },
            ]}
            onPress={() => signIn(userEmail, userPassword)}
          >
            <Text style={tw("font-semibold text-center")}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginEmailScreen;
