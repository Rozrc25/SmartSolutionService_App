import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import PageHeading from "../../Components/PageHeading";
import { Ionicons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import Colors from "../../Utils/Colors";
import Heading from "../../Components/Heading";
import { FlatList } from "react-native-gesture-handler";
import GlobalApi from "../../Utils/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";

export default function BookingModel({ businessId, hideModel }) {
  const [timeList, setTimeList] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [note, setNote] = useState();
  const { user } = useUser();

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 7; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    setTimeList(timeList);
  };

  const createNewBooking = () => {
    if (!selectedTime || !selectedDate) {
      ToastAndroid.show("Please Select Date and Time", ToastAndroid.LONG);
      return;
    }

    const data = {
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress.emailAddress,
      time: selectedTime,
      date: moment(selectedDate).format("DD-MM-YYYY"),
      businessId: businessId,
    };

    console.log("Booking Data:", data);

    GlobalApi.createBooking(data)
      .then((resp) => {
        console.log("Booking Response:", resp);
        ToastAndroid.show("Booking Successful!", ToastAndroid.LONG);
        hideModel();
      })
      .catch((error) => {
        console.error("Booking Error:", error);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 15 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
        onPress={() => hideModel()}
      >
        <Ionicons name="arrow-back-outline" size={24} color="black" />
        <Text style={{ fontSize: 25, fontFamily: "outfit-medium" }}>
          Booking
        </Text>
      </TouchableOpacity>
      {/* Calendar */}
      <Heading text={"Select Date"} />
      <View style={styles.calendarContainer}>
        <CalendarPicker
          onDateChange={setSelectedDate} // Pass the handleDateChange function
          width={340}
          minDate={Date.now()}
          todayBackgroundColor={Colors.BLACK}
          todayTextStyle={{ color: Colors.WHITE }}
          selectedDayColor={Colors.PRIMARY}
          selectedDayTextColor={Colors.WHITE}
        />
      </View>
      {/* time selection */}
      <View style={{ marginTop: 5 }}>
        <Heading text={"Select Time slot"} />
        <FlatList
          data={timeList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{ marginRight: 5 }}
              onPress={() => setSelectedTime(item.time)}
            >
              <Text
                style={[
                  selectedTime == item.time
                    ? styles.selectedTime
                    : styles.unSelectedTime,
                ]}
              >
                {item.time}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* note section */}
      <View style={{ paddingTop: 10 }}>
        <Heading text={"Note for this appointment"} />
        <TextInput
          placeholder="Note"
          style={styles.noteTextArea}
          numberOfLines={4}
          multiline={true}
          onChangeText={(text) => setNote(text)}
        />
      </View>
      {/* conformation */}
      <TouchableOpacity onPress={() => createNewBooking()}>
        <Text style={styles.confirmBtn}>Confirm & Book</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 20,
    borderRadius: 15,
    marginTop: 10,
  },
  confirmBtn: {
    marginTop: 10,
    textAlign: "center",
    fontFamily: "outfit-medium",
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    color: Colors.WHITE,
    borderRadius: 99,
    elevation: 10,
  },
  selectedTime: {
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    paddingHorizontal: 18,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
  },
  noteTextArea: {
    borderWidth: 1,
    borderRadius: 15,
    textAlignVertical: "top",
    padding: 20,
    fontSize: 16,
    fontFamily: "outfit",
    borderColor: Colors.PRIMARY,
  },
  unSelectedTime: {
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    paddingHorizontal: 18,
    color: Colors.PRIMARY,
  },
});
