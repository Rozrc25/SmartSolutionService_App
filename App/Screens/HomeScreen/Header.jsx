import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-react";
import Colors from "../../Utils/Colors";
import { FontAwesome } from "@expo/vector-icons";

export default function Header() {
  const { user, isLoading } = useUser();

  return (
    user && (
      <View style={styles.container}>
        {/* Profile */}
        <View style={styles.profileMainConatiner}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
            <View>
              <Text style={{ color: Colors.WHITE,fontFamily:'outfit' }}>Welcome,</Text>
              <Text style={{ color: Colors.WHITE, fontSize: 20 ,fontFamily:'outfit-bold'}}>
                {user?.fullName}
              </Text>
            </View>
          </View>
          <FontAwesome name="bookmark-o" size={24} color="white" />
        </View>
        {/* Search */}
        <View style={styles.SearchBarContainer}>
          <TextInput placeholder="search" style={styles.textInput} />
          <FontAwesome
            style={styles.searchBtn}
            name="search"
            size={24}
            color={Colors.PRIMARY}
          />
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileMainConatiner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  SearchBarContainer: {
    marginTop: 15,
    display:'flex',
    flexDirection:'row',
    gap:10,
    marginBottom:10
  },
  searchBtn: {
    backgroundColor:Colors.WHITE,
    padding:10,
    borderRadius:8
  },
  textInput: {
    padding: 7,
    paddingHorizontal: 16,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    width: '85%',
    fontSize:16
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius:30
  },
});
