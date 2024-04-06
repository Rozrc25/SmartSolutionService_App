import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import Heading from "../../Components/Heading";
import GlobalApi from "../../Utils/GlobalApi";
import BusinessListItemSmall from "./BusinessListItemSmall";

export default function BusinessList() {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    getBusinessList();
  }, []);

  const getBusinessList = () => {
    GlobalApi.getBusinessList().then((resp) => {
      console.log("business list is fetched");
      setBusinessList(resp.businessLists);
    });
  };

  return (
    <View>
      <Heading text={"Latest Business"} isViewAll={true} />
      <FlatList
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true} // Added nestedScrollEnabled prop
        renderItem={({ item, index }) => (
          <View>
            <BusinessListItemSmall business={item} />
          </View>
        )}
      />
    </View>
  );
}
