import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../constants/colors";
import * as Location from "expo-location";
import MapPreview from "./MapPreview";
import { useNavigation, useRoute } from "@react-navigation/native";

const LocationPicker = (props) => {
  const { onLocationSelected } = props;
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params?.pickedLocation) {
      setLocation(params.pickedLocation);
      onLocationSelected(params.pickedLocation);
    }
  }, [params?.pickedLocation, onLocationSelected]);

  const getLocationHandler = async () => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Insufficient Permissions!",
          "You need to grant location permission to use this app",
          [{ text: "Okey" }]
        );
        return;
      }
      const result = await Location.getCurrentPositionAsync({});
      console.log(result);
      setLocation({
        lat: result.coords.latitude,
        lng: result.coords.longitude,
      });
      onLocationSelected({
        lat: result.coords.latitude,
        lng: result.coords.longitude,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert(
        "Could not Fetch Location",
        "Please try again later or enable your location",
        [{ text: "Okey" }]
      );
    }
  };

  const pickOnMapHandler = () => {
    navigate("Map");
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={location}
        onPress={pickOnMapHandler}
      >
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get user location"
          color={colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default LocationPicker;
