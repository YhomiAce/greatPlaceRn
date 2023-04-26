import { FlatList, Platform, Text } from "react-native";
import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useNavigation } from "@react-navigation/native";
import CustomHeaderButton from "../components/HeaderButton";
import { useSelector } from "react-redux";
import PlaceItem from "../components/PlacesItem";

const PlaceListScreen = () => {
  const { setOptions, navigate } = useNavigation();
  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Add Place"
            iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
            onPress={() => navigate("NewPlace")}
          />
        </HeaderButtons>
      ),
    });
  }, [setOptions]);

  const places = useSelector((state) => state.places.places);

  const onSelect = (title, placeId) => {
    navigate("PlaceDetail", {
      title,
      placeId,
    });
  };

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          item={itemData.item}
          onSelect={() => onSelect(itemData.item.title, itemData.item.id)}
        />
      )}
    />
  );
};

export default PlaceListScreen;
