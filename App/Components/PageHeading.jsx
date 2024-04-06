import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation,useRoute } from "@react-navigation/native";

export default function PageHeading({title}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        marginTop:15
      }}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="arrow-back-outline" size={24} color="black" />

      <Text style={{ fontSize: 25, fontFamily: "outfit-medium" }}>{title}</Text>
    </TouchableOpacity>
  );
}
