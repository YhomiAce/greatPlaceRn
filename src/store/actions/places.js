import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../../helpers/db";
import vars from "../../../env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${vars.googleApiKey}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();
      if (!responseData.results) {
        throw new Error("Something went wrong");
      }
      const address = responseData.results[0].formatted_address;
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );
      dispatch({
        type: ADD_PLACE,
        payload: {
          id: dbResult.insertId,
          title,
          image: newPath,
          address,
          lat: location.lat,
          lng: location.lng,
        },
      });
    } catch (error) {
      throw error;
    }
  };
};
export const loadPlaces = (title, image) => {
  return async (dispatch) => {
    try {
      const result = await fetchPlaces();
      dispatch({
        type: SET_PLACES,
        payload: result.rows._array,
      });
    } catch (error) {
      throw error;
    }
  };
};
