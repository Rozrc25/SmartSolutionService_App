import { View, Text, Image } from "react-native";
import React from "react";
import Heading from "../../Components/Heading";
import { FlatList } from "react-native-gesture-handler";

export default function BusinessPhotos({ business }) {
  return (
    <View>
      <Heading text={"Photos"} />
      <FlatList
        data={business.image}
        numColumns={2}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.url }}
            style={{
              width: "100%",
              height: 120,
              flex: 1,
              borderRadius:15,
              margin:5,
            }}
          />
        )}
      />
    </View>
  );
}
