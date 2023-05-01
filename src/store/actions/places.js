import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        "Dummy address",
        15.6,
        12.4
      );
      console.log(dbResult);
      dispatch({
        type: ADD_PLACE,
        payload: {
          id: dbResult.insertId,
          title,
          image: newPath,
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
        payload: result.rows._array
      })
    } catch (error) {
      throw error;
    }
  };
};
