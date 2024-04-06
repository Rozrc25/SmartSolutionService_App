import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import { useNavigation } from "@react-navigation/native";


export default function BusinessListItemSmall({ business }) {
 const navigation = useNavigation()
  return (
    <TouchableOpacity style={styles.container} onPress={()=>navigation.push('business-detail',{
      business:business
    })}>
      <Image source={{ uri: business?.image[0]?.url }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={{ fontSize: 17, fontFamily: "outfit-medium" }}>
          {business.name}
        </Text>
        <Text style={{ fontSize: 13, fontFamily: "outfit",color:Colors.LIGHT_GRAY }}>
          {business?.contactPerson}
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontFamily: "outfit",
            padding: 10,
            color: Colors.PRIMARY,
            backgroundColor: Colors.LIGHT_GRAY,
            borderRadius: 5,
            alignItems: "flex-start",
            paddingHorizontal: 7,
          }}
        >
          {business?.category.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    marginLeft:10
  },
  infoContainer: {
    padding:7,
    display:'flex',
    gap:6
  },
  image: {
    width: 160,
    height: 100,
    borderRadius: 10,
  },
});
