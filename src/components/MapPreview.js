import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import vars from "../../env";

const MapPreview = (props) => {
  let imagePreview;
  if (props.location) {
    imagePreview = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${props.location.lat},${props.location.lng}&key=${vars.googleApiKey}`;
  }

  return (
    <TouchableOpacity style={{ ...styles.mapPreview, ...props.style }} onPress={props.onPress}>
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreview }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
