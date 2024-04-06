import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import ProfileScreen from "../Screens/ProfileScreen/ProfileScreen";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { Text } from "react-native";
import HomeNavigation from "./HomeNavigation";
import BookingNavigation from "./BookingNavigation";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
              Home
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name="Booking" component={BookingNavigation}  options={{
          tabBarLabel: ({color})=>(
            <Text style={{color: color, fontSize: 12, marginTop: -7 }}>Booking</Text>
          ),
          tabBarIcon:({color,size})=>(
            <Entypo name="bookmark" size={size} color={color} />
            )
        }} />
      <Tab.Screen name="Profile" component={ProfileScreen} 
      options={{
        tabBarLabel: ({color})=>(
          <Text style={{color: color, fontSize: 12, marginTop: -7 }}>Profile</Text>
        ),
        tabBarIcon:({color,size})=>(
          <AntDesign name="user" size={size} color={color} />
          )
      }} 
      />
    </Tab.Navigator>
  );
}
