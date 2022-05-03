import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/core";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import tw from "tailwind-rn";
import {
  onSnapshot,
  collection,
  serverTimestamp,
  query,
  orderBy,
} from "@firebase/firestore";
import { db } from "../firebase";
import moment from "moment";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState([]);
  // const [lastMessageTime, setLastMessageTime] = useState([]);

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "matches", matchDetails.id, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
    );
  }, [matchDetails, db]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "matches", matchDetails.id, "messages"),
        orderBy("timestamp", "desc")
      ),

      (snapshot) => {
        // let t = new Date();
        // t.setSeconds(snapshot.docs[0].data().timestamp.seconds);
        // var formatted = moment(t).format("dd.mm.yyyy hh:MM:ss");
        // console.log(formatted);
        // setLastMessageTime(formatted);
        // // var utcSeconds = snapshot.docs[0].data().timestamp.seconds;
        // // var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        // // d.setUTCSeconds(utcSeconds);
        // // var formatted = moment(d).format("dd.mm.yyyy hh:MM:ss");
        // // console.log(d);
      }
    );
  }, [matchDetails, db]);
  // var t = new Date();
  // t.setSeconds(snapshot.docs[0].data().timestamp.seconds);
  // var formatted = moment(t).format("dd.mm.yyyy hh:MM:ss");
  // console.log(formatted);
  return (
    <TouchableOpacity
      style={tw(
        "flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg"
      )}
      onPress={() =>
        navigation.navigate("Message", {
          matchDetails,
        })
      }
    >
      <Image
        style={tw("rounded-full h-16 w-16 mr-4 ")}
        source={{ uri: matchedUserInfo?.photoURL }}
      />
      <View>
        <Text style={tw("text-lg font-semibold")}>
          {matchedUserInfo?.displayName}
        </Text>
        <Text>{lastMessage || "Say Something.."}</Text>
        {/* <Text>{lastMessageTime}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;
