import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Fontisto } from "@expo/vector-icons";

export default function BusinessListItem({ business, booking }) {
  const navigation = useNavigation();

  if (!business.contactPerson) {
    console.warn(
      "Contact person is null or undefined:",
      business.contactPerson
    );
    // You can handle this case based on your app logic
  }

  const getStatusStyles = (status) => {
    switch (status) {
      case "Completed":
        return {
          fontSize: 15,
          fontFamily: "outfit",
          padding: 3,
          backgroundColor: Colors.LIGHT_GREEN,
          borderRadius: 3,
          alignSelf: "flex-start",
          paddingHorizontal: 7,
          color: Colors.GREEN,
        };
      case "Canceled":
        return {
          fontSize: 15,
          fontFamily: "outfit",
          padding: 3,
          backgroundColor: Colors.LIGHT_RED,
          borderRadius: 3,
          alignSelf: "flex-start",
          paddingHorizontal: 7,
          color: Colors.RED,
        };
      default:
        return {
          fontSize: 15,
          fontFamily: "outfit",
          padding: 3,
          backgroundColor: Colors.LIGHT_PRIMARY,
          borderRadius: 3,
          alignSelf: "flex-start",
          paddingHorizontal: 7,
          color: Colors.PRIMARY,
        };
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.push("business-detail", {
          business: business,
        })
      }
    >
      <Image source={{ uri: business?.image[0]?.url }} style={styles.image} />
      <View style={styles.subContainer}>
        {business.contactPerson && (
          <Text
            style={{ fontFamily: "outfit", color: Colors.BLACK, fontSize: 15 }}
          >
            {business.contactPerson || "No Contact Person"}
          </Text>
        )}

        {business.name && (
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 19,
            }}
          >
            {business.name}
          </Text>
        )}

        {!booking && business.address && (
          <Text
            style={{ fontFamily: "outfit", color: Colors.GRAY, fontSize: 15 }}
          >
            <Ionicons
              name="location-sharp"
              size={20}
              color={Colors.PRIMARY}
              style={{ marginRight: 5 }}
            />
            {business.address}
          </Text>
        )}

        {booking && booking.id ? (
          <Text style={[getStatusStyles(booking.bookingStatus)]}>
            {booking.bookingStatus}
          </Text>
        ) : null}

        {booking?.id ? (
          <Text style={styles.bookedDate}>
            <Fontisto
              name="date"
              size={20}
              color="black"
              style={{ marginRight: 10 }}
            />
            {booking.date}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  subContainer: {
    display: "flex",
    gap: 7,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  bookedDate: {
    fontSize: 15,
    fontFamily: "outfit",
    padding: 3,
    color: Colors.PRIMARY,
    backgroundColor:Colors.LIGHT_GRAY,
    borderRadius: 13,
    alignSelf: "flex-start",
    paddingHorizontal: 7,
  },
});
