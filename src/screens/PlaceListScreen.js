import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useNavigation } from "@react-navigation/native";
import CustomHeaderButton from "../components/HeaderButton";
import { useDispatch, useSelector } from "react-redux";
import PlaceItem from "../components/PlacesItem";
import * as placesAction from "../store/actions/places";
import colors from "../constants/colors";

const PlaceListScreen = () => {
  const { setOptions, navigate } = useNavigation();
  const dispatch = useDispatch();
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
  const [loading, setLoading] = useState(false);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      await dispatch(placesAction.loadPlaces());
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const onSelect = (title, placeId) => {
    navigate("PlaceDetail", {
      title,
      placeId,
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

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

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PlaceListScreen;
