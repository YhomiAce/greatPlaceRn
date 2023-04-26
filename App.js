import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import PlaceNavigation from "./src/navigation/PlacesNavigation";
import { store } from "./src/store/store";

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <PlaceNavigation />
    </NavigationContainer>
    </Provider>
  );
}

