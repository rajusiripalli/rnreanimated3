import { NavigationContainer } from "@react-navigation/native";
import RootStackNavigation from "./app/navigation/RootStack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootStackNavigation />
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
