import { createStore, combineReducers, applyMiddleware } from "redux";
import Thunk from "redux-thunk";
import placesReducer from "./reducers/placesReducer";

const rootReducer = combineReducers({
  places: placesReducer,
});
export const store = createStore(rootReducer, applyMiddleware(Thunk));
