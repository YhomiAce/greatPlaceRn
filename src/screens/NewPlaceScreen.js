import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import {useDispatch} from 'react-redux';
import * as placesAction from '../store/actions/places'
import ImageSelector from "../components/ImageSelector";

const NewPlaceScreen = () => {
  const { goBack } = useNavigation();
  const dispatch = useDispatch()

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const titleChangeHandler = (text) => setTitle(text);
  const onImageTaken = (img) => setImage(img);

  const savePlaceHandler = () => {
    dispatch(placesAction.addPlace(title, image));
    goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={titleChangeHandler}
        />
        <ImageSelector onImageTaken={onImageTaken} />
        <Button
          title="Save Place"
          color={colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
