import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import PlaceNavigation from "./src/navigation/PlacesNavigation";
import { store } from "./src/store/store";
import {init} from './src/helpers/db';

init().then(() => {
  console.log('Database connected');
}).catch((err) => {
  console.log("Failed to connect database");
  console.error(err);
})

export default function App() {

  return (
    <Provider store={store}>
    <NavigationContainer>
      <PlaceNavigation />
    </NavigationContainer>
    </Provider>
  );
}

