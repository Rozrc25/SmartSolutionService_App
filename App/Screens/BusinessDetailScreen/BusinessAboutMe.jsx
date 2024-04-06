import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Heading from "../../Components/Heading";
import Colors from "../../Utils/Colors";

export default function BusinessAboutMe({ business }) {
  const [isReadMode, setIsReadMode] = useState(false);

  return (
    business && (
      <View>
        <Heading text={"About Me"} />
        <Text
          style={{
            fontFamily: "outfit",
            color: Colors.GRAY,
            fontSize: 16,
          }}
          numberOfLines={isReadMode ? undefined : 4}
        >
          {business.about}
        </Text>
        {business.about.length > 50 && (
          <TouchableOpacity onPress={() => setIsReadMode(!isReadMode)}>
            <Text
              style={{
                fontFamily: "outfit",
                color: Colors.PRIMARY,
                fontSize: 16,
              }}
            >
              {isReadMode ? "Read Less" : "Read More"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    )
  );
}
