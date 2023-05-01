import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import { useNavigation, useRoute } from "@react-navigation/native";

const MapScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const { setOptions, setParams, navigate } = useNavigation();
  const { params } = useRoute();

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save Place"
            iconName={Platform.OS === "android" ? "md-save" : "ios-save"}
            onPress={params?.saveLocation}
          />
        </HeaderButtons>
      ),
    });
  }, [setOptions, params]);

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      return;
    }
    navigate("NewPlace", {
      pickedLocation: selectedLocation
    })
  }, [selectedLocation]);

  useEffect(() => {
    setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  let markerCordinate;

  if (selectedLocation) {
    markerCordinate = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  const selectLocationHandler = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCordinate && (
        <Marker title="Picked Location" coordinate={markerCordinate}></Marker>
      )}
    </MapView>
  );
};
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapScreen;
