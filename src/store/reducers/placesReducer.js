import Place from "../../models/place";
import { ADD_PLACE } from "../actions/places";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_PLACE:
      const newPlace = new Place(
        new Date().toString(),
        payload.title,
        payload.image
      );
      return {
        ...state,
        places: [newPlace, ...state.places],
      };

    default:
      return state;
  }
};
