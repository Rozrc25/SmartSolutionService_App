import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import PageHeading from "../../Components/PageHeading";
import GlobalApi from "../../Utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import BusinessListItem from "../BusinessListByCategoryScreen/BusinessListItem";

export default function BookingScreen() {
  const { user } = useUser();
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserBookings();
  }, [user]);

  const getUserBookings = () => {
    setLoading(true);
    GlobalApi.getUserBookings(user.primaryEmailAddress.emailAddress).then(
      (resp) => {
        console.log("booking is fetched");
        const filteredBookings = resp.bookings.filter(
          (item) => item.businessList !== null
        );
        setBookingList(filteredBookings);
        setLoading(false);
      }
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <PageHeading style={styles.PageHeading} title={"My Booking"} />

          <View>
            <FlatList
              data={bookingList}
              onRefresh={() => getUserBookings()}
              refreshing={loading}
              renderItem={({ item, index }) => (
                <BusinessListItem
                  business={item?.businessList}
                  booking={item}
                />
              )}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageHeading: {
    fontFamily: "outfit-medium",
  },
});
