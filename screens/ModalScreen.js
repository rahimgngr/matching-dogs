import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import { setDoc, doc, serverTimestamp } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";
import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [city, setCity] = useState(null);
  const [age, setAge] = useState(null);
  const [color, setColor] = useState(null);
  const [gender, setGender] = useState(null);
  const [rating, setRating] = useState(1);
  const [userDisplayName, setUserDisplayName] = useState(null);

  const incompleteForm = !image || !age || !city || !userDisplayName;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const updateUserProfile = () => {
    if (age <= 10 && age > 5) {
      setRating(age - 5);
    }
    if (age <= 15 && age >= 10) {
      setRating(age - 10);
    }
    if (age <= 5 && age > 0) {
      setRating(age);
    }

    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: userDisplayName,
      color: color,
      photoURL: image,
      city: city,
      age: age,
      gender: gender,
      rating: rating,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={tw("flex-1 items-center pt-1")}>
      <Image
        style={tw("h-20 w-full")}
        resizeMode="contain"
        source={{ uri: "https://links.papareact.com/2pf" }}
      />
      <Text style={tw("text-xl text-gray-500 p-2 font-bold")}>
        Welcome {user.displayName ? user.displayName : userDisplayName}
      </Text>

      <Text style={tw("text-center p-4 font-bold text-red-400")}>
        Select an image
      </Text>
      {/* <TextInput
        value={image}
        onChangeText={setImage}
        style={tw("text-center text-xl pb-2")}
        placeholder="enter pic url"
      /> */}
      {/* <Button title="choose" onPress={handleChooseImage} /> */}

      <Button title="select image" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 60, height: 50, margin: 10 }}
        />
      )}

      <Text style={tw("text-center p-4 font-bold text-red-400")}>
        What is the name of ur dog?
      </Text>
      <TextInput
        value={userDisplayName}
        onChangeText={setUserDisplayName}
        style={tw("text-center text-xl pb-2")}
        placeholder="enter name"
      />

      <Text style={tw("text-center p-4 font-bold text-red-400")}>
        What is your dog's gender?
      </Text>
      <TextInput
        value={gender}
        onChangeText={setGender}
        style={tw("text-center text-xl pb-2")}
        placeholder="enter gender"
      />

      <Text style={tw("text-center p-4 font-bold text-red-400")}>
        What color dog have?
      </Text>
      <TextInput
        value={color}
        onChangeText={setColor}
        style={tw("text-center text-xl pb-2")}
        placeholder="enter color"
      />

      <Text style={tw("text-center p-4 font-bold text-red-400")}>
        Which city do u live in?
      </Text>
      <TextInput
        value={city}
        onChangeText={setCity}
        style={tw("text-center text-xl pb-2")}
        placeholder="enter city"
      />

      <Text style={tw("text-center p-4 font-bold text-red-400")}>
        How old is ur dog?
      </Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        style={tw("text-center text-xl pb-2")}
        placeholder="enter age"
        keyboardType="numeric"
        maxLength={2}
      />

      <Text style={tw("text-center p-4 font-bold text-red-400")}>
        {" "}
        rating - {rating}
      </Text>

      <TouchableOpacity
        disabled={incompleteForm}
        style={[
          tw("w-64 p-3 rounded-xl absolute bottom-10"),
          incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
        ]}
        onPress={updateUserProfile}
      >
        <Text style={tw("text-center text-white text-xl")}>
          Update/Save Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
