import Place from "../../models/place";
import { ADD_PLACE, SET_PLACES } from "../actions/places";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_PLACES:
      return {
        ...state,
        places: payload.map(
          (place) =>
            new Place(
              place.id,
              place.title,
              place.imageUri,
              place.address,
              place.lat,
              place.lng
            )
        ),
      };
    case ADD_PLACE:
      const newPlace = new Place(
        payload.id,
        payload.title,
        payload.image,
        payload.address,
        payload.lat,
        payload.lng
      );
      return {
        ...state,
        places: [newPlace, ...state.places],
      };

    default:
      return state;
  }
};
