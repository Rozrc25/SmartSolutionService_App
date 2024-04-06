import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  VirtualizedList,
  Linking,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../Utils/Colors";
import BusinessPhotos from "./BusinessPhotos";
import BusinessAboutMe from "./BusinessAboutMe";
import BookingModel from "./BookingModel";

export default function BusinessDetailScreen() {
  const param = useRoute().params;
  const [business, setBusiness] = useState(param.business);
  const [showModel, setShowModel] = useState(false);

  const navigation = useNavigation();
  const onMessageBtnClicked=()=>{
    Linking.openURL('mailto:'+business?.email+"?subject = I am looking for service&body=Hi there,");
  }

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {business && (
        <ScrollView 
          showsHorizontalScrollIndicator={false}
          style={{ height: "91%" }}
        >
          <Image
            source={{ uri: business.image[0]?.url }}
            style={{ width: "100%", height: 300, marginTop: 20 }}
          />
          <TouchableOpacity
            style={styles.backBtnContainer}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={30} />
          </TouchableOpacity>
          <View style={styles.infoContainer}>
            <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
              {business?.name}
            </Text>
            <View style={styles.subContainer}>
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  color: Colors.PRIMARY,
                  fontSize: 20,
                }}
              >
                {business?.contactPerson} 🌟
              </Text>
              <Text
                style={{
                  color: Colors.PRIMARY,
                  backgroundColor: Colors.LIGHT_GRAY,
                  padding: 5,
                  borderRadius: 5,
                  fontSize: 15,
                }}
              >
                {business?.category?.name || "No Category"}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 17,
                fontFamily: "outfit",
                color: Colors.GRAY,
              }}
            >
              <Ionicons
                name="location-sharp"
                size={25}
                color={Colors.PRIMARY}
                style={{ marginRight: 5 }}
              />
              {business?.address}
            </Text>
            {/* Horiz Line */}
            <View
              style={{
                borderWidth: 0.4,
                borderColor: Colors.GRAY,
                marginTop: 10,
                marginBottom: 20,
              }}
            ></View>
            {/* About */}
            <BusinessAboutMe business={business} />

            {/* Horiz Line */}
            <View
              style={{
                borderWidth: 0.4,
                borderColor: Colors.GRAY,
                marginTop: 10,
                marginBottom: 20,
              }}
            ></View>
            <BusinessPhotos business={business} />
          </View>
        </ScrollView>
      )}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          margin: 3,
        }}
      >
        <TouchableOpacity style={styles.messageBtn} onPress={()=>onMessageBtnClicked()}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "outfit-medium",
              color: Colors.PRIMARY,
              fontSize: 18,
            }}
          >
            Message
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bookingBtn}
          onPress={() => setShowModel(true)}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "outfit-medium",
              color: Colors.WHITE,
              fontSize: 18,
            }}
          >
            Booking
          </Text>
        </TouchableOpacity>
      </View>
      {/* Booking Screen Modal */}
      <Modal animationType="slide" visible={showModel}>
        <BookingModel
          businessId={business.id}
          hideModel={() => setShowModel(false)}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backBtnContainer: {
    position: "absolute",
    zIndex: 10,
    padding: 20,
    color: Colors.WHITE,
  },
  infoContainer: {
    display: "flex",
    padding: 20,
    gap: 7,
  },
  messageBtn: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 99,
    borderWidth: 1,
    textAlign: "center",
    borderColor: Colors.PRIMARY,
    flex: 1,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  bookingBtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    borderWidth: 1,
    textAlign: "center",
    borderColor: Colors.PRIMARY,
    flex: 1,
  },
});
