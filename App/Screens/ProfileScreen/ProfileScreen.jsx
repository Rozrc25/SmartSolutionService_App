import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import Colors from "../../Utils/Colors";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const { user } = useUser();
  const navigation = useNavigation();

  const profileMenu = [
    {
      id: 1,
      name: "Home",
      icon: "home",
    },
    {
      id: 2,
      name: "My Booking",
      icon: "bookmark-sharp",
    },
    {
      id: 3,
      name: "Contact Us",
      icon: "mail",
    },
    {
      id: 4,
      name: "LogOut",
      icon: "log-out",
      onPress: () => handleLogout(), // Call handleLogout when pressed
    },
  ];

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleLogout = async () => {
    try {
      // Perform any additional logout operations here
      navigation.navigate("Login"); // Navigate to the login screen after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View>
      <View
        style={{
          padding: 20,
          paddingTop: 30,
          backgroundColor: Colors.LIGHT_PRIMARY,
        }}
      >
        <Text style={{ fontSize: 30, fontFamily: "outfit-bold" }}>Profile</Text>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Image
            source={{ uri: user.imageUrl }}
            style={{ width: 90, height: 90, borderRadius: 90 }}
          />
          <Text
            style={{
              fontSize: 26,
              fontFamily: "outfit-medium",
              marginTop: 8,
              color: Colors.BLACK,
            }}
          >
            {user.fullName}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "outfit-medium",
              marginTop: 8,
              color: Colors.BLACK,
            }}
          >
            {user?.primaryEmailAddress.emailAddress}
          </Text>
        </View>
      </View>
      <View style={{ padding: 60 }}>
        <FlatList
          data={profileMenu}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 40,
                paddingHorizontal: 50,
                marginLeft: 20,
              }}
              onPress={item.onPress} // Add onPress event handler
            >
              <Ionicons name={item.icon} size={24} color={Colors.PRIMARY} />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "outfit-medium",
                  color: Colors.PRIMARY,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
