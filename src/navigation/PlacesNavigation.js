import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlaceListScreen from "../screens/PlaceListScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";
import { Platform } from "react-native";
import colors from "../constants/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";

const PlaceStack = createNativeStackNavigator();

const PlaceNavigation = () => {
  const defaultOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? colors.primary : "white",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  };
  return (
    <PlaceStack.Navigator
      screenOptions={{
        ...defaultOptions,

      }}
    >
      <PlaceStack.Screen name="Places" component={PlaceListScreen} />
      <PlaceStack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
      <PlaceStack.Screen
        name="NewPlace"
        component={NewPlaceScreen}
        options={{ title: "Add Places", }}
      />
      <PlaceStack.Screen name="Map" component={MapScreen} />
    </PlaceStack.Navigator>
  );
};
export default PlaceNavigation;
